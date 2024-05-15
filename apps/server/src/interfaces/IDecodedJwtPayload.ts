import { IAccount } from "./IAccount";
import { IUser } from "./IUser";

export interface IDecodedTokenPayload {
  user: IUser,
  account: IAccount
};