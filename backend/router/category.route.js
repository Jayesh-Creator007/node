const { store, index, update, trash } = require('../controller/category.controller')

const router = require('express').Router()

router.post('/',store)
router.get('/',index)
router.put('/:id',update)
router.delete('/:id',trash)

module.exports = router