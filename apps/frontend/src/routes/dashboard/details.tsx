import {
  CircleGauge,
  Fuel,
  MapPin,
  Power,
  PowerOff,
  Route,
  Wrench, // <--- TAMBAHKAN INI
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useVehicleStore } from "@/store/useVehicleStore";

import MapsViewer from "./components/maps";

export default function DashboardDetails() {
  const { vehicleId } = useParams();

  const { currentVehicle, findVehicleById, error, clearError } =
    useVehicleStore();

  useEffect(() => {
    if (vehicleId) {
      findVehicleById(vehicleId);
    }

    if (error !== null) {
      toast.error(error);
      clearError();
    }
  }, [findVehicleById, vehicleId, error, clearError]);

  return (
    <section className="flex w-full flex-col gap-y-4 p-4 pt-15">
      <div className="flex flex-col gap-y-6 rounded-lg border bg-muted p-4">
        <h1 className="flex items-center gap-x-3 font-bold text-xl sm:gap-x-4 sm:text-2xl">
          {currentVehicle?.status === "ACTIVE" ? (
            <Power className="size-5 text-green-500 sm:size-6" />
          ) : currentVehicle?.status === "INACTIVE" ? ( // <--- TAMBAHKAN KONDISI INI
            <PowerOff className="size-5 text-red-500 sm:size-6" />
          ) : ( // <--- KONDISI UNTUK MAINTENANCE (jika tidak ACTIVE atau INACTIVE)
            <Wrench className="size-5 text-yellow-500 sm:size-6" />
          )}
          {currentVehicle?.name}{" "}
        </h1>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <Fuel className="size-5 sm:size-6" />
            <p className="font-medium sm:text-lg">
              Fuel Level:{" "}
              <span
                className={cn(
                  currentVehicle
                    ? currentVehicle?.fuel_level >= 66
                      ? "text-green-500"
                      : currentVehicle?.fuel_level >= 33
                        ? "text-yellow-500"
                        : "text-red-500"
                    : null,
                )}
              >
                {currentVehicle?.fuel_level}%
              </span>
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <CircleGauge className="size-5 sm:size-6" />
            <p className="font-medium sm:text-lg">
              Speed: {currentVehicle?.speed} km/h
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <Route className="size-5 sm:size-6" />
            <p className="font-medium sm:text-lg">
              Odometer: {currentVehicle?.odometer} km
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin className="size-5 sm:size-6" />
            <p className="font-medium sm:text-lg">
              Position: <br /> - Lat: {currentVehicle?.latitude}, <br /> - Lng:{" "}
              {currentVehicle?.longitude}
            </p>
          </div>
          {currentVehicle && <MapsViewer vehicle={currentVehicle} />}
        </div>
      </div>
    </section>
  );
}