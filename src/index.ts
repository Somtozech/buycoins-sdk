// import { graphql } from "@octokit/graphql";
import { GraphQLClient } from "graphql-request";
import { ApiInterface } from "./types";
import BuyCoinsError from "./error";
import Accounts from "./core/accounts";
import P2P from "./core/p2p";
import Orders from "./core/orders";
import Transactions from "./core/transactions";
import Webhook from "./core/webhook";

const BUYCOINS_ENDPOINT = "https://backend.buycoins.tech/api";

export class BuyCoins {
  private readonly client: any;

  public accounts: Accounts;
  public p2p: P2P;
  public orders: Orders;
  public transactions: Transactions;
  public webhook: Webhook;

  constructor(options: ApiInterface) {
    const headers = this.authHeader(options);

    this.client = new GraphQLClient(BUYCOINS_ENDPOINT, { headers });

    const request = this.makeRequest.bind(this);

    this.accounts = new Accounts(request);
    this.p2p = new P2P(request);
    this.orders = new Orders(request);
    this.transactions = new Transactions(request);
    this.webhook = new Webhook();
  }

  makeRequest<T>(query: string, variables = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client
        .request(query, variables)
        .then((result: T) => resolve(result))
        .catch((error: any) => {
          reject(this.processException(error));
        });
    });
  }

  processException(error: any) {
    let errorMessage: string = "unknown Error occured";

    if (typeof error?.errors === "string") {
      errorMessage = error.errors;
    }

    if (Array.isArray(error.errors) && error.errors.length > 0) {
      errorMessage = error.errors[0].message;
    }

    return new BuyCoinsError({
      message: errorMessage,
      request: error.request,
      name: error.name,
      status: error.status,
    });
  }

  authHeader(options: ApiInterface): { authorization: string } {
    const base = Buffer.from(
      `${options.username}:${options.password}`
    ).toString("base64");

    const authorization = `Basic ${base}`;

    return {
      authorization,
    };
  }
}
