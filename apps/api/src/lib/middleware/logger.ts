import { log } from "@tau/utils";
import { createMiddleware } from "hono/factory";
import { getColorEnabled } from "hono/utils/color";
import { getPath } from "hono/utils/url";

function humanize(times: string[]) {
  const [delimiter, separator] = [",", "."];

  const orderTimes = times.map((v) =>
    v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${delimiter}`),
  );

  return orderTimes.join(separator);
}

// biome-ignore format:
export const logger = () =>
  createMiddleware(async (c, next) => {
    const path = getPath(c.req.raw);
    const reqId = c.get("req_id");

    logFmt(LogPrefix.incoming, reqId, c.req.method, path);
    const start = Date.now();

    await next();

    logFmt(
      LogPrefix.outgoing,
      reqId,
      c.req.method,
      path,
      c.res.status,
      time(start),
    );
  });

const LogPrefix = {
  outgoing: "[END]",
  incoming: "[START]",
  error: "[ERR]",
} as const;

function time(start: number) {
  const delta = Date.now() - start;
  return humanize([
    delta < 1000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`,
  ]);
}

function colorStatus(status: number) {
  const colorEnabled = getColorEnabled();
  const out = {
    7: colorEnabled ? `\x1b[35m${status}\x1b[0m` : `${status}`,
    5: colorEnabled ? `\x1b[31m${status}\x1b[0m` : `${status}`,
    4: colorEnabled ? `\x1b[33m${status}\x1b[0m` : `${status}`,
    3: colorEnabled ? `\x1b[36m${status}\x1b[0m` : `${status}`,
    2: colorEnabled ? `\x1b[32m${status}\x1b[0m` : `${status}`,
    1: colorEnabled ? `\x1b[32m${status}\x1b[0m` : `${status}`,
    0: colorEnabled ? `\x1b[33m${status}\x1b[0m` : `${status}`,
  } as { [key: number]: string };

  return out[(status / 100) | 0];
}

function logFmt(
  prefix: string,
  reqId: string,
  method: string,
  path: string,
  status = 0,
  elapsed?: string,
) {
  // biome-ignore format:
  const out =
    prefix === LogPrefix.incoming
      ? `${prefix} ${reqId} ${method} ${path}`
      : `${prefix} ${reqId} ${method} ${path} ${colorStatus(status)} ${elapsed}`;

  log.info(out);
}
