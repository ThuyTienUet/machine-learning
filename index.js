var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./database/db');

const PORT = 3002;

server.listen(PORT, function(){
	console.log('listenning on port ', PORT);
})
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})
app.get('/', function(req, res){
	res.send("Store API");
})

// app.use(express.static(path.join(__dirname, './')));

var storeApi = require('./routes/store');

app.use('/store/api', storeApi);


