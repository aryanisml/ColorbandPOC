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
/*
/**
 * @author Swapnil Kamble
 * @since May 24, 2017
 */

(function(){
'use strict';
angular.module('dv.studyoptimizer.components')
         .component('queryBuilder',{
              templateUrl:'./js/studyoptimizer/components/querybuilder/query-builder.html',
              controller: QueryBuilderController 
         });


QueryBuilderController.$inject=['$element','$compile', '$scope'];


///TODO below code only for queryBuilder placeholder need  modification ....

function QueryBuilderController($element,$compile,$scope){
        var vm=this;
        var builder = $element.find('.qb-builder');
        var filters = [
            {
            id: 'Procedure',
            label: 'Test',
            type: 'string',
            description : '#Patients = X',
            default_value: '',
            input: procInput,
            operators: ['in', 'not_in'],
            valueGetter: procValueGetter,
            valueSetter: procValueSetter,
            
        }, {
    id: 'Indication',
    label: 'Test111',
    type: 'string',
    default_value: '',
    description : '#Patients = X',
    operators: ['in', 'not_in'],
    validation:{
        /*format:/^(?!:$).+/ig*/
        callback: function (value, rule){
            var value1 = value.replace(/\s/g, '');
            return (value1 === '' || value1 === ':')? 'Empty Value': true;
        }
    },
    rebuildParentIndDropdown: function($container, parentSelVals) {
       
    },
    rebuildChildIndDropdown: function($container, parentVal, childSelVals) {
        
    },
    input_event: 'mywidget_checked',//'change check',
    input: function(rule, name) {
        var $container = rule.$el.find('.rule-value-container');
        $container.on('mywidget_checked', '[name="' + name + '_1"]', function() {
            // create DropDownList from input HTML element
            var dis = this;        
            //rule.filter.rebuildParentIndDropdown($container, null);
            var parentVal = null;
            if($(dis).data('selectedN') != undefined) {
                parentVal = $(dis).data('selectedN').join(':');
            }        
            var childVal = null;
            if(rule.$el.find('div[name$=_2]').data('selectedN')){
                childVal = rule.$el.find('div[name$=_2]').data('selectedN');
            }
            console.log('mywidget_checked: parentVal:', parentVal, ' :: childVal:', childVal);
        });
        
        //end of line escaping with \ is not supported until ES5
        var $div = '<div class="row">' +
        //     '<div id="myWidgetDiv+' + name + '_1" name="' + name + '_1" dv-drop-down-tree-List class="col-xs-6">Loading Indications...</div> ' +
        //     '<div id="myWidgetDiv+' + name + '_2" name="' + name + '_2" dv-drop-down-tree-List class="col-xs-6"></div>'+
        //     '</div><div class="criteria-selected-val-txt"></div>';
        '</div>';
        return $div;
    },
    valueGetter: function(rule) {
        if(rule.$el.find('div[name$=_1]').data('selectedNTxt') !== undefined){
            rule.selectedValTxt = rule.$el.find('div[name$=_1]').data('selectedNTxt').join(', ');
        }
        if((rule.$el.find('div[name$=_2]').data('selectedNTxt') !== undefined) && (rule.$el.find('div[name$=_2]').data('selectedNTxt') != '')){
            rule.selectedValTxt += ':' + rule.$el.find('div[name$=_2]').data('selectedNTxt').join(', ');
        }
        
        var selectedN = rule.$el.find('div[name$=_1]').data('selectedN').join(',');
        if(rule.$el.find('div[name$=_2]').data('selectedN') !== undefined){
            selectedN += ':' + rule.$el.find('div[name$=_2]').data('selectedN');
        }
        if(rule.selectedValTxt !== undefined){
        rule.$el.find('.rule-value-container .criteria-selected-val-txt').html('<strong>'+vm.localeResources.IERuleEditorSelectedValues+' </strong>' + rule.selectedValTxt);
        }
      //  console.log(TAG, '->valueGetter [indications]: ', selectedN);
        return selectedN;
    },
    valueSetter: function(rule, value) {
      //  console.log(TAG, '->valueSetter [indications]: ', rule, value, rule.operator.nb_inputs);
        if (rule.operator.nb_inputs > 0) {
        var val = value.split(':');
        var parentSelVals = null;  
        var childSelVals = null;
        var $container = rule.$el.find('.rule-value-container');
        
        if(val.length > 0) {
          parentSelVals = val[0].split(',');
          rule.$el.find('div[name$=_1]').data('selectedN', parentSelVals);
        }
            
        rule.filter.rebuildParentIndDropdown($container, parentSelVals);
            
        if(val.length > 1) {
          childSelVals = val[1].split(',');
          rule.$el.find('div[name$=_2]').data('selectedN', childSelVals);
        }
          
        var parentVal = null;
        if(parentSelVals !== null) {
            parentVal = parentSelVals.join(':');
        }
        //rule.filter.rebuildChildIndDropdown($container, parentVal, childSelVals);
            
      }
    }
  }];
        //////////////////////// Procedure Filter's helper functions
        function procInput(rule, name){
            return '';
        }
        function procValueGetter(rule){
    
              var  tmp_keys = [];
                return  tmp_keys;
        }
      function procValueSetter(rule, value){//gets trigered on default_value set.

        }

 builder.on('afterAddGroup.queryBuilder', function(e, model){            
            if(/_group_0$/.test(model.id)){
                model.$el.find('>.rules-group-header>.group-conditions label input[value=OR]').parent().remove();
                model.$el.find('>.rules-group-header>.group-actions button[data-add=rule]').parent().html('<button type="button" class="btn btn-xs btn-success" data-add="group"><i class="glyphicon glyphicon-plus-sign"></i> Add Group</button><button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button');
                model.$el.find('>.rules-group-body>.rules-list>.rule-container>.rule-header>.rule-actions button[data-delete=rule]').parent().html('<button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button>');     
            }
        });
builder.on('afterApplyGroupFlags.queryBuilder', function(e, model){
                console.log(/_group_0$/.test(model.id)); 
                model.$el.find('>.rules-group-header>.group-actions button[data-add=rule]').parent().html('<button type="button" class="btn btn-xs btn-success" data-add="group"><i class="glyphicon glyphicon-plus-sign"></i> Add Group</button><button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button>');     
                model.$el.find('>.rules-group-body>.rules-list>.rule-container>.rule-header>.rule-actions button[data-delete=rule]').parent().html('<button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button>');     
        });

builder.on('beforeAddRule.queryBuilder', function(e, model){
    
            model.$el.find('>.rules-group-body>.rules-list>.rule-container>.rule-header>.rule-actions button[data-delete=rule]').parent().html('<button type="button" class="" style="background:transparent; border:none" data-delete="group"><i class="glyphicon glyphicon-trash" style="color: #00a9ea"></i></button>');     
                
        });




builder.on('beforeDeleteRule.queryBuilder', function(e, rule){
            console.log('~~~ deleting rule: ', rule.id);
            //@TODO do we have procedure or indication rules? either of them has dynamically compiled angularjs/kendo component, have to $destroy them first before remove rule's DOM 
        });
  

   builder.queryBuilder({
            plugins: {
                sortable : true
                //'filter-description' : {mode: 'inline'}
            },
            filters: filters,
            select_placeholder: ''
        });



        
}
})();
*/

})();

