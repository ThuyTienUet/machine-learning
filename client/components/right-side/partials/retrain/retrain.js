angular.module('rightSide')
        .controller('retrain', function($http, $location, toastr, result){
            var self = this;    
            $http({
                method: 'GET',
                url: 'http://localhost:3000/store/api/model/list'
            }).then(function(response){
                    var res = response.data;
                    console.log('retrain: ', res);
                    if(res.statusCode == 400){
                        toastr.show(res.body + '\n Load page again!', 'danger');
                    }else{
                        self.models = res;
                        self.model = self.models[0];
                        self.params = {n_epochs: 10, learning_rate: 0.001};
                        if(self.model.type == 'rnd'){
                            self.rnd = true;
                        }else{
                            self.rnd = false;
                        }
                        self.changeModel = function(type){
                            if(type == 'rnd'){
                                self.rnd = true;
                            }else{
                                self.rnd = false;
                            }
                        }
                        self.read_data = function($fileContent){
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
                        self.read_target = function($fileContent){
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
                        self.retrain = function(){
                            if(self.data && self.target){
                                $("form").append("<div class='load' style='position: absolute; z-index: 1000; top: 300px; left: 500px;'></div>");
				                $("form").css('opacity', '0.5');
				                payload = {
                                    model_id: self.model.id,
                                    model_type: self.model.type,
                                    n_epochs: self.params['n_epochs'],
                                    data: self.data,
                                    target: self.target
                                }
                                $http({
                                    method: 'PUT',
                                    url: 'http://localhost:3000/store/api/model/retrain/' + self.model.id,
                                    data: payload
                                }).then(function(response){
                                        $(".load").remove();
                                        $("form").css('opacity', '1');
                                        var res = response.data;
                                        if(res.statusCode == 200){
                                            result.result = res.body;
                                            toastr.show('Retrain model success!', 'success');
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
                    }
                    return;
            }, function(error){
                    toastr.show(error, 'danger');
                    return;
            })
        })