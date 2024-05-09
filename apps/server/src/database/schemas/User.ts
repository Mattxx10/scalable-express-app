import mongoose from 'mongoose';
import { User } from '../../utils/interfaces';

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  passwordLastUpdatedAt: { type: Date, default: Date.now }
});

export default userSchema;