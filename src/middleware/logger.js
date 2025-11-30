import pino from "pino";
import pinoHttp from "pino-http";

const logger = pinoHttp({
  logger: pino({
    transport: {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "SYS:standard" },
    },
  }),
  customLogLevel: function (res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) return "warn";
    if (res.statusCode >= 500 || err) return "error";
    return "info";
  },
});

export default logger;
