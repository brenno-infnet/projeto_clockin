const express = require('express')
const router = express.Router()

const employee_file_controller = require('../controller/employee_file_controller')

router.get('/', employee_file_controller.get_employees)
router.get('/:cpf', employee_file_controller.get_employee_by_cpf)
router.post('/add', employee_file_controller.add_employees)
router.put('/:cpf', employee_file_controller.update_employees)
router.delete('/:cpf', employee_file_controller.remove_employees)

module.exports = router