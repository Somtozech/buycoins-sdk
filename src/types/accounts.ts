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
