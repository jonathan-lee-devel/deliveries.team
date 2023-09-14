import mongoose from 'mongoose';
import type {ConnectOptions} from 'mongoose';
import {MONGO_URL} from '$env/static/private';

/** Callback for establishing or re-establishing mongo connection */
type IOnConnectedCallback = (mongoUrl: string) => void;

interface SafeMongooseConnectionOptions {
  mongoUrl: string;
  mongooseConnectionOptions?: ConnectOptions;
  retryDelayMs?: number;
  debugCallback?: (
    collectionName: string,
    method: string,
    query: any,
    doc: string
  ) => void;
  onStartConnection?: (mongoUrl: string) => void;
  onConnectionError?: (error: Error, mongoUrl: string) => void;
  onConnectionRetry?: (mongoUrl: string) => void;
}

const defaultMongooseConnectionOptions: ConnectOptions = {
  autoCreate: true,
  autoIndex: true,
};

/**
 * A Mongoose Connection wrapper class to
 * help with mongo connection issues.
 *
 * This library tries to auto-reconnect to
 * MongoDB without crashing the server.
 * @author Sidhant Panda
 */
class SafeMongooseConnection {
  /** Safe Mongoose Connection options */
  private readonly options: SafeMongooseConnectionOptions;

  /** Callback when mongo connection is established or re-established */
  private onConnectedCallback?: IOnConnectedCallback;

  /**
   * Internal flag to check if connection established for
   * first time or after a disconnection
   */
  private isConnectedBefore: boolean = false;

  private shouldCloseConnection: boolean = false;

  /** Delay between retrying connecting to Mongo */
  private retryDelayMs: number = 2000;

  /** Mongo connection options to be passed Mongoose */
  private readonly mongoConnectionOptions: ConnectOptions = defaultMongooseConnectionOptions;

  private connectionTimeout?: NodeJS.Timeout;

  /**
   * Standatd constructor which sets options and callbacks.
   *
   * @param {SafeMongooseConnectionOptions} options options for the connection
   */
  constructor(options: SafeMongooseConnectionOptions) {
    this.options = options;
    mongoose.connection.on('error', this.onError);
    mongoose.connection.on('connected', this.onConnected);
    mongoose.connection.on('disconnected', this.onDisconnected);
    mongoose.connection.on('reconnected', this.onReconnected);

    if (options.debugCallback) {
      mongoose.set('debug', options.debugCallback);
    }
    if (options.retryDelayMs) {
      this.retryDelayMs = options.retryDelayMs;
    }
  }

  /**
   * Close the connection.
   *
   * @param {boolean} force whether or not to force the connection closed
   */
  public async close(force: boolean = false) {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
    }
    this.shouldCloseConnection = true;
    await mongoose.connection.close(force);
  }


  /**
   * Create the connection.
   *
   * @param {IOnConnectedCallback} onConnectedCallback callback on connected
   */
  public connect(onConnectedCallback: IOnConnectedCallback) {
    this.onConnectedCallback = onConnectedCallback;
    this.startConnection();
  }

  private startConnection = () => {
    if (this.options.onStartConnection) {
      this.options.onStartConnection(this.options.mongoUrl);
    }
    mongoose.connect(this.options.mongoUrl, this.mongoConnectionOptions).catch(() => { });
  };

  /**
   * Handler called when mongo connection is established
   */
  private onConnected = () => {
    this.isConnectedBefore = true;
    this.onConnectedCallback?.(this.options.mongoUrl);
  };

  /** Handler called when mongo gets re-connected to the database */
  private onReconnected = () => {
    this.onConnectedCallback?.(this.options.mongoUrl);
  };

  /** Handler called for mongo connection errors */
  private onError = () => {
    if (this.options.onConnectionError) {
      const error = new Error(`Could not connect to MongoDB at ${this.options.mongoUrl}`);
      this.options.onConnectionError(error, this.options.mongoUrl);
    }
  };

  /** Handler called when mongo connection is lost */
  private onDisconnected = () => {
    if (!this.isConnectedBefore && !this.shouldCloseConnection) {
      this.connectionTimeout = setTimeout(() => {
        this.startConnection();
        // eslint-disable-next-line no-unused-expressions
        this.connectionTimeout && clearTimeout(this.connectionTimeout);
      }, this.retryDelayMs);
      if (this.options.onConnectionRetry) {
        this.options.onConnectionRetry(this.options.mongoUrl);
      }
    }
  };
}

const mongoUrl = MONGO_URL ?? 'mongodb://localhost:27017/deliveries-team';

export const safeMongooseConnection = new SafeMongooseConnection({
  mongoUrl,
  onStartConnection: (mongoUrl) => console.log(`Connecting to MongoDB at ${mongoUrl}`),
  onConnectionError: (error, mongoUrl) => console.error(`Could not connect to MongoDB at ${mongoUrl}: ${error}`),
  onConnectionRetry: (mongoUrl) => console.log(`Retrying to MongoDB at ${mongoUrl}`),
});

const closeDBConnection = () => {
  console.log('Gracefully shutting down');
  console.log('Closing the MongoDB connection');
  try {
    safeMongooseConnection.close(true);
    console.log('Mongo connection closed successfully');
  } catch (err) {
    console.error('Error shutting closing mongo connection');
  }
};

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => closeDBConnection);

process.on('exit', () => closeDBConnection);
