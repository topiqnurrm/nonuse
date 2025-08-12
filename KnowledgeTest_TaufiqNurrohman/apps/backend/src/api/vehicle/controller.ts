import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/http-handlers";

import { vehicleService } from "./service";

class VehicleController {
  public addVehicle: RequestHandler = async (req: Request, res: Response) => {
    return handleServiceResponse(await vehicleService.add(req.body), res);
  };

  public getVehicles: RequestHandler = async (_req: Request, res: Response) => {
    return handleServiceResponse(await vehicleService.findAll(), res);
  };

  public getVehicle: RequestHandler = async (req: Request, res: Response) => {
    return handleServiceResponse(
      await vehicleService.findById(req.params.id as string),
      res,
    );
  };

  public editVehicle: RequestHandler = async (req: Request, res: Response) => {
    return handleServiceResponse(
      await vehicleService.edit(req.params.id as string, req.body),
      res,
    );
  };

  public removeVehicle: RequestHandler = async (
    req: Request,
    res: Response,
  ) => {
    return handleServiceResponse(
      await vehicleService.remove(req.params.id as string),
      res,
    );
  };
}

export const vehicleController = new VehicleController();
