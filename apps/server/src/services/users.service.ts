import db from '../database';
import { User } from '../utils/interfaces';

interface UsersServices {
  create: (userData: Partial<User>) => Promise<any>;
  read: (userQuery: Partial<User>) => Promise<User>;
  readMany: (userQuery: Partial<User>) => Promise<any>;
  update: (userQuery: Partial<User>, userUpdate: Partial<User>) => Promise<User>;
  updateMany: (userQuery: Partial<User>, userUpdate: Partial<User>) => Promise<User>;
  delete: (userQuery: Partial<User>) => Promise<any>;
  deleteMany: (userQuery: Partial<User>) => Promise<any>;
}

export const usersServices: UsersServices = {
  create: async (userData) => {
    return db.create('User', userData);
  },
  read: async (userQuery) => {
    return db.findOne('User', userQuery);
  },
  readMany: async (userQuery) => {
    return db.findMany('User', userQuery);
  },
  update: async (userQuery, userUpdate) => {
    return db.updateOne('User', userQuery, userUpdate);
  },
  updateMany: async (userQuery, userUpdate) => {
    return db.updateMany('User', userQuery, userUpdate);

  },
  delete: async (userQuery) => {
    return db.deleteOne('User', userQuery);
  },
  deleteMany: async (userQuery) => {
    return db.deleteMany('User', userQuery);
  }
};
