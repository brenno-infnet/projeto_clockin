const { validate_data_employee } = require('../model/employee_model')

const fs = require('fs')

//GET
function get_employees_promise() {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/employees.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        let employees = JSON.parse(data)
        resolve(employees)
      }
    })
  })
}

// GET Employee by cpf
function get_employees_by_cpf_promise(cpf) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/employees.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        let employees_list = JSON.parse(data)
        const index = employees_list.findIndex(e => e.cpf === cpf)
        if (index == -1){
          reject({})
        } else {          
          resolve(employees_list[index])
        }
      }
    })
  })
}

function get_employees(req, res){
  get_employees_promise()
    .then(employee => res.status(200).json(employee))
    .catch(err => res.status(500).send(err.message));
}

function get_employee_by_cpf(req, res){
  const cpf = req.params.cpf
  get_employees_by_cpf_promise(cpf)
    .then(employees => res.status(200).json(employees))
    .catch(err => res.status(404).send(err.message));
}

function check_employee_by_cpf(cpf){  
  get_employees_by_cpf_promise(cpf)
  .then(employees => res.status(200).json(employees))
  .catch(err => res.status(404).send(err.message));
}

//POST
function add_employees_promise(employee) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/employees.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {

        let employees = JSON.parse(data)

        if (employees.some(e => e.cpf === employee.cpf)) {
          return reject(new Error('CPF cod this employee already exists'))
        }

        
        const employee_new = { ...employee }

        employees.push(employee_new)

        fs.writeFile('./model/employees.json', JSON.stringify(employees), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(employee_new);
          }
        })
      }
    })
  })
}

const add_employees = (req, res) => {
  const employee = req.body

  const valid_result = validate_data_employee(employee)  
  if (!valid_result.valid) {
    return res.status(400).json({ message: 'Invalid employee Data', errors: valid_result.errors })
  }

  add_employees_promise(employee)
    .then(employee_new => res.status(200).json(employee_new))
    .catch(err => res.status(500).send(err.message))
}


//PUT/PATCH
function update_employees_promise(cpf, employee) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/employees.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {

        let employees = JSON.parse(data)

        const index = employees.findIndex((e) => e.cpf === cpf)

        if (index === -1) {
          reject(new Error('Employee not found'))
        }
        else {

          const employee_update = { ...employees[index], ...employee, cpf: employees[index].cpf }

          employees[index] = employee_update

          fs.writeFile('./model/employees.json', JSON.stringify(employees), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(employee_update)
            }
          })
        }
      }
    })
  })
}

const update_employees = (req, res) => {
  const cpf = req.params.cpf
  const employee = req.body

  const valid_result = validate_data_employee(employee)

  if (!valid_result.valid) {
    return res.status(400).json({ message: 'Invalid employee Data', errors: valid_result.errors })
  }

  update_employees_promise(cpf, employee)
    .then(employee_update => res.status(200).json(employee_update))
    .catch(err => res.status(500).send(err.message))

}


//DELETE
function remove_employees_promise(cpf) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/employees.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {

        const employees = JSON.parse(data)

        const index = employees.findIndex(e => e.cpf === cpf)

        if (index === -1) {
          reject(new Error('Employee not found'))
        }
        else {

          employees.splice(index, 1)

          fs.writeFile('./model/employees.json', JSON.stringify(employees), err => {
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

const remove_employees = (req, res) => {
  const cpf = req.params.cpf
  remove_employees_promise(cpf)
    .then(() => res.status(200).json({ message: 'Employee Deleted' }))
    .catch(err => res.status(500).send(err.message))
}


module.exports = { get_employees, get_employee_by_cpf, check_employee_by_cpf, add_employees, add_employees_promise, update_employees, remove_employees }