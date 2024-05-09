export interface Endpoint {
  fn: Function;
  params: string[];
  method: string;
  permissions: string[];
}