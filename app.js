var express = require('express');
var bodyParser = require('body-Parser');
var path = require('path');

var app = express();
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);

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
  db.users.find(function (err, docs) {
// docs is an array of all the documents in mycollection
  console.log(docs);
    res.render('index',{
      title: 'Customer',
      users: docs                              //display data from mongo db
    });
  })
});

// Validate email id
// expressvalidator('email').isEmail();

//event handler for POST method on the form
app.post('/users/add',function(req, res){
  var newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  db.users.insert(newUser, function(err, result){
    if (err) {
      console.log(err);
    }
    res.redirect('/');        //if no error then go back to homepage
  });       //inser data to mongo db
});

//Now connect to database mongo db in our case theere are ORMs using which we can connect to db
// Mongoose is a popular ORM here we will use mongojs


// start the server
app.listen(3000, function(){
  console.log('server started on port 3000');
});

//Template service engine EJS / jade but EJS is simple as javascript
