///-------------------------------------------///
/// developer: Donovan
///
/// Table selectAll Module
///-------------------------------------------///
(function() {
	//Bind event for current object
	function bindEvents() {
		//Add listener for click on login button
		var events = [{type: 'frame', listener: document, events:'click', selector: '.fnbTableSelectAllButton', handler: 'fnb.hyperion.utils.table.selectAll.select(event);'}];
      	//Append events to actions module
      	fnb.hyperion.actions.addEvents(events);
    };
	///-------------------------------------------///
	/// selectAll Parent function
	///-------------------------------------------///
	function selectAll() {
		
	};
	///-------------------------------------------///
	/// selectAll Methods
	///-------------------------------------------///
	selectAll.prototype = {
		//Var for frame to auto initialize module
		autoInit: true,
		//Init FNB Search
    	init: function () {
    		console.log('Utils Table selectAll init');
    		//Bind subTabs events
    		bindEvents();
        },
        //selectAll from column table contents
        select : function(event) {
        	
        	//Get target button
        	var target = fnb.hyperion.$(event.currentTarget);
        	
        	//Get button label wrapper
        	var buttonLabelWrapper = target.find('.fnbTableActionHeaderButtonLabel');
        	
        	//Setup button label text
        	var buttonLabelText = (buttonLabelWrapper.html()=='Select All') ? 'Deselect All' : 'Select All';
        	
        	//Set new label
        	buttonLabelWrapper.html(buttonLabelText);
        	
        	//Get target value
        	var dataValue = target.attr('data-value');
        	
        	//Get params
        	var params = dataValue.split(':');
        	
        	//Select parent table
        	var parentTable = fnb.hyperion.$(params[0]);
        	
        	//Loop and find the column that needs to be selected
        	parentTable.find('.'+params[1]).each(function(element, index){  
        		
        		//Check if the column contains a checkbox
        		if(element.hasClass('fnbTableCheckBoxItem')){

        			//Get checkbox element
        			var checkBoxElement = element.find('.checkBox');
        			if(buttonLabelText == 'Deselect All'){
						fnb.hyperion.forms.checkBox.setChecked(checkBoxElement);
        			}else{
        			   fnb.hyperion.forms.checkBox.setUnChecked(checkBoxElement);
        			}
        		}
   
        	});  
        	
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.utils.table.selectAll = {};
        }
	};

	//Namespace textArea
	fnb.namespace('utils.table.selectAll', selectAll, true);

})();