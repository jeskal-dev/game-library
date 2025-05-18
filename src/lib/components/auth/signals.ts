import { computed, signal } from "@preact-signals/safe-react";
import type { TabState } from "./types";

export const activeTab = signal<TabState>("login");
export const buttonMessage = computed(() =>
  activeTab.value === "login" ? "Acceder" : "Crear Cuenta"
);
export const successMessage = computed(() =>
  activeTab.value === "login"
    ? "¡Bienvenido de vuelta!"
    : "¡Cuenta creada! Revisa tu correo"
);
