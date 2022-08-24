const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')

router.post('/create', itemController.createItem)
router.put('/delete', itemController.deleteItem)
router.get('/get/all', itemController.getAllItems)

module.exports = router