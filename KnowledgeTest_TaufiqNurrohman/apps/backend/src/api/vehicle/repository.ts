import prisma from "@/config/prisma";

import type { AddVehicle, EditVehicle } from "./model";

export class VehicleRepository {
  async addAsync(data: AddVehicle) {
    return await prisma.vehicle.create({
      data,
      select: {
        id: true,
        name: true,
        fuel_level: true,
        odometer: true,
        latitude: true,
        longitude: true,
        speed: true,
        status: true,
        gambar: true,  
        created_at: true,
      },
    });
  }

  async findAllAsync() {
    return await prisma.vehicle.findMany({
      where: { deleted_at: null },
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        fuel_level: true,
        odometer: true,
        latitude: true,
        longitude: true,
        speed: true,
        status: true,
        gambar: true,  
      },
    });
  }

  async findByIdAsync(id: string) {
    return await prisma.vehicle.findUnique({
      where: { id, deleted_at: null },
      select: {
        id: true,
        name: true,
        fuel_level: true,
        odometer: true,
        latitude: true,
        longitude: true,
        speed: true,
        status: true,
        gambar: true,  
      },
    });
  }

  async editAsync(id: string, data: EditVehicle) {
    return await prisma.vehicle.update({
      where: { id, deleted_at: null },
      data,
      select: {
        id: true,
        name: true,
        fuel_level: true,
        odometer: true,
        latitude: true,
        longitude: true,
        speed: true,
        status: true,
        gambar: true,  
        updated_at: true,
      },
    });
  }

  async removeAsync(id: string) {
    return await prisma.vehicle.update({
      where: { id, deleted_at: null },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}