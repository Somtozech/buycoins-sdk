import { BuyCoins } from "../src";
//@ts-ignore
import { mockedRequest } from "graphql-request";

const buycoins = new BuyCoins({
  username: "public_key",
  password: "secret_key",
});

export const mocked = (result: unknown) => {
  (mockedRequest as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(result)
  );
};

export default buycoins;
