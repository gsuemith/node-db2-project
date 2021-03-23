// DO YOUR MAGIC
const router = require('express').Router();

const Cars = require('./cars-model')
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

router.use('/:id', checkCarId(Cars))

router.get('/', (req, res, next) => {
  Cars.getAll()
  .then(cars => {
    if (cars) {
      res.status(200).json(cars)
    } else {
      res.status(404).json({
        message: "Cars not found"
      })
    }
  })
  .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  if (req.car) {
    res.status(200).json(req.car)
  } else {
    next()
  }
})

router.post('/', 
  checkCarPayload, 
  checkVinNumberValid, 
  checkVinNumberUnique(Cars), 
  (req, res, next) => {
  Cars.create(req.body)
  .then(([id]) => {
    return Cars.getById(id)
  })
  .then(car => {
    res.status(201).json(car)
  })
  .catch(err => next(err))
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the cars router',
    errMessage: err.message,
  })
})

module.exports = router;