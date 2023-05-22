const express = require('express')
const router = express.Router()

const company_file_controller = require('../controller/company_file_controller')

router.get('/', company_file_controller.get_company)
router.get('/cnpj', company_file_controller.get_company_by_cnpj)
router.post('/add', company_file_controller.add_company)
router.put('/:cnpj', company_file_controller.update_company)
router.delete('/:cnpj', company_file_controller.remove_company)

module.exports = router