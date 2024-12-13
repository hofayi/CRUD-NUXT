import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as  directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        ssr: true, //acepta los componentes de vuetify como html - server side rendering
        theme: {
            defaultTheme: 'dark'
        }
    })
    nuxtApp.vueApp.use(vuetify)
})