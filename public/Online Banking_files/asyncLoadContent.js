///-------------------------------------------///
/// developer: Donovan
///
/// Banking Async load function
///-------------------------------------------///
(function() {
	///-------------------------------------------///
	/// Banking Async load Parent function
	///-------------------------------------------///
	function asyncLoadContent() {
			
	};
	///-------------------------------------------///
	/// Banking Async load Methods
	///-------------------------------------------///
	asyncLoadContent.prototype = {
		//Banking Async load methods
		load : function (sender,loadObj) {
			
			//Set load object method
			loadObj.method = sender;
			
			//Set load async method
			loadObj.async = true;
			
			//Set load object method
			loadObj.validate = (loadObj.validate) ? true: false;
			
			//Disable initHtmlTemplates
			loadObj.initHtmlTemplates = false;
			
			//Disable initPageEvents
			loadObj.initPageEvents = false;
			
			//Get ajax load defaults
			loadObj = fnb.hyperion.controller.getAjaxLoadDefaults(loadObj);
			
			//Run callback if needed
			fnb.hyperion.controller.executeCallback(loadObj.preLoadingCallback,loadObj);
			
			//Set loadObj data-type
			loadObj.dataType = 'html';
			
			//Append loadObj with target parameters
            loadObj = fnb.hyperion.utils.ajax.parameters.get(loadObj);

			//Append loadObj.utl with target parameters
			loadObj = fnb.hyperion.utils.ajax.parameters.getUrlParameters(loadObj);

			//Make request
			fnb.hyperion.ajax.request(loadObj);
			
		},
		//Ajax standard loadPage Method
		success : function (sender,loadObj) {
			
			//Callback for when load has finished
			function jsLoadComplete(){
			
				//Eval js scripts
				fnb.hyperion.load.evalScripts(scripts.scripts);

				//Try send tracking information
				try{
					fnb.hyperion.utils.tracking.checkTrackingObject(sender,loadObj);
				}catch(e){
					console.log("Hyperion Tracking Error: "+e);
				}
				
				//Run callback if needed
	        	fnb.hyperion.controller.executeCallback(loadObj.postLoadingCallback,loadObj);
				
				//Reset xhr
				fnb.hyperion.ajax.xhr = '';

				//Notify Controller to raise Ready event
				fnb.hyperion.controller.raiseEvent(loadObj.method+'Ready', loadObj);
				
			}

			//Get html script tags and clean html
        	var scripts = fnb.hyperion.load.collectScripts(loadObj.data);

        	//Get html css tags and clean html
        	var css = fnb.hyperion.load.collectCss(scripts.html);

			//Import css
			if(css.imports.length>0) fnb.hyperion.load.css(css.imports);
				
			//Append target content
			fnb.hyperion.utils.ajax.content.set(loadObj, css);
			
			//Test for scripts to load
			if(scripts.imports.length>0){
	        	fnb.hyperion.load.js(scripts.imports, jsLoadComplete);
			}else{
				jsLoadComplete();
			}
			
		},
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.functions.ajax.asyncLoadContent = {};
        }
	};
	//Namespace ajax functions
	fnb.namespace('functions.ajax.asyncLoadContent', asyncLoadContent, true);
})();