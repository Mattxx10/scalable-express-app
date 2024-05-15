import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId | string | null;
  username: string;
  password: string;
  email: string;
  firstName: string;
  active: boolean;
  lastName: string;
  accountId: mongoose.Schema.Types.ObjectId | string;
  passwordLastUpdatedAt: Date;
}