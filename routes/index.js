const router = require('express').Router();
const htmlRoutes = require('./html/html-routes');
const apiRoutes = require('./api');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

//catch all other routes not defined and respond 404 not found
router.use((req, res) => {
  res.status(404).send('<h1>404 That page was not found.</h1>');
});

module.exports = router;
