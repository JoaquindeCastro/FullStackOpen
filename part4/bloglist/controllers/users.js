const User = require('../models/user')
const router = require('express').Router()
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

router.post('/', async (req, res) => {
  const newUser = req.body

  if (newUser.password < 3){
    return res.status(400).json({error:"Password should be at least 3 characters"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds)

  const user = new User({
    username:newUser.username,
    name:newUser.name,
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = router
