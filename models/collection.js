const { Schema, model } = require('mongoose')

const Collection = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String, required: true },
  items: [{ type: String, ref: 'Item' }]
}, { versionKey: false })

module.exports = new model('Collection', Collection)