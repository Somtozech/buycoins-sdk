import { CryptoCurrency } from "./";

export interface NetworkFeeInput {
  cryptocurrency?: CryptoCurrency;
  amount: number;
}

export interface EstimatedFee {
  total: number;
  estimatedFee: number;
}

export interface IGetEstimatedFee {
  getEstimatedNetworkFee: EstimatedFee;
}

export interface SendInput {
  address: string;
  amount: number;
  cryptocurrency?: CryptoCurrency;
}

export type TransactionStatus =
  | "unconfirmed"
  | "confirmed"
  | "flagged"
  | "failed"
  | "expired"
  | "processed"
  | "ready_for_processing"
  | "processing";

export interface Transaction {
  id: string;
  txhash: string;
  confirmed: Boolean;
  amount: number;
}

export interface TransactionRequest {
  id: string;
  status: TransactionStatus;
  createdAt: number;
  address: string;
  amount: string;
  cryptocurrency?: CryptoCurrency;
  fee: number;
  transaction: Transaction;
}

export interface ISend {
  send: TransactionRequest;
}

export interface Balance {
  id: string;
  confirmedBalance: number;
  cryptocurrency: CryptoCurrency;
}

export interface IGetBalances {
  getBalances: Balance[];
}
