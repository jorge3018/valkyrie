// corre en el puerto 8080 se puede modificar en bin/www http://localhost:8080/
var createError = require('http-errors');
var express = require('express');
var cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

var app = express();

//Swagger Configuration  
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Valkyrie API',
      version: '1.0.0'
    }
  },
  //apis: ['./modules/product/product.controller.js'],
  apis: ['./modules/user/user.controller.js'],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


var MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
//var ProductController = require('../../../visual/node/customer-service/backend/modules/product/product.module')().ProductController;
var UserController = require('./modules/user/user.module')().UserController;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

MongoDBUtil.init();
app.use(cors());
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
