var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('express-jwt'),
    massive = require('massive');

  var db = massive.connectSync({
    connectionString: 'postgres://ptmdqzga:' + config.password + '@elmer.db.elephantsql.com:5432/ptmdqzga'
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

app.put('/users/title', jwt({secret: config.secret}), function(req, res, next) {
  db.update_title([req.body.title, req.body.id], function(err, user) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.sendStatus(201);
    }
  })
})

app.put('/users/interests', jwt({secret: config.secret}), function(req, res, next) {
  db.update_interests([req.body.interests, req.body.id], function(err, user) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.sendStatus(201);
    }
  })
})

app.get('/photos/access', jwt({secret: config.secret}), function(req, res, next) {

  var access = {access: config.amazonAccess, secretAccess: config.amazonSecretAccess};
  res.json(access);
})

app.put('/photos/upload', jwt({secret: config.secret}), function(req, res, next) {
  db.update_photo([req.body.photo, req.body.id], function(err, user) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.sendStatus(201);
    }
  })
})
