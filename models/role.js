const { Schema, model } = require("mongoose")

const Role = new Schema({
  value: { type: String, unique: true, default: 'USER' },
}, { versionKey: false })

module.exports = new model('Role', Role)