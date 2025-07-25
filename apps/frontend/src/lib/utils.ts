import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
