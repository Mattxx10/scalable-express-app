import db from '../database';
import { IAccount } from '../interfaces';

interface AccountsServices {
  create: (accountData: Partial<IAccount>) => Promise<any>;
  read: (accountQuery: Partial<IAccount>) => Promise<IAccount>;
  readMany: (accountQuery: Partial<IAccount>) => Promise<any>;
  update: (accountQuery: Partial<IAccount>, accountUpdate: Partial<IAccount>) => Promise<IAccount>;
  updateMany: (accountQuery: Partial<IAccount>, accountUpdate: Partial<IAccount>) => Promise<IAccount>;
  delete: (accountQuery: Partial<IAccount>) => Promise<any>;
  deleteMany: (accountQuery: Partial<IAccount>) => Promise<any>;
}

export const accountsServices: AccountsServices = {
  create: async (accountData) => {
    return db.create('Account', accountData);
  },
  read: async (accountQuery) => {
    return db.findOne('Account', accountQuery);
  },
  readMany: async (accountQuery) => {
    return db.findMany('Account', accountQuery);
  },
  update: async (accountQuery, accountUpdate) => {
    return db.updateOne('Account', accountQuery, accountUpdate);
  },
  updateMany: async (accountQuery, accountUpdate) => {
    return db.updateMany('Account', accountQuery, accountUpdate);
  },
  delete: async (accountQuery) => {
    return db.deleteOne('Account', accountQuery);
  },
  deleteMany: async (accountQuery) => {
    return db.deleteMany('Account', accountQuery);
  }
};
