const Router = require('express')
const router = new Router()
const { itemController, ItemController } = require('../controllers/itemController')

router.post('/create', itemController.createItem)
router.put('/delete', itemController.deleteItem)
router.get('/get/all', itemController.getAllItems)
router.post('/getAllByCollection', itemController.getItemsByCollection)
router.post('/getAllByIds', ItemController.getItemsByIds)

module.exports = router