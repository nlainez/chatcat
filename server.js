'use strict';
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('login', {
    pageTitle: 'My Login page' 
  });
});

app.listen(app.get('port'), () => {
  console.log('ChatCat running on port: ', 3000);
});