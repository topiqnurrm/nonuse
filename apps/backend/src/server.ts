import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express, Router } from "express";
import helmet from "helmet";

import { healthCheckRouter } from "@/api/health-check/router";

import { openAPIRouter } from "@/api-docs/open-api-router";

import { authRouter } from "./api/auth/router";
import { vehicleRouter } from "./api/vehicle/router";
import { env } from "./common/utils/env-config";

const app: Express = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
      },
    },
  }),
);

app.use("/health-check", healthCheckRouter);

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/vehicles", vehicleRouter);

app.use("/api", apiRouter);

app.use(openAPIRouter);

export { app };
