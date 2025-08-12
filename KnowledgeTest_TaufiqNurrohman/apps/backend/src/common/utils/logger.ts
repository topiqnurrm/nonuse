import pino from "pino";

import { env } from "./env-config";

export const logger = pino({
  base: {
    pid: false,
  },
  ...(env.isDevelopment
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: "SYS:standard",
          },
        },
        level: "debug",
      }
    : {
        transport: {
          target: "pino/file",
          level: "info",
        },
        level: "info",
        timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
        messageKey: "message",
        base: {
          env: process.env.NODE_ENV,
        },
      }),
});
