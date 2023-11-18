import {GET} from '../app/api/pages/route'
import redis from 'lib/redis'
import http from 'http'
import {URL} from 'url'

jest.mock('lib/redis')

describe('GET', () => {
  it('should return 404 if no pages found for the project', async () => {
    redis.hgetall.mockResolvedValue(null)
    const req = new http.IncomingMessage()
    req.url = new URL('http://localhost/?projectId=1')
    const response = await GET(req)
    expect(response.status).toBe(404)
  })

  it('should return 200 and the pages if pages found for the project', async () => {
    redis.hgetall.mockResolvedValue({uuid1: 'page1', uuid2: 'page2'})
    const req = new http.IncomingMessage()
    req.url = new URL('http://localhost/?projectId=1')
    const response = await GET(req)
    expect(response.status).toBe(200)
    expect(JSON.parse(response.body)).toEqual([
      {uuid: 'uuid1', name: 'page1'},
      {uuid: 'uuid2', name: 'page2'},
    ])
  })

  it('should return 500 if there is an error fetching pages', async () => {
    redis.hgetall.mockRejectedValue(new Error('Error fetching pages'))
    const req = new http.IncomingMessage()
    req.url = new URL('http://localhost/?projectId=1')
    const response = await GET(req)
    expect(response.status).toBe(500)
  })
})
