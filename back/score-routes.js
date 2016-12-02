var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('express-jwt'),
    massive = require('massive');

  var db = massive.connectSync({
    connectionString: 'postgres://postgres:' + config.password + '@localhost/nu'
  });

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/scores', jwtCheck);

app.get('/scores', function(req, res, next) {
  console.log(req);
  res.json("It's working now.");
});

app.put('/scores/transport', function(req, res, next) {
  console.log(req.body);
  res.sendStatus(200);
});

app.put('/scores/water', function(req, res, next) {
  console.log(req.body);
  res.sendStatus(200);
});
