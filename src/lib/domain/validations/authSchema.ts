import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({
      required_error: "El correo electrónico es requerido",
    })
    .trim()
    .min(1, { message: "El correo electrónico es requerido" })
    .max(100, { message: "Máximo 100 caracteres" })
    .email({ message: "Formato de correo inválido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .trim()
    .min(1, { message: "La contraseña es requerida" })
    .min(8, { message: "Mínimo 8 caracteres" })
    .max(50, { message: "Máximo 50 caracteres" })
    .regex(/[A-Z]/, { message: "Al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "Al menos una letra minúscula" })
    .regex(/[0-9]/, { message: "Al menos un número" })
    .regex(/[^A-Za-z0-9]/, { message: "Al menos un carácter especial" })
    .refine((password) => !/\s/.test(password), {
      message: "No se permiten espacios en blanco",
    })
    .refine(
      (password) => {
        const forbiddenPasswords = ["Password123!", "12345678", "qwertyuiop"];
        return !forbiddenPasswords.includes(password);
      },
      { message: "Contraseña demasiado común" }
    ),
});

export type AuthValues = z.infer<typeof authSchema>;
