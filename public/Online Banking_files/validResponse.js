///-------------------------------------------///
/// developer: Donovan
///
/// Ajax test response
///-------------------------------------------///
(function() {
	///-------------------------------------------///
	/// Ajax test response Parent function
	///-------------------------------------------///
	function validResponse() {

	};
	///-------------------------------------------///
	/// Ajax test response Methods
	///-------------------------------------------///
	validResponse.prototype = {
		//Var for frame to auto initialize module
		autoInit: false,
		//Init fragment utility
    	init: function () {
    		console.log('Utils validResponse init');
        },
        //Create fragment method
        test: function(loadObj){
        	//Do data tests
        	if(typeof loadObj.data == "string"){
	    		if(loadObj.data.isStringEmpty()){
	    			//Test if errors should be shown
		        	if(loadObj.error){
		        		//Notify Controller to raise Error event
			        	fnb.hyperion.controller.error("No data returned from request.", "validResponse");
			        	
		        	}
	    			
		        	return false;
		    	}
	    	}else{
	    		//Test if errors should be shown
	        	if(loadObj.error){
	        		//Notify Controller to raise Error event
		        	fnb.hyperion.controller.error("No data returned from request.", "validResponse");
		        	
	        	}
    			
	        	return false;
	    	}
        	
        	return true;
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.ajax.validResponse = {};
        }
	};

	//Namespace ajax getParameters
	fnb.namespace('utils.ajax.validResponse', validResponse, true);

})();