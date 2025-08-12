import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const IdParamsSchema = z.string().openapi({
  param: {
    name: "id",
    in: "path",
  },
  description: "Id of an item",
  example: "1",
});

export const GetByIdSchema = z.object({
  id: z.string(),
});
