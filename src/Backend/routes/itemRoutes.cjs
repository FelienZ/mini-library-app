const express = require('express');
const router = express.Router()
const itemController = require('../controller/itemController.cjs')

router.get('/', itemController.getBook)
router.post('/', itemController.addBook)
router.put('/:id', itemController.updateBook)
router.delete('/:id', itemController.deleteBook)

module.exports = router