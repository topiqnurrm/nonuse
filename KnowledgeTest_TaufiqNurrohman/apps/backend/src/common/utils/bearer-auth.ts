import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const useBearerAuth = (registry: OpenAPIRegistry) => {
  return registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });
};
