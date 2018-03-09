var router = require('express').Router();
var ctrlModel = require('../controllers/model');
var ctrlPredict = require('../controllers/predict');

router.post('/model/new', function(req, res){
	ctrlModel.create(req, res);
	return;
});
router.get('/model/list/:user', function(req, res){
	ctrlModel.getList(req, res);
	return;
});
router.delete('/model/delete/:id', function(req, res){
	ctrlModel.delete(req, res);
	return;
});
router.put('/model/retrain/:id', function(req, res){
	ctrlModel.retrain(req, res);
	return;
})
router.post('/predict', function(req, res){
	ctrlPredict.predict(req, res);
	return;
});

module.exports = router;
