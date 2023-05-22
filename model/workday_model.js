const {Validator} = require('jsonschema')
const validator = new Validator()

const workdays = {    
    type: "object",
    properties: {
        id: {type: 'string'},              
        cnpj: {type: 'string'},
        cpf: {type: 'string'},
        workdays_of_the_week:{
          monday: {
            start_of_work: {type: 'string'},
            end_of_work: {type: 'string'},
            rest_day: {type: 'boolean'}
          },
          tuesday: {
            start_of_work: {type: 'string'},
            end_of_work: {type: 'string'},
            rest_day: {type: 'boolean'}
          },
          wednesday: {
            start_of_work: {type: 'string'},
            end_of_work: {type: 'string'},
            rest_day: {type: 'boolean'}
          },
          thursday: {
            start_of_work: {type: 'string'},
            end_of_work: {type: 'string'},
            rest_day: {type: 'boolean'}
          },
          friday: {
            start_of_work: {type: 'string'},
            end_of_work: {type: 'string'},
            rest_day: {type: 'boolean'}
          },
          saturday: {
            start_of_work: {type: 'string'},
            end_of_work: {type: 'string'},
            rest_day: {type: 'boolean'}
          },
          sunday: {
            start_of_work: {type: 'string'},
            end_of_work: {type: 'string'},
            rest_day: {type: 'boolean'}
          }
        }
    },
    "required": ['cnpj', 'cpf', 'workdays_of_the_week']
  }

  const validate_data_workdays = (e)=>{
    return validator.validate(e,workdays)
  }

  module.exports= {validate_data_workdays}
