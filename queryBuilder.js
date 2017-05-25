(function(){



'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.controllers', ['angular-jquery-querybuilder']).
controller('myCtrl', ['$scope', function($scope) {

  $scope.builder = {
    options: {
      rules: {
        condition: 'AND',
        rules: [{
          id: 'price',
          operator: 'less',
          value: 10.25
        }, {
          condition: 'OR',
          rules: [{
            id: 'category',
            operator: 'equal',
            value: 2
          }, {
            id: 'category',
            operator: 'equal',
            value: 1
          }]
        }]
      },
      filters: [{
        id: 'name',
        label: 'Name',
        type: 'string'
      }, {
        id: 'category',
        label: 'Category',
        type: 'integer',
        input: 'select',
        values: {
          1: 'Books',
          2: 'Movies',
          3: 'Music',
          4: 'Tools',
          5: 'Goodies',
          6: 'Clothes'
        },
        operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
      }, {
        id: 'in_stock',
        label: 'In stock',
        type: 'integer',
        input: 'radio',
        values: {
          1: 'Yes',
          0: 'No'
        },
        operators: ['equal']
      }, {
        id: 'price',
        label: 'Price',
        type: 'double',
        validation: {
          min: 0,
          step: 0.01
        }
      }, {
        id: 'id',
        label: 'Identifier',
        type: 'string',
        placeholder: '____-____-____',
        operators: ['equal', 'not_equal'],
        validation: {
          format: /^.{4}-.{4}-.{4}$/
        }
      }]
    },
    builder: {}
  };


  $scope.$on('QueryBuilderValueChanged', function() {
    console.log('QueryBuilderValueChanged fired');
  });


}]);

angular.module('myApp', [
  'myApp.controllers'
]);




//  builder.on('afterAddGroup.queryBuilder', function(e, model){            
//             if(/_group_0$/.test(model.id)){
//                 model.$el.find('>.rules-group-header>.group-conditions label input[value=OR]').parent().remove();
//                 model.$el.find('>.rules-group-header>.group-actions button[data-add=rule]').parent().html('<button type="button" class="btn btn-xs btn-success" data-add="group"><i class="glyphicon glyphicon-plus-sign"></i> Add Group</button><button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button');
//                 model.$el.find('>.rules-group-body>.rules-list>.rule-container>.rule-header>.rule-actions button[data-delete=rule]').parent().html('<button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button>');     
//             }
//         });
// builder.on('afterApplyGroupFlags.queryBuilder', function(e, model){
//                 console.log(/_group_0$/.test(model.id)); 
//                 model.$el.find('>.rules-group-header>.group-actions button[data-add=rule]').parent().html('<button type="button" class="btn btn-xs btn-success" data-add="group"><i class="glyphicon glyphicon-plus-sign"></i> Add Group</button><button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button>');     
//                 model.$el.find('>.rules-group-body>.rules-list>.rule-container>.rule-header>.rule-actions button[data-delete=rule]').parent().html('<button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button>');     
//         });

// builder.on('beforeAddRule.queryBuilder', function(e, model){
    
//             model.$el.find('>.rules-group-body>.rules-list>.rule-container>.rule-header>.rule-actions button[data-delete=rule]').parent().html('<button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button>');     
                
//         });


})();

