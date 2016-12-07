var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser'),
    config          = require('./back/config'),
    _               = require('lodash'),
    jwt             = require('jsonwebtoken'),
    massive         = require('massive');


var db = massive.connectSync({
  connectionString: 'postgres://ptmdqzga:' + config.password + '@elmer.db.elephantsql.com:5432/ptmdqzga'
});

var app = express();

/********IMPORT CONTROLLERS*********/
var userRoutes = require('./back/user-routes');
var scoreRoutes = require('./back/score-routes');
var authRoutes = require('./back/auth-user');

dotenv.load();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('db', db);

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

app.use(userRoutes);
app.use(scoreRoutes);
app.use(authRoutes);

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening on port ' + port);
});
