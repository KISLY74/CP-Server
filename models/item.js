const { Schema, model } = require('mongoose')

const Item = new Schema({
  name: { type: String, required: true },
  tags: [{ type: String, required: true }],
  dateAddition: { type: Date }
}, { versionKey: false })

module.exports = new model('Item', Item)