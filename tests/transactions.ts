import buycoins, { mocked } from "./setup";

describe("Transactions", () => {
  test("#getEstimatedNetworkFee", () => {
    const mockedResult = {
      getEstimatedNetworkFee: {
        estimatedFee: "0.00024",
        total: "100.00024",
      },
    };

    mocked(mockedResult);

    expect(
      buycoins.transactions.getEstimatedNetworkFee({ amount: 100 })
    ).resolves.toEqual(mockedResult.getEstimatedNetworkFee);
  });

  test("#getBalances", () => {
    const mockedResult = {
      getBalances: [
        {
          confirmedBalance: "0.0",
          cryptocurrency: "usd_tether",
          id: "QWNjb3VudC0=",
        },
        {
          confirmedBalance: "0.0",
          cryptocurrency: "naira_token",
          id: "QWNjb3VudC0=",
        },
        {
          confirmedBalance: "0.0",
          cryptocurrency: "bitcoin",
          id: "QWNjb3VudC0=",
        },
        {
          confirmedBalance: "0.0",
          cryptocurrency: "ethereum",
          id: "QWNjb3VudC0=",
        },
      ],
    };

    mocked(mockedResult);

    expect(buycoins.transactions.getBalances()).resolves.toEqual(
      mockedResult.getBalances
    );
  });

  test("#send", async () => {
    const mockedResult = {
      send: {
        id: "QWNjb3VudC0=",
        address: "1MmyYvSEYLCPm45Ps6vQin1heGBv3UpNbf",
        amount: "0.03",
        cryptocurrency: "bitcoin",
        transaction: {
          id: "QWNjb3VudC0=",
          txhash:
            "QnV5Y29pbnNQcmljZS00ZGEyMWNjYi1hNzRkLTQyYmYtOWU5MC05YjNkZWVlMjdlMWM=",
        },
      },
    };
    const result = await buycoins.transactions.send({
      address: "1MmyYvSEYLCPm45Ps6vQin1heGBv3UpNbf",
      amount: 0.03,
    });

    expect(result).toEqual(mockedResult.send);
  });
});
