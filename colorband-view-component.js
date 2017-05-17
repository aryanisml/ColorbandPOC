(function(){
	
	'use strict';
       angular.module("KendoDemos", [ "kendo.directives","angularMoment" ])
	   .component('colorBandView',{
            templateUrl: 'colorband-view-component.html',
            controller: MyCtrl

        });

	   function MyCtrl(){
		console.log(angular.element("#myTemplate3").html());
        var vm=this;
		 vm.$onInit = onInit;
        // vm.$onDestroy = onDestroy;
       

	    function onInit(){
			vm.Studies = [
						{
						StudyId:1,
						StudyTrailId:["1","2","3"],
						StudyName:'ABC',
						SIDate:'10 May 2017',
						SIActual:'Y',
						SSVDate :'01 Apr 2017',
						SSVActual:'Y',
						SSU:'39',
						validDates:'Y'
						},
						
						{
						StudyId:2,
						StudyTrailId:["1","2"],
						StudyName:'BEX',
						SIDate:'12 May 2017',
						SIActual:'Y',
						SSVDate :'10 Apr 2017',
						SSVActual:'Y',
						SSU:'32',
						validDates:'Y'
						},
						{
						StudyId:3,
						StudyTrailId:["1"],
						StudyName:'CDE',
						SIDate:'15 May 2017',
						SIActual:'Y',
						SSVDate :'09 Apr 2017',
						SSVActual:'Y',
						SSU:'36',
						validDates:'Y'
						},
						{
						StudyId:4,
						StudyTrailId:["1","2","3","4"],
						StudyName:'DERR',
						SIDate:'18 May 2017',
						SIActual:'Y',
						SSVDate :'12 Apr 2017',
						SSVActual:'Y',
						SSU:'36',
						validDates:'Y'
						},
						{
						StudyId:5,
						StudyTrailId:["1","2","3"],
						StudyName:'ERRR',
						SIDate:'18 May 2017',
						SIActual:'N',
						SSVDate :'15 Apr 2017',
						SSVActual:'Y',
						SSU:'33',
						validDates:'Y'
						},
						{
						StudyId:6,
						StudyTrailId:["1","2"],
						StudyName:'FRRR',
						SIDate:'20 May 2017',
						SIActual:'N',
						SSVDate :'20 Apr 2017',
						SSVActual:'N',
						SSU:'30',
						validDates:'Y'
						},
							{
						StudyId:7,
						StudyTrailId:["1","2","3","4","5"],
						StudyName:'FRRR',
						SIDate:'22 May 2017',
						SIActual:'N',
						SSVDate :'22 Apr 2017',
						SSVActual:'N',
						SSU:'30',
						validDates:'Y'
						}

					];
					vm.dataSource = new kendo.data.DataSource({
						pageSize: 50,
						data:vm.Studies,
						autoSync: true,
						schema: {
						model: {
							id:"StudyId",
							fields:{
							StudyId: { editable: false, nullable: true }, 
							StudyName :{ nullable: true },
							}			
						}
						}
					});
					
				    vm.mainGridOptions = {
						dataSource:vm.dataSource,
						columns: [ 
									{field:"StudyId", title:"StudyId",width: "05%"},		
									//{field:"StudyName", title:"StudyName" ,	width: "170px" },
									{field:"SSVDate", title:"SSV" ,	template:kendo.template($("#myTemplate3").html()),width: "38%"},
									{field:"SSU", title:"SSU" ,	template:kendo.template($("#myTemplate4").html()) ,width: "7%"},
									{field:"SIDate", title:"SI" ,	template:kendo.template($("#myTemplate2").html()) ,width: "38%"},
									{field:"filters", title:"filters" ,	template:kendo.template($("#myTemplate").html()), width: "20%"}
							], sortable: true
						};
				}

	vm.AddRows=function(){
	//Add new rows in exisiting grid 
	
	    if(vm.sites===0){
		 alert('Enter sites');
		// return;
		}
		vm.dataSource.fetch();
		var db= vm.dataSource.data();
		var loopNumber=0;
		 
		 var increaseSymbol=false;
		 ///Increase Sites
		 if(db.length < vm.sites){
		
		       loopNumber= vm.sites-db.length;
			   increaseSymbol=true;
		 }
		 ///Decrease Sites
		 if(db.length > vm.sites){
			loopNumber=vm.sites;
		 }
		var i=0;
		if(increaseSymbol){
		
        for(i=0;i<loopNumber; i ++){
				db.push({StudyId:db.length+1,StudyTrailId:["1"], StudyName:'', SIDate:'',SIActual:'N',SSVDate:'',SSVActual:'N',SSU:'',validDates:'Y'});
		}}else{
         for(i=db.length-1;i>=loopNumber;i--){ 
				db.splice(i,1);}
		
		}
		 vm.dataSource = new kendo.data.DataSource({
		 data:db,
		 });
	};		

vm.changesSIDate=function(dataItem){
	if(dataItem.SSVDate!=='' && dataItem.SIDate !==''){
	if(!moment(dataItem.SIDate).isAfter(dataItem.SSVDate)){
		dataItem.validDates='N';
		alert('SI date is less then SSV date');
		 dataItem.SIDate= "";
		return;
		}
	}
	  dataItem.SSU= 
	  moment(dataItem.SIDate).diff((moment(dataItem.SSVDate)), 'days');
		//moment('2010-10-20').isAfter('2010-10-19');	
		console.log(dataItem);
	};
	vm.changesSSVDate=function(dataItem){
	vm.dataSource.fetch();
	var db= vm.dataSource.data();
	//console.log(db);
	if(dataItem.SSVDate!=='' && dataItem.SIDate !==''){
	if(!moment(dataItem.SSVDate).isBefore(dataItem.SIDate)){
		dataItem.validDates='N';
		alert('SSV date is less then SI date');
	    dataItem.SSVDate= "";
		return;
	}
	}
	  dataItem.SSU= 
	  moment(dataItem.SIDate).diff((moment(dataItem.SSVDate)), 'days');
	  console.log(dataItem);
	};


}

	
})();