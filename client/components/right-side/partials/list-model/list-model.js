angular.module('rightSide')
	.controller('list', function($http, toastr){
		var self = this;
		$http({
			method: 'GET',
			url: 'http://localhost:3000/store/api/model/list'
		}).then(function(response){
				var res = response.data;
				if(res.statusCode == 400){
					toastr.show(res.body + '\n Load page again!', 'danger');
				}else{
					self.models = res;
					self.delete = function(index, id){
						$("table").append("<div class='load' style='position: absolute; z-index: 1000; top: 300px; left: 500px;'></div>");
						$("table").css('opacity', '0.5');
						$http({
							method: 'DELETE',
							url: 'http://localhost:3000/store/api/model/delete/' + id,
						}).then(function(response){
								$(".load").remove();
								$("table").css('opacity', '1');
								self.models.splice(index, 1);
								var res = response.data;
								if(res.statusCode == 200){
									toastr.show('Delete model success!', 'success');
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
				return;
			}, function(error){
				toastr.show(error, 'danger');
				return;
		})
})

