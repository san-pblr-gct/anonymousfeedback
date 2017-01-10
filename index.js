var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// static files
app.use("/styles", express.static(__dirname + '/public/'));

var feedback = require('./app.js')(app);
var server = app.listen(3000, function(){
  mongoose.connect('mongodb://santhosh:3FqOFuo8kXXcrIRp6Lb8l6icwHLm8QdKhENkRIJkWWWw2Q3tyU1ARKb5KdgUtGKVPaOhOFOF7ukgPNOz7Z4aXg==@santhosh.documents.azure.com:10250/?ssl=true');

});




