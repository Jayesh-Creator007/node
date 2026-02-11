const { store, index } = require('../controller/user.controller')

const router = require('express').Router()

router.post('/',store)
router.get('/',index)

module.exports = router