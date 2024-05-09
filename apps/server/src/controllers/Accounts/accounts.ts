import db from '../../database';
import { User, Account, DecodedTokenPayload, Endpoint } from '../../utils/interfaces';

interface AccountsMethods {
  register: (userId: String, config: Partial<Account>) => Promise<any>;
  getAccount: (token: DecodedTokenPayload) => Promise<Account>;
  getAccountById: (id: string) => Promise<Account>;
  deactivate: (token: DecodedTokenPayload) => Promise<any>;
}

const accountsMethods: AccountsMethods = {
  register: async (userId, config) => {
    config.users.push(userId + '');
    return db.create('Account', config);
  },
  getAccount: async (token) => {
    return db.findOne('Account', { _id: token.account._id });
  },
  getAccountById: async (id) => {
    return db.findOne('Account', { _id: id });
  },
  deactivate: async (token) => {
    await db.updateOne('Account', { _id: token.account._id }, { active: false });
    return { success: true };
  }
};

const accountEndpoints: { [key: string]: Endpoint } = {
  '/accounts/register': {
    fn: accountsMethods.register,
    params: ['user', 'config'],
    method: 'POST',
    permissions: ['unauthorized'],
  },
  '/accounts/account': {
    fn: accountsMethods.getAccount,
    params: ['token'],
    method: 'GET',
    permissions: ['authorized'],
  },
  '/accounts/deactivate': {
    fn: accountsMethods.deactivate,
    params: ['token'],
    method: 'PUT',
    permissions: ['authorized'],
  }
};

export { accountsMethods, accountEndpoints };