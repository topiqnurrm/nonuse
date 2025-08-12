export type VehicleStatus = "ACTIVE" | "INACTIVE";

export interface Vehicle {
  id: string;
  name: string;
  fuel_level: number;
  odometer: number;
  latitude: number;
  longitude: number;
  speed: number;
  status: VehicleStatus;
}
