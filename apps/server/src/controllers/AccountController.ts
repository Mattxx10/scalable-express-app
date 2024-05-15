import db from '../database';
import { User, Account, DecodedTokenPayload, Endpoint } from '../interfaces';

interface IAccountController {
  registerAccount: (userId: String, config: Partial<Account>) => Promise<any>;
  getAccountByToken: (token: DecodedTokenPayload) => Promise<Account>;
  getAccountById: (id: string) => Promise<Account>;
  deactivateAccount: (token: DecodedTokenPayload) => Promise<any>;
}

const AccountContoller: IAccountController = {
  registerAccount: async (userId, config) => {
    config.users.push(userId + '');
    return db.create('Account', config);
  },
  getAccountByToken: async (token) => {
    return db.findOne('Account', { _id: token.account._id });
  },
  getAccountById: async (id) => {
    return db.findOne('Account', { _id: id });
  },
  deactivateAccount: async (token) => {
    await db.updateOne('Account', { _id: token.account._id }, { active: false });
    return { success: true };
  }
};

export { AccountContoller };