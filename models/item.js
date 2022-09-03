const { Schema, model } = require('mongoose')

const Item = new Schema({
  name: { type: String, required: true },
  tags: [{ type: String, required: true }],
  dateAddition: { type: Date },
  comments: [{ type: Object }],
  isAccess: { type: Boolean, default: true }
}, { versionKey: false })

const ItemM = new model('ItemM', Item)
module.exports = { ItemM, Item }