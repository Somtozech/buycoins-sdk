import {
  ApiRequest,
  IcreateDepositAccount,
  AccountInfo,
  CryptoCurrency,
  ICreateAddress,
  Address,
} from "../types";

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

    return result.createDepositAccount;
  }

  async createAddress(
    cryptocurrency: CryptoCurrency = "bitcoin"
  ): Promise<Address> {
    const variables = { cryptocurrency };
    const mutation = `mutation($cryptocurrency: Cryptocurrency!){
      createAddress(cryptocurrency: $cryptocurrency) {
        id
        cryptocurrency
        address
        createdAt
      }
    }`;

    const result = await this.request<ICreateAddress>(mutation, variables);

    return result.createAddress;
  }
}
