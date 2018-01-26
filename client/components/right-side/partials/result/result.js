angular.module('rightSide')
        .controller('result', function(result, convert){
            this.result = result.result;
            this.predict = result.predict;
            this.target = result.target;
        })