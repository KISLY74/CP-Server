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
}

module.exports = new ItemController()