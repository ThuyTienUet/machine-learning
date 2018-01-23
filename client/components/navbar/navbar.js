var componentName = 'navbar';
angular.module(componentName, [])
    .component(componentName, {
        templateUrl: 'client/components/navbar/navbar.html',
        controller: controller,
        controllerAs: 'navbar'
    });

function controller(){

}