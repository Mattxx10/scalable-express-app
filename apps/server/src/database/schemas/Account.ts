import mongoose from 'mongoose';

interface IAccount {
  name: string;
  type: string;
}

const accountSchema = new mongoose.Schema<IAccount>({
  name: { type: String, required: true },
  type: { type: String, required: true }
});

export default accountSchema;