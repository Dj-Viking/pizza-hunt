const router = require('express').Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controller.js');

//set up GET all and POST at /api/pizzas
router
.route('/')
.get(getAllPizza)//get all callback function
.post(createPizza);//post callback function
//same as writing this
/**
 * router.get('/', getCallBackFunction);
 * router.post('/', postCallBackFunction);
 */

//set up GET one, PUT, and DELETE at /api/pizzas/:id
router
.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router;