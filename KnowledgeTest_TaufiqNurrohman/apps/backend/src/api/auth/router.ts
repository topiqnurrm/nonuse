import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import z from "zod";

import { createApiResponse } from "@/api-docs/open-api-response-builder";
import { verifyJwt } from "@/common/middleware/verify-jwt";
import { useBearerAuth } from "@/common/utils/bearer-auth";
import { validateRequestBody } from "@/common/utils/http-handlers";

import { authController } from "./controller";
import { loginSchema, userSchema } from "./model";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

const bearerAuth = useBearerAuth(authRegistry);

authRegistry.register("Login", loginSchema);

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/login",
  tags: ["Auth"],
  summary: "Login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object(), "Success"),
});

authRegistry.registerPath({
  method: "get",
  path: "/api/auth/me",
  tags: ["Auth"],
  security: [{ [bearerAuth.name]: [] }],
  summary: "Get Me",
  responses: createApiResponse(userSchema, "Success"),
});

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/logout",
  tags: ["Auth"],
  security: [{ [bearerAuth.name]: [] }],
  summary: "Logout",
  responses: createApiResponse(z.object(), "Success"),
});

authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.login,
);
authRouter.get("/me", verifyJwt, authController.me);
authRouter.post("/logout", verifyJwt, authController.logout);
