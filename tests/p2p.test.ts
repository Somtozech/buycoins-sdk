import buycoins, { mocked } from "./setup";

describe("P2P", () => {
  test("#getOrders", async () => {
    const mockResult = {
      getOrders: {
        orders: {
          edges: [
            {
              node: {
                coinAmount: 100,
                createdAt: 1612707792,
                cryptocurrency: "bitcoin",
              },
            },
          ],
        },
      },
    };

    mocked(mockResult);

    const { orders } = await buycoins.p2p.getOrders({ status: "open" });

    expect(orders).toEqual(
      mockResult.getOrders.orders.edges.map((edge) => edge.node)
    );
  });

  test("#postMarketOrder", async () => {
    const mockedResult = {
      postLimitOrder: {
        coinAmount: "0.1",
        cryptocurrency: "bitcoin",
        id: "UG9zdE9yZGVyLWEyOGY4MDhmLTk1ZWQtNDQxMy1iMGQ0LWEzN2Y3MjNlMzFkMA==",
        pricePerCoin: "100.0",
      },
    };

    mocked(mockedResult);

    const result = await buycoins.p2p.postLimitOrder({
      orderSide: "buy",
      coinAmount: 0.1,
      priceType: "static",
      staticPrice: 100,
    });

    // expect(result).toEqual(mockedResult.postLimitOrder);
  });

  test("#getMarketBook", async () => {
    const mockedResult = {
      getMarketBook: {
        orders: {
          edges: [
            {
              node: {
                coinAmount: 100,
                createdAt: 1612707792,
                cryptocurrency: "bitcoin",
              },
            },
          ],
        },
      },
    };

    mocked(mockedResult);

    const result = await buycoins.p2p.getMarketBook();

    expect(result.orders).toEqual(
      mockedResult.getMarketBook.orders.edges.map((edge) => edge.node)
    );
  });
});
