import buycoins, { mocked } from "./setup";

describe("Accounts", () => {
  it("#createDepositAccount", async () => {
    const mockResult = {
      createDepositAccount: {
        accountName: "john doe",
        accountNumber: "293923923",
        bankName: "Providus",
        id: "23323",
        accountType: "Savings",
      },
    };

    mocked(mockResult);

    const result = await buycoins.accounts.createDepositAccount("john doe");

    expect(result).toEqual(mockResult.createDepositAccount);
  });

  it("#createAddress", async () => {
    const mockResult = {
      createAddress: {
        id: "QWRkcmVzcy03NWYzMmIzZS0xY2NkLTQzMGMtYjdhOS02NTM0ZmEwYjMxMDk=",
        cryptocurrency: "bitcoin",
        address: "3QBrqHic1tDQwvR61284ZRYgvmNAP4jK7P",
        createdAt: 1612707265,
      },
    };

    mocked(mockResult);

    const result = await buycoins.accounts.createAddress();

    expect(result).toEqual(mockResult.createAddress);
  });
});
