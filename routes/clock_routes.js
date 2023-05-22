const express = require('express')
const router = express.Router()

const clock_file_controller = require('../controller/clock_file_controller')

router.get('/', clock_file_controller.get_clocks)
router.get('/:id', clock_file_controller.get_clocks_by_id)
router.post('/add', clock_file_controller.add_clocks)
router.put('/:id', clock_file_controller.update_clocks)
router.delete('/:id', clock_file_controller.remove_clocks)

module.exports = router