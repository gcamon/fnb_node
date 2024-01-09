///-------------------------------------------///
/// developer: Donovan
///
/// Branch Search Object
///-------------------------------------------///
(function() {
    //Bind event for current object
	function bindEvents() {
    	//List of events for this module
    	var events = [{type: 'frame', listener: document, events:'click', selector: '#formEl_countryDropdown .dropdownItem', handler: fnb.hyperion.utils.branchSearch.countryChange},
    	{type: 'frame', listener: document, events:'click', selector: '#formEl_banksDropdown .dropdownItem', handler: fnb.hyperion.utils.branchSearch.bankChange},
    	{type: 'frame', listener: document, events:'click', selector: '#formEl_branchesDropDown .dropdownItem', handler: fnb.hyperion.utils.branchSearch.branchChange}];
    	
    	//Append events to actions module
    	fnb.hyperion.actions.addEvents(events);
    };
	///-------------------------------------------///
	/// Branch Search Parent function
	///-------------------------------------------///
	function branchSearch() {
		
	};
	///-------------------------------------------///
	/// Branch Search Methods
	///-------------------------------------------///
	branchSearch.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Init Branch Search
    	init: function () {
    		console.log('Utils Branch Search init');
    		//Bind events for action menu
    		bindEvents();
        },
        //Listen for changes on the country dropdown
        countryChange: function (event) {
        	//Select banks dropdown wrapper
          	var branchSearchElement = fnb.hyperion.$('#formEl_branchesDropDown');
          	// if branchSearch Element Found then hide.
        	if(branchSearchElement.length()>0){ branchSearchElement.hide();	}
        	//get banksWrapper
        	var banksDropdownWrapper = fnb.hyperion.$('#banksWrapper');     
        	//Get the selected country item value
        	var selectedCountry = fnb.hyperion.$(event.currentTarget).attr('data-value');
        	
        	//Setup load object
        	var loadObject = {
        						url: '/banking/Controller?nav=navigator.branchsearch.simple.BranchSearchAvailableBanks&selectedCountry=' + selectedCountry, 
        						target: banksDropdownWrapper, 
        						async: true,
        						postLoadingCallback: fnb.hyperion.controller.initPageEvents
        					 };
        	
        	//Request banks dropdown
        	fnb.hyperion.controller.raiseEvent('asyncLoadContent', loadObject);
        	
        },
        //Listen for changes on the banks dropdown
        bankChange: function (event) {
        	
        	//Select banks dropdown wrapper
        	var optionsDropownWrapper = fnb.hyperion.$('#optionsWrapper');
        	//Get the jsonObject that contains all the special parameters needed to populate the branch search tag
        	var jsonObject = JSON.parse(fnb.hyperion.$(event.currentTarget).attr('data-params'));
        	
        	//Retrieve JSON object variables
        	var selectedCountry = jsonObject[0].selectedCountry;
        	var selectedBankId = jsonObject[0].bankId;
        	var returnType = jsonObject[0].returnType;
    		var branchCode = jsonObject[0].branchCode;
    		var selectedBankName = jsonObject[0].selectedBankLabel;
        	//If the return type is one that requires a branch dropdown   	
    		if (returnType == '0') {
	        	//Setup load object
	        	var loadObject = {
	        						url: '/banking/Controller?nav=navigator.branchsearch.simple.BranchSearchBranchSelect&selectedCountry=' + selectedCountry + '&bankId=' + selectedBankId, 
	        						target: optionsDropownWrapper, 
	        						async: true,
	        						postLoadingCallback: fnb.hyperion.controller.initPageEvents
	        					 };
	        	//Trigger the loading of the branch dropdown call
	        	fnb.hyperion.controller.raiseEvent('asyncLoadContent', loadObject);
        	}
    		else if (selectedBankId == '-1'){
    			
    		}
    		//else the return type is one that requires you to populate the branch directly (universal branch code)
    		else {
    			fnb.hyperion.utils.branchSearch.populateBranch(branchCode, selectedBankName);
    		}
        	
        },
        //Listen for changes on the branch dropdown
        branchChange: function (event) {
        	//Get the jsonObject that contains all the special parameters needed to populate the branch search tag
        	var jsonObject = JSON.parse(fnb.hyperion.$(event.currentTarget).attr('data-params'));
        	
        	//Retrieve JSON object variables
    		var branchCode = jsonObject[0].branchCode;
    		var selectedBankName = jsonObject[0].selectedBankLabel;
        	
    		//Hide the eziPanel and populate branchSearch tag
    		fnb.hyperion.utils.branchSearch.populateBranch(branchCode, selectedBankName);
        	
        },
        //Hide the eziPanel and populate branchSearch tag
        populateBranch: function (selectedBranchCode, selectedBranchName) {
        	fnb.hyperion.controller.raiseEvent("hideEzi");
        	fnb.hyperion.$('#branchSearchCode').val(selectedBranchCode);
        	fnb.hyperion.$('#branchSearchName').val(selectedBranchName);
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.branchSearch = {};
        }
	};

	//Namespace branchSearch
	fnb.namespace('utils.branchSearch', branchSearch, true);

})();