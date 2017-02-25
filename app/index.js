'use strict';
const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('login');
});

// router.get('/info', (req, res, next) => {
//   res.send('Testing page');
// });

module.exports = {
  router: router
};