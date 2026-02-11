const { store, index, update, trash } = require('../controller/task.controller')
const { verifyuser, verifyRole } = require('../middleware/verify')

const router = require('express').Router()

router.post('/',verifyuser, verifyRole(["admin", "user"]),store)
router.get('/',index)
router.put('/:id',update)
router.delete('/:id',trash)

module.exports = router