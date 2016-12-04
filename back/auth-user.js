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

app.get('/auth',
    jwt({secret: config.secret}),
    function(req, res) {
      if (!req.user) {
        return res.sendStatus(401);
      } else {
        res.sendStatus(200);
      }
    }
);