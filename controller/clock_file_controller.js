const { v4: uuidv4 } = require('uuid')
const { validate_data_clock } = require('../model/clock_model')

const fs = require('fs')

//GET
function get_clocks_promise() {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/clocks.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        let clocks = JSON.parse(data)
        resolve(clocks)
      }
    })
  })
}
function get_clocks_by_id_promise(id) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/clocks.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        let clocks = JSON.parse(data)
        const index = clocks.findIndex(e => e.id === id)
        
        if (index == -1){
          reject({})
        } else {          
          resolve(clocks[index])
        }
      }
      
    })
  })
}
const get_clocks = (req, res) => {
  get_clocks_promise()
    .then(clocks => res.status(200).json(clocks))
    .catch(err => res.status(500).send(err.message));
}

// Get vlock by id
const get_clocks_by_id = (req, res) => {
  const id = req.params.id
  get_clocks_by_id_promise(id)
    .then(clocks => res.status(200).json(clocks))
    .catch(err => res.status(500).send(err.message));
}


//POST
function add_clocks_promise(clock) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/clocks.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {

        let clocks = JSON.parse(data)

        const id = uuidv4()
        const clock_new = { id, ...clock }

        clocks.push(clock_new)

        fs.writeFile('./model/clocks.json', JSON.stringify(clocks), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(clock_new);
          }
        })
      }
    })
  })
}

const add_clocks = (req, res) => {
  const clock = req.body

  const valid_result = validate_data_clock(clock)

  if (!valid_result.valid) {
    return res.status(400).json({ message: 'Invalid clock Data', errors: valid_result.errors })
  }

  add_clocks_promise(clock)
    .then(clock_new => res.status(200).json(clock_new))
    .catch(err => res.status(500).send(err.message))
}


//PUT/PATCH
function update_clocks_promise(id, clock) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/clocks.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {

        let clocks_list = JSON.parse(data)

        const index = clocks_list.findIndex((e) => e.id === id)

        if (index === -1) {
          reject(new Error('Record not found'))
        }
        else {

          const clock_update = { ...clocks_list[index], ...clock, cpf: clocks_list[index].cpf }

          clocks_list[index] = clock_update

          fs.writeFile('./model/clocks.json', JSON.stringify(clocks_list), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(clock_update)
            }
          })
        }
      }
    })
  })
}

const update_clocks = (req, res) => {
  const id = req.params.id
  const clock = req.body
  update_clocks_promise(id, clock)
    .then(clock_update => res.status(200).json(clock_update))
    .catch(err => res.status(500).send(err.message))

}


//DELETE
function remove_clocks_promise(id) {
  return new Promise((resolve, reject) => {
    fs.readFile('./model/clocks.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      else {

        const clocks = JSON.parse(data)

        const index = clocks.findIndex(e => e.id === id)

        if (index === -1) {
          reject(new Error('Clocks not found'))
        }
        else {

          clocks.splice(index, 1)

          fs.writeFile('./model/clocks.json', JSON.stringify(clocks), err => {
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

const remove_clocks = (req, res) => {
  const id = req.params.id
  remove_clocks_promise(id)
    .then(() => res.status(200).json({ message: 'Clocks Deleted' }))
    .catch(err => res.status(500).send(err.message))
}


module.exports = { get_clocks, add_clocks, get_clocks_by_id, add_clocks_promise, update_clocks, remove_clocks }