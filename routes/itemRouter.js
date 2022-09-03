const Router = require('express')
const router = new Router()
const { itemController, ItemController } = require('../controllers/itemController')

router.post('/create', itemController.createItem)
router.put('/delete', itemController.deleteItem)
router.get('/get/all', itemController.getAllItems)
router.post('/getAllByCollection', itemController.getItemsByCollection)
router.post('/getAllByIds', ItemController.getItemsByIds)
router.put('/edit', itemController.editItem)
router.post('/get', itemController.getItem)
router.put('/add/comment', itemController.addComment)
router.post('/get/comments', itemController.getComments)
router.post('/access/open', itemController.openAccessToView)
router.post('/access/close', itemController.closeAccessToView)
router.post('/access/get', itemController.getDataAccess)

module.exports = router