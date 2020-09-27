const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes.js');
const commentRoutes = require('./comment-routes.js');

//add prefix of the '/pizzas' to the routes created in pizza-routes.js
router.use('/pizzas', pizzaRoutes);
//add prefix of the '/comments' to the routes created in comment-routes.js
router.use('/comments', commentRoutes);

module.exports = router;