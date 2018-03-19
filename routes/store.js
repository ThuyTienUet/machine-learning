var router = require('express').Router();
var request = require('request');
var models = require('../database/db');
var Model = models.Model;

const wipmURL = 'http://54.169.13.92:4002/wipm/api/task/regression/curve';
const TRAIN_MODEL = wipmURL + '/model';
const PREDICT = wipmURL + '/predict';

function doPost(req, res, url, payload) {
	request({
		method: 'POST',
		url: wipmURL,
		json: true,
		body: payload
	}, function(error, response, body) {
		if(error) {
			res.send({
				status: 400,
				content: error
			});
		}else if(body.status!=200) {
			res.send({
				status: 400,
				content: body.message
			});
		}else {
			res.send(body);
		}
	});
}

router.post('/model/train', function(req, res){
	var payload = req.body;
	doPost(req, res, TRAIN_MODEL, payload);
});

router.post('/predict', function(req, res){
	var payload = req.body;
	doPost(req, res, PREDICT, payload);
});

module.exports = router;
