///-------------------------------------------///
/// developer: Donovan
///
/// Table paging Module
///-------------------------------------------///
(function() {
	//Bind event for current object
	function bindEvents() {
		//Add listener for click on login button
		var events = [{type: 'frame', listener: document, events:'click', selector: '.fnbFooterDropdownWrapper .dropdownItem', handler: 'fnb.hyperion.utils.table.paging.changeRows(event);'},
		              {type: 'frame', listener: document, events:'keyup', selector: '.fnbFooterPagingInputTextInput', handler: 'fnb.hyperion.utils.table.paging.checkValue(event);'}];
      	//Append events to actions module
      	fnb.hyperion.actions.addEvents(events);
    };
	///-------------------------------------------///
	/// Paging Parent function
	///-------------------------------------------///
	function paging() {
		
	};
	///-------------------------------------------///
	/// Paging Methods
	///-------------------------------------------///
	paging.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Init FNB Paging
    	init: function () {
    		console.log('Utils Table paging init');
    		//Bind subTabs events
    		bindEvents();
        },
        //Change table rows
        changeRows : function(event) {

    		//Get target dropdownItem
    		var dropdownItem = fnb.hyperion.$(event.currentTarget);

    		//Get target value
    		var dropdownDataValue = dropdownItem.attr('data-value');

    		//Clean params before parse
    		dropdownDataValue = dropdownDataValue.replace(/'/g, '"');
        	
    		//Get target data
        	var params = JSON.parse(dropdownDataValue);

        	//Create loadObject
        	var loadObj = {
        			target: fnb.hyperion.$(params[0].target),
        			url:  params[0].url
        	}

        	//Raise loadIntoPage event
    		fnb.hyperion.controller.raiseEvent('loadIntoPage',loadObj);
        	
        },
        //Check page number added
        checkValue: function (event) {
    		//Get keycode
    		var keyCode = event.charCode||event.keyCode||event.which;

    		//Check for enter key
    		if(keyCode==13){
    			//Get target input
        		var pagingInput = fnb.hyperion.$(event.currentTarget);

        		//Get target value
        		var pagingInputValue = pagingInput.val();
        		
        		//Get target data
            	var params = JSON.parse(pagingInput.attr('data-params'));

            	//Create loadObject
            	var loadObj = {
            			target: fnb.hyperion.$(params[0].target),
            			url:  params[0].url+"="+pagingInputValue
            	}

            	//Raise event
        		fnb.hyperion.controller.raiseEvent('loadIntoPage',loadObj);
    		}
        	
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.table.paging = {};
        }
	};

	//Namespace textArea
	fnb.namespace('utils.table.paging', paging, true);

})();