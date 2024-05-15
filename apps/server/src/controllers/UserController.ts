import { IUser, IDecodedTokenPayload } from '../interfaces';
import { userService } from '../services';

interface IUserController {
  registerUser: (config: Partial<IUser>) => Promise<any>;
  getUserByToken: (token: IDecodedTokenPayload) => Promise<IUser>;
  getUserById: (id: string) => Promise<IUser>;
  deactivateUser: (token: IDecodedTokenPayload) => Promise<any>;
}

const UserController: IUserController = {
  registerUser: async (config) => {
    return userService.create(config);
  },
  getUserByToken: async (token) => {
    return userService.read({ _id: token.account._id });
  },
  getUserById: async (id) => {
    return userService.read({ _id: id });
  },
  deactivateUser: async (token) => {
    await userService.update({ _id: token.account._id }, { active: false });
    return { success: true };
  }
};

export { UserController, IUserController };