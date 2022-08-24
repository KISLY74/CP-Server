const Router = require('express')
const router = new Router()
const { CollectionController, collectionController } = require('../controllers/collectionController')

router.post('/create', collectionController.createCollection)
router.get('/get/all', collectionController.getCollections)
router.post('/getAllByUser', collectionController.getCollectionsByUser)
router.post('/getByIds', CollectionController.getCollectionsByIds)
router.put('/delete', collectionController.deleteCollection)
router.put('/edit', collectionController.editCollection)
router.put('/change/items', collectionController.changeItemsCollection)

module.exports = router