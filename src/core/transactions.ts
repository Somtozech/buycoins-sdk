import {
  ApiRequest,
  NetworkFeeInput,
  EstimatedFee,
  IGetEstimatedFee,
  SendInput,
  TransactionRequest,
  ISend,
  Balance,
  IGetBalances,
  CryptoCurrency,
} from "../types";

export default class Transactions {
  private readonly request: ApiRequest;
  constructor(request: ApiRequest) {
    this.request = request;
  }

  async getEstimatedNetworkFee(
    payload: NetworkFeeInput
  ): Promise<EstimatedFee> {
    const query = `query($amount: BigDecimal!,$cryptocurrency: Cryptocurrency) {
      getEstimatedNetworkFee(amount: $amount, cryptocurrency: $cryptocurrency){
        total
        estimatedFee
      }
    }`;
    const result = await this.request<IGetEstimatedFee>(query, payload);

    return result.getEstimatedNetworkFee;
  }

  async send(payload: SendInput): Promise<TransactionRequest> {
    const mutation = `mutation($amount: BigDecimal!,$cryptocurrency: Cryptocurrency,$address: String!) {
      send(amount: $amount, cryptocurrency: $cryptocurrency, address:$address){
        id
        status
        createdAt
        address
        amount
        cryptocurrency
        fee
        transaction {
          amount
          confirmed
          id
          txhash
        }
      }
    }`;

    const result = await this.request<ISend>(mutation, payload);

    return result.send;
  }

  async getBalances(cryptocurrency?: CryptoCurrency): Promise<Balance[]> {
    const payload: { cryptocurrency?: CryptoCurrency } = {};
    if (cryptocurrency) {
      payload.cryptocurrency = cryptocurrency;
    }
    const query = `query($cryptocurrency: Cryptocurrency) {
      getBalances(cryptocurrency:$cryptocurrency) {
        confirmedBalance
        cryptocurrency
        id
      }
    }`;

    const result = await this.request<IGetBalances>(query, payload);

    return result.getBalances;
  }
}
