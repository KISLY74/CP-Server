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
}

const collectionController = new CollectionController()
module.exports = { collectionController, CollectionController }