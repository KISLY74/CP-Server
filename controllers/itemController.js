const Collection = require("../models/collection")
const User = require("../models/user")
const { ItemM, Item } = require("../models/item")

class ItemController {
  async createItem(req, res) {
    const { name, tags, id, additionalFields } = req.body
    let fieldsSchema = {}, fieldsCreate = {}, types = ["string", "number", "boolean", "date"]
    for (let i = 0; i < additionalFields.length; i++) {
      for (let key in additionalFields[i]) {
        fieldsSchema[key] = types[i]
        fieldsCreate[key] = additionalFields[i][key]
      }
    }
    Item.add(fieldsSchema)
    const item = new ItemM({ name: name, tags: tags, dateAddition: Date.now(), ...fieldsCreate })
    item.save()
    await Collection.findOneAndUpdate({ _id: id }, { $push: { items: item._id } })
    return res.json(item)
  }
  async deleteItem(req, res) {
    const result = await ItemM.deleteOne({ _id: req.body.id })
    return res.json(result)
  }
  async getAllItems(req, res) {
    const items = await ItemM.find()
    return res.json(items)
  }
  async getItemsByCollection(req, res) {
    const collection = await Collection.findOne({ _id: req.body.id })
    const items = await ItemController.getItemsByIds(collection.items)
    return res.json(items)
  }
  static async getItemsByIds(ids) {
    const items = await ItemM.find({ _id: { $in: ids } })
    return items
  }
  async editItem(req, res) {
    let obj = {}
    Object.keys(req.body.fields).map((e, i) => {
      if (i > 1) obj[e] = "string"
    })
    Item.add(obj)
    const item = await ItemM.findOneAndUpdate({ _id: req.body.id }, req.body.fields)
    return res.json(item)
  }
  async getItem(req, res) {
    const item = await ItemM.findOne({ _id: req.body.id })
    return res.json(item)
  }
}

const itemController = new ItemController()
module.exports = { itemController, ItemController }