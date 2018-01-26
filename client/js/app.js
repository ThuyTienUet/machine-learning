angular.module('wipm', ['ui.router', 'navbar', 'leftSide', 'rightSide', 'ngAnimate'])
		.service('result', function(){
			var result;
			var predict;
			var target;
			return {
				result: result,
				predict: predict,
				target: target
			}
		})
		.service('convert', function(){
			var JSONToCSV = function(JSONData, ReportTitle, ShowLabel){
				var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var CSV = '';   
				CSV += ReportTitle + '\r\n\n';
				if (ShowLabel) {
					var row = "";
					for (var index in arrData[0]) {
						row += index + ',';
					}
					row = row.slice(0, -1);
					CSV += row + '\r\n';
				}
				for (var i = 0; i < arrData.length; i++) {
					var row = "";
					for (var index in arrData[i]) {
						row += '"' + arrData[i][index] + '",';
					}
					row.slice(0, row.length - 1);
					CSV += row + '\r\n';
				}
				if (CSV == '') {        
					alert("Invalid data");
					return;
				}  
				var fileName = "MyReport_";
				fileName += ReportTitle.replace(/ /g,"_");   
				var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
				var link = document.createElement("a");    
				link.href = uri;
				link.style = "visibility:hidden";
				link.download = fileName + ".csv";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
			return {
				JSONToCSV: JSONToCSV
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

