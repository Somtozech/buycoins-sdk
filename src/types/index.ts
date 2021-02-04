export interface ApiRequest {
  <T>(query: string, variables?: { [key: string]: any }): Promise<T>;
}

export interface ApiInterface {
  username: string;
  password: string;
}

export * from "./accounts";
