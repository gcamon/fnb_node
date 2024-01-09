///-------------------------------------------///
/// developer: Donovan
///
/// Table search Module
///-------------------------------------------///
(function() {
	//Bind event for current object
	function bindEvents() {
		//Add listener for click on login button
		var events = [{type: 'frame', listener: document, events:'keyup', selector: '.fnbTableSearchTextInput', handler: 'fnb.hyperion.utils.table.search.checkValue(event);'},
		{type: 'frame', listener: document, events:'click', selector: '.fnbTableWrapper', handler: 'fnb.hyperion.utils.table.search.hide(event);'}];
      	//Append events to actions module
      	fnb.hyperion.actions.addEvents(events);
    };
	///-------------------------------------------///
	/// Search Parent function
	///-------------------------------------------///
	function search() {
		
	};
	///-------------------------------------------///
	/// Search Methods
	///-------------------------------------------///
	search.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Timer for serach before calling the backend
		timer: null,
		//Timeout delay
		timeOut: 1000,
		//Init FNB Search
    	init: function () {
    		console.log('Utils Table search init');
    		//Bind subTabs events
    		bindEvents();
        },
        //Search table contents
        checkValue : function(event) {
        	
        	//Check if timeout exists and restart
        	if (this.timeout) {
                clearTimeout(this.timeout);
            };
            
            //Create timer to wait before submitting
        	this.timeout = setTimeout(function () {
        		
        		//Get target input
        		var searchInput = fnb.hyperion.$(event.currentTarget);
 
        		//Get target value
        		var searchValue = searchInput.val();
        		
        		//Get target data
            	var params = JSON.parse(searchInput.attr('data-params'));

            	//Create loadObject
            	var loadObj = {
            			target: fnb.hyperion.$(params[0].target),
            			url:  params[0].url+"="+((searchValue && searchValue != "") ? searchValue : "noSearchValueEntered")
            	}

            	//Raise event
        		fnb.hyperion.controller.raiseEvent('loadIntoPage',loadObj);
            	
            }, this.timeOut);
        	
        },
        //Hide search popup
        hide: function (event) {
        	
        	//Get target
    		var target = fnb.hyperion.$(event.target);
    		
    		//Get class
    		var targetClass = target.attr('class');

    		//Test for valid target
    		var validTarget = (targetClass) ? (targetClass=="input validationTarget fnbTableSearchTextInput" || targetClass=="blackSearchButtonLabel" || targetClass=="blackAddButtonLabel") ? false : true : true;

    		//If target valid close popup
    		if(validTarget){
    			//Hide active tooltip
    			fnb.hyperion.utils.table.actionButton.hide();
    		}
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.table.search = {};
        }
	};

	//Namespace textArea
	fnb.namespace('utils.table.search', search, true);

})();