import db from '../database';
import { IUser } from '../interfaces';

interface IUserService {
  create: (userData: Partial<IUser>) => Promise<any>;
  read: (userQuery: Partial<IUser>) => Promise<IUser>;
  readMany: (userQuery: Partial<IUser>) => Promise<any>;
  update: (userQuery: Partial<IUser>, userUpdate: Partial<IUser>) => Promise<IUser>;
  updateMany: (userQuery: Partial<IUser>, userUpdate: Partial<IUser>) => Promise<IUser>;
  delete: (userQuery: Partial<IUser>) => Promise<any>;
  deleteMany: (userQuery: Partial<IUser>) => Promise<any>;
}

const userService: IUserService = {
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

export { userService, IUserService };
