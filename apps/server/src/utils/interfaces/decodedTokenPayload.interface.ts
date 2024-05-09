import { Account } from "./account.interface";
import { User } from "./user.interface";

export interface DecodedTokenPayload {
  user: User,
  account: Account
};