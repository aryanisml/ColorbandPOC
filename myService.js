/**
 * @author 
 * @since May 17, 2017
 */


(function() {
    'use strict';

    managehistoricalsevice.$inject = [
        '$q',
        'dv.common.locale.LocaleAppResources',
    ];

    function managehistoricalsevice($q,LocaleAppResources) {
        var vm = this;
        var lastPromise, popupWinRef;
        vm.historicalObject = {};
        vm.setPopupWinRef = function(popupWin) {
            popupWinRef = popupWin;
        };

        vm.showPopupWin = function() {
            var deferred = $q.defer();
            if (lastPromise) {
                deferred.reject('HA Search is already open');
            } else if (popupWinRef) {
                popupWinRef.center().open();
                popupWinRef.title(LocaleAppResources.getResource('HSDialogTitle'));               
                lastPromise = deferred;
            } else {
                deferred.reject('Could not get the HA Search popup window reference.');
            }
            return deferred.promise;
        };

        vm.hidePopupWin = function() {
            if (lastPromise && popupWinRef) {
                lastPromise.resolve({ message: 'HA Search pop up has been closed' });
                lastPromise = null;
                popupWinRef.close();
            }
        };

        vm.clearLastPromise = function() {
            if (lastPromise) {
                lastPromise.resolve({ message: 'HA Search pop up has been closed' });
                lastPromise = null;
            }
        };

        vm.getSavedSearchList = function() {
            // To replace with API call
            return [{
                    "searchId": 116,
                    "timestamp": "Friday, 17Mar2017, 10:20 AM",
                    "tag": "#9533a0",
                    "criteriaInfo": {
                        "value": "{&quot;condition&quot;:&quot;AND&quot;,&quot;rules&quot;:[{&quot;id&quot;:&quot;Indication&quot;,&quot;field&quot;:&quot;Indication&quot;,&quot;type&quot;:&quot;string&quot;,&quot;operator&quot;:&quot;in&quot;,&quot;value&quot;:&quot;38112:&quot;},{&quot;condition&quot;:&quot;AND&quot;,&quot;rules&quot;:[{&quot;id&quot;:&quot;Procedure&quot;,&quot;field&quot;:&quot;Procedure&quot;,&quot;type&quot;:&quot;string&quot;,&quot;operator&quot;:&quot;in&quot;,&quot;value&quot;:&quot;15216&quot;}]}]}",
                        "name": "(Indication IN (Abdominal and pelvic pain [R10])) AND (Procedure IN (00880 - Anesthesia Major Lower Abdominal Vessels Nos))"
                    }
                },
                {
                    "searchId": 117,
                    "timestamp": "Wednesday, 22Mar2017, 1:42 PM",
                    "tag": "#70b92e",
                    "criteriaInfo": {
                        "value": "{&quot;condition&quot;:&quot;AND&quot;,&quot;rules&quot;:[{&quot;id&quot;:&quot;Indication&quot;,&quot;field&quot;:&quot;Indication&quot;,&quot;type&quot;:&quot;string&quot;,&quot;operator&quot;:&quot;in&quot;,&quot;value&quot;:&quot;38112:&quot;},{&quot;condition&quot;:&quot;AND&quot;,&quot;rules&quot;:[{&quot;id&quot;:&quot;Procedure&quot;,&quot;field&quot;:&quot;Procedure&quot;,&quot;type&quot;:&quot;string&quot;,&quot;operator&quot;:&quot;in&quot;,&quot;value&quot;:&quot;15216&quot;}]}]}",
                        "name": "(Indication IN (Abdominal and pelvic pain [R10])) AND (Procedure IN (00880 - Anesthesia Major Lower Abdominal Vessels Nos))"
                    }
                }
            ];
        };

        ///TODO integrate with resource files - localeAppResources Service
        vm.resultStudyHaGridOptions = function() {
            var kendoGridOptions = {
                columns: [{
                        field: 'Search',
                        title: LocaleAppResources.getResource('HSSearchColLabel'),
                        'shortTitle': LocaleAppResources.getResource('HSSearchColLabel'),
                        width: '120px',
                        template: kendo.template($('#searchTemplate').html())

                    }, {
                        field: '',
                        title: 'Select',
                        headerTemplate: kendo.template($('#searchHeaderTemplate').html()),
                        template: '<input  ng-model ="dataItem.selected" type="checkbox" ng-change="$ctrl.checkResultClick(dataItem)"></input>',
                        width: '40px'
                    },
                    {
                        field: 'StudyId',                      
                        'title': LocaleAppResources.getResource('HASSStudyID'),
                        'shortTitle': LocaleAppResources.getResource('HASSStudyIDShort'),
                        width: '110px',


                    }, {

                        field: 'Description',
                        title: 'Description',
                        width: '540px'
                    },
                    {

                        field: 'ALSR',
                        title: 'ALSR',
                        width: '130px'
                    },
                    {

                        field: 'TherapeuticArea',
                        title: 'Therapeutic Area',
                        width: '140px'
                    },
                    {

                        field: 'Indication',
                        title: 'Indication',
                        width: '140px'
                    }
                ],
                //TODO Remove hard code pagesize
                dataSource: { data: [], pageSize: 6 },
                scrollable: true,
                filterable: true,
                sortable: true,
                // selectable: 'row',
                pageable: {
                    input: true,
                    numeric: false,
                    buttonCount: 6
                }

            };
            return kendoGridOptions;
        };

        vm.resultSelectedStudyHaGridOptions = function() {
            var kendoGridOptions = {
                columns: [{
                        field: 'Search',
                        title: 'Search',
                        width: '120px',
                        template: kendo.template($('#searchTemplate').html())

                    }, {
                        field: '',
                        title: 'Select',
                        headerTemplate: kendo.template($('#searchSelectedHeaderTemplate').html()),
                        template: '<input  ng-model ="dataItem.selected" type="checkbox" ng-change="$ctrl.checkSelectedResultClick(dataItem)"></input>',
                        width: '40px'
                    },
                    {
                        field: 'StudyId',
                        title: 'Study ID',
                        width: '110px'

                    }, {

                        field: 'Description',
                        title: 'Description',
                        width: '540px'
                    },
                    {

                        field: 'ALSR',
                        title: 'ALSR',
                        width: '130px'
                    },
                    {

                        field: 'TherapeuticArea',
                        title: 'Therapeutic Area',
                        width: '140px'
                    },
                    {

                        field: 'Indication',
                        title: 'Indication',
                        width: '140px'
                    }
                ],
                //TODO Remove hard code pagesize
                dataSource: { data: [], pageSize: 6 },
                scrollable: true,
                filterable: true,
                sortable: true,
                // selectable: 'row',
                pageable: {
                    input: true,
                    numeric: false,
                    buttonCount: 6
                }

            };
            return kendoGridOptions;
        };

        ///TOD call actual solar service , for testing passing mock object
        //   this.getresultHaGridDataSource ={
        //          var countryListArr = [];
        //          return countryListArr;

        //   };
        vm.getResultStudyHaGridDataSource = function() {
            var studyResultArr = [{
                    'Search': '',
                    'StudyId': 'CA0312',
                    'Description': 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta.',
                    'ALSR': '14 Dec 2015',
                    'TherapeuticArea': 'Psychiatry',
                    'Indication': 'Drug',
                    'StudyTrailId': ['purple', 'green']
                },
                {
                    'Search': '',
                    'StudyId': 'CA0318',
                    'Description': 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta.',
                    'ALSR': '22 Dec 2015',
                    'TherapeuticArea': 'Psychiatry',
                    'Indication': 'Drug',
                    'StudyTrailId': ['purple']
                },
                {
                    'Search': '',
                    'StudyId': 'CA055',
                    'Description': 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta.',
                    'ALSR': '10 Dec 2015',
                    'TherapeuticArea': 'Psychiatry',
                    'Indication': 'Drug',
                    'StudyTrailId': ['green']
                },
                {
                    'Search': '',
                    'StudyId': 'CA0458',
                    'Description': 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta.',
                    'ALSR': '05 Dec 2015',
                    'TherapeuticArea': 'Psychiatry',
                    'Indication': 'Drug',
                    'StudyTrailId': ['purple', 'green']
                },
                {
                    'Search': '',
                    'StudyId': 'CA2318',
                    'Description': 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta.',
                    'ALSR': '29 Dec 2015',
                    'TherapeuticArea': 'Psychiatry',
                    'Indication': 'Drug',
                    'StudyTrailId': ['green']
                },
                {
                    'Search': '',
                    'StudyId': 'CA23144',
                    'Description': 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.Donec id elit non mi porta.',
                    'ALSR': '31 Dec 2017',
                    'TherapeuticArea': 'Psychiatry',
                    'Indication': 'Drug',
                    'StudyTrailId': ['purple']
                }


            ];
            return studyResultArr;
        };

        vm.getStudies = function(searchText) {
            var deferred = $q.defer();

            // TODO call actual API to fetch studies passing search text, for testing passing mock object
            // $.ajax({
            //     url: "https://jsonplaceholder.typicode.com/posts",
            //     dataType: "json",
            //     data: { "userId": searchText },
            //     success: function(result) {
            //         deferred.resolve(result);
            //     },
            //     error: function(result) {
            //         deferred.reject(result);
            //     }
            // });

            var studies = [{
                id: 1,
                name: 'Study1'
            }, {
                id: 2,
                name: 'Study2'
            }, {
                id: 3,
                name: 'Study3'
            }];

            deferred.resolve(studies);

            return deferred.promise;
        };

    }

    angular
        .module('dv.studyoptimizer.analysistemplates.managehistorical')
        .service('dv.studyoptimizer.analysistemplates.managehistorical.managehistoricalsevice', managehistoricalsevice);
})();
