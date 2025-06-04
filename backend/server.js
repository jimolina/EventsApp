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

// POST /events
// This endpoint allows users to create a new event with title, description, latitude, and longitude.
// It validates the input and ensures latitude and longitude are in the correct range.
fastify.post('/events', async (request, reply) => {
  const { title, description, lat, lng } = request.body;

  if (!title || !description || lat === undefined || lng === undefined) {
    reply.code(400).send({ error: 'Missing required fields' });
    return;
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  if (
    isNaN(latNum) ||
    isNaN(lngNum) ||
    latNum < -90 ||
    latNum > 90 ||
    lngNum < -180 ||
    lngNum > 180
  ) {
    reply.code(400).send({ error: 'Invalid latitude or longitude values' });
    return;
  }

  const now = new Date();

  const newEvent = {
    title,
    description,
    lat: latNum,
    lng: lngNum,
    created_at: now,
    updated_at: now
  };

  const result = await fastify.mongo.db.collection('events_entries').insertOne(newEvent);
  reply.code(201).send({ ...newEvent, id: result.insertedId });
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
