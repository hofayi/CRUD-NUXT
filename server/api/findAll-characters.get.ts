import { Character } from "../models/character.model"

export default defineEventHandler(async (event) => {
    return {
        characters: await Character.find()
    }
})