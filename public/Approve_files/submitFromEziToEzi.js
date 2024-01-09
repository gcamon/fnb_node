///-------------------------------------------///
/// developer: Donovan
///
/// Banking Submit from page function
///-------------------------------------------///
///-------------------------------------------///
(function() {
	///-------------------------------------------///
	/// Banking Submit from page Parent function
	///-------------------------------------------///
	function submitFromEziToEzi() {
			
	};
	///-------------------------------------------///
	/// Banking Submit from page Methods
	///-------------------------------------------///
	submitFromEziToEzi.prototype = {
		
		//Ajax standard Submit from page Method
		submit : function (method, loadObj) {

			//Set default async param to true
			loadObj.async = true;

			//Append loadObj with target parameters
			loadObj = fnb.hyperion.utils.ajax.parameters.get(loadObj);

			//Ajax post data
			fnb.hyperion.controller.ajax("loadEzi.load", method , loadObj);
		},
		//Ajax standard Submit from page Success
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
				
				//Check load object initial page settings
				fnb.hyperion.controller.checkLoadObjSettings(loadObj);

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
	    	fnb.hyperion.functions.ajax.submitFromPage = {};
	    }
	};
	//Namespace ajax functions
	fnb.namespace('functions.ajax.submitFromEziToEzi', submitFromEziToEzi, true);
})();