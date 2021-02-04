import { ApiRequest, IcreateDepositAccount, AccountInfo } from "../types";

export default class Accounts {
  private readonly request: ApiRequest;
  constructor(request: ApiRequest) {
    this.request = request;
  }

  async createDepositAccount(accountName: string): Promise<AccountInfo> {
    const query = `mutation($accountName: String!) {
        createDepositAccount(accountName: $accountName) {
          accountNumber
          accountName
          accountType
          bankName
          accountReference
        }
      }
    `;

    const variables = { accountName };

    const result = await this.request<IcreateDepositAccount>(query, variables);

    return result?.createDepositAccount;
  }
}
