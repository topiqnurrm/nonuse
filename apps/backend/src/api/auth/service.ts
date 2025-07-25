import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { ServiceResponse } from "@/common/models/service-response";
import { env } from "@/common/utils/env-config";
import { logger } from "@/common/utils/logger";
import { hashManager } from "@/common/utils/manager";

import type { Login, User } from "./model";
import { AuthRepository } from "./repository";

class AuthService {
  private authRepository: AuthRepository;

  constructor(repository: AuthRepository = new AuthRepository()) {
    this.authRepository = repository;
  }

  async login(
    data: Login,
  ): Promise<ServiceResponse<{ token: string } | undefined | null>> {
    try {
      const user = await this.authRepository.findByEmail(data.email);
      if (!user) {
        return ServiceResponse.failure(
          "Login failed",
          "Invalid credentials",
          StatusCodes.UNAUTHORIZED,
        );
      }

      const isValidPassword = await hashManager.compare(
        data.password,
        user.password,
      );
      if (!isValidPassword) {
        return ServiceResponse.failure(
          "Login failed",
          "Invalid credentials",
          StatusCodes.UNAUTHORIZED,
        );
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        env.JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );
      return ServiceResponse.success("Login success", { token });
    } catch (ex) {
      const errorMessage = `Error login: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.serverError(
        "An error occurred while login.",
        errorMessage,
      );
    }
  }

  async me(id?: string): Promise<ServiceResponse<User | undefined | null>> {
    try {
      if (!id) {
        return ServiceResponse.failure(
          "Invalid user ID",
          undefined,
          StatusCodes.BAD_REQUEST,
        );
      }
      const user = await this.authRepository.findById(id);
      if (!user) {
        return ServiceResponse.notFound("User not found");
      }
      return ServiceResponse.success("User found", user);
    } catch (ex) {
      const errorMessage = `Error login: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.serverError(
        "An error occurred while login.",
        errorMessage,
      );
    }
  }

  async logout(
    id?: string,
  ): Promise<ServiceResponse<{ removeToken: boolean } | undefined | null>> {
    try {
      if (!id) {
        return ServiceResponse.failure(
          "Invalid user ID",
          undefined,
          StatusCodes.BAD_REQUEST,
        );
      }
      const user = await this.authRepository.findById(id);
      if (!user) {
        return ServiceResponse.notFound("User not found");
      }
      return ServiceResponse.success("Logout success", { removeToken: true });
    } catch (ex) {
      const errorMessage = `Error logout: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.serverError(
        "An error occurred while logout.",
        errorMessage,
      );
    }
  }
}

export const authService = new AuthService();
