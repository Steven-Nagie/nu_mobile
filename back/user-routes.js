var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken'),
    massive = require('massive');

  var db = massive.connectSync({
    connectionString: 'postgres://postgres:' + config.password + '@localhost/nu'
  });

var app = module.exports = express.Router();

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

// This function, which I copied from Auth0, is useful for checking that we parse the information correctly. However, I'll do this on the front end (I won't let the user send bad or incomplete info). This should provide a better experience for the user, who will immediately know if they made a mistake, and will ensure that the back end isn't getting all screwy.
function getUserScheme(req) {

  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

// app.post('/users', function(req, res) {
//
//   var userScheme = getUserScheme(req);
//
//   if (!userScheme.username || !req.body.password) {
//     return res.status(400).send("You must send the username and the password");
//   }
//
//   if (_.find(users, userScheme.userSearch)) {
//    return res.status(400).send("A user with that username already exists");
//   }
//
//   // Lodash documentation does a great job of explaining what's going on here. Basically, it's just creating a new profile object by pulling the userScheme.type and password variables from the body.
//   var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
//
//   users.push(profile);
//
//   res.status(201).json({
//     id_token: createToken(profile)
//   });
// });

app.post('/users', function(req, res, next) {
  console.log('users is working');

  var firstname = req.body.firstname, lastname = req.body.lastname, state = req.body.state, email = req.body.email, password = req.body.password;

  db.create_user([firstname, lastname, state, email, password], function(err, user) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({
        id_token: createToken(user)
      });
    }
  });

});

app.post('/sessions/create', function(req, res) {

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, userScheme.userSearch);

  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
