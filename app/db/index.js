'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

// log an error if the connection fails
Mongoose.connection.on('error', error => {
  console.log("MongoDB Error: ", error);
});

// create schema that defines the structure for storing user data
const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

//turn the schema into a usable model
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
  Mongoose,
  userModel
};