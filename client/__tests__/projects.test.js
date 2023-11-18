import {POST, DELETE, GET} from '../app/api/projects/route'
import redis from 'lib/redis'
import http from 'http'
import {URL} from 'url'

jest.mock('../lib/redis')

describe('POST', () => {
  it('should create a project and return a successful response', async () => {
    const req = new http.IncomingMessage()
    req.json = jest
      .fn()
      .mockResolvedValue({userId: 'user1', projectName: 'project1'})
    const response = await POST(req)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty('projectId')
    expect(JSON.parse(response.body)).toHaveProperty('projectName', 'project1')
    expect(JSON.parse(response.body)).toHaveProperty(
      'message',
      'Project created successfully',
    )
  })

  it('should return 500 if there is an error creating the project', async () => {
    const req = new http.IncomingMessage()
    req.json = jest.fn().mockRejectedValue(new Error('Error creating project'))
    const response = await POST(req)
    expect(response.status).toBe(500)
  })
})

describe('DELETE', () => {
  it('should delete a project and return a successful response', async () => {
    redis.hexists.mockResolvedValue(1)
    redis.keys.mockResolvedValue([])
    const req = new http.IncomingMessage()
    req.json = jest
      .fn()
      .mockResolvedValue({projectId: 'project1', userId: 'user1'})
    const response = await DELETE(req)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty(
      'message',
      'Project and its pages deleted successfully',
    )
  })

  it('should return 404 if the project does not exist', async () => {
    redis.hexists.mockResolvedValue(0)
    const req = new http.IncomingMessage()
    req.json = jest
      .fn()
      .mockResolvedValue({projectId: 'project1', userId: 'user1'})
    const response = await DELETE(req)
    expect(response.status).toBe(404)
  })

  it('should return 500 if there is an error deleting the project', async () => {
    redis.hexists.mockResolvedValue(1)
    redis.keys.mockRejectedValue(new Error('Error deleting project'))
    const req = new http.IncomingMessage()
    req.json = jest
      .fn()
      .mockResolvedValue({projectId: 'project1', userId: 'user1'})
    const response = await DELETE(req)
    expect(response.status).toBe(500)
  })
})

describe('GET', () => {
  it('should return the projects for a user', async () => {
    redis.hgetall.mockResolvedValue({
      project1: 'project1',
      project2: 'project2',
    })
    const req = new http.IncomingMessage()
    req.url = new URL('http://localhost/?userId=user1')
    const response = await GET(req)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.body)).toEqual([
      {projectId: 'project1', projectName: 'project1'},
      {projectId: 'project2', projectName: 'project2'},
    ])
  })

  it('should return 400 if the userId is not provided', async () => {
    const req = new http.IncomingMessage()
    req.url = new URL('http://localhost/')
    const response = await GET(req)
    expect(response.status).toBe(400)
  })

  it('should return 404 if the user has no projects', async () => {
    redis.hgetall.mockResolvedValue(null)
    const req = new http.IncomingMessage()
    req.url = new URL('http://localhost/?userId=user1')
    const response = await GET(req)
    expect(response.status).toBe(404)
  })

  it('should return 500 if there is an error fetching the projects', async () => {
    redis.hgetall.mockRejectedValue(new Error('Error fetching user projects'))
    const req = new http.IncomingMessage()
    req.url = new URL('http://localhost/?userId=user1')
    const response = await GET(req)
    expect(response.status).toBe(500)
  })
})
