import pino from "pino";
import pinoHttp from "pino-http";

const loggerInstance = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
    },
  },
});

export const logger = pinoHttp({
  logger: loggerInstance,
  customLogLevel: (res, err) => {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});
