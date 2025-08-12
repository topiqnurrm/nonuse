import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import z from "zod";

import { createApiResponse } from "@/api-docs/open-api-response-builder";

import { GetByIdSchema, IdParamsSchema } from "@/common/models/open-api-schema";

import { useBearerAuth } from "@/common/utils/bearer-auth";
import {
  validateRequestBody,
  validateRequestParams,
} from "@/common/utils/http-handlers";

import { vehicleController } from "./controller";
import {
  addVehicleResSchema,
  addVehicleSchema,
  editVehicleResSchema,
  editVehicleSchema,
  vehicleSchema,
} from "./model";

export const vehicleRegistry = new OpenAPIRegistry();
export const vehicleRouter: Router = express.Router();

const bearerAuth = useBearerAuth(vehicleRegistry);

vehicleRegistry.register("Vehicle", vehicleSchema);
vehicleRegistry.register("Add Vehicle", addVehicleSchema);
vehicleRegistry.register("Edit Vehicle", editVehicleSchema);

vehicleRegistry.registerPath({
  method: "post",
  path: "/api/vehicles",
  tags: ["Vehicles"],
  security: [{ [bearerAuth.name]: [] }],
  summary: "Add Vehicle",
  request: {
    body: {
      content: {
        "application/json": {
          schema: addVehicleSchema,
        },
      },
    },
  },
  responses: createApiResponse(addVehicleResSchema, "Success"),
});

vehicleRegistry.registerPath({
  method: "get",
  path: "/api/vehicles",
  tags: ["Vehicles"],
  security: [{ [bearerAuth.name]: [] }],
  summary: "Get All Vehicles",
  responses: createApiResponse(vehicleSchema.array(), "Success"),
});

vehicleRegistry.registerPath({
  method: "get",
  path: "/api/vehicles/{id}",
  tags: ["Vehicles"],
  security: [{ [bearerAuth.name]: [] }],
  summary: "Get Vehicle by ID",
  request: { params: z.object({ id: IdParamsSchema }) },
  responses: createApiResponse(vehicleSchema, "Success"),
});

vehicleRegistry.registerPath({
  method: "patch",
  path: "/api/vehicles/{id}",
  tags: ["Vehicles"],
  security: [{ [bearerAuth.name]: [] }],
  summary: "Edit Vehicle",
  request: {
    params: z.object({ id: IdParamsSchema }),
    body: {
      content: {
        "application/json": {
          schema: editVehicleSchema,
        },
      },
    },
  },
  responses: createApiResponse(editVehicleResSchema, "Success"),
});

vehicleRegistry.registerPath({
  method: "delete",
  path: "/api/vehicles/{id}",
  tags: ["Vehicles"],
  security: [{ [bearerAuth.name]: [] }],
  summary: "Remove Vehicle",
  request: { params: z.object({ id: IdParamsSchema }) },
  responses: createApiResponse(z.object(), "Success"),
});

vehicleRouter.post(
  "/",
  validateRequestBody(addVehicleSchema),
  vehicleController.addVehicle,
);
vehicleRouter.get("/", vehicleController.getVehicles);
vehicleRouter.get(
  "/:id",
  validateRequestParams(GetByIdSchema),
  vehicleController.getVehicle,
);
vehicleRouter.get(
  "/:id",
  validateRequestParams(GetByIdSchema),
  vehicleController.getVehicle,
);
vehicleRouter.get(
  "/:id",
  validateRequestParams(GetByIdSchema),
  validateRequestBody(editVehicleSchema),
  vehicleController.editVehicle,
);
vehicleRouter.get(
  "/:id",
  validateRequestParams(GetByIdSchema),
  vehicleController.removeVehicle,
);
