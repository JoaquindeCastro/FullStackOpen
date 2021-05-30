const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  // Create blog
  const blog = new Blog(request.body)
  blog.user = user.id
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  return response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // Check if user is also user that posted blog
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)
  console.log(blogToDelete)
  if (user.id.toString() !== blogToDelete.user.toString()){
    response.status(403).end()
  }
  const result = await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).json(result)
})

blogsRouter.put('/:id',async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {new:true, runValidators:true})
  response.status(204).json(result)
})

module.exports = blogsRouter