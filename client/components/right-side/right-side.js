var componentName = 'rightSide';
angular.module(componentName, [])
    .component(componentName, {
        templateUrl: 'client/components/right-side/right-side.html',
        controller: controller,
        controllerAs: 'right'
    });

function controller(){
    
}