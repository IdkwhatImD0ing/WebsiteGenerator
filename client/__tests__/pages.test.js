// __tests__/getPages.test.js
import {GET} from '../app/api/pages/route'
import redis from 'lib/redis'

// Mock the lib/redis module
jest.mock('lib/redis', () => ({
  hgetall: jest.fn(),
}))

describe('GET pages', () => {
  it('returns pages when found', async () => {
    // Mock Redis hgetall to return a fake pages object
    redis.hgetall.mockResolvedValue({
      uuid1: 'Page 1',
      uuid2: 'Page 2',
    })

    // Mock Request URL
    const req = {
      url: 'http://localhost:3000/api/pages?projectId=test-project',
    }

    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toEqual([
      {uuid: 'uuid1', name: 'Page 1'},
      {uuid: 'uuid2', name: 'Page 2'},
    ])
    expect(redis.hgetall).toHaveBeenCalledWith('project:test-project:pages')
  })

  it('returns 404 when no pages are found', async () => {
    // Mock Redis hgetall to return null
    redis.hgetall.mockResolvedValue(null)

    // Mock Request URL
    const req = {
      url: 'http://localhost:3000/api/pages?projectId=test-project',
    }

    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(404)
    expect(data).toEqual({message: 'No pages found for this project'})
    expect(redis.hgetall).toHaveBeenCalledWith('project:test-project:pages')
  })

  // Add more tests for error handling, etc.
})
