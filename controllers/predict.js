var request = require('request');
var models = require('../database/models/db');
var Data = models.Data;
var Model = models.Model;

module.exports.predict = function(req, res){
	request({
        method: 'POST',
        url: 'http://127.0.0.1:5000/wipm/api/model/predict',
        json: true,
        body: req.body
    }, function(e, response, body){
        if(e){
			res.send({
				statusCode: 400,
				body: {message: "Call wipm api error!"}
			})
			return;
		}else{
			res.send(response)
			return;
		}
    })
}