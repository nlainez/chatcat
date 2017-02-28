'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  let authProcessor = (accessToken, refreshToken, profile, done) => {
    // find user in the local db using profile.id
    // if the user is found, return the user data
    // if the user is not found, create one in te local db and return
  };
  
  passport.use(new FacebookStrategy(config.fb, authProcessor));
};
