'use strict';
const router = require('express').Router();

module.exports = () => {
  let routes = {
    'get': {
      '/': (req, res, next) => {
        res.render('login');
      },
      '/rooms': (req, res, next) => {
        res.render('rooms');
      },
      'chat': (req, res, next) => {
        res.render('chatroom');
      }
    },
    'post': {},
    'put': {},
    'delete': {}
  };

  // Iterate through the routes objects and mount the routes
};