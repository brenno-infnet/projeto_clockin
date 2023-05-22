const { validate_data_company } = require('../model/company_model')

const fs = require('fs')

//GET
function get_company_promise() {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/companies.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        let company = JSON.parse(data)
        resolve(company)
      }
    })
  })
}

//GET Company by CNPJ
function get_company_by_cnpj_promise(cnpj) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/companies.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        let company_list = JSON.parse(data)
        const index = company_list.findIndex(e => e.cnpj === cnpj)
        if (index == -1) {
          reject({})
        } else {
          resolve(company_list[index])
        }
      }
    })
  })
}
const get_company = (req, res) => {
  get_company_promise()
    .then(company => res.status(200).json(company))
    .catch(err => res.status(500).send(err.message));
}

const get_company_by_cnpj = (req, res) => {
  const cnpj = req.params.cnpj
  get_company_by_cnpj_promise(cnpj)
    .then(company => res.status(200).json(company))
    .catch(err => res.status(500).send(err.message));
}
function check_company_by_cnpj(cnpj) {
  get_company_by_cnpj_promise(cnpj)
    .then(employees => {
      if (employees) {
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      return false
    });
}

//POST
function add_company_promise(company) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/companies.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {

        let company_list = JSON.parse(data)

        if (company_list.some(e => e.cnpj === company.cnpj)) {
          return reject(new Error('Company already exists'))
        }

        const company_new = { ...company }
        company_list.push(company_new)

        fs.writeFile('./model/companies.json', JSON.stringify(company_list), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(company_new);
          }
        })
      }
    })
  })
}

const add_company = (req, res) => {
  const company = req.body

  const valid_result = validate_data_company(company)

  if (!valid_result.valid) {
    return res.status(400).json({ message: 'Invalid company Data', errors: valid_result.errors })
  }

  add_company_promise(company)
    .then(company_new => res.status(200).json(company_new))
    .catch(err => res.status(500).send(err.message))
}


//PUT/PATCH
function update_company_promise(cnpj, company) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/companies.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {

        let company_list = JSON.parse(data)

        const index = company_list.findIndex((e) => e.cnpj === cnpj)

        if (index === -1) {
          reject(new Error('Company not found'))
        }
        else {

          const company_update = { ...company_list[index], ...company, cnpj: company_list[index].cnpj }

          company_list[index] = company_update

          fs.writeFile('./model/companies.json', JSON.stringify(company_list), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(company_update)
            }
          })
        }
      }
    })
  })
}

const update_company = (req, res) => {
  const cnpj = req.params.cnpj
  const company = req.body
  update_company_promise(cnpj, company)
    .then(company_update => res.status(200).json(company_update))
    .catch(err => res.status(500).send(err.message))

}


//DELETE
function remove_company_promise(cnpj) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/companies.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {

        const company = JSON.parse(data)

        const index = company.findIndex(e => e.cnpj === cnpj)

        if (index === -1) {
          reject(new Error('Company not found'))
        }
        else {

          company.splice(index, 1)

          fs.writeFile('./model/companies.json', JSON.stringify(company), err => {
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

const remove_company = (req, res) => {
  const cnpj = req.params.cnpj
  remove_company_promise(cnpj)
    .then(() => res.status(200).json({ message: 'Company Deleted' }))
    .catch(err => res.status(500).send(err.message))
}


module.exports = { get_company, get_company_by_cnpj, check_company_by_cnpj, add_company, add_company_promise, update_company, remove_company }