///-------------------------------------------///
/// developer: Donovan
///
/// Table Object
///-------------------------------------------///
(function() {
    //Bind event for current object
	function bindEvents() {
    	//List of events for this module
    	var events = [{type: 'frame', listener: document, events:'click', selector: '#errorClose', handler: 'fnb.hyperion.utils.error.hide(event);', preventDefault: true}];
    	//Append events to actions module
    	fnb.hyperion.controller.attachActionEvents(events);
    };
	//Init all table modules
	function initModules() {
    	//Loop child modules and init
    	for (var module in fnb.hyperion.utils.table) {
    		if(fnb.hyperion.utils.table[module].autoInit){
    			fnb.hyperion.utils.table[module].init();
			}
    	}
    };
	///-------------------------------------------///
	/// Table Parent function
	///-------------------------------------------///
	function table() {

	};
	///-------------------------------------------///
	/// Table Methods
	///-------------------------------------------///
	table.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Init FNB Table
    	init: function () {
    		console.log('Utils Table init');
    		//Initialize Form modules
    		initModules();
    		//Bind Error events
    		bindEvents();
	    },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.table = {};
        }
	};
	//Namespace utils.table
	fnb.namespace('utils.table', table, true);

})();