/**
 * @author Swapnil Kamble
 * @since May 19, 2017
 */

(function () {
    'use strict';

    angular
        .module('dv.studyoptimizer.analysistemplates.managehistorical.createha')
        .component('haSearchResult', {
            bindings:{
              haStudyResult:'<'
            },
            templateUrl: './js/studyoptimizer/analysistemplates/managehistorical/createha/ha-searchresult.html',
            controller: SearchResultHaCtrl
        });

    SearchResultHaCtrl.$inject = [
        'dv.studyoptimizer.analysistemplates.managehistorical.managehistoricalsevice',
        '$scope',
        'dv.studyoptimizer.events.HA_EVENTS'
    ];
    function SearchResultHaCtrl(ManageHistoricalService, $scope, HA_EVENTS) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.$onDestory = onDestory;
        var haSearch = {
            'selectedGridData': [],
            'resultStudyHaGridDataSource': '',
            'unSelectedGridData': []
        };
       

        function onInit() {
            ctrl.searchAll = false;
            ctrl.searchSelectedAll = false;
            ctrl.resultStudyHaGridOptions = ManageHistoricalService.resultStudyHaGridOptions();
            ctrl.resultSelectedStudyHaGridOptions = ManageHistoricalService.resultSelectedStudyHaGridOptions();
            ctrl.resultSelectedStudyHaGridCount = 0;
            $scope.$on('kendoWidgetCreated', widgetCreated_handler);
        }
          //TO DO controller initalized after the login
        function widgetCreated_handler(event, widget) {
            if (widget === ctrl.resultStudyHaGrid) {
                haSearch.resultStudyHaGridDataSource = ctrl.haStudyResult;
                ctrl.resultStudyHaGrid.dataSource.data(haSearch.resultStudyHaGridDataSource);
                ctrl.resultStudyHaGridCount = haSearch.resultStudyHaGridDataSource.length;
            }
        }

        ctrl.checkResultClick = function (dataItem) {
            ctrl.searchAll = false;
            if (dataItem.selected) {
                haSearch.selectedGridData.push(dataItem);
                ctrl.resultSelectedStudyHaGrid.dataSource.data(haSearch.selectedGridData);
                ctrl.resultSelectedStudyHaGridCount = haSearch.selectedGridData.length;
                ctrl.searchSelectedAll = true;
            }
            else {
                removeUnCheckData(dataItem);
            }

        };

        ctrl.checkSelectedResultClick = function (dataItem) {
            ctrl.searchSelectedAll = true;
            ctrl.searchAll = false;
            removeUnCheckData(dataItem);
        };

        ctrl.checkAllResultClick = function (dataItem) {
            var selectedGridData = ctrl.resultStudyHaGrid.dataSource.data();
            for (var i = 0; i < selectedGridData.length; i++) {
                var item = selectedGridData.at(i);
                if (dataItem.checkAll) {
                    item.set('selected', true);
                } else {
                    item.set('selected', false);
                }
            }
            if (dataItem.checkAll) {
                ctrl.searchAll = true;
                ctrl.searchSelectedAll = true;
                ctrl.resultSelectedStudyHaGrid.dataSource.data(selectedGridData);
                haSearch.selectedGridData = selectedGridData;
                ctrl.resultSelectedStudyHaGridCount = selectedGridData.length;
            } else {
                emptySelectedGridData();
                haSearch.selectedGridData = [];
            }
        };
        ctrl.checkAllSelectedResultClick = function (dataItem) {
            ctrl.searchAll = false;
            if (!dataItem.checkAll) {
                emptySelectedGridData();
                haSearch.selectedGridData = [];
                var searchGridData = ctrl.resultStudyHaGrid.dataSource.data();
                for (var i = 0; i < searchGridData.length; i++) {
                    var item = searchGridData.at(i);
                    item.set('selected', false);
                }
            }
        };
        function removeUnCheckData(dataItem) {
            haSearch.unSelectedGridData = [];
            var selectedGridData = ctrl.resultSelectedStudyHaGrid.dataSource.data();
            angular.forEach(selectedGridData, function (value, key) {
                if (dataItem.selected !== value.selected) {
                    haSearch.unSelectedGridData.push(value);
                }
            });
            ctrl.resultSelectedStudyHaGrid.dataSource.data(haSearch.unSelectedGridData);
            haSearch.selectedGridData = haSearch.unSelectedGridData;
            ctrl.resultSelectedStudyHaGridCount = haSearch.unSelectedGridData.length;
            ctrl.searchSelectedAll = true ? haSearch.unSelectedGridData.length > 0 : false;
        }

        function emptySelectedGridData() {
            haSearch.unSelectedGridData = [];
            ctrl.resultSelectedStudyHaGrid.dataSource.data(haSearch.unSelectedGridData);
            ctrl.resultSelectedStudyHaGridCount = 0;
            ctrl.searchSelectedAll = false;
        }
      
        function onDestory() {
            // console.log('To release external resources, watches and event handlers....');
            haSearch.unSelectedGridData = [];
            haSearch.selectedGridData = [];
        }

        ctrl.colorBandLogic=function(studyIds){
            var colorband='';
            switch (studyIds) {
                case 'purple':
                    colorband='firstStudy';
                    break;
                case 'green':
                    colorband='secondStudy';
                    break;
                default:
                      colorband='firstStudy';
                    break;
            }
            return colorband;
        };
        

    }

})();
