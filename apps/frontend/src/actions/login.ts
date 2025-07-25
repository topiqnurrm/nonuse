import { API_URL } from "@/lib/utils";
import type { FormState } from "@/models/form";
import { useAuthStore } from "@/store/useAuthStore";

export async function loginAction(
  _formState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        message: `${result.message}: ${result.error}` || "Login failed",
        success: false,
      };
    }

    await useAuthStore.getState().checkAuth();

    return { message: result.message, success: true };
  } catch (ex) {
    if (ex instanceof Error) {
      return { message: ex.message, success: false };
    }
    return { message: "An unknown network error occurred.", success: false };
  }
}
