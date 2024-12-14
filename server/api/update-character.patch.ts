import { Character } from "~/server/models/character.model";

export default defineEventHandler(async (event) => {
  try {
    // Leer el cuerpo de la solicitud
    const body = await readBody(event);

    // Validar que el cuerpo contenga el ID y datos a actualizar
    if (!body || !body._id) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID is required to update character.",
      });
    }

    if (!body.updateData || typeof body.updateData !== "object") {
      throw createError({
        statusCode: 400,
        statusMessage: "Update data is required and must be an object.",
      });
    }

    // Lista de campos permitidos para actualizar
    const allowedFields = [
      "name",
      "image",
      "status",
      "species",
      "gender",
      "origin",
      "location",
      "episode",
      "url",
      "created",
    ];

    // Filtrar los campos actualizables
    const updateData = Object.keys(body.updateData)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = body.updateData[key];
        return obj;
      }, {} as Record<string, any>);

    // Verificar que haya campos válidos para actualizar
    if (Object.keys(updateData).length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid fields to update.",
      });
    }

    // Actualizar el carácter en la base de datos
    const updatedCharacter = await Character.findByIdAndUpdate(
      body._id,
      updateData,
      { new: true } // Retorna el carácter actualizado
    );

    // Verificar si el carácter fue encontrado y actualizado
    if (!updatedCharacter) {
      throw createError({
        statusCode: 404,
        statusMessage: "Character not found.",
      });
    }

    // Retornar el carácter actualizado
    return updatedCharacter;
  } catch (error) {
    // Manejo de errores
    const typedError = error as Error;
    return sendError(event, typedError);
  }
});

/**Cuerpo esperado de una solicitud */
// {
//     "_id": "id_del_caracter_a_actualizar",
//     "updateData": {
//       "name": "Nuevo Nombre",
//       "status": "Alive",
//       "gender": "Male",
//       "origin": "Earth"
//     }
//   }
  