'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const handlers = require('./data/handlers');

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  
  // endpoints
  .get('/order-confirmed', (req, res) => res.sendFile(__dirname + '/public/order-confirmed.html'))
  .post('/order', handlers.newOrder)
  .get('*', (req, res) => res.send('Dang. 404.'))
  .listen(8000, () => console.log(`Listening on port 8000`));
