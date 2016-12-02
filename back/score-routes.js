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
  res.json("It's working now.");
});

app.put('/scores/transport', function(req, res, next) {
  console.log(req.body);
  db.update_transport([req.body.total, req.body.transport, req.body.id], function(err, score) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.sendStatus(201);
    }
  })
});

app.put('/scores/water', function(req, res, next) {
  db.update_water([req.body.total, req.body.water, req.body.id], function(err, score) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.sendStatus(201);
    }
  })
});

app.put('/scores/waste', function(req, res, next) {
  db.update_waste([req.body.total, req.body.waste, req.body.id], function(err, score) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.sendStatus(201);
    }
  })
});

app.put('/scores/food', function(req, res, next) {
  db.update_food([req.body.total, req.body.food, req.body.id], function(err, score) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.sendStatus(201);
    }
  })
});

app.put('/scores/energy', function(req, res, next) {
  db.update_energy([req.body.total, req.body.energy, req.body.id], function(err, score) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.sendStatus(201);
    }
  })
});
