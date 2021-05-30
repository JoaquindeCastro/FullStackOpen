const Blog = require('../models/Blog')

const initialBlogs = [
  {
    title:"Making sense of adoloscents",
    author:"Nicah Santos",
    url: "https://byrslf.co/making-sense-of-adolescents-2a98d69979c6",
    "user":"60b39939b672fd3830160431",
    likes:160
  },
  {
    title:"The Fibonacci sequence and the powers of two",
    author:"Joaquin de Castro",
    url: "https://www.cantorsparadise.com/the-powers-of-two-and-the-fibonacci-sequence-5938e7d95bf8",
    "user":"60b39939b672fd3830160431",
    likes:108
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {initialBlogs, blogsInDB}