const express = require('express')
const router = express.Router()

const workday_file_controller = require('../controller/workday_file_controller')

router.get('/', workday_file_controller.get_workdays)
router.get('/:id', workday_file_controller.get_workdays_by_id)
router.post('/add', workday_file_controller.add_workdays)
router.put('/:id', workday_file_controller.update_workdays)
router.delete('/:id', workday_file_controller.remove_workdays)

module.exports = router