import {model, Schema} from 'mongoose';

export interface User {
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
  password: string | undefined;
  emailVerified: boolean;
  googleId: string | undefined;
}

const schema = new Schema<User>({
  email: {type: String, required: true, unique: false},
  firstName: {type: String, required: false, unique: false},
  lastName: {type: String, required: false, unique: false},
  password: {type: String, required: false, unique: false},
  emailVerified: {type: Boolean, required: true, unique: false},
  googleId: {type: String, required: false, unique: true},
}, {timestamps: true});

export const UserModel = model<User>('User', schema);
