'use strict';
const passport = require('passport');
const config = require('../config');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // find and fetch user using the _id
    h.findById(id)
      .then(user => done(null, user))
      .catch(error => console.log('Error deserializing the user: ', error));
  });

  // this function is known as the verifying function
  let authProcessor = (accessToken, refreshToken, profile, done) => {
    // find user in the local db using profile.id
    // if the user is found, return the user data
    // if the user is not found, create one in te local db and return
    h.findOne(profile.id)
      .then(result => {
        if(result) {
          done(null, result);
        } else {
          // create a new user and return
          h.createNewUser(profile)
          .then(newChatUser => done(null, newChatUser))
          .catch(error => console.log('Error on new user creation, \nError: ', error));
        }
      });
  };

  passport.use(new FacebookStrategy(config.fb, authProcessor));
};
