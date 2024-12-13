import { connect} from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
    const runtimeConfig = useRuntimeConfig()

    await connect(runtimeConfig.MONGODB_URI)
    console.log('Connected to MongoDB')
})