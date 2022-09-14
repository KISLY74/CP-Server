const { Schema, model } = require('mongoose')

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
  status: { type: String, required: true },
  collections: [{ type: String, ref: 'Collection' }],
  likes: [{ type: String }]
}, { versionKey: false })

module.exports = new model('User', User)