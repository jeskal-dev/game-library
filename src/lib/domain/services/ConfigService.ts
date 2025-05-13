import { Injectable } from "@/core";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  API_KEY: string;
}

export type EnvKey = keyof Env;

@Injectable()
export class ConfigService {
  private readonly env: Record<string, string>;
  constructor() {
    this.env = import.meta.env;
  }

  get(key: EnvKey) {
    const name = `VITE_${key}`;
    const value = this.env[name];
    if (value === undefined)
      throw new Error(`Configuración no encontrada para la clave: VITE_${key}`);
    return value;
  }
}
