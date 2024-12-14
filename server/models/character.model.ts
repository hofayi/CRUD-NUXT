import { Schema, model } from 'mongoose'

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    episode: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    }
})

export const Character = model('Character', CharacterSchema)