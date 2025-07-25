import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/http-handlers";

import { authService } from "./service";

class AuthController {
  public login: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authService.login(req.body);
    res.cookie("token", serviceResponse.data?.token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true,
    });
    return handleServiceResponse({ ...serviceResponse, data: undefined }, res);
  };
  public me: RequestHandler = async (req: Request, res: Response) => {
    return handleServiceResponse(await authService.me(req.jwt?.id), res);
  };
  public logout: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authService.logout(req.jwt?.id);
    if (serviceResponse.data?.removeToken) {
      res.clearCookie("token");
    }
    return handleServiceResponse({ ...serviceResponse, data: undefined }, res);
  };
}

export const authController = new AuthController();
