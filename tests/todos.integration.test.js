const { GenericContainer } = require("testcontainers");
const request = require('supertest')
const app = require('../app')

describe('Get Todos', () => {
  it('should return all todos', async () => {
    const res = await request(app)
      .get('/api/todos')
    console.log(res)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('post')
  })
})