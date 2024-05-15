import { IRoute } from "../interfaces";
import { AccountContoller } from "../controllers";

const accountRoutes: { [key: string]: IRoute } = {
  '/accounts/register': {
    fn: AccountContoller.registerAccount,
    params: ['user', 'config'],
    method: 'POST',
    permissions: [],
    authorized: false
  },
  '/accounts/account': {
    fn: AccountContoller.getAccountByToken,
    params: ['token'],
    method: 'GET',
    permissions: [],
    authorized: true
  },
  '/accounts/deactivate': {
    fn: AccountContoller.deactivateAccount,
    params: ['token'],
    method: 'PUT',
    permissions: [],
    authorized: true
  }
};

export { accountRoutes };
