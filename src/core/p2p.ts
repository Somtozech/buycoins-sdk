import {
  ApiRequest,
  GetOrderInput,
  IGetOrders,
  IGetOrdersResult,
  PostLimitOrderInput,
  Order,
  IPostLimitOrder,
  IPostMarketOrder,
  PostMarketOrderInput,
  GetMarketBookInput,
  IGetMarketBook,
} from "../types";

export default class P2P {
  private readonly request: ApiRequest;
  constructor(request: ApiRequest) {
    this.request = request;
  }

  async getOrders(payload: GetOrderInput): Promise<IGetOrdersResult> {
    const query = `query($status: GetOrdersStatus!, $cryptocurrency: Cryptocurrency,$side: OrderSide) {
      getOrders(status: $status, cryptocurrency: $cryptocurrency, side: $side) {
        dynamicPriceExpiry
        orders {
          edges {
            node {
              id
              cryptocurrency
              coinAmount
              side
              status
              createdAt
              pricePerCoin
              priceType
              staticPrice
              dynamicExchangeRate
            }
          }
        }
      }
    }
    `;

    const {
      getOrders: { orders, dynamicPriceExpiry },
    } = await this.request<IGetOrders>(query, payload);

    const parsedOrders = orders.edges.map((edge) => edge.node);

    return { orders: parsedOrders, dynamicPriceExpiry };
  }

  async postLimitOrder(payload: PostLimitOrderInput): Promise<Order> {
    const mutation = `mutation($orderSide: OrderSide!, $coinAmount: BigDecimal!, $priceType: PriceType!, $cryptocurrency: Cryptocurrency, $staticPrice: BigDecimal, $dynamicExchangeRate: BigDecimal) {
      postLimitOrder(orderSide: $orderSide, coinAmount:  $coinAmount, priceType: $priceType, cryptocurrency: $cryptocurrency, staticPrice: $staticPrice,dynamicExchangeRate: $dynamicExchangeRate ){
        id
        cryptocurrency
        coinAmount
        side
        status 
        createdAt
        pricePerCoin
        priceType
        staticPrice
        dynamicExchangeRate
      }
    }`;

    const result = await this.request<IPostLimitOrder>(mutation, payload);

    return result.postLimitOrder;
  }

  async postMarketOrder(payload: PostMarketOrderInput): Promise<Order> {
    const mutation = `mutation($cryptocurrency: Cryptocurrency, $orderSide: OrderSide!, $coinAmount: BigDecimal!){
      postMarketOrder(orderSide: $orderSide, coinAmount: $coinAmount, cryptocurrency: $cryptocurrency){
        id
        cryptocurrency
        coinAmount
        side
        status 
        createdAt
        pricePerCoin
        priceType
        staticPrice
        dynamicExchangeRate
      }
    }
    `;

    const result = await this.request<IPostMarketOrder>(mutation, payload);
    return result.postMarketOrder;
  }

  async getMarketBook(payload?: GetMarketBookInput): Promise<IGetOrdersResult> {
    if (!payload) {
      payload = {};
    }
    const query = `query($cryptocurrency: Cryptocurrency,$coinAmount: BigDecimal) {
      getMarketBook(cryptocurrency: $cryptocurrency, coinAmount: $coinAmount) {
        dynamicPriceExpiry
        orders {
          edges {
            node {
              id
              cryptocurrency
              coinAmount
              side
              status
              createdAt
              pricePerCoin
              priceType
              staticPrice
              dynamicExchangeRate
            }
          }
        }
      }
    }
    `;

    const {
      getMarketBook: { orders, dynamicPriceExpiry },
    } = await this.request<IGetMarketBook>(query, payload);

    const parsedOrders = orders.edges.map((edge) => edge.node);

    return { orders: parsedOrders, dynamicPriceExpiry };
  }
}
