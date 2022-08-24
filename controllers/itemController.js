const Collection = require("../models/collection")
const User = require("../models/user")
const Item = require("../models/item")

class ItemController {
  async createItem(req, res) {
    const { name, tags, id } = req.body
    const item = new Item({ name: name, tags: tags })
    item.save()
    await Collection.findOneAndUpdate({ _id: id }, { $push: { items: item._id } })
    return res.json(item)
  }
  async deleteItem(req, res) {
    const result = await Item.deleteOne({ _id: req.body.id })
    return res.json(result)
  }
  async getAllItems(req, res) {
    const items = await Item.find()
    return res.json(items)
  }
  async getItemsByCollection(req, res) {
    const collection = await Collection.findOne({ _id: req.body.id })
    const items = await ItemController.getItemsByIds(collection.items)
    return res.json(items)
  }
  static async getItemsByIds(ids) {
    const items = await Item.find({ _id: { $in: ids } })
    return items
  }
  async editItem(req, res) {
    const item = await Item.findOneAndUpdate({ _id: req.body.id }, { name: req.body.name, tags: req.body.tags })
    return res.json(item)
  }
}

const itemController = new ItemController()
module.exports = { itemController, ItemController }