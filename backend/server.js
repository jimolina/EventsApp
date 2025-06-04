import Fastify from 'fastify'
import fastifyMongo from '@fastify/mongodb'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
dotenv.config()

const fastify = Fastify({ logger: true })

// CORS Configuration
await fastify.register(cors, {
  origin: 'http://localhost:5173',
})

// MongoDB Plugin 
fastify.register(fastifyMongo, {
  forceClose: true,
  url: process.env.MONGODB_URI
})

// Simple GET /events
// This endpoint retrieves all events from the MongoDB collection 'events_entries'.
fastify.get('/events', async (request, reply) => {
  const collection = fastify.mongo.db.collection('events_entries')
  const events = await collection.find({}).toArray()
  return events
})

// Start Server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    fastify.log.info(`Server listening`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
