const { toPairs } = require('lodash');
const _ = require('lodash');
const { identical } = require('lodash/fp');
const compose = require('lodash/fp/compose')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    const reducer = (total_likes, blog) => total_likes + blog.likes
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer,0)
}

const mostBlogs = (blogs) => {
    const countByAuthor = _.countBy(blogs, blog => blog.author)
    const maxAuthor = _.maxBy(Object.keys(countByAuthor), author => countByAuthor[author])
    return {author:maxAuthor, blogs:countByAuthor[maxAuthor]}
}

const mostLikes = (blogs) => {
    const maxLikes = _(blogs)
    .groupBy("author")
    .map(group => ({author:group[0].author, likes:_.sumBy(group, "likes")}))
    .maxBy("likes")
    return maxLikes
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => blog.likes > favorite.likes ? blog : favorite
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer,blogs[0])
}

module.exports = { dummy, totalLikes, mostBlogs, mostLikes, favoriteBlog }
