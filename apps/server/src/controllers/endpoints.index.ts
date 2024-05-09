import { accountEndpoints } from './Accounts';
import { usersEndpoints } from './Users';

const endpoints = {
  ...accountEndpoints,
  ...usersEndpoints
};

export default endpoints;