const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('cars').where({ id }).first()
}

const create = carData => {
  // DO YOUR MAGIC
  return db('cars').insert(carData)
}

module.exports = {
  getAll,
  getById,
  create,
  db
}