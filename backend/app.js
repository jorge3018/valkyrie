var createError = require('http-errors');
var express = require('express');
var cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

var app = express();
app.use(cors(corsOptions)) // Use this after the variable declaration

const admin = require("firebase-admin");

const serviceAccount = require("./config/firebase/privateKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//Swagger Configuration  
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Valkyrie API',
      version: '1.0.0'
    }
  },
  apis: ['./modules/product/product.controller.js'],
  //apis: ['./modules/product/product.controller.js'],
  apis: ['./modules/user/user.controller.js'],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


var MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
var ProductController = require('./modules/product/product.module')().ProductController;
//var ProductController = require('../../../visual/node/customer-service/backend/modules/product/product.module')().ProductController;
var UserController = require('./modules/user/user.module')().UserController;

function checkAuth(req, res, next) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    admin.auth().verifyIdToken(idToken)
      .then(() => {
        next()
      }).catch((error) => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}

app.use('*', checkAuth);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

MongoDBUtil.init();
app.use(cors());
app.use('/products', ProductController);
app.use('/users', UserController);

app.get('/', function (req, res) {
  var pkg = require(path.join(__dirname, 'package.json'));
  res.json({
    name: pkg.name,
    version: pkg.version,
    status: 'up'
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: res.locals.message,
    error: res.locals.error
  });
});


module.exports = app;
