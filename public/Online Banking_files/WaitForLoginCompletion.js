$(function() {
	
	function genericPageObject() {
		this.configObject = {};
	}
	genericPageObject.prototype = {
			
		init : function(dataSource) {
			var parent = this;
			parent.configObject = dataSource;
			parent.pageLoaded();
		}, 
			
		pageLoaded : function() {
			this.pollForLoginCompletion();	
		},
		
		pollForLoginCompletion: function(){
			var parent = this;
			setTimeout(parent.doAJAXcall.bind(this),1100);
		},
		
		doAJAXcall:function(){
			$.get( "/banking/Controller?nav=login.HasLoginProcessCompleted", function(response) {
				fnb.controls.controller.eventsObject.raiseEvent('loadUrlToWorkspace', {url: '/banking/Controller?nav=navigator.ToHome&loginCompleted=true'});
			});
		},
	},
	namespace("fnb.login.WaitForLoginCompletion",genericPageObject); 		
});
	