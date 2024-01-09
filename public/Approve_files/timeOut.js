///-------------------------------------------///
/// developer: Donovan
///
/// TimeOut Object
///-------------------------------------------///
(function() {
	//TimeOut element selectors
	//Var for timer wrapper
	var timerWrapper;
	
	//TimeOut Vars
	//Global Timeout seconds 300 = 5mins
	var timeOutSeconds = 300;
	//Popup disaply seconds
	var displaySeconds = 60;
	//Global var for single timeout for all timeouts
	var timerInterval;
	//Page title
	var title = 'Online Banking';
	//Logoff url
	var logOffUrl  = '/banking/Controller?nav=navigator.UserLogoff';
	
	//Select elements that are going to be reused
	function doSelections() {
	
		//Select timer wrapper
		timerWrapper = fnb.hyperion.controller.timeOutElement.find(".clock");
		
    };
	
	//Create timer
	function createTimer(callback) {
	
		//Create display interval
		timerInterval = setInterval(callback, 1000);
		
    };
	
	//Clear timer
	function clearTimer() {
	
		//Clear display interval
		clearInterval(timerInterval);
		
    };
	
	//Start timout timer
	function startTimeOut() {
		
		//Create timout timer
		createTimer(updateTimer);
		
    };

	//Update timeoutTimer
	function updateTimer() {
	
		//Update second var
		timeOutSeconds--;
		
		//Check if coundown is finished
		if(timeOutSeconds==0){
		
			//Reset timer
			resetTimer(updateDisplayTimer);
			//Show popup
			fnb.hyperion.controller.raiseEvent("showTimeOut");
			
		};
		
    };
	
	//Reset timeout vars
	function resetTimer(callback) {
		if(!fnb.hyperion.controller.isMobile){
			//Test for callbal otherwise set one
			if(!callback) callback = updateTimer;
			//Reset display seconds
			displaySeconds = 60;
			//Reset timeOut seconds
			timeOutSeconds = 300;
			//Reset display timer
			timerWrapper.html(displaySeconds);
			//Clear old timer
			clearTimer();
			//Start new timer
			createTimer(callback);
		}
		
	};
	
	//Update display timer
	function updateDisplayTimer() {
	
		//Update second var
		displaySeconds--;
		
		//Check if coundown is finished
		if(displaySeconds==0) logOff();
		
		//Update display clock
		timerWrapper.html(displaySeconds);

	};
		
	//Log user off
	function logOff() {
		
		//Clear Timer
		clearTimer();
		//Load userlogoff
		fnb.hyperion.controller.raiseEvent("loadPage",{url:logOffUrl});
		
	};
	
	//Bind event for current object
	function bindEvents() {

      	var events = [{type: 'frame', listener: document, events:'click', selector: ".timeOutClose", handler: 'fnb.hyperion.controller.raiseEvent("logOffTimeOut");'},
      	              {type: 'frame', listener: document, events:'click', selector: ".timeOutContinue", handler: 'fnb.hyperion.controller.raiseEvent("hideTimeOut");'}
      	              ];

      	//Append events to actions module
      	fnb.hyperion.actions.addEvents(events);
    };
	
	///-------------------------------------------///
	/// TimeOut Parent function
	///-------------------------------------------///
	function timeOut() {
		
	};
	///-------------------------------------------///
	/// TimeOut Methods
	///-------------------------------------------///
	timeOut.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Active var for timeout
		active: false,
		//Init FNB timeout
		init: function () {
			console.log('Utils TimeOut init');
			//Check for if mobile device
			if(!fnb.hyperion.controller.isMobile){
				//Do timeOut element selections
				doSelections();
				//Bind timeOut events
				bindEvents();
				//Start timout timer
				startTimeOut();
			}
		},
		//Show timeOut popup
		show: function () {
			//Change overlay data attribute
			fnb.hyperion.controller.clipOverflow(true);
			//Show
			fnb.hyperion.controller.timeOutElement.show();
			//Set active flag
			this.active = true;
		},
		//Hide timeOut popup
		hide: function () {
			//Change overlay data attribute
			fnb.hyperion.controller.clipOverflow(false);
			//Reset timer
			resetTimer(updateTimer);
			//Hide
			fnb.hyperion.controller.timeOutElement.hide();
			//Set active flag
			this.active = false;
		},
		//Public Logoff
		logOff: logOff,
		//Public Reset
		reset: resetTimer,
		//Remove current object from dom
		destroy: function () {
			fnb.hyperion.utils.timeOut = {};
		}
	};

	//Namespace utils.timeOut
	fnb.namespace('utils.timeOut', timeOut, true);

})();