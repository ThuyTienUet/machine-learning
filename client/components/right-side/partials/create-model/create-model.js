angular.module('rightSide')
	.controller('create', function($http, $location, result, toastr){
		var self = this;
		this.name = "Model";
		this.description = "Description"
		this.types = [{
			type: 'rnd',
			name: 'Random Forest'
		}, {
			type: 'lnr',
			name: 'Linear Regression'
		}, {
			type: 'dnn',
			name: 'Multi Perceptron'
		}];
		this.type = 'rnd';
		this.lnr = this.dnn = false;
		this.changeType = function(type){
			if(type == 'rnd'){
				self.lnr = self.dnn = false;
			}else if(type == 'lnr'){
				self.lnr = true;
				self.dnn = false;
			}else{
				self.lnr = self.dnn = true;
			}
		}
		this.units = [{n_nodes: 8, activate: "sigmoid"}];
		this.params = {n_epochs: 10, learning_rate: 0.001, feature_range: [0,1], batch_size: 10};
		this.add_layer = function(){
			self.units.push({n_nodes: 8, activate: "sigmoid"});
		}
		this.remove_layer = function(x){
			self.units.splice(x, 1);
		}
		this.read_data = function($fileContent){
			var string = $fileContent.split('\n');
			self.data = [];
			for( let i=0; i < string.length - 1; i++){
				let str = string[i].split(',');
				var arr = [];
				for( let j=0; j < str.length; j++){
					arr.push(parseFloat(str[j]))
				}
				self.data.push(arr);
			}
		}
		this.read_target = function($fileContent){
			var string = $fileContent.split('\n');
			self.target = [];
			for( let i=0; i < string.length - 1; i++){
				let str = string[i].split(',');
				var arr = [];
				for( let j=0; j < str.length; j++){
					arr.push(parseFloat(str[j]))
				}
				self.target.push(arr);
			}
		}
		this.create_model = function(){
			
			if(self.name && self.type && self.data && self.target && self.description){
				$("form").append("<div class='load' style='position: absolute; z-index: 1000; top: 300px; left: 500px;'></div>");
				$("form").css('opacity', '0.5');
				payload = {
					name: self.name,
					type: self.type,
					params: "",
					units: "",
					data: self.data,
					target: self.target,
					description: self.description
				}
				if (payload.type == 'dnn'){
					payload.units = self.units;
					payload.params = self.params;
				}else{
					if(payload.type == 'lnr'){
						payload.params = self.params;
					}
				}
				$http({
					method: 'POST',
					url: '/store/api/model/new',
					data: payload
				}).then(function(response){
						console.log('create model:', response.data);
						$(".load").remove();
						$("form").css('opacity', '1');
						var res = response.data;
						if(res.statusCode == 200){
							result.result = res.body;
							toastr.show('Create model success!', 'success');
							$location.path('/result');
						}else{
							toastr.show(res.body.message, 'danger');
						}
					
					
					return;
				}, function(error){
					toastr.show(error, 'danger');
					return;
				})
			}
		}
})

