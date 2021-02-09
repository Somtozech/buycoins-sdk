import buycoins, { mocked } from "./setup";

describe("Orders", () => {
  test("#getPrices", () => {
    const mockPrices = {
      getPrices: [
        {
          id:
            "QnV5Y29pbnNQcmljZS0zMjViY2NmZi1hYjdlLTRjNDctODYzOS0xMjQ5Y2I2NTEyN2Q=",
          cryptocurrency: "bitcoin",
          buyPricePerCoin: "17716801.375",
          expiresAt: 1612707791,
        },
        {
          id:
            "QnV5Y29pbnNQcmljZS1hYWI3YzcyNC0yNGIyLTRkZTMtYmI0YS03ZjJlYjQxNzdlMDY=",
          cryptocurrency: "ethereum",
          buyPricePerCoin: "726773.7295",
          expiresAt: 1612707792,
        },
        {
          id:
            "QnV5Y29pbnNQcmljZS00NGJlYjEzNC0xNGY5LTQwMjgtYTc3Mi0wYmRhYTAwZGVkYjc=",
          cryptocurrency: "litecoin",
          buyPricePerCoin: "69649.398",
          expiresAt: 1612707793,
        },
        {
          id:
            "QnV5Y29pbnNQcmljZS04YTNkNzMyZS0wY2Q5LTQ2YTgtYjhiMi1hNzEwODhlNGM0YTg=",
          cryptocurrency: "usd_coin",
          buyPricePerCoin: "459.4994",
          expiresAt: 1612707792,
        },
      ],
    };

    mocked(mockPrices);

    expect(buycoins.orders.getPrices()).resolves.toEqual(mockPrices.getPrices);
  });

  test("#buy", async () => {
    const mockedResult = {
      buy: {
        id:
          "QnV5Y29pbnNQcmljZS00ZGEyMWNjYi1hNzRkLTQyYmYtOWU5MC05YjNkZWVlMjdlMWM=",
        cryptocurrency: "bitcoin",
        status: "done",
        totalCoinAmount: 100,
        side: "buy",
      },
    };

    mocked(mockedResult);

    const result = await buycoins.orders.buy({
      price:
        "QnV5Y29pbnNQcmljZS00ZGEyMWNjYi1hNzRkLTQyYmYtOWU5MC05YjNkZWVlMjdlMWM=",
      coinAmount: 0.01,
      cryptocurrency: "bitcoin",
    });

    expect(result).toEqual(mockedResult.buy);
  });

  test("#sell", async () => {
    const mockedResult = {
      sell: {
        id:
          "QnV5Y29pbnNQcmljZS00ZGEyMWNjYi1hNzRkLTQyYmYtOWU5MC05YjNkZWVlMjdlMWM=",
        cryptocurrency: "bitcoin",
        status: "pending",
        totalCoinAmount: 100,
        side: "sell",
      },
    };

    mocked(mockedResult);

    const result = await buycoins.orders.sell({
      price:
        "QnV5Y29pbnNQcmljZS00ZGEyMWNjYi1hNzRkLTQyYmYtOWU5MC05YjNkZWVlMjdlMWM=",
      coinAmount: 0.01,
      cryptocurrency: "bitcoin",
    });

    expect(result).toEqual(mockedResult.sell);
  });
});
