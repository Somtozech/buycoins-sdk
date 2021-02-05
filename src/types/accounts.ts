import { CryptoCurrency } from "./";
export interface AccountInfo {
  accountNumber: string;
  accountName: string;
  accountType: string;
  bankName: string;
  accountReference: string;
}

export interface IcreateDepositAccount {
  createDepositAccount: AccountInfo;
}

export interface Address {
  id: string;
  createdAt: number;
  address: string;
  cryptocurrency: CryptoCurrency;
}

export interface ICreateAddress {
  createAddress: Address;
}
