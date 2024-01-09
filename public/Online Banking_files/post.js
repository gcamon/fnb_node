///-------------------------------------------///
/// developer: Donovan
///
/// Banking Default Post function
///-------------------------------------------///
(function() {
	///-------------------------------------------///
	/// Banking Post Parent function
	///-------------------------------------------///
	function post() {
			
	};
	///-------------------------------------------///
	/// Banking Post Methods
	///-------------------------------------------///
	post.prototype = {
		//Banking Default Load banking methods
		send : function (sender,loadObj) {
			
			//Set load object method
			loadObj.method = sender;
			
			//Set load async method
			loadObj.async = true;
						
			//Set loadObj data-type
			loadObj.dataType = 'html';
			
			//Get ajax load defaults
			loadObj = fnb.hyperion.controller.getAjaxLoadDefaults(loadObj);	
			
			//Run callback if needed
			fnb.hyperion.controller.executeCallback(loadObj.preLoadingCallback,loadObj);
			
			//Make request
			fnb.hyperion.ajax.request(loadObj);
		},
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.functions.ajax.post = {};
        }
	};
	//Namespace ajax functions
	fnb.namespace('functions.ajax.post', post, true);
})();