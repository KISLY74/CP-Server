const Router = require('express')
const router = new Router()
const collectionController = require('../controllers/collectionController')

router.post('/create', collectionController.createCollection)
router.get('/get/all', collectionController.getCollections)

module.exports = router