export interface IRoute {
  fn: Function;
  params: string[];
  method: string;
  permissions: string[];
  authorized: boolean;
}