///-------------------------------------------///
/// developer: Donovan
///
/// Tracking Object
///-------------------------------------------///
(function() {
	//Init Object
	var initObj = [
   	               /* {node: 'eVar8', data: getVisitorType},
	        		{node: 'eVar9', data: getVisitNumber}*/
	        	];
	//Standard Object
	var standardWrapper = [
		   	                {node: 'sc_xml_ver', data: '1.0'},
			        		{node: 'pageURL', data: getPageUrl},
			        		{node: 'pageName', data: getPageName},
			        		{node: 'userAgent', data: getUserAgent},
			        		{node: 'visitorID', data: getUserId},
			        		{node: 'timestamp', data: getTimeStamp},
			        		{node: 'reportSuiteID', data: getReportSuiteId},
			        		{node: 'supportNumber', data: getsupportNumber}
			        	];		
	//Error Object
	var errorWrapper = [
	                       {node: 'sc_xml_ver', data: '1.0'},
	                       {node: 'pageURL', data: getPageUrl},
	                       {node: 'pageName', data: getPageName},
	                       {node: 'userAgent', data: getUserAgent},
	                       {node: 'visitorID', data: getUserId},
	                       {node: 'timestamp', data: getTimeStamp},
	                       {node: 'reportSuiteID', data: getReportSuiteId},
	                       {node: 'supportNumber', data: getsupportNumber},
	                       {node: 'message', data: getErrorMessage},
	                       {node: 'errCode', data: getErrorCode},
	                       {node: 'errors', data: getErrorErrors}
	                       ];		
	//Wrapper for listener events
	var listeners = {
		'errorsReturned':{
			params: errorWrapper
		},
		'loadSite':{
	        params: standardWrapper
		},
		'loadPageSuccess':{
	        params: standardWrapper
		},
		'loadResultScreen':{
	        params: standardWrapper
		},
		'loadUrlToWorkspace':{
	        params: standardWrapper
		},
		'tableMoreOptions':{
	        params: standardWrapper
		},
		'eziSliderShow':{
	        params: standardWrapper
		},
		'actionMenuloadResultScreen':{
	        params: standardWrapper
		},
		'loadResultScreenFromActionMenu':{
	        params: standardWrapper
		},
		'loadUrl':{
	        params: standardWrapper
		},
		'topButtonsLoadUrlToWorkspace':{
	        params: standardWrapper
		},
		'loadSiteSuccess':{
	        params: standardWrapper
		},
		'eziSliderPaging':{
	        params: standardWrapper
		},
		'eziSliderShowBody':{
	        params: standardWrapper
		},
		'eziSliderLoad':{
	        params: standardWrapper
		},
		'eziSliderShowBody':{
	        params: standardWrapper
		},
		'otpShow':{
	        params: standardWrapper
		},
		'simpleLoadUrl':{
	        params: standardWrapper
		},
		'loadToActionMenu':{
	        params: standardWrapper
		},
		'loadToActionMenu':{
	        params: standardWrapper
		},
		'loadResultScreenFromActionMenu':{
	        params: standardWrapper
		},
		'loadEziSuccess':{
	        params: standardWrapper
		}
	};
	//Wrapper for events
	var events = [
				{event: 'event4', test: isPageView, eVars:"eVar3,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar18,eVar30,eVar31,eVar35", props:"prop5,prop6,prop7,prop8,prop11,prop12,prop13,prop6,hier1"}
				];
	//Wrapper for evars
	var evars = {
				eVar3 : getHour,
				eVar4 : getDayName,
				eVar5 : getDayType,
				eVar6 : getPageUrl,
				eVar7 : getPreviousPageName,
				eVar8 : getVisitorType,
				eVar9 : getVisitNumber,
				eVar18 : getPageName,
				eVar30 : getFormName,
				eVar31 : getUserDevice,
				eVar35 : getBusinessUnit
				};
	//Wrapper for props
	var props = {
					prop5 : getHour,
					prop6 : getDayName,
					prop7 : getDayType,
					prop8 : getPreviousPageName,
					prop11 : getPageUrl,
					prop12 : getVisitorType,
					prop13 : getVisitNumber,
					prop18 : getPageName,
					hier1 : getPageName
				};
	//Setup user tracking object
	function getUserObject() {
		//Clear user object
		var userObject = {};
		//Check if repeat visitor
		if(!fnb.hyperion.cookies.get('userId')){
			//Create userid
			userObject.userId = createGuid();
    		//Create visit date
			userObject.visitDate = getDate();
    		//Create last visited
			userObject.lastVisited = getDate();
    		//Create visits
			userObject.visits = 0;
    	}else{
    		//Create userid
			userObject.userId = fnb.hyperion.cookies.get('userId');
    		//Create last visited
			userObject.lastVisited = fnb.hyperion.cookies.get('visitDate');
    		//Create visit date
			userObject.visitDate = getDate();
    		//Create visits
			userObject.visits = parseInt(fnb.hyperion.cookies.get('visits'))+1;
    	}
		//Set cookies
		setCookies(userObject);
		//retrun user object
		return userObject;
    };
    //Generate user id
    //For temp use until backend finished
	function createGuid() {
		//Generate random number
		function randomNumber() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		}
		//Create string to return as guid
		return (randomNumber()+randomNumber()+"-"+randomNumber()+"-"+randomNumber()+"-"+randomNumber()+"-"+randomNumber()+randomNumber()+randomNumber());
    };
    //Return formatted date
	function getDate() {
		//Create date object
		var date = new Date();
		//Return correctly formatted string
		return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    };
    //For temp use until backend finished
	function setCookies(obj) {
		fnb.hyperion.cookies.set(obj);
    };
    //Return xml version from xml object
	function getXMLversion() {
		//retrun xml version
		return fnb.hyperion.XMLWriter.version;
    };
    
    ///////////////////////////
    //EVAR METHODS
    ///////////////////////////
    //Return Year
	function getYear() {
		//Create date object
		var date = new Date();
		//Set year
		var Year = date.getFullYear();
		//retrun Year
		return Year;
    };
    //Return Month
	function getMonth() {
		//Create date object
		var date = new Date();
		//Set Month
		var Month = (date.getMonth()+1);
		//retrun Month
		return Month;
    };
    //Return Day name
	function getDateNumber() {
		//Create date object
		var date = new Date();
		//Set Date
		var DateNumber = date.getDate()+'';
		//retrun Date
		return DateNumber;
    };
    //Return Day
	function getDay() {
		//Create date object
		var date = new Date();
		//Set Day
		var Day = date.getDay()+'';;
		//retrun Day
		return Day;
    };
    //Return getDayName
	function getDayName() {
		//List of days
		var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		//Create date object
		var date = new Date();
		//Set Day
		var DayName = dayNames[date.getDay()];
		//retrun Day
		return DayName;
    };
    //Return getDayType
	function getDayType() {
		//Create date object
		var date = new Date();
		//Set Day
		var DayType = (date.getDay()>0&&date.getDay()<6) ? 'Weekday': 'Weekend';
		//retrun Day
		return DayType;
    };
    //Return Hour
	function getHour() {
		//Create date object
		var date = new Date();
		//Set Hour
		var Hour = date.getHours()+'';
		//retrun Hour
		return Hour;
    };
    //Return Minutes
	function getMinutes() {
		//Create date object
		var date = new Date();
		//Set Minutes
		var Minutes = date.getMinutes()+'';;
		//retrun Minutes
		return Minutes;
    };
    //Return Seconds 
	function getSeconds() {
		//Create date object
		var date = new Date();
		//Set Seconds
		var Seconds = date.getSeconds()+'';;
		//retrun Seconds
		return Seconds;
    };
    //Return Milliseconds 
	function getMilliseconds() {
		//Create date object
		var date = new Date();
		//Set Milliseconds
		var Milliseconds = date.getMilliseconds()+'';;
		//retrun Milliseconds
		return Milliseconds;
    };
    //Return page url
	function getPageUrl() {
		//Set urleventArgs.url.indexOf('Controller')
		var url = (fnb.hyperion.utils.tracking.loadObject) ? fnb.hyperion.utils.tracking.loadObject.url.split('&')[0].split('=')[1] : '';
		//retrun page url
		return url;
    };
    //Return previous page name
    function getPreviousPageName() {
		//Return previous page name
		return fnb.hyperion.utils.tracking.previousPageName;
    };
    //Return visitor type
    function getVisitorType() {
    	//Set visitor type
		var visitorType = (fnb.hyperion.utils.tracking.userObject.visits == '0') ? 'New' : 'Repeat';
    	//Return visitor type
		return visitorType;
    };
    //Return visit number
    function getVisitNumber() {
		//Return visit number
		return fnb.hyperion.utils.tracking.userObject.visits+'';
    };
    //Return user id
    function getUserId() {
		//Return user id
		return fnb.hyperion.utils.tracking.userObject.userId;
    };
    //Return FunctionType
	function getFunctionType() {
		//Set FunctionType
		var FunctionType = '';
		//retrun FunctionType
		return FunctionType;
    };
    //Return FormName
	function getFormName() {
		//Select main
		var workspace = document.getElementById('main');
		//Test if selected
		if(workspace){
			var forms = workspace.getElementsByTagName("form");
			formName = (forms) ? (forms[0]) ? forms[0].name: forms.name : ''
		}
		//Set FormName
		if (typeof formName == 'undefined') {
			formName = '';
		}
		if (typeof formName === 'object') {
			formName = forms[0].getAttribute("name");
		}
		var FormName = (formName) ? formName.replace('\n','') : '';
		//retrun FormName
		return FormName;
    };
    //Return UserDevice
	function getUserDevice() {
		//Set UserDevice
		var UserDevice = navigator.platform.match(/(Mac68K|MacPPC|MacIntel|Win32|Linux)/i)? 'PC' : 'mobile';
		//retrun UserDevice
		return UserDevice;
    };
    //Return report suite id
    function getReportSuiteId() {
		//Return report suite id
		return fnb.hyperion.utils.tracking.id;
    };
    //Return user agent
    function getUserAgent() {
		//Return user agent
		return navigator.userAgent;
    };
    //Return timestamp
    function getTimeStamp() {
    	//Get month
    	var rawMonth = getMonth()+'';
    	var month = (rawMonth.length==1) ? '0'+rawMonth : rawMonth;
    	//Get day
    	var rawDay = getDateNumber()+'';
    	var day = (rawDay.length==1) ? '0'+rawDay : rawDay;
    	//Get hour
    	var rawHour = getHour()+'';
    	var hour = (rawHour.length==1) ? '0'+rawHour : rawHour;
    	//Get minute
    	var rawMinute = getMinutes()+'';
    	var minute = (rawMinute.length==1) ? '0'+rawMinute : rawMinute;
    	//Get second
    	var rawSecond = getSeconds()+'';
    	var second = (rawSecond.length==1) ? '0'+rawSecond : rawSecond;
    	//Get time
    	var time = getYear()+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second;
    	//Return timestamp
		return time+'';
    };
    //Return events
    function getEvents() {
    	//Set date 
    	var events = '';
    	//Return events
		return events;
    };
    //Return BusinessUnit
    function getBusinessUnit() {
    	//Return BusinessUnit
		return fnb.hyperion.utils.tracking.businessUnit;
    };
    //Return page name
	function getPageName() {
		//Set previous page title
    	fnb.hyperion.utils.tracking.previousPageName = (fnb.hyperion.utils.tracking.currentPageName!='') ? fnb.hyperion.utils.tracking.currentPageName : '';
    	//Get page title
    	fnb.hyperion.utils.tracking.currentPageName = '';
		//Set urleventArgs.url.indexOf('Controller')
		var pageName = (fnb.hyperion.utils.tracking.loadObject) ? fnb.hyperion.utils.tracking.loadObject.url.split('&')[0].split('=')[1] : '';
		if (typeof pageName == 'undefined') {
			pageName = fnb.hyperion.utils.tracking.loadObject.url.split('&')[1].split('=')[1];
		}
		//Test if submit was done
		if(pageName=="pageContent") pageName = fnb.hyperion.utils.tracking.loadObject.params.nav;
		//Test if there is data
		if(pageName!=""){
			//Split the url and retrieve the last part
			var pageUrlCollection = pageName.split('.');
			pageName = fnb.hyperion.utils.tracking.unit + '_' + pageUrlCollection[pageUrlCollection.length-1];
		}
		//Set current page flag
		fnb.hyperion.utils.tracking.currentPageName = pageName;
		//retrun page name
		return fnb.hyperion.utils.tracking.currentPageName;
    };
    function getsupportNumber() {
    	//Get support details
//    	return fnb.hyperion.$('#support-reference').elem.innerText;
    	return document.getElementById("support-reference").textContent;
    	
    };
    function getErrorMessage() {
    	return fnb.hyperion.utils.tracking.errObject.message;
    	
    };
    function getErrorCode() {
    	return fnb.hyperion.utils.tracking.errObject.errorCode;
    	
    };
    function getErrorErrors() {
    	var errorsString;
		if (typeof fnb.hyperion.utils.tracking.errObject.errors != 'undefined') {
	    	var errorsString = "";
	    	for(var i=0;i<fnb.hyperion.utils.tracking.errObject.errors.length;i++) {
	    		errorsString = errorsString + fnb.hyperion.utils.tracking.errObject.errors[i].error;
	    	};
	    	
	    	var tmp = document.createElement("DIV");
	    	tmp.innerHTML = errorsString;
	    	var errs = $(tmp).find("div > div");
	
			errorsString = "";
	    	if (errs.length == 0) {
	    		errorsString = tmp.textContent.trim() || tmp.innerText.trim() || "";
	    	}else {
		    	for(var i=0;i<errs.length;i++) {
		    		try {
		    			errorsString = errorsString + ((errs[i].textContent.trim() || errs[i].innerText.trim() || "") + "|");
		    		}
		    		catch (e) {
						// TODO: handle exception
		    			errorsString = "";
		    			console.log("No specific error returned")
					}
		    	};
		    	errorsString = errorsString.slice(0,-1);
	    	};
		};

    	return errorsString;
    	
    };
    ///////////////////////////
    //EVENTS METHODS
    ///////////////////////////
    //Is isPageView
    function isPageView(event) {
    	//isPageView
    	var PageView = event;
    	//return PageView
		return PageView;
    };
	//FNB Tracking
    function tracking() {
		
	};
	//FNB Tracking methods
	tracking.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Is this the first event
		isStart: true,
		//Report suite id
		id: 'frbprod',//frbprod
		//Business unit
		businessUnit: 'banking',
		//Error object
		errObject: "",
		//User object
		userObject: {},
		//Extra params
		extraParams: {},
		//Extra params
		loadObject: {},
		//Previous url
		currentUrl: '',
		//Previous pageName
		currentPageName: '',
		//Previous url
		previousUrl: '',
		//Previous pageName
		previousPageName: '',
		//Was a click event fired
		wasClickEvent: '',
		//What click event fired
		whatClickEvent: '',
		//Products view lis
		productsViewList:'',
		//Unit
		unit:'',
		//Path to proxy
		path: location.protocol + '//' + location.host + '/web-tracking/analytics/send?payload=',
		//Do init for tracking
        init: function () {
        	this.unit = (fnb.hyperion.cookies.get('zobCookie')=="true") ? "zob" : "zbi";
    		//Setup fnb.hyperion.cookies
        	fnb.hyperion.cookies.defaults = {namespace: 'fnb.',expires: 365};
        	//Get persistant user details
        	fnb.hyperion.utils.tracking.userObject = getUserObject();
        },
        //Check tracking object for event
        checkTrackingObject: function (sender,loadObject) {
			//Test for loadObj
        	var args = (loadObject) ? loadObject : {};
        	//Test for url
        	if(sender == 'errorsReturned') {
        		if (this.loadObject.url.indexOf('BiFrost') != -1) {
        			//Unable to track due to obfuscation
        			return false;
        		}
        		if (!this.loadObject.url) this.loadObject.url = "controller?nav=backendError";
        		this.errObject = loadObject;
        		//Create request
            	var request = this.buildXML(listeners[sender]);
            	//Post tracking data
            	this.postData(request);
        		
        	} else if(args.url){
	    		//Test if the event is a tracking event
	        	if(sender in listeners){
						//Set current url
						this.currentUrl = args.url.split('&')[0].split('=')[1];
        				//Test for backend calls
                    	if(this.currentUrl != this.previousUrl){
	                		//Set load object
	                    	this.loadObject = args;
	                		//Create request
	                    	var request = this.buildXML(listeners[sender]);
	                    	//Post tracking data
	                    	this.postData(request);
	                    	//Reset was click flag
	                    	this.wasClickEvent = '';
	                    	//Reset what click flag
	                    	this.whatClickEvent = '';
							//List products viewd
							this.productsViewList = '';
	                	}
	        	};
        	};
        },
        //Build XML
        buildXML: function (obj) {
        	//Create xml builder instance
        	var xmlBuilder = new fnb.hyperion.XMLWriter('UTF-8');
        	//Set formatting
        	xmlBuilder.formatting = 'indented';
        	//Set xml indentChar
        	xmlBuilder.indentChar = '';
        	//Set xml newline char
        	xmlBuilder.newLine = '';
        	//Set Indentation
        	xmlBuilder.indentation = 1;
        	//Start new document
        	xmlBuilder.startDocument();
        	//Start new element
        	xmlBuilder.startElement('request');
        	//Loop params
        	for (var param in obj['params']){
				if(obj['params'].hasOwnProperty(param)){
					//Get param object
					var paramObject = obj['params'][param];
					//Test if nodeattribute string or function and set
					var nodeAttribute = (typeof paramObject.data === 'function') ? paramObject.data() : paramObject.data;
					//Only add if nodeAttribute not empty
					if(nodeAttribute!==''){
						//Start new element        			
						xmlBuilder.startElement(paramObject.node);
						//Add string value
						xmlBuilder.string(nodeAttribute);
						//End element
						xmlBuilder.endElement();
					}
				}
        	};
        	//Test if this is the initial event
        	if(this.isStart){
        		//Loop init onject
        		for (var initParam in initObj) {
            		if(initObj.hasOwnProperty(initParam)){
						//Get param object
						var initParamObject = initObj[initParam];
						//Test if nodeattribute string or function and set
						var initNodeAttribute = (typeof initParamObject.data === 'function') ? initParamObject.data() : initParamObject.data;
						//Only add if nodeAttribute not empty
						if(initNodeAttribute!==''){
							//Start new element        			
							xmlBuilder.startElement(initParamObject.node);
							//Add string value
							xmlBuilder.string(initNodeAttribute);
							//End element
							xmlBuilder.endElement();
						}
					}
            	};
            	//Set isStart flag
            	this.isStart = false;
        	};
        	//New events string
        	var eventsString;
        	//Loop events
			for (var z = 0; z < fnb.hyperion.utils.tracking.events.length; z++) {
					//Set current events objerct
					var eventObject = fnb.hyperion.utils.tracking.events[z];
					//Execute function that is bound
					var eventResult = eventObject.test(eventObject.event);
					//Test result
					if(eventResult!=''){
						//Test if event has evars
						if(eventObject.eVars){
							//Split if multiple evars
							var eVarsList = eventObject.eVars.split(",");
							//Loop and get evars
							for (var i = 0, length = eVarsList.length; i < length; i++) {
								//Get eVar Result
								var evarResult = evars[eVarsList[i]]();
								if(evarResult!=''){
									//Create XML node
									xmlBuilder.startElement(eVarsList[i]);
									//Add string value
									xmlBuilder.string(evarResult);
									//End element
									xmlBuilder.endElement();
								}
							}
						}
						//Test if event has props
						if(eventObject.props){
							//Split if multiple evars
							var propsList = eventObject.props.split(",");
							//Loop and get props
							for (var x = 0, length = propsList.length; x < length; x++) {
								//Get prop Result
								var propResult = props[propsList[x]]();
								if(propResult!=''){
									//Create XML node
									xmlBuilder.startElement(propsList[x]);
									//Add string value
									xmlBuilder.string(propResult);
									//End element
									xmlBuilder.endElement();
								}
							}
						}
						//Build event string
						eventsString = (!eventsString) ? eventResult : eventsString+','+eventResult;
					}
				};
				
				//Test if events need to be added
				if(eventsString){
					//Create XML node
					xmlBuilder.startElement('events');
					//Add string value
					xmlBuilder.string(eventsString);
					//End element
					xmlBuilder.endElement();
				}
				//End request element
				xmlBuilder.endElement();
				//End document
				xmlBuilder.endDocument();
				//Get xml
				var xml = xmlBuilder.flush();
				//Close instance of xml builder
				xmlBuilder.close();
				//Reset xmlBuilder
				xmlBuilder = undefined;
				//Return xml
				return xml;
        },
        //Remove current object from dom
        postData: function (data) {
        	//JQUERY DO POST
        	$.ajax({
        	    url: fnb.hyperion.utils.tracking.path,
        	    data: data, 
        	    type: 'POST',
        	    contentType: "text/xml",
        	    dataType: "text",
        	    success : function (){  
        	    	console.log('Success sending tracking data');  
        	    },
        	    error : function (xhr, ajaxOptions, thrownError){  
        	        console.log('Error sending tracking data');  
        	    }
        	});
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.tracking = {};
        }
	};
		
	//Namespace utils.tracking
	fnb.namespace('utils.tracking', tracking, true);
	//Expose events
	fnb.hyperion.utils.tracking.events = events;
})();