import mongoose, { Schema } from 'mongoose';
import schemas from './schemas';

interface Database {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  findOne: <T>(collection: string, query: object, fields?: object | null) => Promise<T | null>;
  findMany: <T>(collection: string, query: object, fields?: object | null) => Promise<T[]>;
  create: <T>(collection: string, data: object) => Promise<T[]>;
  updateOne: <T>(collection: string, query: object, update: object, options?: object | null) => Promise<T | null>;
  updateMany: <T>(collection: string, query: object, update: object, options?: object | null) => Promise<T | null>;
  deleteOne: <T>(collection: string, query: object) => Promise<any | null>;
  deleteMany: <T>(collection: string, query: object) => Promise<any | null>;
  models?: { [key: string]: mongoose.Model<any> };
};

const cachedModels = ['Account', 'User'];

const db: Database = {
  connect: async () => {
    const uri = process.env.MONGO_URI;

    try {
      await mongoose.connect(uri!);

      db.models = {};

      Object.keys(schemas).forEach(key => {
        db.models![key] = mongoose.model(key, schemas[key]);
      });

    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  disconnect: async () => {
    return mongoose.disconnect();
  },

  findOne: async <T>(collection: string, query: object, fields?: object | null): Promise<T | null> => {
    const model = db.models![collection];
    return model.findOne(query, fields).exec();
  },

  findMany: async <T>(collection: string, query: object, fields?: object | null): Promise<T[]> => {
    const model = db.models![collection];
    return model.find(query, fields).exec();
  },

  create: async <T>(collection: string, data: object): Promise<T> => {
    const model = db.models![collection];
    return model.create(data);
  },

  updateOne: async <T>(collection: string, query: object, update: object, options: object = {}): Promise<T | null> => {
    const model = db.models![collection];
    return model.findOneAndUpdate(query, update, { ...options, new: true }).exec();
  },

  updateMany: async <T>(collection: string, query: object, update: object, options: object = {}): Promise<any> => {
    const model = db.models![collection];
    return model.updateMany(query, update, options).exec();
  },

  deleteOne: async <T>(collection: string, query: object): Promise<any | null> => {
    const model = db.models[collection];
    return model.deleteOne(query).exec();
  },

  deleteMany: async <T>(collection: string, query: object): Promise<any> => {
    const model = db.models![collection];
    return model.deleteMany(query).exec();
  }
};

export default db;