///-------------------------------------------///
/// developer: Mike Stott
///
/// Action Menu Object
///-------------------------------------------///
(function() {
    //Bind event for current object
	function bindEvents() {
    	//List of events for this module
    	var events = [{type: 'frame', listener: document, events:'click', selector: '[data-role="actionMenuBttLabelWrapper"]', handler: 'fnb.hyperion.controller.raiseEvent("showActionMenu");', preventDefault: true},
    	{type: 'frame', listener: document, events:'click', selector: '[data-role="actionMenuGridCol"] a', handler: 'fnb.hyperion.utils.actionMenu.navigateToUrl(event)', preventDefault: true}];
    	
    	//Append events to actions module
    	fnb.hyperion.actions.addEvents(events);
    };
	///-------------------------------------------///
	/// Action Menu Parent function
	///-------------------------------------------///
	function actionMenu() {
		
	};
	///-------------------------------------------///
	/// Action Menu Methods
	///-------------------------------------------///
	actionMenu.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Is Action Menu currently active
		active:false,
		//Does the actionmenu have content
		hasMenu:false,
		//Does the actionmenu have content
		buttonVisible:false,
		//Does the actionmenu have content
		actionMenu:false,
		//Init Action Menu
    	init: function () {
    		console.log('Utils Action Menu init');
    		//Bind events for action menu
    		bindEvents();
        },
		//Show Action Menu
		show : function() {
			//If Action Menu is not active display it
			if(!this.active){
				//Update flag
				this.active = true;
				//Change label wrapper Styling
				fnb.hyperion.controller.actioMenuButtonLabelWrapper.parent().addClass('actionMenuBttLabelWrapperExpanded');
				//Get page scroll position to reset later
				fnb.hyperion.controller.getScrollPosition(document.body);
				//Check for page wrapper
				var pageWrapper = fnb.hyperion.controller.pageContentContainerElement.find('.pageWrapper');
				//Change pageContentContainerElement visibility data attribute
				if(pageWrapper.length()>0) pageWrapper.hide();
				//Scroll window to top
				fnb.hyperion.controller.scrollTo(0,0);
				//Change actionMenuElement visibility data attribute
				this.actionMenu.show();
				//Select Url Wrapper
				var actionMenuColumns = this.actionMenu.find('.actionMenuCol');
				//Select Url Wrapper
				var urlWrapper = this.actionMenu.find('.actionMenuUrlWrapper');
				//Developer: Donovan for old frame
				if(urlWrapper.length()>0) urlWrapper.removeClass('visibleContent');
				if(actionMenuColumns.length()>0) actionMenuColumns.removeClass('displayNone');

			}else{
				//Hide action menu
				fnb.hyperion.controller.raiseEvent("hideActionMenu");
				//Prevent default
				return false;
			}
		},
		//Hide Action Menu
		hide : function() {
			//If Action Menu is active hide it
			if(this.active){
				//Update flag
				this.active = false;
				//Change label wrapper Styling
				fnb.hyperion.controller.actioMenuButtonLabelWrapper.parent().removeClass('actionMenuBttLabelWrapperExpanded');
				//Change actionMenuElement visibility data attribute
				this.actionMenu.hide();
				//Check for page wrapper
				var pageWrapper = fnb.hyperion.controller.pageContentContainerElement.find('.pageWrapper');
				//Change pageContentContainerElement visibility data attribute
				if(pageWrapper.length()>0) pageWrapper.show();
				//Reset page scroll position 
				fnb.hyperion.controller.setScrollPosition(document.body);
			}
		},
		//Show Action Menu button
		showButton : function() {
			//Test if button is not visible and action menu has content
			if(this.hasActionMenu()&&!this.buttonVisible){
                // Update Menu with text from subtabs, or from top menu in case there's no subtab
                // ex: "My Accounts Menu"
                var tabTextToUse = $("#subTabsContainer div.subTab.active").text();
                if(tabTextToUse == ""){
                    tabTextToUse = $("#topTabs span.topTabSelected").text();
                }
                $("#actionMenuBttLabel").html(tabTextToUse  + " Menu");

				//Set button visible flag
				this.buttonVisible = true;
				//Show action menu button
				fnb.hyperion.controller.actioMenuButtonLabelWrapper.removeClass('HoffScreen');
			}
		},
		//Hide Action Menu button
		hideButton : function() {
			//Test if button is visible
			if(this.buttonVisible){
				//Set button visible flag
				this.buttonVisible = false;
				//Hide action menu button
				fnb.hyperion.controller.actioMenuButtonLabelWrapper.addClass('HoffScreen');
			}
		},
		//Navigate to url
		navigateToUrl : function(event) {
			//Grab the url off the element
			var url = event.target.attr('href');
			if(url && url != '#') fnb.hyperion.controller.raiseEvent("loadPage",{url: url});
		},
		//Show Action Menu button
		hasActionMenu : function() {
        	//Select action menu
        	this.actionMenu = fnb.hyperion.$("#actionMenu");
			//Test if actionmenu was found
			if(this.actionMenu.length()>0){
				return true;
			}
			
			return false;
		},
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.actionMenu = {};
        }
	};

	//Namespace actionMenu
	fnb.namespace('utils.actionMenu', actionMenu, true);

})();
