import db from '../database';
import { Account } from '../utils/interfaces';

interface AccountsServices {
  create: (accountData: Partial<Account>) => Promise<any>;
  read: (accountQuery: Partial<Account>) => Promise<Account>;
  readMany: (accountQuery: Partial<Account>) => Promise<any>;
  update: (accountQuery: Partial<Account>, accountUpdate: Partial<Account>) => Promise<Account>;
  updateMany: (accountQuery: Partial<Account>, accountUpdate: Partial<Account>) => Promise<Account>;
  delete: (accountQuery: Partial<Account>) => Promise<any>;
  deleteMany: (accountQuery: Partial<Account>) => Promise<any>;
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
