const { Pizza } = require('../models');

//functions will be methods which will be used as the callback functions
// in the express.js routes, each will take two parameters (req, res)
const pizzaController = {
  //functions will go here as methods

  // GET METHODS
  //get all pizzas
  getAllPizza(req, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to get all pizzas", "\x1b[00m");
    console.log(``);
    console.log(req.path);
    Pizza.find({})
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(e => { console.log(e); res.status(400).json(e); });
  },

  //get one pizza by id
  getPizzaById({ params }, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to get one pizza by id", "\x1b[00m");
    console.log(``);
    Pizza.findOne
    (
      {
        _id: params.id
      }
    )
    .then(dbPizzaData => {
      //if no pizza is found, send 404
      if (!dbPizzaData) {
        res.status(404).json({message: `no pizza found with the id of ${params.id}`});
        return;
      } else {
        res.status(200).json(dbPizzaData);
      }
    })
    .catch(e => { console.log(e); res.status(400).json(e); });
  },

  //POST METHODS
  //CREATE PIZZA
  createPizza({ body }, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to create a pizza", "\x1b[00m");
    console.log(``);
    Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(e => { console.log(e); res.status(400).json(e); })
  },

  //PUT METHODS
  //findOneAndUpdate finds a single document, then updates it and returns
  // the updated document. if we dont set new: true, it will return
  // the original document. setting this true we instruct mongoose
  // to return the new version of the document.
  //update pizza
  updatePizza({ params, body }, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to update a pizza", "\x1b[00m");
    console.log(``);
    Pizza.findOneAndUpdate
    (
      {
        _id: params.id
      },
      body,
      {
        new: true
      }
    )
    .then(dbPizzaData => {
      //404 if pizza with that id doesn't exist
      if (!dbPizzaData) {
        res.status(404).json({message: `no pizza found with the id of ${params.id}`});
        return;
      } else {
        res.status(200).json(dbPizzaData);
      }
    })
    .catch(e => { console.log(e); res.status(400).json(e); })
  },

  //DELETE METHODS
  //delete a pizza
  // other methods include: deleteOne(), deleteMany()
  deletePizza({ params }, res) {
    console.log(``);
    console.log("\x1b[33m", "client request to delete a pizza by id", "\x1b[00m");
    console.log(``);
    Pizza.findOneAndDelete
    (
      {
        _id: params.id
      }
    )
    .then(dbPizzaData => {
      //if pizza with the requested id doesn't exist then 404 and return out of the function
      if (!dbPizzaData) {
        res.status(404).json({message: `no pizza found with the id of ${params.id}`});
        return;
      } else {
        res.status(200).json(dbPizzaData);
      }
    })
    .catch(e => { console.log(e); res.status(400).json(e); });
  }
};

module.exports = pizzaController;