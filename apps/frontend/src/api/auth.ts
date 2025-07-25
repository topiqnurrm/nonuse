import { API_URL } from "@/lib/utils";
import type { User } from "@/models/auth";

export async function getMe(): Promise<User> {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `${result.message}: ${result.error}` || "Not authenticated",
    );
  }
  return result.data;
}

export async function logout(): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${result.message}: ${result.error}` || "Logout failed");
  }
  return result.message;
}
