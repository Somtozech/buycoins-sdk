import { CryptoCurrency, OrderSide, Order } from "./";

export type PriceStatus = "expired" | "active";

export interface Price {
  id: string;
  status: PriceStatus;
  cryptocurrency: CryptoCurrency;
  buyPricePerCoin: number;
  sellPricePerCoin: number;
  minSell: number;
  minCoinAmount: number;
  minBuy: number;
  maxSell: number;
  maxBuy: number;
  expiresAt: number;
}

export interface GetPricesInput {
  cryptocurrency?: CryptoCurrency;
  side?: OrderSide;
}

export interface IGetPrices {
  getPrices: Price[];
}

export interface OrderInput {
  coinAmount: number;
  cryptocurrency?: CryptoCurrency;
  price: string;
}

export interface IProcessOrder {
  [key: string]: IOrder;
}

export type OrderStatus = "canceled" | "pending" | "done" | "failed";

export interface IOrder {
  id: string;
  cryptocurrency: CryptoCurrency;
  status: OrderStatus;
  totalCoinAmount: number;
  side: OrderSide;
  filledCoinAmount: number;
  createdAt: number;
  price: Price;
}
