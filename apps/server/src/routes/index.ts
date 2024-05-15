import { accountRoutes } from "./accountRoutes";
import { userRoutes } from "./userRoutes";

export const routes = {
  ...accountRoutes,
  ...userRoutes
};
