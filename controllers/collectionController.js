const Collection = require("../models/collection")
const User = require("../models/user")

class CollectionController {
  async createCollection(req, res) {
    const { name, description, theme, email } = req.body
    const collection = new Collection({ name: name, description: description, theme: theme })
    collection.save()
    await User.findOneAndUpdate({ email: email }, { $push: { collections: collection._id } })
    return res.json(collection)
  }
  async getCollections(req, res) {
    const collections = await Collection.find()
    return res.json(collections)
  }
  async getCollectionsByUser(req, res) {
    const user = await User.findOne({ email: req.body.email })
    const collections = await CollectionController.getCollectionsByIds(user.collections)
    return res.json(collections)
  }
  static async getCollectionsByIds(ids) {
    const collections = await Collection.find({ _id: { $in: ids } })
    return collections
  }
  async deleteCollection(req, res) {
    const result = await Collection.deleteOne({ _id: req.body.id })
    return res.json(result)
  }
  async editCollection(req, res) {
    const collection = await Collection.findOneAndUpdate({ _id: req.body.id }, { name: req.body.name, description: req.body.description, theme: req.body.theme })
    return res.json(collection)
  }
  async changeItemsCollection(req, res) {
    const result = await Collection.findOneAndUpdate({ _id: req.body.id }, { items: req.body.items })
    return res.json(result)
  }
  async addAdditionalFields(req, res) {
    const result = await Collection.findOneAndUpdate({ _id: req.body.id },
      {
        $push:
        {
          stringsFields: req.body.stringsFields,
          numbersFields: req.body.numbersFields,
          booleansFields: req.body.booleansFields,
          datesFields: req.body.datesFields
        }
      })
    return res.json(result)
  }
  async getAdditionalFields(req, res) {
    const collection = await Collection.findOne({ _id: req.body.id })
    return res.json(collection)
  }
}

const collectionController = new CollectionController()
module.exports = { collectionController, CollectionController }