///-------------------------------------------///
/// developer: Donovan
///
/// Banking Default Load Page function
///-------------------------------------------///
(function() {
	///-------------------------------------------///
	/// Banking Load Page Parent function
	///-------------------------------------------///
	function loadPage() {
			
	};
	///-------------------------------------------///
	/// Banking Load Page Methods
	///-------------------------------------------///
	loadPage.prototype = {
		//Banking Default Load banking methods
		load : function (sender,loadObj) {
			
			//Set load object method
			loadObj.method = sender;
			
			//Get ajax load defaults
			loadObj = fnb.hyperion.controller.getAjaxLoadDefaults(loadObj);
			
			//Set loadObj data-type
			loadObj.dataType = 'html';
			
			//Stop previous request
			fnb.hyperion.ajax.stop(sender);
			
			//Reset ajax object
			fnb.hyperion.ajax.reset();

			//Run callback if needed
			fnb.hyperion.controller.executeCallback(loadObj.preLoadingCallback,loadObj);
			
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
				
				//Check load object initial page settings
				fnb.hyperion.controller.checkLoadObjSettings(loadObj);
				
				//Reset xhr
				fnb.hyperion.ajax.xhr = '';

				//Notify Controller to raise Ready event
				fnb.hyperion.controller.raiseEvent(loadObj.method+'Ready', loadObj);
			}
			
			//Clear js in head
			fnb.hyperion.load.clearJs();
			
			//Clear css in head
			fnb.hyperion.load.clearCss();
			
			//Clear page object
			fnb.hyperion.controller.clearPageObjects();
			
			//Clear html templates
			fnb.hyperion.controller.clearHtmlTemplates(loadObj);
        	
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
	        	fnb.hyperion.load.js(scripts.imports, jsLoadComplete, loadObj);
			}else{
				jsLoadComplete();
			}

		},
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.functions.ajax.loadPage = {};
        }
	};
	//Namespace ajax functions
	fnb.namespace('functions.ajax.loadPage', loadPage, true);
})();