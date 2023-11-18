// Assuming your handlers are in a file called `projectHandlers.js`
import {POST, DELETE, GET} from '../app/api/projects/route'
import redis from 'lib/redis'
import {v4 as uuidv4} from 'uuid'

// Mock the lib/redis module
jest.mock('lib/redis', () => ({
  hset: jest.fn(),
  hdel: jest.fn(),
  hexists: jest.fn(),
  keys: jest.fn(),
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

describe('POST handler for creating a project', () => {
  it('creates a project successfully', async () => {
    const fakeProjectId = 'project-id'
    uuidv4.mockReturnValue(fakeProjectId)
    const fakeProjectName = 'Project Name'

    const req = {
      json: async () => ({
        userId: 'user123',
        projectName: fakeProjectName,
      }),
    }

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      projectId: fakeProjectId,
      projectName: fakeProjectName,
      message: 'Project created successfully',
    })

    expect(redis.hset).toHaveBeenCalledWith(
      'projects',
      fakeProjectId,
      fakeProjectName,
    )
    expect(redis.hset).toHaveBeenCalledWith(
      `user:user123:projects`,
      fakeProjectId,
      fakeProjectName,
    )
  })

  // ... additional tests for error cases
})

describe('DELETE handler for deleting a project', () => {
  it('deletes a project and its pages successfully', async () => {
    const fakeProjectId = 'project-id'
    redis.hexists.mockResolvedValue(1)
    redis.keys.mockResolvedValue(['page:project-id:1', 'page:project-id:2'])

    const req = {
      json: async () => ({
        userId: 'user123',
        projectId: fakeProjectId,
      }),
    }

    const response = await DELETE(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      message: 'Project and its pages deleted successfully',
    })

    expect(redis.hdel).toHaveBeenCalledWith('projects', fakeProjectId)
    expect(redis.hdel).toHaveBeenCalledWith(
      `user:user123:projects`,
      fakeProjectId,
    )
    expect(redis.del).toHaveBeenCalledTimes(2)
  })

  // ... additional tests for error cases
})

describe('GET handler for fetching projects of a user', () => {
  it('fetches user projects successfully', async () => {
    const fakeUserId = 'user123'
    const fakeProjects = {
      'project-id-1': 'Project 1',
      'project-id-2': 'Project 2',
    }
    redis.hgetall.mockResolvedValue(fakeProjects)

    const req = {
      url: `http://localhost/api/projects?userId=${fakeUserId}`,
    }

    const response = await GET(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual([
      {projectId: 'project-id-1', projectName: 'Project 1'},
      {projectId: 'project-id-2', projectName: 'Project 2'},
    ])
  })

  it('returns 400 if user ID is not provided', async () => {
    const req = {
      url: `http://localhost/api/projects`,
    }

    const response = await GET(req)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data).toEqual({message: 'User ID is required'})
  })

  it('returns 404 if no projects are found for the user', async () => {
    const fakeUserId = 'user123'
    redis.hgetall.mockResolvedValue(null)

    const req = {
      url: `http://localhost/api/projects?userId=${fakeUserId}`,
    }

    const response = await GET(req)

    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data).toEqual({message: 'No projects found for this user'})
  })

  // ... additional tests for error cases
})
