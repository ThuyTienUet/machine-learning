const wipmApi = 'http://:/wipm/api';

var request = require('request');
var models = require('../database/models/db');
var Data = models.Data;
var Model = models.Model;

module.exports.create = function(req, res){
	var date = new Date();
	var id = req.body.type + date;
	id.split(' ').join('');
	id.split('"').join('-');
	id.split(':').join('-');
	var body = {
		model_id: id,
		model_type: req.body.type,
		data: req.body.data,
		target: req.body.target
	}
	if(req.body.params != "")
		body.model_params = req.body.params;
	if(req.body.units != "")
		body.model_units = req.body.units;
	request({
		method: 'POST',
		url: wipmApi + '/model',
		json: true,
		body: body
	}, function (e, response, body) {
		if(e){
			res.send({
				statusCode: 400,
				body: {message: "Call wipm api error!"}
			})
			return;
		}else{
			console.log('create model: ', body);
			if(response.statusCode == 200){
				var model = {
					id: id,
					name: req.body.name,
					type: req.body.type,
					dims_input: req.body.data[0].length,
					units: JSON.stringify(req.body.units),
					params: JSON.stringify(req.body.params),
					data: JSON.stringify(req.body.data),
					target: JSON.stringify(req.body.target),
					mse: body.mse,
					description: req.body.description,
					user_created: req.body.user_created
				}
				Model.create(model)
					.then(md => {
						res.send(response);
						return;
					})
					.catch(e => {
						res.send({
							statusCode: 400,
							body: {message: "Save model to database error!"}
						})
						return;
					})
			}else{
				res.send(response);
			}
		}
		return;
	})
	return;
}
module.exports.get = function(req, res){
	Model.find({
		where: {
			id: req.params.id
		}
	})
	.then(md => {
		res.send(md);
	})
	.catch(e => {
		res.send('');
	})
}
module.exports.getList = function(req, res){
	console.log('user: ', req.params.user);
	Model.findAll({
		where: {
			user_created: req.params.user
		}
	})
		.then(list => {
			
			res.send(list);
			return;
		})
		.catch(e => {
			res.send({
				statusCode: 400,
				body: 'Can\'t get list model' 
			});
			return;
		})
}
module.exports.delete = function(req, res){
	var options = { 
		method: 'DELETE',
		url: wipmApi + '/model/' + req.params.id,
	};
	request(options, function (error, response, body) {
		if (error) {
			res.send({
				statusCode: 400,
				body: {message: "Call wipm api error!"}
			})
			return;
		}else{
			console.log('delete model: ', body);
			if(response.statusCode == 200){
				Model.destroy({
					where: {
						id: req.params.id
					}
				})
					.then(()=>{
						res.send(response);
						return;
					})
					.catch(e => {
						res.send({
							statusCode: 400,
							body: {message: "Delete model in database fail"}
						})
						return;
					})
			}else{
				res.send(response);
			}
		}
		return;
	});
}
module.exports.deleteList = function(req, res){
	Model.destroy({
        where: {}
    })
        .then(() => {
            res.send("delete all success");
        })
        .catch(e => {
            res.send(e);
        })
}
module.exports.retrain = function(req, res){
	request({
		method: 'PUT',
		url: wipmApi + '/model',
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
			console.log('retrain model: ', body);
			if(response.statusCode == 200){
				Model.update({
					mse: body.mse
				}, {
					where: {
						id: req.params.id
					}
				}).then(md=>{
					res.send(response);
					return;
				}).catch(e=>{
					res.send({
						statusCode: 400,
						body: {message: 'Update mse of model in database fail'}
					})
					return;
				})
			}else{
				res.send(response);
			}
			return;
		}
	})
	return;
}
