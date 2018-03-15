const HOST = '54.169.13.92';
const PORT = 4002;

var request = require('request');
var models = require('../database/models/db');
var Data = models.Data;
var Model = models.Model;

module.exports.predict = function(req, res){
	request({
        method: 'POST',
        url: 'http://'+HOST+':'+PORT+'/wipm/api/task/regression/curve/predict',
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
			console.log('predict: ', body);
			if(body.target)
				res.send(response);
			else
				res.send({
					statusCode: 400,
					body: {message: body.message}
				});
			return;
		}
    })
}
