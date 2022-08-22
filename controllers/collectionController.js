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
}

module.exports = new CollectionController()