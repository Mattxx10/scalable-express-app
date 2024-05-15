import mongoose from 'mongoose';

export interface IAccount {
  _id: mongoose.Schema.Types.ObjectId | string | null;
  name: string;
  type: string;
  users: string[];
}