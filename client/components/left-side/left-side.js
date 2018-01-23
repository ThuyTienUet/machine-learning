var componentName = 'leftSide';
angular.module(componentName, [])
    .component(componentName, {
        templateUrl: 'client/components/left-side/left-side.html',
        controller: controller,
        controllerAs: 'left'
    });

function controller(){

}