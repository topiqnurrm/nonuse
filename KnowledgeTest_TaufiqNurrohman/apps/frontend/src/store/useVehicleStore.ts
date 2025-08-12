import { create } from "zustand";

import { getAllVehicles, getVehicleById } from "@/api/vehicles";
import type { Vehicle } from "@/models/vehicle";

interface VehicleState {
  vehicles: Vehicle[];
  currentVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;

  clearError: () => void;
  setCurrentVehicle: (data: Vehicle) => void;
  findAllVehicles: () => Promise<void>;
  findVehicleById: (id: string) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  currentVehicle: null,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  setCurrentVehicle: (vehicle) => {
    set({ currentVehicle: vehicle });
  },

  findAllVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllVehicles();
      set({ loading: false, vehicles: response });
    } catch (ex) {
      set({ error: `Failed to get vehicles data: ${ex}` });
    }
  },
  findVehicleById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getVehicleById(id);
      set({ loading: false, currentVehicle: response });
    } catch (ex) {
      set({ error: `Failed to get vehicle data with id ${id}: ${ex}` });
    }
  },
}));
