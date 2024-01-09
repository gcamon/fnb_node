///-------------------------------------------///
/// developer: Donovan
///
/// Validate XHR Response Object -- Banking
///-------------------------------------------///
(function() {
    ///-------------------------------------------///
	/// Validate XHR Response Parent function
	///-------------------------------------------///
	function validateXHR() {

	};
	///-------------------------------------------///
	/// Validate XHR Response Methods
	///-------------------------------------------///
	validateXHR.prototype = {
		//Var for frame to auto initialize module
		autoInit: false,
		//Init FNB Validate XHR
    	init: function () {
    		
        },
        //Validate xhr
        validate: function (ajaxXHR, callback, sender) {
        	
        	//Get error code
        	var errorCode = (ajaxXHR.getResponseHeader("NAV_ERROR_CODE")) ? parseInt(ajaxXHR.getResponseHeader("NAV_ERROR_CODE")) : 0;
        	//Get error message
        	var errorMessage = ajaxXHR.getResponseHeader("NAV_ERROR_MESSAGE");
        	//Get error message
        	var detailErrorMessage = (ajaxXHR.getResponseHeader("NAV_DETAIL_MESSAGE")) ? ajaxXHR.getResponseHeader("NAV_DETAIL_MESSAGE") : "";
        	//Get response text
        	var responseText =  ajaxXHR.responseText;

        	//Switch error message types
        	switch(errorCode)
			{
				case -1:
					//Create error message
					if(detailErrorMessage=="Invalid Parameter"){
						errorMessage = responseText;
						//Append error message
						errorMessage = "Some required fields are not valid..." + "<br/>" +errorMessage;
					}else{
						if(detailErrorMessage==""){
							errorMessage = "(E-" + errorCode +") "+ errorMessage + "<br/>" + responseText;
							errorMessage = "Some errors have occurred..." + "<br/>" +errorMessage;
						}
						else {
							errorMessage = "(E-" + errorCode +") "+ detailErrorMessage + "<br/>" + responseText;
							errorMessage = "Some errors have occurred..." + "<br/>" +errorMessage;
						}
					}
					
					//Raise error
					this.error(errorMessage, ajaxXHR, callback, sender);
					
				break;
				case  0:
					
					//Return valid response
					return true;
					
				break;
				case 4:
				case 5:
				case 370:
					
					//Create error message
					if(detailErrorMessage==""||detailErrorMessage=="Invalid Parameter"){
						errorMessage = responseText;
					}else{
						errorMessage = "(E-" + errorCode +") "+ errorMessage + "<br/>" + responseText;
					}
					
					//Append error message
					errorMessage = "Some required fields are not valid..." + "<br/>" +errorMessage;
					
					//Raise error
					this.error(errorMessage, ajaxXHR, callback, sender);
					
				break;
				case  1544:

					//Create error message
					errorMessage = "OTP Sent..." + "<br/>" + detailErrorMessage + "<br/>" + responseText;

					//Raise error
					this.error(errorMessage, ajaxXHR, callback, sender);
					
				break;
				case 1190:
					
					//Create error message
					if(detailErrorMessage==""||detailErrorMessage=="Invalid Parameter"){
						errorMessage = responseText;
						errorMessage = "Some required fields are not valid..." + "<br/>" +errorMessage;
					}else{
						errorMessage = "(E-" + errorCode +") "+ errorMessage + "<br/>" + responseText;
						errorMessage = "Some errors have occurred..." + "<br/>" +errorMessage;
					}
					
					
					
					//Raise error
					this.error(errorMessage, ajaxXHR, callback, sender);
					
					//Request that controller kills ajax
		        	fnb.hyperion.controller.destroyAjax();
					
				break;
				case 96:

					//Raise error
					this.error(errorMessage, ajaxXHR, callback, sender);
					
				break;
				default:

					//Create error message
					if(detailErrorMessage!=""&&detailErrorMessage!="Invalid Parameter"){
						errorMessage = "Some errors have occurred..." + "<br/>" +"(E-" + errorCode +") "+ detailErrorMessage + "<br/>" + responseText;
					}else{
						
						if(detailErrorMessage==""){
							errorMessage = "Some errors have occurred..." + "<br/>" +"(E-" + errorCode +") "+ errorMessage + "<br/>" + responseText;
						}
						else {
							errorMessage = "Some errors have occurred..." + "<br/>" +"(E-" + errorCode +") "+ detailErrorMessage + "<br/>" + responseText;
						}
					}

					//Raise error
					this.error(errorMessage, ajaxXHR, callback, sender);
				
				break;
			};
        	
			//Return invalid response
			return false;
			
        },
        //Validation error
        error: function (message, ajaxXHR, callback, sender) {
        	        	
        	//check if sender equals to submitFromPageToEzi
       		if(sender == 'submitFromPageToEzi' ){fnb.hyperion.utils.eziPanel.hide();}
       		if(sender == 'loadPopup' ){fnb.hyperion.utils.notifications.hide();}
        	//Notify Controller to raise Error event
        	fnb.hyperion.controller.error(message,sender);
        	
        	//Test for callback
        	if(typeof(callback)=="function"){callback(ajaxXHR)};
        	
			//Return invalid response
			return false;
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.functions.validateXHR = {};
        }
	};

	//Namespace scrollTo
	fnb.namespace('functions.validateXHR', validateXHR, true);

})();