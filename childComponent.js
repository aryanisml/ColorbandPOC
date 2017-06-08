(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('myapp')
        .component('childComponent', {
            templateUrl: 'childComponent.html',
            //templateUrl: 'templateUrl',
            controller: ChildController,
            controllerAs: '$ctrl',
            bindings: {
                //Callback
                parentClick: '&',
                parentDiffClick: '&',
                //One Way
                myData:'<',
                //Two Way
                myTwoWay:'='
            },
        });

    //  ChildController.$inject = ['dependency1'];
    function ChildController() {
        var $ctrl = this;
        ////////////////
        $ctrl.parentAnotherClick = function () {
            $ctrl.parentDiffClick({
                EmployeeName: 'Kamble'
            });
        };
        $ctrl.$onInit = function () {  };
        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };
    }
})();        
