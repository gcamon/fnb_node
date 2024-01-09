///-------------------------------------------///
/// developer: Donovan
///
/// Print Object
///-------------------------------------------///
(function() {
    ///-------------------------------------------///
	/// Print Parent function
	///-------------------------------------------///
	function print() {

	};
	///-------------------------------------------///
	/// Print Methods
	///-------------------------------------------///
	print.prototype = {
		//Var for frame to auto initialize module
		autoInit: false,
		//Init FNB Print
    	init: function () {
    		
        },
        //Run print
        go: function (loadObj) {
		
        	//Test if target got passed otherwise print window
        	if(typeof loadObj.target!="undefined"){

        		//Get target html
        		var data = (typeof loadObj.target == "string") ? (fnb.hyperion.$(loadObj.target).length()>0) ? fnb.hyperion.$(loadObj.target).html() : "" : loadObj.target.html();
        		
        		//Get window dimentions
        		var windowDimentions = this.getWindowDimentions();
        		
        		//Get window width
        		var windowWidth = windowDimentions.width;

        		//Get window height
        		var windowHeight = windowDimentions.height;
        		
        		//Create print window
        		var printWin = window.open('','FNB Print','width='+windowWidth+',height='+windowHeight);
        		
        		//Create Head and title
        		printWin.document.write('<HTML>\n<HEAD>\n');
        		printWin.document.write('<TITLE>FNB Print Page</TITLE>\n');
        		
        		//Add script to check if the window is rady to print and the window ready to close
        		printWin.document.write('<script>\n');
        		printWin.document.write('function chkstate(){\n');
        		printWin.document.write('if(document.readyState=="complete"){\n');
        		printWin.document.write('window.close()\n');
        		printWin.document.write('}\n');
        		printWin.document.write('else{\n');
        		printWin.document.write('setTimeout("chkstate()",2000)\n');
        		printWin.document.write('}\n');
        		printWin.document.write('}\n');
        		printWin.document.write('function print_win(){\n');
        		printWin.document.write('window.print();\n');
        		printWin.document.write('chkstate();\n');
        		printWin.document.write('}\n')
        		printWin.document.write('<\/script>\n');
        		
        		//Add css imports Print.css and core.css
        		printWin.document.write('<link rel="stylesheet" href="/banking/01css_new/global/core.css" type="text/css" />');
        		printWin.document.write('<link rel="stylesheet" href="/banking/01css_new/global/print.css" type="text/css" />');
        		
        		//Close head
        		printWin.document.write('</HEAD>\n');
        		
        		//Create Body
        		printWin.document.write('<BODY onload="print_win()">\n');
        		
        		//Write data
        		printWin.document.write(data);
        		
        		//Close Body and html
        		printWin.document.write('</BODY>\n');
        		printWin.document.write('</HTML>\n');
        		
        		//Close print window
        		printWin.document.close();
        		
        	}else{
        		//Print window
        		window.print();
        	}
        },
        //Get window dimentions
        getWindowDimentions: function () {
        	//Declare window width and height vars
        	var windowWidth = 0;
        	var windowHeight = 0;
        	
        	if( typeof( window.innerWidth ) == 'number' ) {
				//Non-IE
				windowWidth = window.innerWidth;
				windowHeight = window.innerHeight;
			} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
				//IE 6+ in 'standards compliant mode'
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
				//IE 4 compatible
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}
        	
        	return {width: windowWidth, height: windowHeight};
        },
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.functions.print = {};
        }
	};

	//Namespace print
	fnb.namespace('functions.print', print, true);

})();