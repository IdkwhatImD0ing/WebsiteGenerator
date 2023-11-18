jest.mock('lib/redis')
// jest.setup.js or at the top of your test file
process.env.REDIS_HOST = 'localhost'
process.env.REDIS_PORT = '6379'
process.env.REDIS_PASSWORD = 'password'
process.env.REDIS_USERNAME = 'default'
