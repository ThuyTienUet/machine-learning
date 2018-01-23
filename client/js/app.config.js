angular.module('wipm')
        .config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);
angular.module('wipm')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('home');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'client/components/home.html'
                })
                    .state('home.createmodel', {
                        url: 'create-model',
                        templateUrl: 'client/components/right-side/partials/create-model/create-model.html',
                        controller: 'create as create'
                    })
                    .state('home.predict', {
                        url: 'predict',
                        templateUrl: 'client/components/right-side/partials/predict/predict.html',
                        controller: 'predict as predict'
                    })
                    .state('home.retrain', {
                        url: 'retrain',
                        templateUrl: 'client/components/right-side/partials/retrain/retrain.html',
                        controller: 'retrain as retrain'
                    })
                    .state('home.listmodel', {
                        url: 'list-model',
                        templateUrl: 'client/components/right-side/partials/list-model/list-model.html',
                        controller: 'list as list'
                    })
                    .state('home.result', {
                        url: 'result',
                        templateUrl: 'client/components/right-side/partials/result/result.html',
                        controller: 'result as result'
                    })
            // use the HTML5 History API
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        });
