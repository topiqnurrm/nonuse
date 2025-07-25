import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_URL =
  import.meta.env.VITE_API_URL || "https://grateful-contentent-production-c40f.up.railway.app/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
