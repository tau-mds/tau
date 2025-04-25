import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 20);

export function reqId() {
  const id = nanoid();
  return `req_${id}`;
}
