var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./database/models/db');

const PORT = 3000;

app.use(bodyParser.json());

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
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
})

app.use(express.static(path.join(__dirname, '../')));

var storeApi = require('./routes/store');

app.use('/store/api', storeApi);

