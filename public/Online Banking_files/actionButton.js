///-------------------------------------------///
/// developer: Donovan
///
/// Table action buttons Module
///-------------------------------------------///
(function() {
    ///-------------------------------------------///
	/// ActionButtons Parent function
	///-------------------------------------------///
	function actionButton() {
		
	};
	///-------------------------------------------///
	/// ActionButtons Methods
	///-------------------------------------------///
	actionButton.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Var for when tooltip is already active
		active: false,
		//TooltipEl
		TooltipEl:'',
		//Var for active tooltip
		activeTooltip: "",
		//Init FNB ActionButtons
    	init: function () {
    		console.log('Utils Table actionButton init');
    		//Attach event to page load complete event sequence
    		fnb.hyperion.controller.attachPageEvent('fnb.hyperion.utils.table.actionButton.reset()','');
        },
        //Show tooltip with button options
        show : function(target) {

        	//Test if tooltip is active
        	if(this.active==false){
        	   	//Select action button target
            	var actionTarget = fnb.hyperion.$(target);
            	//Get target id
            	var targetId = actionTarget.attr("id");
            	//Select action button parent
            	var actionTargetParent = actionTarget.parent();
            	// get Parent X position
            	var parentPosition = actionTargetParent.position();
            	//get Actionwrapper width.
            	var parentWidth = actionTargetParent.outerWidth();

            	//Find tooltip and show it
            	this.activeTooltip = actionTargetParent.find('#'+targetId+'toolTipListMessage');

            	//Test if a tooltip was found
            	if(this.activeTooltip.length()>0){
            		
               		//Show tooltip
            		this.activeTooltip.show();
              		
            		//Get button position
            		var buttonPos = actionTarget.position();

            		//Get tooltip height to calculate position
            		var activeTooltipHeight = this.activeTooltip.outerHeight();
            		
            		//Get tooltip width to calculate position
            		var activeTooltipWidth = this.activeTooltip.outerWidth();

            		//Get button heught
            		var targetHeight = actionTarget.outerHeight();
            		
            		//Calculate bottom styling offset
            		var bottomPos = (activeTooltipHeight/2)-(targetHeight/2);

            		//Calculate final bottom pos
            		var yPos =(buttonPos.objectPosY+buttonPos.pageScroll.pageScrollY)-bottomPos;
            		
            		//Calculate Parent Absolute Right x position
                 	var parentRightPosX = parentPosition.objectPosX+parentWidth;
            		
            		var xPos = (parentRightPosX - buttonPos.objectPosX)+8;
            		//Add positions
            		this.activeTooltip.css({'right': xPos+'px', 'top': '-'+bottomPos+'px'})

                	//Set Active flag
                	this.active = true;
            	};

        	}else{
        		//If you click again hide the tooltip
        		this.hide();
        	}

        },
        //Hide tooltip with button options
        hide : function() {
        	
        	//Hide Tooltip
        	if(this.active){
        		
            	//Hide tooltip
            	this.activeTooltip.hide();
            	
            	//Set Active flag
            	this.active = false;
        	}

        },
        //Reset active state
        reset : function() {

        	//Set Active flag
        	this.active = false;
        	
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.table.actionButton = {};
        }
	};

	//Namespace textArea
	fnb.namespace('utils.table.actionButton', actionButton, true);

})();