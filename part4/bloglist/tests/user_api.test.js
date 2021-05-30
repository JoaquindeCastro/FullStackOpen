const config = require('../utils/config')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({username:{$ne:config.TEST_USER_NAME}}).exec()
})

describe('POST', () => {
  test('Request with username length < 3 is rejected', async () => {
    const oldCount = await User.countDocuments()
    const newUser = {
      name:"joaquin",
      username:"jd",
      password:"4g54g5ggr43f3"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newCount = await User.countDocuments()

    expect(newCount).toEqual(oldCount)
  })
})

afterAll(() => {
  mongoose.connection.close()
})