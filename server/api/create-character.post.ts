import { Character } from "../models/character.model";

export default defineEventHandler(async (event) => {
  try {
    // Leer el cuerpo de la solicitud
    const body = await readBody(event);

    // Validar que el cuerpo contenga todos los campos requeridos
    const requiredFields = [
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

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Crear el carácter en la base de datos
    const characterCreated = await Character.create(body);

    // Retornar el carácter creado
    return characterCreated;
  } catch (error) {
    // Manejo de errores
    const typedError = error as Error;
    return sendError(event, typedError);
  }
});

/**Cuerpo esperado de una solicitud */
// {
//     "name": "Rick Sanchez",
//     "image": "https://example.com/rick.png",
//     "status": "Alive",
//     "species": "Human",
//     "gender": "Male",
//     "origin": "Earth (C-137)",
//     "location": "Citadel of Ricks",
//     "episode": "S01E01",
//     "url": "https://example.com/character/rick",
//     "created": "2024-12-13T12:00:00Z"
//   }
  