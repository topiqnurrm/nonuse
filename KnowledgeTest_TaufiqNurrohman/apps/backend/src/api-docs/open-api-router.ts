import { apiReference } from "@scalar/express-api-reference";
import express, { type Request, type Response, type Router } from "express";

import { generateOpenAPIDocument } from "@/api-docs/open-api-document-generator";

export const openAPIRouter: Router = express.Router();
const openAPIDocument = generateOpenAPIDocument();

openAPIRouter.get("/swagger.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openAPIDocument);
});

openAPIRouter.use(
  "/docs",
  apiReference({
    theme: "bluePlanet",
    url: "/swagger.json",
    pageTitle: "Vehicle Tracker API",
  }),
);
