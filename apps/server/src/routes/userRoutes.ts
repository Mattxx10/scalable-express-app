import { UserController } from "../controllers";
import { IRoute } from "../interfaces";

const userRoutes: { [key: string]: IRoute } = {
  '/users/register': {
    fn: UserController.registerUser,
    params: ['user', 'config'],
    method: 'POST',
    permissions: ['unauthorized'],
  },
  '/users/user': {
    fn: UserController.getUserByToken,
    params: [''],
    method: 'GET',
    permissions: ['authorized'],
  },
  '/users/deactivate': {
    fn: UserController.deactivateUser,
    params: [''],
    method: 'PUT',
    permissions: ['authorized'],
  }
};

export { userRoutes };
