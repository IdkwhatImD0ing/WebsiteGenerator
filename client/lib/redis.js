import Redis from 'ioredis'
const client = new Redis({
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
})

client.on('error', (err) => console.log('Redis Client Error', err))

export default client
