interface IBuyCoinsError {
  name?: string;
  message: string;
  request?: any;
  status?: number;
}

class BuyCoinsError extends Error {
  public name: string;
  public request: any;
  public status: number | undefined;

  constructor(error: IBuyCoinsError) {
    const message = error?.message || "unknown Error Occured";
    super(message);

    this.name = error.name || "BuyCoinsError";
    this.request = error.request;
    this.status = error.status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default BuyCoinsError;
