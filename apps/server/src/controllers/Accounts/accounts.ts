import db from '../../database';

interface User {
  _id: string;
  // Add other properties as needed
}

interface Token {
  account: {
    id: string;
    // Add other properties as needed
  };
}

interface Config {
  users: string[];
}

interface Endpoint {
  fn: Function;
  params: string[];
  method: string;
  permissions: string[];
}

interface AccountsMethods {
  register: (user: User, config: Config) => Promise<any>;
  getAccount: (token: Token) => Promise<any>;
  getAccountById: (id: string) => Promise<any>;
  deactivate: (token: Token) => Promise<any>;
}

const accountsMethods: AccountsMethods = {
  register: async (user, config) => {
    // config.users.push(user._id);
    return db.create('Account', config);
  },
  getAccount: async (token) => {
    return db.findOne('Account', { _id: token.account.id });
  },
  getAccountById: async (id) => {
    return db.findOne('Account', { _id: id });
  },
  deactivate: async (token) => {
    await db.updateOne('Account', { _id: token.account.id }, { active: false });
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
    method: 'POST',
    permissions: ['authorized'],
  }
};

export { accountsMethods, accountEndpoints };