var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./database/models/db');

app.use(bodyParser.json());

server.listen(3000, function(){
	console.log('listenning on port 3000');
})

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, './client', 'index.html'));
})

app.use(express.static(path.join(__dirname, './')));

var storeApi = require('./routes/store');

app.use('/store/api', storeApi);
