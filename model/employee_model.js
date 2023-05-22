const { Validator } = require('jsonschema')
const validator = new Validator()

const employee_schema = {
  type: "object",
  properties: {    
    cpf: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' }
  },
  "required": ['cpf', 'name', 'email']
}

const validate_data_employee = (e) => {
  return validator.validate(e, employee_schema)
}

module.exports = { validate_data_employee }
