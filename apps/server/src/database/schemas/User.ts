import mongoose from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  accountId: mongoose.Schema.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});

export default userSchema;