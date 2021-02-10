import crypto from "crypto";

export default class Webhooks {
  sign(payload: any, key: string): string {
    const hash = crypto
      .createHmac("sha1", key)
      .update(JSON.stringify(payload))
      .digest("hex");

    return hash;
  }

  verify(body: any, webhook_token: string, webhook_signature: string): Boolean {
    const signature = this.sign(body, webhook_token);
    return signature === webhook_signature;
  }
}
