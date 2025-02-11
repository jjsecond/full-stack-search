import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { routerV1 } from 'routes/routesV1'

dotenv.config()
if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB')
}

const PORT = process.env.PORT || 3001
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')

const app = express()

app.use(cors())
app.use(express.json())

// Adds a simple versioning for routes to enable later api updates in different versions and so that clients can be slowly transitioned to new versions should the need arise
app.use(`/v1`, routerV1)

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
})
