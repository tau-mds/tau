import pino from "pino";

export const log = pino({
  transport: {
    target: "pino-pretty",
    options: { destination: 1, colorize: true },
  },
});

export const createLogger = pino;
