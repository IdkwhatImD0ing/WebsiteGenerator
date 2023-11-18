// Assuming your handlers are in a file called `pageHandlers.js`
import {GET, PUT, POST, DELETE} from '../app/api/page/route'
import redis from 'lib/redis'
import {v4 as uuidv4} from 'uuid'

// Mock the lib/redis module
jest.mock('lib/redis', () => ({
  hget: jest.fn(),
  hexists: jest.fn(),
  exists: jest.fn(),
  hset: jest.fn(),
  del: jest.fn(),
  hgetall: jest.fn(),
}))

// Mock the uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

// Helper function to simulate a Response object
const createResponse = (body, status) => {
  return {
    json: async () => body,
    status,
  }
}

describe('GET handler', () => {
  it('returns page data when the page is found', async () => {
    const fakePageData = {content: 'Page Content'}
    redis.hget.mockResolvedValue(JSON.stringify(fakePageData))

    const req = {
      url: 'http://localhost:3000/api/page?pageId=1&projectId=1',
    }

    const response = await GET(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({data: fakePageData})
  })

  it('returns 404 when the page is not found', async () => {
    redis.hget.mockResolvedValue(null)

    const req = {
      url: 'http://localhost:3000/api/page?pageId=1&projectId=1',
    }

    const response = await GET(req)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual({message: 'Page not found'})
  })

  // ... additional tests for error cases
})

describe('PUT handler', () => {
  // Assume the request body is parsed and passed as an argument to PUT
  it('updates page data successfully', async () => {
    redis.hexists.mockResolvedValue(1)
    redis.exists.mockResolvedValue(1)

    const req = {
      json: async () => ({
        userId: 'user123',
        projectId: 'project123',
        pageId: 'page123',
        newData: {content: 'Updated Content'},
      }),
    }

    const response = await PUT(req)
    const data = await response.json()

    const expectedData = await req.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({message: 'Page updated successfully'})
    expect(redis.hset).toHaveBeenCalledWith(
      'page:project123:page123',
      'data',
      JSON.stringify(expectedData.newData),
    )
  })

  // ... additional tests for error cases
})

describe('POST handler', () => {
  it('creates a new page successfully', async () => {
    redis.hexists.mockResolvedValue(1)
    uuidv4.mockReturnValue('new-uuid')

    const req = {
      json: async () => ({
        userId: 'user123',
        projectId: 'project123',
        pageName: 'New Page',
      }),
    }

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      pageId: 'new-uuid',
      message: 'Page created successfully',
    })
  })

  // ... additional tests for error cases
})

describe('DELETE handler', () => {
  it('deletes a page successfully', async () => {
    redis.hexists.mockResolvedValue(1)
    redis.exists.mockResolvedValue(1)

    const req = {
      json: async () => ({
        userId: 'user123',
        projectId: 'project123',
        pageId: 'page123',
      }),
    }

    const response = await DELETE(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({message: 'Page deleted successfully'})
    expect(redis.del).toHaveBeenCalledWith('page:project123:page123')
  })

  // ... additional tests for error cases
})
