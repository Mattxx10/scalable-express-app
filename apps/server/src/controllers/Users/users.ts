import { User, DecodedTokenPayload, Endpoint } from '../../utils/interfaces';
import { usersServices, accountsServices } from '../../services';
import { generatePasswordToken, generateAuthToken } from '../../utils/token';

interface UsersMethods {
  register: (config: Partial<User>) => Promise<any>;
  getUser: (token: DecodedTokenPayload) => Promise<User>;
  getUserById: (id: string) => Promise<User>;
  deactivate: (token: DecodedTokenPayload) => Promise<any>;
}

const usersMethods: UsersMethods = {
  register: async (config) => {
    return usersServices.create(config);
  },
  getUser: async (token) => {
    return usersServices.read({ _id: token.account._id });
  },
  getUserById: async (id) => {
    return usersServices.read({ _id: id });
  },
  deactivate: async (token) => {
    await usersServices.update({ _id: token.account._id }, { active: false });
    return { success: true };
  }
};

const usersEndpoints: { [key: string]: Endpoint } = {
  '/users/register': {
    fn: usersMethods.register,
    params: ['user', 'config'],
    method: 'POST',
    permissions: ['unauthorized'],
  },
  '/users/user': {
    fn: usersMethods.getUser,
    params: [''],
    method: 'GET',
    permissions: ['authorized'],
  },
  '/users/deactivate': {
    fn: usersMethods.deactivate,
    params: [''],
    method: 'PUT',
    permissions: ['authorized'],
  }
};

export { usersMethods, usersEndpoints };