const {Validator} = require('jsonschema')
const validator = new Validator()

const company_schema = {    
    type: "object",
    properties: {        
        cnpj: {type: 'string'},
        name: {type: 'string'},          
    },
    "required": ['cnpj', 'name']
  }

  const validate_data_company = (e)=>{
    return validator.validate(e, company_schema)
  }

  module.exports= {validate_data_company}
