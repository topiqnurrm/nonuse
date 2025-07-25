import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly statusCode: number;
  readonly data?: T;
  readonly error?: string | string[];

  private constructor(
    success: boolean,
    message: string,
    statusCode: number,
    data?: T,
    error?: string | string[],
  ) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
    this.data = data;
  }

  static success<T>(
    message: string,
    data?: T,
    statusCode: number = StatusCodes.OK,
  ) {
    return new ServiceResponse(true, message, statusCode, data, undefined);
  }

  static failure(
    message: string,
    error?: string | string[],
    statusCode: number = StatusCodes.BAD_REQUEST,
  ) {
    return new ServiceResponse(false, message, statusCode, undefined, error);
  }

  static notFound(message: string) {
    return new ServiceResponse(
      false,
      message,
      StatusCodes.NOT_FOUND,
      undefined,
      undefined,
    );
  }

  static serverError(message: string, error?: string | string[]) {
    return new ServiceResponse(
      false,
      message,
      StatusCodes.INTERNAL_SERVER_ERROR,
      undefined,
      error,
    );
  }
}

export const SuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });

export const FailureResponseSchema = () =>
  z.object({
    success: z.literal(false),
    message: z.string(),
    error: z.union([z.string(), z.array(z.string())]).optional(),
  });

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([SuccessResponseSchema(dataSchema), FailureResponseSchema()]);
