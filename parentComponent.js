(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('myapp')
        .component('parentComponent', {
            templateUrl:'parentComponent.html',
            //templateUrl: 'templateUrl',
            controller: ParentController,
            controllerAs: '$ctrl'//,
            // bindings: {
            //     Binding: '=',
            // },
        });

    //ParentController.$inject = ['dependency1'];
    function ParentController() {
        var $ctrl = this;
        $ctrl.show=function(value){
            console.log(value);
            alert(value.description);
            alert(45);
        };
        $ctrl.diffClick=function(value){
            alert(value.EmployeeName);
        };
        ////////////////

        $ctrl.$onInit = function() { 
            $ctrl.hero=[{'name':'D'},{'name':'A'},{'name':'B'},{'name':'C'}];
            $ctrl.heroTwoWayBinding="Swapnil";
            
            



        };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();
