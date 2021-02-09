import buycoins from "./setup";

describe("Webhook", () => {
  test("#verify", () => {
    const event = {
      payload: {
        event: "coins.incoming",
        data: {
          transactionId:
            "VHlwZXM6OlB1YmxpY0FwaTo6QWRkcmVzcy1mOGRmNGZlYy1iZTJmLTQ1YjktOWJjMy04YjMwMGNhZTg5Y2I=",
          cryptocurrency: "naira_token",
          transactionHash: "00c49d94c2c7ed92d7f166a4499a27e1bc2c3b9b",
          amount: 25985,
          type: "onchain",
          confirmed: false,
          address: "1f6d648ccdfc13e55050e24727421d5dca2eed95",
        },
      },
    };

    const webhook_signature: string =
      "b97478f0c8c656607f949ddb6c0606e4873033cb";

    const webhook_token = "8d48423f-6b21-4f29-b59d-b7561b2c93f3";

    expect(
      buycoins.webhook.verify(event, webhook_token, webhook_signature)
    ).toBeTruthy();

    // to be false when it dosen't match signature
    expect(buycoins.webhook.verify(event, webhook_token, "fake_signature"));
  });
});
