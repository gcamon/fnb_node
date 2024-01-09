///-------------------------------------------///
/// developer: Donovan
///
/// Banking Button Object
///-------------------------------------------///
(function() {
    //Bind event for current object
    function bindEvents() {
    	//List of events for this module
    	var events = [{type: 'frame', listener: document, events:'click', selector: '[type="button"]', handler: 'fnb.hyperion.forms.button.banking.select(event);'},
    	              {type: 'frame', listener: document, events:'click', selector: '[data-type="button"]', handler: 'fnb.hyperion.forms.button.banking.select(event);'}];
    	//Append events to actions module
    	fnb.hyperion.controller.attachActionEvents(events);
    };
	///-------------------------------------------///
	/// Button Parent function
	///-------------------------------------------///
	function button() {

	};
	///-------------------------------------------///
	/// Banking Button Methods
	///-------------------------------------------///
	button.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Init FNB Banking button
    	init: function () {
    		console.log('Forms Banking Button init');
    		bindEvents();
        }, 
        //Execute button event
        select: function (event) {
        	//Get target button
        	target = fnb.hyperion.$(event.currentTarget);
        	//Get button settings
        	var dataSettingsString = target.attr("data-settings");
        	//Check for data params attribute
        	var dataParamsString = target.attr("data-params");
        	//Test if data settings exist
        	if(dataSettingsString){
        		//Convert settings string to object
            	var dataSettingsObject = JSON.parse(dataSettingsString);
            	//Wrap target in selector
            	if(dataSettingsObject[0].target) dataSettingsObject[0].target = fnb.hyperion.$(dataSettingsObject[0].target);
    			//Run callback if needed
    			if(dataSettingsObject[0].url==""&&dataSettingsObject[0].preLoadingCallback) fnb.hyperion.controller.executeCallback(dataSettingsObject[0].preLoadingCallback,dataSettingsObject[0]);
            	//Check for onclick flag
            	var hasOnclick = (dataSettingsObject[0].onClick) ? (dataSettingsObject[0].onClick == '' || dataSettingsObject[0].onClick == '{{onClick}}') ? false : true : false;
            	//Check for data param and add it to the loadObject
            	if(dataParamsString){
            		//Create json object
            		var dataParamsObj = JSON.parse(dataParamsString);
            		//Add it to the loadObject
            		dataSettingsObject[0].dataParams = dataParamsObj[0];
            	}
            	//Test for onclick
            	if(hasOnclick){
            		//Wrap onclick in new function
            		var func = new Function('', dataSettingsObject[0].onClick);
            		//Call function
            		func(event);
            	}else if(dataSettingsObject[0].event!=''){
                	//Get event that needs to be raised
                	var event = dataSettingsObject[0].event;
                	//Raise specified event
                	fnb.hyperion.controller.raiseEvent(event, dataSettingsObject[0]);
            	};

        	};
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.forms.button = {};
        }
	};
	//Namespace button
	fnb.namespace('forms.button.banking', button, true);

})();