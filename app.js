var express = require('express');
var bodyParser = require('body-Parser');
var path = require('path');

var app = express();
var expressValidator = require('express-validator');

/*
//defin middleware
var logger = function(req, res, next){
  console.log('logging...');
  next();
}

// use the middleware in app
app.use(logger);
*/

// //middleware for bodyparser also in documentation of bodyparser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
//
// //put static resources like CSS, jquery and ol
// //set static path by middleware. For now we need only views from server so deleting public folder
// app.use(express.static(path.join(__dirname, 'public')));
//
// // get input from homepage and send a simple response this is also route handler
//  app.get('/',function(req, res){
//    res.send('Hello World');
//  });
//
// // // response can also be json
// // var people =[
// //       {
// //         name: 'ram',
// //         age: 20
// //       },
// //       {
// //         name:'sham',
// //         age:30
// //       }
// // ]
// //  app.get('/',function(req, res){
// //    res.json(people);
// //  });

//middleware for view engine ejs
app.set('view engine', 'ejs');
//path where we want this view
app.set('views', path.join(__dirname, 'views'));

//middleware for bodyparser also in documentation of bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function(req, res){
  res.render('index',{
    title: 'Customer'
  });
});

//event handler for POST method on the form
app.post('/users/add',function(req, res){
  var newUser = {
    first_name: req.first_name,
    last_name: req.last_name,
    email: req.email
  }
});

// start the server
app.listen(3000, function(){
  console.log('server started on port 3000');
});

//Template service engine EJS / jade but EJS is simple as javascript
