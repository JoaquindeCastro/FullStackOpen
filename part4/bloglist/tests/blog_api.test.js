const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const helper = require('./test_helper.js')
const config = require('../utils/config')

const api = supertest(app)

jest.setTimeout(30000)

let token

beforeAll( async () => {
  const res = await api
    .post('/api/login')
    .send({
      username:config.TEST_USER_NAME,
      password:config.TEST_USER_PWD
    })
  token = res.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET',() => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('Blogs have unique identifier named id', async () => {
    (await api.get('/api/blogs')).body.map(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).not.toBeDefined()
    })
    
  })
})

describe('POST', () => {
  test('Unauthorized request is rejected', async () => {
    const newBlog = {
      title:"What my students taught me about love",
      author:"Nicah Santos",
      url: "https://byrslf.co/what-my-students-taught-me-about-love-7296f0662c54",
      likes:308
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
    expect(titles).not.toContain(
      'What my students taught me about love'
    )
  })

  test('Authorized request with a valid blog can be added', async () => {
    const newBlog = {
      title:"What my students taught me about love",
      author:"Nicah Santos",
      url: "https://byrslf.co/what-my-students-taught-me-about-love-7296f0662c54",
      likes:308
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'What my students taught me about love'
    )
  })
  
  test('Request with empty likes value defaults it to 0', async () => {
    const newBlog = {
      _id: "60af8cf64b7f3ed1e1725be0",
      title:"No one likes me :(",
      author:"Unliked Author",
      url: "https://stallionpub.wordpress.com/2021/02/19/nyt-as-technology-moves-forward-we-forget-to-look-back/"
    }
  
    response = await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
      .send(newBlog)
  
    expect(response.body.likes).toEqual(0)
  })
  
  test('Request with no title and url is rejected', async () => {
    const newBlog = {
      author:"Joaquin de Castro",
      likes:0
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('DELETE', () => {
  test('Request with valid ID succeeds', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    const res = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization',`Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('PUT', () => {
  test('Request to update likes', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes+=1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd[0].likes).toEqual(blogToUpdate.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})