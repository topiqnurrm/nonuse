import { env } from "@/common/utils/env-config";

import { app } from "@/server";

import { logger } from "./common/utils/logger";

const PORT = env.PORT || 8080; // Fallback ke 8080 jika env.PORT undefined
const server = app.listen(PORT, () => {
  const { NODE_ENV, HOST } = env;
  logger.info(`Server (${NODE_ENV}) running on http://${HOST}:${PORT}`);
});


const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
