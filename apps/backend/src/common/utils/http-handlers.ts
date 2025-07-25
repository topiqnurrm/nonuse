import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type z from "zod";

import { ServiceResponse } from "@/common/models/service-response";

import { logger } from "./logger";

export const handleServiceResponse = <T>(
  serviceResponse: ServiceResponse<T>,
  response: Response,
) => {
  const { statusCode, ...responseData } = serviceResponse;
  return response.status(statusCode).send(responseData);
};

export const validateRequestBody =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const errorMessage = `${(err as z.ZodError).issues.map((e) => e.message).join(", ")}`;
      const serviceResponse = ServiceResponse.failure(
        errorMessage,
        undefined,
        StatusCodes.BAD_REQUEST,
      );
      return handleServiceResponse(serviceResponse, res);
    }
  };

export const validateRequestParams =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedParams = schema.parse(req.params);
      req.params = validatedParams as any;
      next();
    } catch (err) {
      const errorMessage = `${(err as z.ZodError).issues.map((e) => e.message).join(", ")}`;
      logger.error(errorMessage);
      const serviceResponse = ServiceResponse.failure(
        errorMessage,
        undefined,
        StatusCodes.BAD_REQUEST,
      );
      return handleServiceResponse(serviceResponse, res);
    }
  };
