// lib/validation/scriptValidation.ts (AVANZADO)
// filepath: lib/validation/scriptValidation.ts
import { z } from "zod";

export const scriptSchema = z.object({
  titulo: z.string().min(3, "El título es obligatorio"),
  descripcion: z.string().optional(),
  capas: z.array(
    z.object({
      nombre: z.string().min(2, "Nombre de capa requerido"),
      beats: z.array(
        z.object({
          titulo: z.string().min(2, "Título de beat requerido"),
          contenido: z.string().min(1, "Contenido requerido"),
        })
      ),
    })
  ),
});

export function validateScript(data: unknown) {
  return scriptSchema.safeParse(data);
}