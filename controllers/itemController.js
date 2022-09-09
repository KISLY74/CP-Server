const Collection = require("../models/collection")
const User = require("../models/user")
const { ItemM, Item } = require("../models/item")

class ItemController {
  async createItem(req, res) {
    const { name, tags, id, additionalFields } = req.body
    let fieldsSchema = {}, fieldsCreate = {}, types = ["string", "number", "boolean", "date", "string"]
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
    const { id, name, tags, additionalFields } = req.body
    let fieldsSchema = {}, fieldsEdit = {}, types = ["string", "number", "boolean", "date", "string"]
    for (let i = 0; i < additionalFields.length; i++) {
      for (let key in additionalFields[i]) {
        fieldsSchema[key] = types[i]
        fieldsEdit[key] = additionalFields[i][key]
      }
    }
    Item.add(fieldsSchema)
    const item = await ItemM.findOneAndUpdate(
      { _id: id },
      { name: name, tags: tags, ...fieldsEdit }
    )
    return res.json(item)
  }
  async getItem(req, res) {
    const item = await ItemM.findOne({ _id: req.body.id })
    return res.json(item)
  }
  async addComment(req, res) {
    const item = await ItemM.findOneAndUpdate({ _id: req.body.id }, { $push: { comments: req.body.comment } })
    return res.json(item)
  }
  async getComments(req, res) {
    const item = await ItemM.findOne({ _id: req.body.id })
    return res.json(item.comments)
  }
  async openAccessToView(req, res) {
    const item = await ItemM.findOneAndUpdate({ _id: req.body.id }, { isAccess: true })
    return res.json(item)
  }
  async closeAccessToView(req, res) {
    const item = await ItemM.findOneAndUpdate({ _id: req.body.id }, { isAccess: false })
    return res.json(item)
  }
  async getDataAccess(req, res) {
    const item = await ItemM.findOne({ _id: req.body.id })
    return res.json(item.isAccess)
  }
  async addLike(req, res) {
    const item = await ItemM.findOneAndUpdate({ _id: req.body.id }, { $push: { likes: req.body.userIsLike } })
    return res.json(item)
  }
  async getCountLikesByItem(req, res) {
    const item = await ItemM.findOne({ _id: req.body.id })
    let count = 0
    item.likes.map(e => {
      Object.values(e).map(val => {
        if (val === true) count++
      })
    })
    return res.json(count)
  }
}

const itemController = new ItemController()
module.exports = { itemController, ItemController }