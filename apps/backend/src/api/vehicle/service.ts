import { ServiceResponse } from "@/common/models/service-response";

import { logger } from "@/common/utils/logger";

import type {
  AddVehicle,
  AddVehicleRes,
  EditVehicle,
  EditVehicleRes,
  Vehicle,
} from "./model";
import { VehicleRepository } from "./repository";

class VehicleService {
  private vehicleRepository: VehicleRepository;

  constructor(repository: VehicleRepository = new VehicleRepository()) {
    this.vehicleRepository = repository;
  }

  async add(
    data: AddVehicle,
  ): Promise<ServiceResponse<AddVehicleRes | null | undefined>> {
    try {
      const vehicle = await this.vehicleRepository.addAsync(data);
      return ServiceResponse.success<AddVehicleRes>(
        "Vehicle successfully created",
        vehicle,
      );
    } catch (ex) {
      const errorMessage = `Error adding a vehicle: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.serverError(
        "An error occurred while adding vehicle.",
        errorMessage,
      );
    }
  }

  async findAll(): Promise<ServiceResponse<Vehicle[] | null | undefined>> {
    try {
      const vehicles = await this.vehicleRepository.findAllAsync();
      if (!vehicles || vehicles.length === 0) {
        return ServiceResponse.notFound("No vehicles found");
      }
      return ServiceResponse.success<Vehicle[]>("Vehicles found", vehicles);
    } catch (ex) {
      const errorMessage = `Error finding all vehicles: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.serverError(
        "An error occurred while retrieving vehicles.",
        errorMessage,
      );
    }
  }

  async findById(
    id: string,
  ): Promise<ServiceResponse<Vehicle | null | undefined>> {
    try {
      const vehicle = await this.vehicleRepository.findByIdAsync(id);
      if (!vehicle) {
        return ServiceResponse.notFound("Vehicle not found");
      }
      return ServiceResponse.success<Vehicle>("Vehicle found", vehicle);
    } catch (ex) {
      const errorMessage = `Error finding vehicle with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.serverError(
        "An error occurred while finding vehicle.",
        errorMessage,
      );
    }
  }

  async edit(
    id: string,
    data: EditVehicle,
  ): Promise<ServiceResponse<EditVehicle | null | undefined>> {
    try {
      const vehicle = await this.vehicleRepository.editAsync(id, data);
      if (!vehicle) {
        return ServiceResponse.notFound("Vehicle not found");
      }
      return ServiceResponse.success<EditVehicleRes>(
        "Vehicle successfully edited",
        vehicle,
      );
    } catch (ex) {
      const errorMessage = `Error editing a vehicle: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.serverError(
        "An error occurred while editing vehicle.",
        errorMessage,
      );
    }
  }

  async remove(id: string): Promise<ServiceResponse<undefined | null>> {
    try {
      await this.vehicleRepository.removeAsync(id);
      return ServiceResponse.success("Vehicle successfully removed", undefined);
    } catch (ex) {
      const errorMessage = `Error removing a vehicle: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.serverError(
        "An error occurred while removing vehicle.",
        errorMessage,
      );
    }
  }
}

export const vehicleService = new VehicleService();
