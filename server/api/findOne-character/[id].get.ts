import mongoose from "mongoose";
import { Character } from "~/server/models/character.model";

export default defineEventHandler(async (event) => {
  try {
    // Obtener el parámetro ID desde la ruta
    const id = getRouterParam(event, "id");

    // Validar que el ID está presente
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID is required to delete character.",
      });
    }

    // Validar que el ID sea un ID válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError({
          statusCode: 400,
          statusMessage: "Invalid ID format.",
        });
      }

    const characterFound = await Character.findById(id);

    if (!characterFound) {
      throw createError({
        statusCode: 404,
        statusMessage: "Character not found.",
      });
    }

    return characterFound;
  } catch (error) {
    const typedError = error as Error;
    return sendError(event, typedError);
  }
});
