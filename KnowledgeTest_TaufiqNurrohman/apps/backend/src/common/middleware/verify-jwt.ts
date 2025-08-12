// common/middleware/verify-jwt.ts
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import type { JwtPayload } from "@/common/types/express";

import { env } from "../utils/env-config";
import { logger } from "../utils/logger";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  // Cek di cookie dulu
  let token = req.cookies.token;
  
  // Kalau tidak ada di cookie, cek di Authorization header
  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  }

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Token not found",
    });
  }

  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.jwt = decodedToken;
    next();
  } catch (ex) {
    const errorMessage = `JWT error: ${(ex as Error).message}`;
    logger.error(errorMessage);
    if (ex instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Expired token",
      });
    } else if (ex instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid token",
      });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: errorMessage,
    });
  }
};