const router  = require('express').Router()
const auth = require('../middleware/auth')
const categoryController = require('../controllers/categoryController')
router.post('/add',auth,categoryController.addCategory)
router.get('/',categoryController.showAllcategory)
module.exports = router