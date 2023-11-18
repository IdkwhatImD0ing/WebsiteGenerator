// __mocks__/lib/redis.js
const mockRedis = {
  on: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
  // ... and any other Redis methods you use
}

export default mockRedis
