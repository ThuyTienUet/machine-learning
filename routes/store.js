var router = require('express').Router();
var request = require('request');
var models = require('../database/db');
var Model = models.Model;

const wipmURL = 'http://54.169.13.92:4002/wipm/api/task/regression/curve';
const TRAIN_MODEL = wipmURL + '/model';
const PREDICT = wipmURL + '/predict';

function doPost(url, payload, callback) {
	request({
		method: 'POST',
		url: url,
		json: true,
		body: payload
	}, function(error, response, body) {
		var res = null;
		if(error) {
			res = {
				status: 400,
				content: 'Call api wipm error!'
			};
		}else if(body.status!=200) {
			res = body;
		}else {
			res = body;
		}
		callback(res);
	});
}

router.post('/model/train', function(req, res){
	var payload = req.body;
	doPost(TRAIN_MODEL, payload, function(response) {
		res.send(response);
	});
});

router.post('/predict', function(req, res){
	var payload = req.body;
	doPost( PREDICT, payload, function(response) {
		res.send(response);
	});
});

module.exports = router;
