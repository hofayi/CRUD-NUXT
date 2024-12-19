<template>
    <VContainer>
        <VRow>
            <VCol>
                <VBtn icon="mdi-plus" @click="navigateTo('/formPersonaje')" />
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <VTable>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Species</th>
                            <th>Gender</th>
                            <th>Origin</th>
                            <th>Location</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="personaje in personajes" :key="personaje._id">
                            <td>{{ personaje.name }}</td>
                            <td>{{ personaje.image }}</td>
                            <td>{{ personaje.status }}</td>
                            <td>{{ personaje.species }}</td>
                            <td>{{ personaje.gender }}</td>
                            <td>{{ personaje.origin }}</td>
                            <td>{{ personaje.location }}</td>
                            <td>
                                <VBtn variant="text" color="warning" icon="mdi-pencil" @click="irAlFormulario(personaje)" />
                                <VBtn @click="eliminarPersonaje(personaje._id)" variant="text" color="error" icon="mdi-delete" />
                            </td>
                        </tr>
                    </tbody>
                </VTable>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">

const personajesStore = usePersonajesStore();
const { obtenerPersonajes, eliminarPersonaje, setPersonajeActual } = personajesStore
const { personajes } = storeToRefs(personajesStore)

const irAlFormulario = (personaje: IPersonaje) => {
    setPersonajeActual(personaje);
    navigateTo('/formPersonaje');
};

onMounted(async () => await obtenerPersonajes())
</script>

<style scoped>

</style>