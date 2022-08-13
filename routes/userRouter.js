const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/regin', userController.regin)
router.post('/login', userController.login)

module.exports = router