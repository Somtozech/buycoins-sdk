# buycoins-sdk

Nodejs SDK for Buycoins GraphQL API

## Installation
```sh
npm install buycoins-sdk
```

## Documentation
Visit [https://developers.buycoins.africa/](https://developers.buycoins.africa/) for the official buycoins documentation.

## Features
Accounts 
* Create Virtual Deposit Account
* Create Cryptocurrency Address

P2P
* Post Limit Order
* Post Market Order
* Get Orders
* Get Market Book

Orders
* get Prices
* Buy cryptocurrency
* Send cryptocurrency

Transactions
* Network Fees
* Send Cryptocurrency
* Account Balances

Webhooks
* Verification
* Sign Payload

## Usage
Every API requests requires authentication. The BuyCoins constructor needs to be instantiated with your buycoins username (Public Key) and password (Secret Key) which can be generated [in the dashboard](https://buycoins.africa/settings/api)

```js
const {Buycoins} = require("buycoins-sdk");

const buycoins = new BuyCoins({
  username: process.env.BUYCOINS_PUBLIC_KEY,
  password: process.env.BUYCOINS_SECRET_KEY,
});
```
or using ES Modules
```js
import { BuyCoins } from "buycoins-sdk";

const buycoins = new BuyCoins({
  username: process.env.BUYCOINS_PUBLIC_KEY,
  password: process.env.BUYCOINS_SECRET_KEY,
});
```

All methods are promised based.

### Accounts
```js
// create a virtual bank account
buycoins.accounts
  .createDepositAccount("john doe")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
  
  
 // create Cryptocurrency address to receive coins
buycoins.accounts
  .createAddress("bitcoin")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

### P2P

```js
// Place a limit order
buycoins.p2p
  .postLimitOrder({
    coinAmount: 0.01,
    orderSide: "buy",
    priceType: "static",
    staticPrice: 6000000,
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
  
// Place a market order
buycoins.p2p
  .postMarketOrder({
    coinAmount: 0.01,
    orderSide: "buy",
    cryptocurrency: "bitcoin"
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Retrieve all your orders
buycoins.p2p
  .getOrders()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
  
// get all your open orders
buycoins.p2p
  .getOrders({status: "open"})
  .then((result) => {
    console.log("RESULT");
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
  
// get all completed orders for litecoin on the buy side
buycoins.p2p
  .getOrders({ status: "completed", cryptocurrency: "litecoin", side: "buy" })
  .then((result) => {
    console.log("RESULT");
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

```

### Orders
```js
// get active active prices
buycoins.orders
  .getPrices()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// get bitcoin price
buycoins.orders
  .getPrices({ cryptocurrency: "bitcoin" })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
  
// Buy cryptocurrency
buycoins.orders
  .buy({
    price:
      "QnV5Y29pbnNQcmljZS00ZGEyMWNjYi1hNzRkLTQyYmYtOWU5MC05YjNkZWVlMjdlMWM=",
    coinAmount: 0.01,
    cryptocurrency: "bitcoin",
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
  
 // Sell cryptocurrency
 buycoins.orders
  .sell({
    price:
      "QnV5Y29pbnNQcmljZS00ZGEyMWNjYi1hNzRkLTQyYmYtOWU5MC05YjNkZWVlMjdlMWM=",
    coinAmount: 0.01,
    cryptocurrency: "bitcoin",
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

```

### Transactions
```js
// get estimated network fees before sending litecoin
buycoins.transactions
  .getEstimatedNetworkFee({ amount: 100, cryptocurrency: "litecoin" })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
  
// Check Cryptocurrency account balances
buycoins.transactions
  .getBalances()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
  
// check bitcoin account balance
buycoins.transactions
  .getBalances("bitcoin")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// send bitcoin to address
buycoins.transactions
  .send({ amount: 100, address: "1MmyYvSEYLCPm45Ps6vQin1heGBv3UpNbf", cryptocurrency: "bitcoin" })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

```

### Webhook
```js
// sign events sent to webhook url with webhook token
const hash = buycoins.webhook.sign(event, webhook_token);

//verify that requests to your Webhook URL are coming from BuyCoins
const isValid = buycoins.webhook.verify(event, webhook_token, webhook_signature);
```

## Make a custom request
Sometimes you might need to make a request with your own custom queries and mutation. BuyCoins exposes a `makeRequest` method for this usecase
```js
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

const variables = {
  accountName: "john doe",
};

buycoins
  .makeRequest(query, variables)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```
## Development
See an issue or something you think can be improved? [Open an issue](https://github.com/Somtozech/buycoins-sdk/issues) or clone the project and send a pull request with your changes.

### Tests
You can run the unit tests by executing `npm test`

## License
Licensed under the MIT license.
