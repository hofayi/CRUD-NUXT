<template>
    <VContainer class="centrar">
        <VCard width="450" class="ma-auto">
            <VCardTitle class="text-center">
                {{ tituloForm }}
            </VCardTitle>
            <VCardText>
                <VForm @submit.prevent="procesarForm">
                    <VTextField v-model="fields.name" label="Name" variant="outlined" />
                    <VTextField v-model="fields.image" label="Image" variant="outlined" />
                    <VTextField v-model="fields.status" label="Status" variant="outlined" />
                    <VTextField v-model="fields.species" label="Species" variant="outlined" />
                    <VTextField v-model="fields.gender" label="Gender" variant="outlined" />
                    <VTextField v-model="fields.origin" label="Origin" variant="outlined" />
                    <VTextField v-model="fields.location" label="Location" variant="outlined" />
                    <VTextField v-model="fields.episode" label="Episode" variant="outlined" />
                    <VTextField v-model="fields.url" label="Url" variant="outlined" />
                    <VTextField v-model="fields.created" label="Created" variant="outlined" />
                    <VBtn type="submit" color="primary" variant="tonal" :loading="loading" block>Guardar</VBtn>
                    <VBtn class="mt-2" color="secondary" variant="tonal" @click="navigateTo('/')" block>Cancelar</VBtn>
                </VForm>
            </VCardText>
        </VCard>
    </VContainer>
</template>

<script setup>

const personajeStore = usePersonajesStore()
const { agregarPersonaje, editarPersonaje } = personajeStore
const { personajeActual } = storeToRefs(personajeStore)

const fields = reactive({
    name: personajeActual.value ? personajeActual.value.name : '',
    image: personajeActual.value ? personajeActual.value.image : '',
    status: personajeActual.value ? personajeActual.value.status : '',
    species: personajeActual.value ? personajeActual.value.species : '',
    gender: personajeActual.value ? personajeActual.value.gender : '',
    origin: personajeActual.value ? personajeActual.value.origin : '',
    location: personajeActual.value ? personajeActual.value.location : '',
    episode: personajeActual.value ? personajeActual.value.episode : '',
    url: personajeActual.value ? personajeActual.value.url : '',
    created: personajeActual.value ? personajeActual.value.created : '',
})


const loading = ref(false)
const procesarForm = async () => {
    loading.value = true
    if(personajeActual.value) {
        await editarPersonaje({...fields, _id: personajeActual.value._id})
    }
    else{
        await agregarPersonaje(fields)
    }
    loading.value = false
    navigateTo('/')
}

const tituloForm = computed(() => {
    return personajeActual.value ? 'Editar Personaje' : 'Agregar Personaje'
})

</script>

<style scoped>
.centrar {
    display: flex;
    align-items: center;
    height: 80vh;
}
</style>