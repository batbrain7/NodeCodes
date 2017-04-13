var express = require('express');
var app = express();
var bodyParser = require('body-Parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var routes = require('./routes');
var apiRoutes = express.Router();

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');


var port = process.env.PORT||8080;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));


app.get('/',function(req,res) {
  res.send('This is the api for the authentication using the json web token  LOCALHOST AND PORT' + port + '/api' );
});

app.get('/setup',function(req,res) {

  var mohit = new User({
    name : 'Mohit Kumar',
    password : 'mohit983',
    admin:true
  });

  mohit.save(function(err) {
    if(err) throw err;
    console.log('User saved successfully');
    res.json({success:true});
  });

});

apiRoutes.get('/',function(req,res) {
  res.json({message:'This is my house bitches'});
});

apiRoutes.get('/users',function(req,res) {
  User.find({},function(err,users) {
    res.json(users);
  });
}):

//routes.configure(apiRoutes,app);
app.listen(port);

console.log('Server has just started!!');
