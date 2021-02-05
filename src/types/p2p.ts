export type GetOrderStatus = "open" | "completed";

export type OrderSide = "buy" | "sell";

export type PriceType = "static" | "dynamic";

export type CryptoCurrency =
  | "usd_tether"
  | "naira_token"
  | "bitcoin"
  | "ethereum"
  | "litecoin"
  | "usd_coin";

export interface GetOrderInput {
  status: GetOrderStatus;
  cryptocurrency?: CryptoCurrency;
  side?: OrderSide;
}

export interface Order {
  id: string;
  cryptocurrency: CryptoCurrency;
  coinAmount: number;
  side: OrderSide;
  status: GetOrderStatus;
  createdAt: number;
  pricePerCoin: number;
  priceType: string;
  staticPrice: number;
  dynamicExchangeRate: number;
}

export interface IGetOrdersResult {
  orders: Order[];
  dynamicPriceExpiry: number;
}

export interface IGetOrders {
  getOrders: {
    dynamicPriceExpiry: number;
    orders: {
      edges: Array<{ node: Order }>;
    };
  };
}

export interface PostLimitOrderInput {
  orderSide: OrderSide;
  coinAmount: number;
  priceType: PriceType;
  dynamicExchangeRate?: number;
  cryptocurrency?: CryptoCurrency;
  staticPrice?: number;
}

export interface IPostLimitOrder {
  postLimitOrder: Order;
}

export interface PostMarketOrderInput {
  orderSide: OrderSide;
  coinAmount: number;
  cryptocurrency?: CryptoCurrency;
}

export interface IPostMarketOrder {
  postMarketOrder: Order;
}

export interface GetMarketBookInput {
  coinAmount?: number;
  cryptocurrency?: CryptoCurrency;
}

export interface IGetMarketBook {
  getMarketBook: {
    dynamicPriceExpiry: number;
    orders: {
      edges: Array<{ node: Order }>;
    };
  };
}
