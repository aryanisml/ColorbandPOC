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
                myTwoWay:'=',
                //Input as string
                myName:'@',
                //example on Changes fired from parent value is changed from parent scope then it 
                //will reflect in child component 
                primitiveValue:'<'
            },
        });

    //  ChildController.$inject = ['dependency1'];
    ChildController.$inject=['$element'];
    function ChildController($element) {
        var $ctrl = this;
        ////////////////
        $ctrl.parentAnotherClick = function () {
            $ctrl.parentDiffClick({
                EmployeeName: 'Kamble'
            });
        };
        $ctrl.$onInit = function () { 
            var btnElement= angular.element(document.querySelector('#btnDestory'));
            console.log(btnElement);
            btnElement.on('click',function(){
                alert('Destory');
            });
         };
        $ctrl.$onChanges = function (changesObj) {
            console.log(changesObj);

         };
        $ctrl.$onDestroy = function () {
            // Destroy all custom events or bindings when the component scope is destroyed.
            console.log('this is not the right way...');
             var btnElement= angular.element(document.querySelector('#btnDestory'));
             btnElement.unbind('click');
         };

         $ctrl.$doCheck =function(){
             console.log('do check');
             console.log($ctrl.primitiveValue);
         };  

         ///Modify the DOM then use the Post Link 
         $ctrl.$postLink=function(){
             console.log($element);
         };
         

    }
})();        
