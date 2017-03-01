'use strict';
const h = require('../helpers')
const passport = require('passport');

module.exports = () => {
  let routes = {
    'get': {
      '/': (req, res, next) => {
        res.render('login');
      },
      '/rooms': (req, res, next) => {
        res.render('rooms');
      },
      '/chat': (req, res, next) => {
        res.render('chatroom');
      },
      // '/getsession': (req, res, next) => {
      //   res.send("My favourite color: " + req.session.favColor);
      // },
      // '/setsession': (req, res, next) => {
      //   req.session.favColor = "green";
      //   res.send("Session set");
      // }
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      })
    },
    'post': {},
    'put': {},
    'delete': {},
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.htm');
    }
  };

  return h.route(routes);
};