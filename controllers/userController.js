const User = require('../models/user')
const Role = require('../models/role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  )
}

class UserController {
  async regin(req, res) {
    let { email, password, username } = req.body
    if (!email || !password || !username) {
      return res.status(404).json({ message: "Заполните пустые поля" })
    }
    const candidate = await User.findOne({ email: email })
    if (candidate)
      return res.status(404).json({ message: "Пользователь с таким email уже существует" })
    password = password.toString()
    const hashPassword = await bcrypt.hash(password.toString(), 5)
    const userRole = await Role.findOne({ value: "USER" })
    const user = new User({ email: email, password: hashPassword, username: username, roles: [userRole.value] })
    await user.save()
    const token = generateJwt(user._id, user.email)
    return res.json({ token })
  }
  async login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(500).json({ message: "Пользователь не найден" })
    }
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return res.status(500).json({ message: "Указан неверный пароль" })
    }
    const token = generateJwt(user._id, user.email)
    return res.json({ token })
  }
  async check(req, res) {
    const token = generateJwt(req.user._id, req.user.email)
    return res.json({ token })
  }
  async getUsers(req, res) {
    const users = await User.find()
    return res.json(users)
  }
  async getUserByEmail(req, res) {
    const user = await User.findOne({ email: req.body.email })
    return res.json(user)
  }
  async changeStatus(req, res) {
    const user = await User.findOneAndUpdate({ email: req.body.email }, { status: req.body.status })
    return res.json(user)
  }
  async deleteUser(req, res) {
    const user = await User.deleteOne({ email: req.body.email })
    return res.json(user)
  }
}

module.exports = new UserController()