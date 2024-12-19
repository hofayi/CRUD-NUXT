import { defineStore } from 'pinia'

interface IPersonaje {
    personajes: IPersonaje[],
    personajeActual: IPersonaje | null
}

export const usePersonajesStore = defineStore('personajes', {
    state: () => ({
        personajes: [],
        personajeActual: null as IPersonaje | null
    }),
    actions: {
        async obtenerPersonajes() {
            const { data, error } = await useFetch('/api/findAll-characters', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
                // Asegura una clave única para evitar caché
                key: 'uniqueKey_' + Date.now(),
            });
        
            if (error.value) {
                console.error('Error al obtener personajes:', error.value);
                return;
            }
        
            this.personajes = data.value?.characters || [];
        },
        async agregarPersonaje(body: {
            name: string,
            image: string,
            status: string,
            species: string,
            gender: string,
            origin: string,
            location: string,
            episode: string,
            url: string,
            created: string}) {
            const { data, error } = useFetch('/api/create-character', {
                method: 'POST',
                body
            })
            await this.obtenerPersonajes()
            navigateTo('/')
        },
        async eliminarPersonaje(id: string) {
            const { data, error } = useFetch(`/api/delete-character/${id}`, {
                method: 'DELETE',
            })
            this.personajes = this.personajes.filter(personaje => personaje._id !== id)
        },
        setPersonajeActual(personaje: IPersonaje) {
            this.personajeActual = personaje
        },
        async editarPersonaje(personaje: IPersonaje) {
            const { data, error } = await useFetch('/api/update-character', {
                method: 'PATCH',
                // Aseguramos que el servidor interprete JSON
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    _id: personaje._id,
                    updateData: {
                        name: personaje.name,
                        image: personaje.image,
                        status: personaje.status,
                        species: personaje.species,
                        gender: personaje.gender,
                        origin: personaje.origin,
                        location: personaje.location,
                        episode: personaje.episode,
                        url: personaje.url,
                        created: personaje.created,
                    },
                },
            });
        
            if (error.value) {
                console.error('Error al editar personaje:', error.value);
                return;
            }
        
            await this.obtenerPersonajes()
            navigateTo('/')
        }
                
    }
})