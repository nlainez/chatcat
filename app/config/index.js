'use strict';
if(process.env.NODE_ENV === 'production'){
  //offer production stage environment variables
  module.exports = {
    host: process.env.host || "",
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
    fb: {
      // clientID: process.env.fb.clientID,
      // clientSecret: process.env.fb.clientSecret,
      clientID: process.env.fbClientID,
      clientSecret: process.env.fbClientSecret,
      callback: process.env.host + "/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos']
    }
  };
} else {
  module.exports = require('./development.json');
}