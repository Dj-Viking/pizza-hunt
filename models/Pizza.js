const { Schema, model } = require('mongoose');

//function for tracking the id sequence of pizzas
// and assigning an auto incrementing id

const PizzaSchema = new Schema
(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: []
  }
);

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;