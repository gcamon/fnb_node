///-------------------------------------------///
/// developer: Donovan
///
/// Ajax test response for otp
///-------------------------------------------///
(function() {
	///-------------------------------------------///
	/// Ajax test response for otp Parent function
	///-------------------------------------------///
	function otp() {

	};
	///-------------------------------------------///
	/// Ajax test response for otp Methods
	///-------------------------------------------///
	otp.prototype = {
		//Var for frame to auto initialize module
		autoInit: false,
		//Var for otp primary response
		primaryResponse: '',
		//Var for otp secondary response
		secondaryResponse: '',
		//Init Otp utility
    	init: function () {
    		console.log('Utils OTP init');
        },
        //Test xhr for otp
        test: function(loadObj){
        	
        	//Get xhr
        	var xhr = loadObj.xhr;
        	
        	//Get screen type
        	var screenType = xhr.getResponseHeader("SCREEN_TYPE");
        	
        	//Test screen type
        	if(screenType!=null && screenType=="OTP"){
        		
        		//Parse response if OTP
        		var parsedResponse = JSON.parse(loadObj.data);
        		
        		//Store primary responses
        		this.primaryResponse = parsedResponse.otpPrimary;
        		
        		//Store secondary response
        		this.secondaryResponse = parsedResponse.otpSecondary;
        		
        		//Notify controller to raise otp
        		fnb.hyperion.controller.otp();
        		
        		return true;
        	};

    		return false;
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.ajax.otp = {};
        }
	};

	//Namespace ajax getParameters
	fnb.namespace('utils.ajax.otp', otp, true);

})();