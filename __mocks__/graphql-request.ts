export const mockedRequest = jest.fn();

export const GraphQLClient = jest.fn().mockImplementation(() => {
  return { request: mockedRequest };
});
