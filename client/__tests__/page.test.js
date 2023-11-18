import {GET, PUT, POST, DELETE} from '../app/api/page/route'
import {createServer} from 'http'
import request from 'supertest'

jest.mock('lib/redis')

let server

beforeAll(() => {
  server = createServer((req, res) => {
    const method = req.method
    if (method === 'GET') {
      GET(req, res)
    } else if (method === 'PUT') {
      PUT(req, res)
    } else if (method === 'POST') {
      POST(req, res)
    } else if (method === 'DELETE') {
      DELETE(req, res)
    }
  })
})

afterAll(() => {
  server.close()
})

describe('GET', () => {
  it('should return 404 if page not found', async () => {
    redis.hget.mockResolvedValue(null)
    const response = await request(server).get('/?projectId=1')
    expect(response.status).toBe(404)
  })

  // Add more tests for GET
})

describe('PUT', () => {
  it('should return 404 if project not found or does not belong to the user', async () => {
    redis.hexists.mockResolvedValue(0)
    const response = await request(server)
      .put('/')
      .send({userId: 1, projectId: 1, pageId: 1, newData: {}})
    expect(response.status).toBe(404)
  })

  // Add more tests for PUT
})

describe('POST', () => {
  it('should return 404 if project not found or does not belong to the user', async () => {
    redis.hexists.mockResolvedValue(0)
    const response = await request(server)
      .post('/')
      .send({userId: 1, projectId: 1, pageName: 'test'})
    expect(response.status).toBe(404)
  })

  // Add more tests for POST
})

describe('DELETE', () => {
  it('should return 404 if project not found or does not belong to the user', async () => {
    redis.hexists.mockResolvedValue(0)
    const response = await request(server)
      .delete('/')
      .send({userId: 1, projectId: 1, pageId: 1})
    expect(response.status).toBe(404)
  })

  // Add more tests for DELETE
})
