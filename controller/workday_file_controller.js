const {v4:uuidv4} = require('uuid')
const { company, check_company_by_cnpj } = require('./company_file_controller')
const { employee, check_employee_by_cpf } = require('./employee_file_controller')
const { validate_data_workdays } = require('../model/workday_model')

const fs = require('fs')

//GET
function get_workdays_promise() {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/workdays.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        let workdays = JSON.parse(data)
        resolve(workdays)
      }
    })
  })
}

//GET
function get_workdays_by_id_promise(id) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/workdays.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        let workdays = JSON.parse(data)
        const index = workdays.findIndex(e => e.id === id)
        if (index == -1){
          reject({})
        } else {          
          resolve(workdays[index])
        }        
      }
    })
  })
}

const get_workdays = (req, res) => {
  get_workdays_promise()
    .then(workdays => res.status(200).json(workdays))
    .catch(err => res.status(500).send(err.message));
}

const get_workdays_by_id = (req, res) => {
  const id = req.params.id
  get_workdays_by_id_promise(id)
    .then(workdays => res.status(200).json(workdays))
    .catch(err => res.status(500).send(err.message));
}

//POST
function add_workdays_promise(cpf, cnpj, workday) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/workdays.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        let workdays_list = JSON.parse(data)
        const index = workdays_list.findIndex(e => e.cpf === cpf && e.cnpj === cnpj)

        if (!index === -1) {
          reject(new Error('Workday already exists!'))
        } else {
          const id = uuidv4()                   
          const workday_new = { id, ...workday }

          workdays_list.push(workday_new)

          fs.writeFile('./model/workdays.json', JSON.stringify(workdays_list), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(workday_new);
            }
          })
        }
      }
    })
  })
}

async function add_workdays(req, res){
  const workday = req.body
  const cpf = req.body.cpf
  const cnpj = req.body.cnpj

  const valid_result = validate_data_workdays(workday)

  if (!valid_result.valid) {
    return res.status(400).json({ message: 'Invalid workday Data', errors: valid_result.errors })
  }

  // const valid_cpf = await check_employee_by_cpf(cpf)
  // const valid_cnpj = check_company_by_cnpj(cnpj)

  // if (!valid_cpf) {
  //   console.log(typeof valid_cpf)
  //   return res.status(400).json({ message: 'Invalid employee Data', cpf: cpf })
  // }

  // if (!valid_cnpj) {
  //   return res.status(400).json({ message: 'Invalid company Data', cnpj: cnpj })
  // }

  add_workdays_promise(cpf, cnpj, workday)
    .then(workday_new => res.status(200).json(workday_new))
    .catch(err => res.status(500).send(err.message))
}

//PUT/PATCH
function update_workdays_promise(id, workday) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/workdays.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {

        let workdays_list = JSON.parse(data)

        const index = workdays_list.findIndex((e) => e.id === id)

        if (index === -1) {
          reject(new Error('Workday not found'))
        }
        else {

          const workday_update = { ...workdays_list[index], ...workday, cpf: workdays_list[index].cpf, cnpj: workdays_list[index].cnpj }

          workdays_list[index] = workday_update

          fs.writeFile('./model/workdays.json', JSON.stringify(workdays_list), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(workday_update)
            }
          })
        }
      }
    })
  })
}

const update_workdays = (req, res) => {
  const id = req.params.id
  const workday = req.body
  update_workdays_promise(id, workday)
    .then(workday_update => res.status(200).json(workday_update))
    .catch(err => res.status(500).send(err.message))

}


//DELETE
function remove_workdays_promise(id) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/workdays.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {

        const workdays_list = JSON.parse(data)

        const index = workdays_list.findIndex(e => e.id === id)

        if (index === -1) {
          reject(new Error('Workday not found'))
        }
        else {

          workdays_list.splice(index, 1)

          fs.writeFile('./model/workdays.json', JSON.stringify(workdays_list), err => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        }
      }
    })
  })
}

const remove_workdays = (req, res) => {
  const id = req.params.id
  remove_workdays_promise(id)
    .then(() => res.status(200).json({ message: 'Workday Deleted' }))
    .catch(err => res.status(500).send(err.message))
}


module.exports = { get_workdays, add_workdays, get_workdays_by_id, add_workdays_promise, update_workdays, remove_workdays }