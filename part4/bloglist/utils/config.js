require('dotenv').config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET
const MONGO_URI = process.env.NODE_ENV !== 'test'
? process.env.MONGO_URI
: process.env.TEST_MONGO_URI

module.exports = {
  MONGO_URI,
  PORT,
  SECRET,
  TEST_USER_NAME:process.env.TEST_USER_NAME,
  TEST_USER_PWD:process.env.TEST_USER_PWD
}