const {Validator} = require('jsonschema')
const validator = new Validator()

const clock_schema = {    
    type: "object",
    properties: {
        id: {type: 'string'},
        workday_id: {type: 'string'},
        dtime: {type: 'string'},       
    },
    "required": ['workday_id','dtime']
  }

  const validate_data_clock = (e)=>{
    return validator.validate(e,clock_schema)
  }

  module.exports= {validate_data_clock}
