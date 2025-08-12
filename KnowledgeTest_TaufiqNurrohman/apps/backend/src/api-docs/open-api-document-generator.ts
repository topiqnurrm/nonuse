import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { authRegistry } from "@/api/auth/router";
import { healthCheckRegistry } from "@/api/health-check/router";
import { vehicleRegistry } from "@/api/vehicle/router";

export type OpenAPIDocument = ReturnType<
  OpenApiGeneratorV3["generateDocument"]
>;

export function generateOpenAPIDocument(): OpenAPIDocument {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    authRegistry,
    vehicleRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Vehicle Tracker API",
    },
    externalDocs: {
      description: "API documentation of vehicle tracker app.",
      url: "/swagger.json",
    },
  });
}
