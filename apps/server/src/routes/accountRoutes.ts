import { IRoute } from "../interfaces";
import { AccountContoller } from "../controllers";

const accountRoutes: { [key: string]: IRoute } = {
  '/accounts/register': {
    fn: AccountContoller.registerAccount,
    params: ['user', 'config'],
    method: 'POST',
    permissions: ['unauthorized'],
  },
  '/accounts/account': {
    fn: AccountContoller.getAccountByToken,
    params: ['token'],
    method: 'GET',
    permissions: ['authorized'],
  },
  '/accounts/deactivate': {
    fn: AccountContoller.deactivateAccount,
    params: ['token'],
    method: 'PUT',
    permissions: ['authorized'],
  }
};

export { accountRoutes };
