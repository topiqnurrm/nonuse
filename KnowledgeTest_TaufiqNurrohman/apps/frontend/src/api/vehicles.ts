import { API_URL } from "@/lib/utils";

import type { Vehicle } from "@/models/vehicle";

export async function getAllVehicles(): Promise<Vehicle[]> {
  const response = await fetch(`${API_URL}/vehicles`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      `${result.message}: ${result.error}` || "Failed to get all vehicles",
    );
  }

  return result.data;
}

export async function getVehicleById(id: string): Promise<Vehicle> {
  const response = await fetch(`${API_URL}/vehicles/${id}`, {
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `${result.message}: ${result.error}` ||
        `Failed to get vehicle with ID: ${id}`,
    );
  }
  return result.data;
}
