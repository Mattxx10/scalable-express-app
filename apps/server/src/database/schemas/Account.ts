import mongoose, { Schema, Document } from 'mongoose';
import { Account } from '../../interfaces';

const accountSchema = new mongoose.Schema<Account>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
});

export default accountSchema;