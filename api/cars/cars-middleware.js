const checkCarId = Cars => (req, res, next) => {
  // DO YOUR MAGIC
  const carId = req.params.id
  Cars.getById(carId)
  .then(car => {
    if (car) {
      req.car = car;
      next()
    } else {
      res.status(404).json({
        message: `car with id ${carId} is not found`
      })
    }
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  let missingField = '';
  ['vin', 'make', 'model', 'mileage'].forEach(field => {
    if (!req.body[field]) {
      missingField = field
    }
  })
  if (missingField) {
    res.status(400).json({
      message: `${missingField} is missing`
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vinValidator = require('vin-validator')
  const vin = req.body.vin;
  if (vinValidator.validate(vin)){
    next()
  } else {
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  }
}

const checkVinNumberUnique = Cars => (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin;
  Cars.db('cars').where({ vin }).first()
  .then(car => {
    if (car) {
      res.status(400).json({
        message: `vin ${vin} already exists`
      });
    } else {
      next();
    }
  })
  .catch(err => next(err))
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}