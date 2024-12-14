/**La carpeta define el endpoint y el archivo el parametro del endpoint con el metodo http*/
import { Character } from "~/server/models/character.model";
import mongoose from "mongoose";

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

    // Buscar y eliminar el carácter en la base de datos
    const deletedCharacter = await Character.findByIdAndDelete(id);

    // Validar si el carácter fue encontrado y eliminado
    if (!deletedCharacter) {
      throw createError({
        statusCode: 404,
        statusMessage: "Character not found.",
      });
    }

    // Retornar una respuesta de éxito
    return {
      message: "Character deleted successfully.",
      character: deletedCharacter,
    };
  } catch (error) {
    // Manejo de errores
    const typedError = error as Error;
    return sendError(event, typedError);
  }
});
