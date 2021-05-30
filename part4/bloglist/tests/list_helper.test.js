const listHelper = require('../utils/list_helper')

// Test data

const listWithOneBlog = [
  {
    _id: "60adfe2b9be0b16e4587729f",
    title:"Graphing the SIR model with Python",
    author:"Joaquin de Castro",
    url: "https://pub.towardsai.net/graphing-the-sir-model-with-python-e3cd6edb20de",
    likes:138
  }
]

const listWithMultipleBlogs = [
  {
    _id: "60adfef070bdf8e85f62de3f",
    title:"Making sense of adoloscents",
    author:"Nicah Santos",
    url: "https://byrslf.co/making-sense-of-adolescents-2a98d69979c6",
    likes:160
  },
  {
    _id: "60adff114875eb340e679811",
    title:"The Fibonacci sequence and the powers of two",
    author:"Joaquin de Castro",
    url: "https://www.cantorsparadise.com/the-powers-of-two-and-the-fibonacci-sequence-5938e7d95bf8",
    likes:108
  }
]

const listWithOneBlogForAuthor = listWithMultipleBlogs

const listWithMultipleBlogsForAuthor = [
  {
    _id: "60adfe2b9be0b16e4587729f",
    title:"Graphing the SIR model with Python",
    author:"Joaquin de Castro",
    url: "https://pub.towardsai.net/graphing-the-sir-model-with-python-e3cd6edb20de",
    likes:138
  },
  {
    _id: "60adfe3a38b5c39b82a66a18",
    title:"Primes and the powers of two",
    author:"Joaquin de Castro",
    url: "https://www.cantorsparadise.com/primes-and-the-powers-of-two-600a1069b744",
    likes:64
  },
  {
    _id: "60adfef070bdf8e85f62de3f",
    title:"Making sense of adoloscents",
    author:"Nicah Santos",
    url: "https://byrslf.co/making-sense-of-adolescents-2a98d69979c6",
    likes:160
  },
  {
    _id: "60adff114875eb340e679811",
    title:"The Fibonacci sequence and the powers of two",
    author:"Joaquin de Castro",
    url: "https://www.cantorsparadise.com/the-powers-of-two-and-the-fibonacci-sequence-5938e7d95bf8",
    likes:108
  },
  {
    _id: "60adff189a5aae683c450d92",
    title:"What my students taught me about love",
    author:"Nicah Santos",
    url: "https://byrslf.co/what-my-students-taught-me-about-love-7296f0662c54",
    likes:308
  },
]

const listWithMultipleBlogsFavorite = listWithMultipleBlogs[0]

test('Dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Return total likes', () => {

  test('List with only one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(138)
  })

  test('List with multiple blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(268)
  })
})

describe('Return favorite blog', () => {

  test('List with only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('List with multiple blogs', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(listWithMultipleBlogsFavorite)
  })
})

describe('Return author with most blogs', () => {
  test('List with multiple blogs for each author', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogsForAuthor)
    const expected = {author:"Joaquin de Castro",blogs:3}
    expect(result).toEqual(expected)
  })
})

describe('Return author with most likes', () => {
  test('List with one blog for each author', () => {
    const result = listHelper.mostLikes(listWithOneBlogForAuthor)
    const expected = { author: 'Nicah Santos', likes: 160 }
    expect(result).toEqual(expected)
  })
  test('List with multiple blogs for each author', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogsForAuthor)
    const expected = { author: 'Nicah Santos', likes: 468 }
    expect(result).toEqual(expected)
  })
})