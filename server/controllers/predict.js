const HOST = 'localhost';
const PORT = 7005;

var request = require('request');
var models = require('../database/models/db');
var Data = models.Data;
var Model = models.Model;

module.exports.predict = function(req, res){
	request({
        method: 'POST',
        url: 'http://'+HOST+':'+PORT+'/wipm/api/model/predict',
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
			res.send(response)
			return;
		}
    })
}