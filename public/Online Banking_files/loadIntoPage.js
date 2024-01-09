///-------------------------------------------///
/// developer: Donovan
///
/// Banking Default Load into a function
///-------------------------------------------///
(function() {
	///-------------------------------------------///
	/// Banking Load into a page Parent function
	///-------------------------------------------///
	function loadIntoPage() {
			
	};
	///-------------------------------------------///
	/// Banking Load into a page Methods
	///-------------------------------------------///
	loadIntoPage.prototype = {
		//Banking Default Load into a page methods
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
        	fnb.hyperion.functions.ajax.loadIntoPage = {};
        }
	};
	//Namespace ajax functions
	fnb.namespace('functions.ajax.loadIntoPage', loadIntoPage, true);
})();