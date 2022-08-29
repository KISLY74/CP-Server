const { Schema, model } = require('mongoose')

const Collection = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String, required: true },
  items: [{ type: String, ref: 'Item' }],
  stringsFields: [{ type: String }],
  numbersFields: [{ type: String }],
  booleansFields: [{ type: String }],
  datesFields: [{ type: String }]
}, { versionKey: false })

module.exports = new model('Collection', Collection)