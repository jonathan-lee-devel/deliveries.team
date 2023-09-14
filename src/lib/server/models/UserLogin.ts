import {model, Schema} from 'mongoose';

export interface UserLogin {
  email: string;
}

const schema = new Schema<UserLogin>({
  email: {type: String, required: true, unique: false},
}, {timestamps: true});

export const UserLoginModel = model<UserLogin>('UserLogin', schema);
