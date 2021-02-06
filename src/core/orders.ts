import {
  ApiRequest,
  Price,
  GetPricesInput,
  IGetPrices,
  OrderInput,
  IProcessOrder,
  IOrder,
} from "../types";

const PRICE_FRAGMENT = `fragment Price on BuycoinsPrice {
  cryptocurrency
  id
  maxBuy
  maxSell
  expiresAt
  minCoinAmount
  buyPricePerCoin
  status
  sellPricePerCoin
  minSell
  minBuy
}`;

export default class Orders {
  private readonly request: ApiRequest;
  constructor(request: ApiRequest) {
    this.request = request;
  }

  async getPrices(payload: GetPricesInput = {}): Promise<Price[]> {
    const query = `query($cryptocurrency: Cryptocurrency, $side: OrderSide) {
      getPrices(cryptocurrency: $cryptocurrency, side:$side) {
          ...Price
      }
    } ${PRICE_FRAGMENT}`;
    const result = await this.request<IGetPrices>(query, payload);

    return result.getPrices;
  }

  private async processOrder(
    type: "buy" | "sell",
    payload: OrderInput
  ): Promise<IOrder> {
    const mutation = `mutation($price: ID!, $cryptocurrency: Cryptocurrency, $coinAmount: BigDecimal! ){
      ${type}(price: $price, coin_amount: $coinAmount, cryptocurrency: $cryptocurrency) {
        id
        cryptocurrency
        status
        totalCoinAmount
        side
        filledCoinAmount
        createdAt
        price {
          ...Price
        }
      }
    }${PRICE_FRAGMENT}`;

    const result = await this.request<IProcessOrder>(mutation, payload);

    return result[type];
  }

  async buy(payload: OrderInput): Promise<IOrder> {
    const result = await this.processOrder("buy", payload);
    return result;
  }

  async sell(payload: OrderInput): Promise<IOrder> {
    const result = await this.processOrder("sell", payload);
    return result;
  }
}
