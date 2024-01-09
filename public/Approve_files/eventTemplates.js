///-------------------------------------------///
/// developer: Donovan
///
/// APP Event Templates Object
///-------------------------------------------///
fnb.hyperion.appTemplates = {
	'loadSite' : [
   			{
   				'callBack' : 'fnb.hyperion.controller.ajax("loadPage.load", sender , loadObj)',
   				'params' : 'sender, loadObj'
   			}],
	'loadSiteSuccess' : [
 	        {
 	        	'callBack' : 'fnb.hyperion.controller.ajax("loadIntoPage.success", sender, loadObj)',
 	        	'params' : 'sender, loadObj'
 	        },
 	        {
				'callBack' : 'fnb.controls.controller.createPageObj(_body);'
			},
 	        {
				'callBack' : 'fnb.utils.mobile.properties.init();'
			}],
	'loadHome' : [
   			{
				'callBack' : 'fnb.hyperion.utils.topTabs.init();'
			},
			{
   				'callBack' : 'fnb.hyperion.controller.ajax("loadPage.load", sender , loadObj)',
   				'params' : 'sender, loadObj'
   			}],
	'loadHomeSuccess' : [
 	        {
 	        	'callBack' : 'fnb.hyperion.controller.ajax("loadPage.success", sender, loadObj)',
 	        	'params' : 'sender, loadObj'
 	        },
			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
			},
 	        {
				'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup);'
			}],
	'siteLoaded' : [
 			{
 				'callBack' : 'fnb.hyperion.controller.initBrowserExtentions();'
 			},
			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
			}],
	'loadEzi' : [
 			{
 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'
 			},
 			{
 				'callBack' : 'fnb.hyperion.utils.actionMenu.hideButton()'
 			},
 			{
 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
 			},
 			{
 				'callBack' : 'fnb.hyperion.controller.raiseEvent("popupHide")'
 			},
 			{
				'callBack' : 'fnb.hyperion.controller.eziPageContentElement.hide()'
			},    
			{
				'callBack' : 'fnb.hyperion.progress.startEziLoader()'
			},
			{
			    'callBack' : 'fnb.hyperion.controller.ajax("loadEzi.load", sender , loadObj)','params' : 'sender, loadObj'
		    },
 			{
 				'callBack' : 'fnb.hyperion.utils.eziPanel.show()'
 			},
 			{
 				'callBack' : 'fnb.hyperion.utils.eziPanel.removeSalesEziOverride()'
 			}],
	'loadSalesEzi' : [
	 			{
	 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'
	 			},
	 			{
	 				'callBack' : 'fnb.hyperion.utils.actionMenu.hideButton()'
	 			},
	 			{
	 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
	 			},
	 			{
	 				'callBack' : 'fnb.hyperion.controller.raiseEvent("popupHide")'
	 			},
	 			{
					'callBack' : 'fnb.hyperion.controller.eziPageContentElement.hide()'
				},    
				{
					'callBack' : 'fnb.hyperion.progress.startEziLoader()'
				},
				{
				    'callBack' : 'fnb.hyperion.controller.ajax("loadEzi.load", sender , loadObj)','params' : 'sender, loadObj'
			    },
	 			{
	 				'callBack' : 'fnb.hyperion.utils.eziPanel.show()'
	 			},
	 			{
	 				'callBack' : 'fnb.hyperion.utils.eziPanel.addSalesEziOverride()'
	 			}],
    'loadEziSuccess' : [
			{
			    'callBack' : 'fnb.hyperion.controller.ajax("loadIntoPage.success", sender,loadObj)','params' : 'sender, loadObj'
            }],
    'loadSalesEziSuccess' : [
			{
			    'callBack' : 'fnb.hyperion.controller.ajax("loadIntoPage.success", sender,loadObj)','params' : 'sender, loadObj'
            }],
    'loadEziReady' : [
	        {
			    'callBack' : 'fnb.hyperion.progress.stop()'
			},
			{
				'callBack' : 'fnb.hyperion.controller.raiseEvent("hideOverlay")'
			},
			{
				'callBack' : 'fnb.hyperion.controller.eziPageContentElement.show()'
			},
			{
				'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.eziFooterButtonGroup)'
			}],	
	'loadSalesEziReady' : [
	        {
			    'callBack' : 'fnb.hyperion.progress.stop()'
			},
			{
				'callBack' : 'fnb.hyperion.controller.raiseEvent("hideOverlay")'
			},
			{
				'callBack' : 'fnb.hyperion.controller.eziPageContentElement.show()'
			},
			{
 				'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.eziFooterButtonGroup)'
 			}],			
	'pageHideEzi' : [
			{
				'callBack' : 'fnb.hyperion.controller.raiseEvent("hideEzi")'
			},
			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
			}],
	'hideEzi' : [
   			{
				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
			},
			{
				'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'
			},
			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
			},
			{
				'callBack' : 'fnb.hyperion.utils.eziPanel.hide()'
			}],
	'loadPage' : [
	        {
			    'callBack' : 'fnb.hyperion.utils.notifications.hide()'
			},
			{
	        	 'callBack' : '_datePicker.hide(false,false)'
	        },
			{
	        	 'callBack' : 'fnb.hyperion.forms.datePicker.hide()'
	        },
	        {
	        	 'callBack' : 'fnb.hyperion.controller.raiseEvent("hideError")'	        	 
	        },               
			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.hideButton()'
			},
			{
				'callBack' : 'fnb.hyperion.utils.eziPanel.hide()'
			},
			{
				'callBack' : 'fnb.hyperion.utils.menu.hide()'
			},
			{
			   	'callBack' : 'fnb.hyperion.controller.raiseEvent("hideActionMenu")'
			},
			{
			    'callBack' : 'fnb.hyperion.utils.footer.hide()'
			},
			{
			    'callBack' : 'fnb.hyperion.controller.raiseEvent("showOverlay")'
			}, 
			{
				'callBack' : 'fnb.hyperion.progress.start()'
			},
			{
				'callBack' : 'fnb.hyperion.controller.ajax("loadPage.load", sender , loadObj)',
				'params' : 'sender, loadObj'
			}],
	'loadPageSuccess' : [
 	        {
				'callBack' : 'fnb.functions.footer.clear()'
			},
			{
			    'callBack' : 'fnb.hyperion.utils.error.regenerateCaptchaA()'
			},
			{
	        	 'callBack' : 'fnb.hyperion.controller.ajax("loadPage.success", sender,loadObj)',
	        	 'params' : 'sender, loadObj'
	        }],
	'loadPageReady' : [
			 {
				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
			 },
	         {
			    'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'
			 },
			 {
				'callBack' : 'fnb.hyperion.controller.raiseEvent("hideOverlay")'
			 },
			 {
				'callBack' : 'fnb.hyperion.progress.stop()'
			 },
			 {
 				'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
 			 }],
	'loadPageError' : [
	         ],
	'loadPopup' : [
 			{
 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'
 			},
 	        {
 	        	 'callBack' : 'fnb.hyperion.controller.raiseEvent("hideError")'	        	 
 	        },               
			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.hideButton()'
			},
 			{
 			    'callBack' : 'fnb.hyperion.utils.notifications.show()'
 			},
 			{
 				'callBack' : 'fnb.hyperion.controller.ajax("loadPopup.load", sender , loadObj)',
 				'params' : 'sender, loadObj'
 			}],
	'loadPopupSuccess' : [
   	         {
   	        	 'callBack' : 'fnb.hyperion.controller.ajax("loadPopup.success", sender,loadObj)',
   	        	 'params' : 'sender, loadObj'
   	         }],
	'popupHide' : [
			{
				'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'
			},
			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
			},		
			{
			    'callBack' : 'fnb.hyperion.utils.notifications.hide()'
			}],
	'submitFromPage' : [
			{
	        	 'callBack' : '_datePicker.hide(false,false)'	        	 
	        },
	        {
			    'callBack' : 'fnb.hyperion.utils.notifications.hide()'
			},
	        {
	        	 'callBack' : 'fnb.hyperion.controller.raiseEvent("hideError")'	        	 
	        },
	        {
			   	'callBack' : 'fnb.hyperion.controller.raiseEvent("hideEzi")'
			},
			{
			   	'callBack' : 'fnb.hyperion.controller.raiseEvent("hideActionMenu")'
			},
 			{
 				'callBack' : 'fnb.hyperion.utils.actionMenu.hideButton()'
 			},
			{
				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'
			},
			{
			    'callBack' : 'fnb.hyperion.controller.raiseEvent("showOverlay")'
			}, 
			{
				'callBack' : 'fnb.hyperion.progress.start()'
			},
			{
				'callBack' : 'fnb.hyperion.controller.ajax("submitFromPage.submit", sender , loadObj)',
				'params' : 'sender, loadObj'
			}],
	'submitFromPageSuccess' : [         
   			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.hideButton()'
			},
			{
			    'callBack' : 'fnb.hyperion.utils.error.regenerateCaptchaA()'
			},
	        {
	        	 'callBack' : 'fnb.hyperion.controller.ajax("submitFromPage.success", sender,loadObj)',
	        	 'params' : 'sender, loadObj'
	        }],
	'submitFromPageReady' : [
 	         {
 			    'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'
 			 },
 			 {
 				'callBack' : 'fnb.hyperion.controller.raiseEvent("hideOverlay")'
 			 },
 			 {
 				'callBack' : 'fnb.hyperion.progress.stop()'
 			 },
			 {
 				'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
 			 }],
	'submitFromPageError' : [
			{
				'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
			}],
	'submitFromEziToEzi' : [			       
			{
 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
 			},
 			{
				'callBack' : 'fnb.hyperion.controller.eziPageContentElement.hide()'
			},
			{
				'callBack' : 'fnb.hyperion.progress.startEziLoader()'
			},
			{
				'callBack' : 'fnb.hyperion.controller.ajax("submitFromEziToEzi.submit", sender , loadObj)',
				'params' : 'sender, loadObj'
			},
 			{
 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
 			}],
	'submitFromEziToEziSuccess' : [ 
			{
			    'callBack' : 'fnb.hyperion.utils.error.regenerateCaptchaA()'
			},        
	   	    {
	        	 'callBack' : 'fnb.hyperion.controller.ajax("submitFromEziToEzi.success", sender,loadObj)',
	        	 'params' : 'sender, loadObj'
	        }],
	'submitFromEziToEziReady' : [
			{
                 'callBack' : 'fnb.hyperion.progress.stop()'
			},
 			{
				'callBack' : 'fnb.hyperion.controller.eziPageContentElement.show()'
			},
			{
				'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.eziFooterButtonGroup)'
			}],
	'submitFromEziToPage' : [			       
 			{
  				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
  			},
  			{
 				'callBack' : 'fnb.hyperion.controller.eziPageContentElement.hide()'
 			},
 			{
 				'callBack' : 'fnb.hyperion.progress.startEziLoader()'
 			},
 			{
 				'callBack' : 'fnb.hyperion.controller.ajax("submitFromPage.submit", sender , loadObj)',
 				'params' : 'sender, loadObj'
 			},
  			{
  				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
  			}],
 	'submitFromEziToPageSuccess' : [ 
 			{
			    'callBack' : 'fnb.hyperion.utils.error.regenerateCaptchaA()'
			}, 
 	   	    {
 	        	 'callBack' : 'fnb.hyperion.controller.ajax("submitFromPage.success", sender,loadObj)',
 	        	 'params' : 'sender, loadObj'
 	        }],
 	'submitFromEziToPageReady' : [
 			{
                  'callBack' : 'fnb.hyperion.progress.stop()'
 			},
 			 {
 				 'callBack' : 'fnb.hyperion.controller.raiseEvent("hideEzi")'
 			 },
 			 {
 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
 			 },
 			{
 				 'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'
 			}],
 	'submitFromPageToEzi' : [			       
  			{
 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'
 			},
 			{
 				'callBack' : 'fnb.hyperion.utils.actionMenu.hideButton()'
 			},
 			{
 				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
 			},
 			{
 				'callBack' : 'fnb.hyperion.controller.raiseEvent("popupHide")'
 			},
 			{
				'callBack' : 'fnb.hyperion.controller.eziPageContentElement.hide()'
			},    
			{
				'callBack' : 'fnb.hyperion.progress.startEziLoader()'
			},
			{
			    'callBack' : 'fnb.hyperion.controller.ajax("loadEzi.load", sender , loadObj)','params' : 'sender, loadObj'
		    },
 			{
 				'callBack' : 'fnb.hyperion.utils.eziPanel.show()'
 			},			
			{
				'callBack' : 'fnb.hyperion.controller.ajax("submitFromPage.submit", sender , loadObj)',
				'params' : 'sender, loadObj'
			}],
	'submitFromPageToEziSuccess' : [ 
			{
		    'callBack' : 'fnb.hyperion.utils.error.regenerateCaptchaA()'
			}, 
	   	    {
	        	 'callBack' : 'fnb.hyperion.controller.ajax("submitFromPage.success", sender,loadObj)',
	        	 'params' : 'sender, loadObj'
	        }],
	'submitFromPageToEziReady' : [
  	        {
			    'callBack' : 'fnb.hyperion.progress.stop()'
			},
			{
				'callBack' : 'fnb.hyperion.controller.raiseEvent("hideOverlay")'
			},
			{
				'callBack' : 'fnb.hyperion.controller.eziPageContentElement.show()'
			},
			{
 				'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.eziFooterButtonGroup)'
 			}],
	'asyncLoadContent' : [
   			{
   				'callBack' : 'fnb.hyperion.controller.ajax("asyncLoadContent.load", sender , loadObj)',
   				'params' : 'sender, loadObj'
   			}],
   	'asyncLoadContentSuccess' : [
   	         {
   	        	 'callBack' : 'fnb.hyperion.controller.ajax("asyncLoadContent.success", sender,loadObj)',
   	        	 'params' : 'sender, loadObj'
   	         }],
 	'showTimeOut' : [
 	    	 {
	        	 'callBack' : '_datePicker.hide(false,false)'	        	 
	         },
	         {
 	   			'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'
 	   		 },
 	    	 {
	   			'callBack' : 'fnb.hyperion.utils.actionMenu.hideButton()'
 	    	 },
 	         {
			  	 'callBack' : 'fnb.hyperion.controller.disbaleTopMenu();',
			  	 'params' : 'sender, loadObj'
			 },
   	         {
   	        	 'callBack' : 'fnb.hyperion.utils.timeOut.show();',
   	        	 'params' : 'sender, loadObj'
   	         }],
   	'hideTimeOut' : [
	    	 {
	   			'callBack' : 'fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'
	   		 },
	    	 {
	   			'callBack' : 'fnb.hyperion.utils.actionMenu.showButton()'
	    	 },
  	         {
			  	 'callBack' : 'fnb.hyperion.controller.enableTopMenu();',
			  	 'params' : 'sender, loadObj'
			 },
   	         {
   	        	 'callBack' : 'fnb.hyperion.utils.timeOut.hide();',
   	        	 'params' : 'sender, loadObj'
   	         }],
 	'logOffTimeOut' : [
   	         {
   	        	 'callBack' : 'fnb.hyperion.utils.timeOut.hide();',
   	        	 'params' : 'sender, loadObj'
   	         },
   	         {
   	        	 'callBack' : 'fnb.hyperion.utils.timeOut.logOff();',
   	        	 'params' : 'sender, loadObj'
   	         }],
   	'download' : [
   	   		 {
   	   		   	 'callBack' : 'fnb.hyperion.controller.raiseEvent("hideActionMenu")'
   	   		 },
   	   	 	 {
   	   	 		'callBack' : 'fnb.hyperion.controller.raiseEvent("hideOverlay")'
   	   	 	 },
   	   		{
   	   	 		'callBack' : 'fnb.hyperion.controller.openWindow(loadObj)',
   	   	 		'params' : 'sender, loadObj'
   	   		 }],
  	'eziLoadPrintDiv' : [			       
   			{
				'callBack' : 'fnb.hyperion.controller.raiseEvent("hideEzi")'
			},
			{
				'callBack' : 'fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'
			},
   			{
   				'callBack' : 'fnb.hyperion.controller.ajax("loadPage.load", sender , loadObj)',
   				'params' : 'sender, loadObj'
   			}],
 	'eziLoadPrintDivSuccess' : [
 	        {
 	        	 'callBack' : 'fnb.hyperion.controller.ajax("loadIntoPage.success", sender, loadObj)',
 	        	 'params' : 'sender, loadObj'
 	        }],
   	'eziLoadPrintDivReady' : [         
      	    {
	           	'callBack' : 'window.open("/banking/printPage.jsp");'
            }],
	'printPage' : [
	  		{
 				'callBack' : 'fnb.hyperion.functions.print.go(loadObj);',
 				'params' : 'sender, loadObj'
	     	}],
	'asyncSubmitContent' : [
	        {
	    		'callBack' : 'fnb.hyperion.controller.ajax("submitFromPage.submit", sender , loadObj)',
	    		'params' : 'sender, loadObj'
	    	}],
	'asyncSubmitContentSuccess' : [
	        {
	       	    'callBack' : 'fnb.hyperion.controller.ajax("asyncLoadContent.success", sender,loadObj)',
	    	    'params' : 'sender, loadObj'
	    	}],
	'instantSalesCancel' : [
			{
				'callBack' : 'fnb.hyperion.controller.raiseEvent("postToUrl",{url:loadObj.url});',
				'params' : 'sender, loadObj'
			},
			{
				'callBack' : 'fnb.hyperion.controller.raiseEvent("hideEzi")'
			}],
	'hidePopup' : [{
				'callBack' : 'fnb.controls.controller.eventsObject.raiseEvent("popupActionMenuClose","");'	
				}],
	'openWindow' : [
			{
				'callBack' : 'fnb.hyperion.controller.openWindow(loadObj);',
				'params' : 'sender, loadObj'
			}]
};
