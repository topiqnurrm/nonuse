import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Vehicle = z.infer<typeof vehicleSchema>;
export const vehicleSchema = z.strictObject({
  id: z.uuidv7(),
  name: z.string().min(1, "Name is required"),
  fuel_level: z
    .number("Fuel level should be a number")
    .min(0, "Fuel level cannot be negative"),
  odometer: z
    .number("Odometer should be a number")
    .min(0, "Odometer cannot be negative"),
  latitude: z
    .number("Latitude should be a number")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number("Longitude should be a number")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  speed: z
    .number({ message: "Speed should be a number" })
    .min(0, "Speed cannot be negative"),
  status: z.enum(["ACTIVE", "INACTIVE"], {
    message: "Status must be either ACTIVE or INACTIVE",
  }),
});

export type AddVehicle = z.infer<typeof addVehicleSchema>;
export const addVehicleSchema = vehicleSchema.omit({ id: true });

export type EditVehicle = z.infer<typeof editVehicleSchema>;
export const editVehicleSchema = addVehicleSchema.partial();

export type AddVehicleRes = z.infer<typeof addVehicleResSchema>;
export const addVehicleResSchema = addVehicleSchema.extend({
  created_at: z.date(),
});

export type EditVehicleRes = z.infer<typeof editVehicleResSchema>;
export const editVehicleResSchema = editVehicleSchema.extend({
  updated_at: z.date(),
});
