angular.module('wipm', ['ui.router', 'navbar', 'leftSide', 'rightSide', 'ngAnimate'])
		.service('result', function(){
			var result;
			return {
				result: result
			}
		})
		.service('toastr', function(){
			var show = function(cont, type){
				$.notify({
					title: cont,
					message: ''
				},{
					type: type,
					animate: {
						enter: 'animated fadeInDown',
						exit: 'animated fadeOutRight'
					},
					placement: {
						from: "top",
						align: "right"
					},
					offset: 50,
					spacing: 10,
					z_index: 1031,
				});
				return;
			}
			return {
				show: show
			}
		})
        .directive('onReadFile', function ($parse) {
			return {
				restrict: 'A',
				scope: false,
				link: function(scope, element, attrs) {
					var fn = $parse(attrs.onReadFile);

					element.on('change', function(onChangeEvent) {
						var reader = new FileReader();

						reader.onload = function(onLoadEvent) {
							scope.$apply(function() {
								fn(scope, {$fileContent:onLoadEvent.target.result});
							});
						};

						reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
					});
				}
			};
		});
;

