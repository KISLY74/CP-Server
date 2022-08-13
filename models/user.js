const { Schema, model } = require('mongoose')

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }]
}, { versionKey: false })

module.exports = new model('User', User)