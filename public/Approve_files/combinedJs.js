///-------------------------------///
/// developer: Donovan
///
/// Progress bar
///-------------------------------///

var progressBar = function () {
	this.progressTimer;
	this.slowConnectionTimer;
	this.progressPosEnd;
	this.progressPos;
	this.progressInterval;
	this.progressTime;
	this.slowConnectionTime;
	this.progressActive=false;
	this.progressClass = "";
	this.percentVisible=false;
	this.target='';
	this.progressBar;
	this.progressBarPercent;
	this.progressWrapper;
	return  {
		init: function (id) {
			_this = this;
			this.target = id;
			this.progressPosEnd = Math.floor(Math.random() * (80-60+1)) + 60;
			this.progressInterval = 1;
			this.progressPos = 0;
			this.progressTime = 40;
			this.slowConnectionTime = 60000;
			this.progressBar = document.getElementById(this.target+'ProgressBar');
			this.progressBarPercent = document.getElementById(this.target+'ProgressBarPercent');
			this.progressWrapper = document.getElementById(this.target+'ProgressWrapper');
			setTimeout(_this.addClasses, 100);
			this.progressBar.style.width = 0;
			if(progressBar.progressActive==true){
				clearInterval(progressBar.progressTimer);
			}
			progressBar.createTimer();
		},
		createTimer: function () {
			progressBar.progressActive = true;
			showPos = 18;
			if(_smallPort) showPos = 30;
			this.progressTimer = setInterval (function ()
				{
					progressBar.progressPos = progressBar.progressPos + progressBar.progressInterval;
					if(progressBar.progressPos>96) progressBar.progressPos = 96;
					if(progressBar.progressPos>=progressBar.progressPosEnd){
						clearInterval(progressBar.progressTimer);
						if(progressBar.progressPos<96){
							progressBar.progressTime = progressBar.progressTime+800;
							progressBar.progressInterval = Math.floor(Math.random() * (((96 - progressBar.progressPos)/3)-1+1)) + 1;
							progressBar.progressPosEnd = Math.floor(Math.random() * (96-progressBar.progressPos+1)) + progressBar.progressPos;
							progressBar.createTimer()
						}else{
							progressBar.slowConnectionTimer = setTimeout(function(){fnb.functions.slowConnection.show();},progressBar.slowConnectionTime)
						}
					}
					progressBar.draw(progressBar.progressPos,showPos);
				}, 
				progressBar.progressTime);
		},
		draw: function (progressPos,showPos) {
			this.progressBar.style.width = progressPos+'%';
				if(progressPos<showPos){
				if(progressPos>(showPos-6)){
					this.progressBarPercent.className = 'progressBarPercent'+progressPos;
				}
			}else if(progressPos>(showPos-1)){
				this.progressBarPercent.innerHTML = progressPos+'%';
			}
		},
		addClasses: function () {
			if(progressBar.progressActive){
				if(typeof progressBar.progressClass=='undefined') progressBar.progressClass = '';
				progressBar.progressBarPercent.className = 'progressBarPercent progressBarHidden';
				progressBar.progressWrapper.className = ''+progressBar.progressClass;
			}
		},
		clear: function () {
			if(progressBar.progressActive==true){
				progressBar.progressActive = false;
				clearInterval(progressBar.progressTimer);
				if(typeof progressBar.slowConnectionTimer!='undefined') clearTimeout(progressBar.slowConnectionTimer)
				this.progressWrapper.className = 'progressBarHidden';
			}
		},
		destroy: function () {
			
		}
	};
}();

///----------------------------------------------------------------------///
/// developer: Donovan
/// JQUERY CONTAINS EXTENTION - CASE INSENSITIVE
///----------------------------------------------------------------------///
$.extend($.expr[":"], {
	"icontains": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});
///-------------------------------------------------------------///
/// developer: Donovan
/// JQUERY VERTICALLY ALIGN EXTENTION
///-------------------------------------------------------------///
(function ($) {
	$.fn.verticallyAlign = function() {
		return this.each(function(){
			var thisHeight = $(this).height();
			var parentHeight = $(this).parent().height();
			var valign = ((parentHeight/2)-(thisHeight/2));
			$(this).css("margin-top", valign + "px");
		});	
	};
})(jQuery);
///---------------------------------------------------------///
/// developer: Donovan
/// JQUERY EQUAL HEIGHTS EXTENTION
///---------------------------------------------------------///
(function ($) {
	$.fn.equalHeights = function(type,minHeight) {
		$(this).children(type).css('height','');
		var heightArray = $(this).children(type).map( function(){
			 return  $(this).height();
		}).get();
		var maxHeight = Math.max.apply( Math, heightArray);
		if(maxHeight<minHeight) maxHeight=minHeight;
		$(this).children(type).css('height',maxHeight);
		return this;
	};
})(jQuery);
///---------------------------------------------------------///
/// developer: Donovan
/// JQUERY EQUAL WIDTHS EXTENTION
///---------------------------------------------------------///
(function ($) {
	$.fn.equalWidths = function(type) {
		var widthArray = $(this).children(type).map( function(){
			 return  $(this).width();
		}).get();
		var maxWidth = Math.max.apply( Math, widthArray);
		$(this).children(type).css('min-width',maxWidth+20);
		return this;
	};
})(jQuery);
///---------------------------------------------------------///
/// developer: Donovan
/// JQUERY WAIT FOR CONTENTS TO LOAD EXTENTION
///---------------------------------------------------------///
;(function($) {
    var namespace = 'waitForContent';
    $.waitForContent = {
		//Images Types
        imageProperties: [
	        'backgroundImage',
	        'listStyleImage',
	        'borderImage',
	        'borderCornerImage',
			'background'
		//To Do: Add more data types
        ]
    };
    $.expr[':'].uncached = function(obj) {
        if ( ! $(obj).is('img[src!=""]')) {
            return false;
        }
        var img = document.createElement('img');
        img.src = obj.src;
        return ! img.complete;
    };
    $.fn.waitForContent = function(finishedCallback, eachCallback, waitAllComplete) {
		
        var allImgsLength = 0;
        var allImgsLoaded = 0;
        if ($.isPlainObject(arguments[0])) {
            eachCallback = finishedCallback.each;
            waitAllComplete = finishedCallback.waitAllComplete;
            finishedCallback = finishedCallback.finished;
        }
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;
        waitAllComplete = !! waitAllComplete;
        if ( ! $.isFunction(finishedCallback) || ! $.isFunction(eachCallback)) {
            throw new TypeError('Invalid callback.');
        }
        return this.each(function() {
            var obj = $(this);
			var allImgs = [];
            var hasImgProperties = $.waitForContent.imageProperties || [];
            var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
			
            if (waitAllComplete) {
                obj.find('*').andSelf().each(function() {
                    var element = $(this);
                    if (element.is('img:uncached')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }
                    $.each(hasImgProperties, function(i, property) {
					
                        var propertyValue = element.css(property);
						var match;
                        if ( ! propertyValue) {
                            return true;
                        }
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        };
                    });
                });
            } else {
                obj
                 .find('img:uncached')
                 .each(function() {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            };
            allImgsLength = allImgs.length;
            allImgsLoaded = 0;
            if (allImgsLength == 0) {
                finishedCallback.call(obj[0]);
            }
            $.each(allImgs, function(i, img) {
                var image = new Image;
                $(image).bind('load.' + namespace + ' error.' + namespace, function(event) {
                    allImgsLoaded++;
                    eachCallback.call(img.element, allImgsLoaded, allImgsLength, event.type == 'load');
                    if (allImgsLoaded == allImgsLength) {
                        finishedCallback.call(obj[0]);
                        return false;
                    };
                });
                image.src = img.src;
            });
        });
    };
})(jQuery)
///-------------------------------------------------------------------------------------///
/// developer: Donovan
/// JQUERY MASK CURRENCY EXTENTION
///-------------------------------------------------------------------------------------///
var runningTableTotal = 0;
var enableTotaling = false;

;(function($) {
	$.maskCurrency = {};

	$.maskCurrency.regions = [];

	$.maskCurrency.regions[''] = {
		symbol: '',
		positiveFormat: '%s%n',
		negativeFormat: '(%s%n)',
		decimalSymbol: '.',
		digitGroupSymbol: ',',
		groupDigits: true
	};

	$.fn.maskCurrency = function(destination, settings) {

		if (arguments.length == 1 && typeof destination !== "string") {
			settings = destination;
			destination = false;
		}

		var defaults = {
			name: "maskCurrency",
			colorize: false,
			region: '',
			global: true,
			roundToDecimalPlace: 2,
			eventOnDecimalsEntered: false
		};

		defaults = $.extend(defaults, $.maskCurrency.regions['']);

		settings = $.extend(defaults, settings);

		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);
		return this.each(function() {
			$this = $(this);
			var num = '0';
			num = $this[$this.is('input, select, textarea') ? 'val' : 'html']();
			if (num.search('\\(') >= 0) {
				num = '-' + num;
			}
			if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
				return;
			}
			if (isNaN(num)) {
				num = num.replace(settings.regex, '');
				if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
					return;
				}
				if (settings.decimalSymbol != '.') {
					num = num.replace(settings.decimalSymbol, '.'); 
				}
				if (isNaN(num)) {
					num = '0';
				}
			}
			var numParts = String(num).split('.');
			var isPositive = (num == Math.abs(num));
			var hasDecimals = (numParts.length > 1);
			var decimals = (hasDecimals ? numParts[1].toString() : '0');
			var originalDecimals = decimals;
			num = Math.abs(numParts[0]);
			num = isNaN(num) ? 0 : num;
			if (settings.roundToDecimalPlace >= 0) {
				decimals = parseFloat('1.' + decimals);
				decimals = decimals.toFixed(settings.roundToDecimalPlace);
				if (decimals.substring(0, 1) == '2') {
					num = Number(num) + 1;
				}
				decimals = decimals.substring(2); 
			}
			num = String(num);
			if (settings.groupDigits) {
				for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
					num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
				}
			}
			if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
				num += settings.decimalSymbol + decimals;
			}
			var format = isPositive ? settings.positiveFormat : settings.negativeFormat;
			var money = format.replace(/%s/g, settings.symbol);
			money = money.replace(/%n/g, num);

			var $destination = $([]);
			if (!destination) {
				$destination = $this;
			} else {
				$destination = $(destination);
			}
			$destination[$destination.is('input, select, textarea') ? 'val' : 'html'](money);
			if (
				hasDecimals && 
				settings.eventOnDecimalsEntered && 
				originalDecimals.length > settings.roundToDecimalPlace
			) {
				$destination.trigger('decimalsEntered', originalDecimals);
			}
			if (settings.colorize) {
				$destination.css('color', isPositive ? 'black' : 'red');
			}
		});
	};
	$.fn.toNumber = function(settings) {
		var defaults = $.extend({
			name: "toNumber",
			region: '',
			global: true
		}, $.maskCurrency.regions['']);
		settings = jQuery.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);
		return this.each(function() {
			var method = $(this).is('input, select, textarea') ? 'val' : 'html';
			$(this)[method]($(this)[method]().replace('(', '(-').replace(settings.regex, ''));
		});
	};
	$.fn.asNumber = function(settings) {
		var defaults = $.extend({
			name: "asNumber",
			region: '',
			parse: true,
			parseType: 'Float',
			global: true
		}, $.maskCurrency.regions['']);
		settings = jQuery.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);
		settings.parseType = validateParseType(settings.parseType);

		var method = $(this).is('input, select, textarea') ? 'val' : 'html';
		var num = $(this)[method]();
		num = num ? num : "";
		num = num.replace('(', '(-');
		num = num.replace(settings.regex, '');
		if (!settings.parse) {
			return num;
		}
		if (num.length == 0) {
			num = '0';
		}
		if (settings.decimalSymbol != '.') {
			num = num.replace(settings.decimalSymbol, '.'); 
		}
		return window['parse' + settings.parseType](num);
	};
	function getRegionOrCulture(region) {
		var regionInfo = $.maskCurrency.regions[region];
		if (regionInfo) {
			return regionInfo;
		}
		else {
			if (/(\w+)-(\w+)/g.test(region)) {
				var culture = region.replace(/(\w+)-(\w+)/g, "$1");
				return $.maskCurrency.regions[culture];
			}
		}
		return null;
	}
	function validateParseType(parseType) {
		switch (parseType.toLowerCase()) {
			case 'int':
				return 'Int';
			case 'float':
				return 'Float';
			default:
				throw 'invalid parseType';
		}
	}
	function generateRegex(settings) {
		if (settings.symbol === '') {
			return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g");
		}
		else {
			var symbol = settings.symbol.replace('$', '\\$').replace('.', '\\.');		
			return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g");
		}	
	}
})(jQuery);
///-------------------------------------------------------------------------------------///
/// developer: Donovan
/// JQUERY SET INPUT CURSOR POSITION
///-------------------------------------------------------------------------------------///
;(function($) {
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
})(jQuery);
///-------------------------------------------------------------------------------------///
/// developer: Donovan
/// JQUERY GET INPUT CURSOR POSITION
///-------------------------------------------------------------------------------------///
(function($) {
    $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return;
        if ('selectionStart' in input) {
            return input.selectionStart;
        } else if (document.selection) {
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
})(jQuery);
///-------------------------------------------------------------------------------------///
/// developer: Donovan
/// JQUERY GET OUTER HTML SELECTOR
///-------------------------------------------------------------------------------------///
(function($) {
$.fn.outerHTML = function() {
	 return (!this.length) ? this : (this[0].outerHTML || (
      function(element){
          var div = document.createElement('div');
          div.appendChild(element.cloneNode(true));
          var contents = div.innerHTML;
          div = null;
          return contents;
    })(this[0]));
}
})(jQuery);
///-------------------------------------------------------------------------------------///
/// developer: Donovan
/// JAVASCRIPT INARRAY
///-------------------------------------------------------------------------------------///
Array.prototype.inArray = function (value)
{
	 var i;
	 for (i=0; i < this.length; i++)
	 {
		 if(this[i]!=undefined&&value!=undefined){
			 if (this[i].toString() == value.toString())
			{
				return true;
			}
		 }
	 }
	 return false;
};
//---------------------------------------------------------//
//	developer: Leon
//	IE-compatible checkbox handling
//  developer: Vaughan - 14/07/2013 (added return of object on methods for chainability)
//---------------------------------------------------------//
(function ($) {
	$.fn.setCheckbox = function(checkValue) {
		var me = $(this);
		var checkInput = $(me).find('input');
		
		if(checkValue){
			$(me).addClass('checked');
			checkInput.prop('checked',true);			// For real browsers
			checkInput.attr('checked','checked');	// For IE8
		} else {
			$(me).removeClass('checked');
			checkInput.prop('checked',false);		// For real browsers
			checkInput.attr('checked','');			// Setting the 'checked' property for IE8
			checkInput.removeAttr('checked');		// Also for IE8
		}
		$(me).change();
		
		return me;
	};
})(jQuery);

(function ($) {
	$.fn.disableCheckbox = function() {
		$(this).prop('disabled',true).attr('disabled','disabled').change().parent().addClass('disabled');
		
		return $(this);
	};
})(jQuery);

(function ($) {
	$.fn.enableCheckbox = function() {
		$(this).prop('disabled',false).removeAttr('disabled').change().parent().removeClass('disabled');
		
		return $(this);
	};
})(jQuery);

//--------------------------------------------------------------------//
//  developer: Vaughan
//--------------------------------------------------------------------//
(function ($) {
	$.fn.checkboxIsChecked = function() {
		if($(this).attr('checked')) 
			{return true;}
		else
			{return false;}
	};
})(jQuery);
//--------------------------------------------------------------------//
//	developer:Donovan
//	Overide Jquery Click,TouchStart,TouchEnd
//--------------------------------------------------------------------//
(function ($) {
	var original =$.fn.click;
	$.fn.click = function(){
		var f = arguments[0];
		arguments[0] = function(e) {
			e.preventDefault();
			f(e);
		}
		original.apply( this, arguments );
	}
})(jQuery);

(function ($) {
	var originaltouchstart =$.fn.touchstart;
	$.fn.touchstart = function(){
		var f = arguments[0];
		arguments[0] = function(e) {
			e.preventDefault();
			f(e);
		}
		originaltouchstart.apply( this, arguments );
	}
})(jQuery);

(function ($) {
	var originaltouchend =$.fn.touchend;
	$.fn.touchend = function(){
		var f = arguments[0];
		arguments[0] = function(e) {
			e.preventDefault();
			f(e);
		}
		originaltouchend.apply( this, arguments );
	}
})(jQuery);
//--------------------------------------------------------------------//
//	developer:Donovan
//	Juery Timer Extention
//--------------------------------------------------------------------//
(function($) {
	$.timer = function(interval, callback, options) {
		var options = $.extend({ reset: 500 }, options);
		var interval = interval || options.reset;
		if(!callback) { return false; }
		var Timer = function(interval, callback, disabled) {
			this.internalCallback = function() { callback(self);clearInterval(self.id);};
			this.stop = function() { clearInterval(self.id); };
			this.reset = function(time) {
				if(self.id) { clearInterval(self.id); }
				var time = time || options.reset;
				this.id = setInterval(this.internalCallback, time);
			};
			this.interval = interval;
			if (!disabled) {
				this.id = setInterval(this.internalCallback, this.interval);
			}
			var self = this;
		};
		return new Timer(interval, callback, options.disabled);
	};
})(jQuery);
//--------------------------------------------------------------------//
//	developer:Mike

//--------------------------------------------------------------------//
(function($,sr){

	  // debouncing function from John Hann
	  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	  var debounce = function (func, threshold, execAsap) {
	      var timeout;

	      return function debounced () {
	          var obj = this, args = arguments;
	          function delayed () {
	              if (!execAsap)
	                  func.apply(obj, args);
	              timeout = null;
	          };

	          if (timeout)
	              clearTimeout(timeout);
	          else if (execAsap)
	              func.apply(obj, args);

	          timeout = setTimeout(delayed, threshold || 100);
	      };
	  }
	  // smartresize 
	  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

///-------------------------------------------///
/// developer: Kevin
/// Namespacing object
///-------------------------------------------///
namespace = function (namespaceString,functionImplementation) {
    var parts = namespaceString.split('.'),
    parent = window,
    currentPart = '';    
            
	for(var i = 0, length = parts.length; i < length; i++) {
		currentPart = parts[i];
		parent[currentPart] = parent[currentPart] || {};
		if((i+1)==parts.length){
			parent[currentPart] = functionImplementation;
		}else{
			parent = parent[currentPart];
		}
	}
	return parent;
};

///---------------------------------///
/// developer: Donovan
///
/// AJAX MANAGER
///---------------------------------///
$(function(){
	function ajaxManager(){
		this.ajaxRequests =[];
		this.ajaxTimer;
	};
	ajaxManager.prototype = {
		addRequest: function(obj){
			this.ajaxRequests.push(obj);
		},
		removeRequest: function(obj){
			if( $.inArray(opt, fnb.utils.ajaxManager.ajaxRequests) > -1 )  fnb.utils.ajaxManager.ajaxRequests.splice($.inArray(opt,  fnb.utils.ajaxManager.ajaxRequests), 1);
		},
		checkQueue: function(){
			if(this.ajaxRequests.length) {
				this.run();
			}
		},
		run: function(){
			fnb.controls.controller.setCurrentEventsGroup(this.ajaxRequests[0].eventsGroup);
			fnb.controls.controller.setUrl(this.ajaxRequests[0].url);
			fnb.controls.controller.setTarget(this.ajaxRequests[0].target);
			fnb.controls.controller.setPreLoadingCallBack(this.ajaxRequests[0].preLoadingCallBack);
			fnb.controls.controller.setPostLoadingCallBack(this.ajaxRequests[0].postLoadingCallBack);
			fnb.controls.controller.setParams(this.ajaxRequests[0].params);
			fnb.controls.controller.setQueue(this.ajaxRequests[0].queue);
			fnb.controls.controller.setExpectResponse(this.ajaxRequests[0].expectResponse);
			this.ajaxRequests.splice(0,1);
			fnb.utils.loadUrl.load(fnb.controls.controller.getCurrentEventsGroup(),fnb.controls.controller.getUrl(),fnb.controls.controller.getTarget(),fnb.controls.controller.getPreLoadingCallBack(),fnb.controls.controller.getPostLoadingCallBack(),fnb.controls.controller.getParams(),fnb.controls.controller.getQueue(),fnb.controls.controller.getExpectResponse());
		},
        stop:  function() {
            this.ajaxRequests.requests = [];
        }
	};

	namespace("fnb.utils.ajaxManager",ajaxManager);
	
});
///-------------------------------///
/// developer: Donovan
///
/// AJAX LOAD CONTENT
///-------------------------------///
$(function(){
	function loadUrl(){
		this.xhr;
	};
	loadUrl.prototype = {
		load: function(eventsGroup,url,target,preLoadingCallBack,postLoadingCallBack,params,queue,expectResponse,preventDefaults){
			_this = this;
						
			if (typeof url  != 'undefined') {
				if(url.indexOf("?")>-1){
					url += "&targetDiv=" + $(target).attr("id");	
				}else{
					url += "?targetDiv=" + $(target).attr("id");
				}
			}else{
				url = params['alternateUrl'];
				url += "?targetDiv=" + $(target).attr("id");
			}
			
			$.ajaxSettings.data = [];
			$.ajaxSettings.traditional = false;
			$.ajaxSettings.cache = true;
			
			if(typeof params!= 'undefined'){
				$.ajaxSettings.data = params;
				$.ajaxSettings.traditional = true;
			}

			this.xhr = $.ajax({
				type: "POST",
				url: url,
				dataType:'html',
				beforeSend : function (jqXHR)
				{
					fnb.controls.controller.setXhr(jqXHR);
					fnb.controls.controller.eventsObject.raiseEvent('loadUrlBeforeSend', 'beforeSend');
				},
				complete : function (jqXHR, textStatus)
				{
					fnb.controls.controller.setXhr(jqXHR);
					fnb.utils.ajaxManager.checkQueue();
				},
				success: function(data, textStatus, jqXHR) {
					var loadObj = {eventsGroup:eventsGroup,xhr: jqXHR,data:data,url: url,target:target,preLoadingCallBack:preLoadingCallBack,postLoadingCallBack:postLoadingCallBack,params:params,queue:queue,expectResponse:expectResponse,preventDefaults:preventDefaults};
					fnb.controls.controller.eventsObject.raiseEvent('loadUrlSuccess', loadObj);
				},
				error: function(jqXHR, textStatus, errorThrown){
					var errorCode = 0;
					console.log('Error: '+jqXHR.status)
					switch (jqXHR.status) {
						case 0:
							if(errorThrown!="abort"){
								fnb.controls.controller.eventsObject.raiseEvent('loadError', {height:'134px',message: 'A result could not be retrieved from Online Banking. Please check your Internet connection before you continue. If you were performing a financial transaction, please check your transaction history to determine if the transaction was processed before you try again.', errors:[]});
							}
							break;
						case 500:
							errorCode = jqXHR.status*23;
							fnb.controls.controller.eventsObject.raiseEvent('loadError', {height:'134px',message: 'Internal server error.', errors:[{error: 'Error: '+errorCode}]});
							break;
						case 404:
							errorCode = jqXHR.status*23;
							fnb.controls.controller.eventsObject.raiseEvent('loadError', {height:'134px',message: 'Page not found.', errors:[{error: 'Error: '+errorCode}]});
							break;
						default:
							errorCode = jqXHR.status*23;
							fnb.controls.controller.eventsObject.raiseEvent('loadError', {height:'134px',message: 'A result could not be retrieved from Online Banking. Please check your Internet connection before you continue. If you were performing a financial transaction, please check your transaction history to determine if the transaction was processed before you try again.', errors:[{error: 'Error: '+errorCode}]});
							console.log('fnb.utils.loadUrl -- AjaxLoad Error: '+errorThrown)
					}
				}
			});
		},
		stop: function(){
			if(this.xhr){
				this.xhr.abort();
			}
		}
	};
	namespace("fnb.utils.loadUrl",loadUrl);
});

///-------------------------------///
/// developer: Donovan
///
/// Jquery LOAD CONTENT
///-------------------------------///
$(function(){
	function load(){

	};
	load.prototype = {
		loadUrl: function(){

			/*var currentEventsGroup = fnb.controls.controller.getCurrentEventsGroup();
			$(fnb.controls.controller.getTarget()).load(fnb.controls.controller.getUrl(), function() {
				fnb.controls.controller.eventsObject.raiseEvent(currentEventsGroup, 'success');
			});*/
		}
	};
	namespace("fnb.utils.load",load);
});

///-------------------------------///
/// developer: LM 
///
///	PayPal Functions
///-------------------------------///

/* This function opens a window, and allows us to close the window when moving to another state.
 * i.e. It enables us to keep track of the popup window. MG*/

$(function(){
	function paypal(){
		this.openedWindows = [];
	};
	paypal.prototype = {
		openWindow : function(url, windowName, params) {
			var me = this;
			this.openedWindows[windowName] = window.open(url, windowName, params);
		},	
		
		/* This function closes a window which was opened using the openedWindows function.*/
		closeWindow : function(windowName) {
			if (openedWindows[windowName] != null) {
				openedWindows[windowName].close();
			}
		}
	};
	namespace("fnb.utils.paypal.windows",paypal);
});

///-----------------------------------------------------------------------------------------///
/// developer: Donovan
///
/// FRAME FUNCTIONS -- TOP BUTTONS, FOOTER BUTTONS ETC
///-----------------------------------------------------------------------------------------///
$(function(){
	function frame(){

	};
	frame.prototype = {
		init: function(){	

		},
		removeHeaderButtons: function(){
			$(_headerWrapper).find('div[id^="headerButton"]').remove();
		},
		createHeaderObject: function(){
			var timeline;
			timeline = new TimelineMax();
			$('#headerButtonsWrapper').find("div[id^='headerButton']").each(function() {
				timeline.append( new TweenMax.to($(this), 0.2, {css:{top:'0'}, ease:Quart.easeOut}));
			});
		},
		clearFooterButtons: function(){
			if(!$('#formFooterButtons').hasClass('hideElement')){
				$('#formFooterButtons').addClass('hideElement');
				$('#forMore').addClass('visibilityHidden');
			}
		},
		showFooterButtons: function(){
			if($('#formFooterButtons').hasClass('hideElement')){
				$('#formFooterButtons').removeClass('hideElement');
				fnb.functions.isScrolling.checkPos();
				if(_isIE8) fnb.functions.ie8.doCheck();
			}
		},
		adjust: function(windowWidth){
			var sectionWidth;
			var windowWidthVal = windowWidth;
		},
		checkWindowsPhone: function(){
			if(_isMobile==true&&_browserName=="MSIE"){
				$(_footerWrapper).css({'position':'relative'})
			}
		}
	};
	namespace("fnb.utils.frame",frame);

});
///-------------------------------///
/// developer: Donovan
///
/// TOP TABS
///-------------------------------///
$(function(){
	function topTabs(){
		this.topScroller;
		this.topScrollerScrolling = false;
		this.topScrollerStops;
		this.topTabSelectedIndex = 0;
		this.topTabOldSelectedIndex = 0;
		this.tabsCount = 0;
		this.selectedTab;
		this.tabWidth = 0;
		this.tabDevisions = 10;
		this.sliderObject = {tabIndex: 0, scrollerIndex:0};
		this.link;
		this.label;
	};
	topTabs.prototype = {
		init: function(tabsCount){
			var parent = this;
			this.tabsCount = tabsCount;
			this.topScroller = new horizontalScroller();
			this.topScroller.scrollableParent = $(_topNavScrollable);
			this.topScroller.scrollerChildren = this.topScroller.scrollableParent.find('.gridCol');
			this.topScroller.scrollStopWidth = 200;
			this.topScroller.scrollSpeed = 500;
			this.topScroller.maxStops = 1;
			this.topScroller.moveTreshold = 0.40;
			this.topScroller.bindEvents();
			this.topScroller.enabled = false;

			this.attachEvents();
			this.createHeaderObject();
			this.adjust($(window).width());
		},
		attachEvents: function(){
			_this = this;
			$(_topNav).on('click touchstart', '.topTab', function(event) {
				fnb.utils.topTabs.checkSelectMode(event);
			});
		},
		checkSelectMode: function(event){
			if(_smallPort==true){
				setTimeout(function() {
					if(fnb.utils.topTabs.topScroller.moving == false)  fnb.utils.topTabs.delegateEvents(event);
				}, 200);
				return false;
			}else{
				fnb.utils.topTabs.delegateEvents(event);
			}
		},
		delegateEvents: function(event){
			var url;
			var label
			var tab;
			if($(event.target).hasClass('topTab')){
				tab = $(event.target);
				url = $(event.target).attr('data-value');
				label = $(event.target).find('a').html();
			}else{
				tab =  $(event.target).parent();
				url = $(event.target).parent().attr('data-value');
				label = $(event.target).html();
			}
			this.select(url,label,tab)
		},
		adjust: function(windowWidth){
		if(windowWidth>_siteMaxWidth&&_isMobile==false) windowWidth =_siteMaxWidth;
			var windowWidthVal = windowWidth-65;

			var sliderPosition;
			//for IE
			if(_isMobile==false&&_browserName=="MSIE"&&_browserVersion<='8'){
				var lastChild = $(_topNav).find($('.lastTab'));
				var firstChild = $(lastChild).parent().find(">:first-child");
				var firstChildWidth = $(firstChild).width();
				$(lastChild).width((firstChildWidth-$(lastChild).parent().children().length));
			}
			
			if (windowWidthVal <= _phoneWindowWidthMax) {
				_smallPort = true;
				_sliderOffset = 35;
				
				if(windowWidthVal <= _phoneWindowWidthMax && windowWidthVal > _phoneWindowWidthMed){
					this.tabDevisions = 7;
				}else if(windowWidthVal <= _phoneWindowWidthMed && windowWidthVal > _phoneWindowWidthMin){
					this.tabDevisions = 5;
				}else if(windowWidthVal <= _phoneWindowWidthMin){
					this.tabDevisions = 4;
				}
				
				var calcStops;
				calcStops = this.tabsCount/this.tabDevisions;
				this.topScrollerStops = Math.round(calcStops);

				var dividedTabWidth = windowWidthVal/this.tabDevisions;
				this.tabWidth = dividedTabWidth;
				$(_topNavScrollable).css({'min-width':dividedTabWidth*this.tabsCount});
				$(_topNav).find('li').width(dividedTabWidth);

				this.topScroller.maxStops = this.topScrollerStops;
				this.topScroller.scrollStopWidth = (dividedTabWidth*this.tabDevisions)-($('#leftScrollButton').width()+$('#rightScrollButton').width());
				this.topScroller.moveTo(0,1);
				this.topScroller.enabled = true;
				
				$(_topNavContainer).css({'width':windowWidthVal})
				
				if(!$('#leftScrollButton').is('*')&&!$('#rightScrollButton').is('*')){
					this.appendMenuButtons();
					$(_topNavWrapper).addClass('topNavWrapperMobi')
				}
				
				$("#topNavBottomBorderContainer").css({'width':((dividedTabWidth*10)*(this.topScrollerStops+2))});
				$("#topNavBottomBorderContainer").css({'left':-(windowWidthVal/2)});
				
			}else if(windowWidthVal > _phoneWindowWidthMax&&this.tabsCount>10){

				var calcStops;
				calcStops =10/this.tabDevisions;
				this.topScrollerStops = Math.round(calcStops);

				var dividedTabWidth = (windowWidthVal)/10;
				
				$(_topNavContainer).css({'width':windowWidthVal})
				var minWidth = (dividedTabWidth*this.tabsCount)+this.tabsCount;
				$(_topNavScrollable).css({'min-width':dividedTabWidth*minWidth});	
				
				$(_topNav).find('li').width(dividedTabWidth);
				
				this.topScroller.maxStops = this.topScrollerStops;
				this.topScroller.scrollStopWidth = dividedTabWidth*10;
				this.topScroller.moveTo(0,1);
				this.topScroller.enabled = true;

				if(!$('#leftScrollButton').is('*')&&!$('#rightScrollButton').is('*')){
					this.appendMenuButtons();
					$(_topNavWrapper).addClass('topNavWrapperMobi')
				}
				
				$("#topNavBottomBorderContainer").css({'width':(windowWidthVal*(this.topScrollerStops+5))});
				$("#topNavBottomBorderContainer").css({'left':-windowWidthVal});
				
				$(_topNavContainer).css({'width':windowWidthVal})
				
				$(_topNavWrapper).addClass('topNavWrapperOver10');
				
				this.tabWidth = dividedTabWidth;

			}else{
				if(_smallPort==true){
				
					$("#topNavMenuSlider").css({'width':''});
					$("#topNavBottomBorder").css({'width':''});

					_sliderOffset = 40;

					this.topScroller.internalEvent = true;
					this.topScroller.moveTo(0,0);
					this.topScroller.enabled = false;

					$(_topNavContainer).css({'width':''});
					$(_topNavScrollable).css({'min-width':''})
					$(_topNavScrollable).css({'-webkit-transform':''});
					$(_topNavScrollable).css({'-webkit-transition':''});

					if($('#leftScrollButton').is('*')&&$('#rightScrollButton').is('*')){
						$('#leftScrollButton').remove();
						$('#rightScrollButton').remove();
					}
					$(_topNav).find('li').width('');
					$(_topNavWrapper).removeClass('topNavWrapperMobi')
				}
				this.tabWidth = $(_topNav).find('li:eq('+this.topTabSelectedIndex+')').width();
				_smallPort = false;
			}
			
			if (windowWidthVal < 480) {
				if(_tinyPort==false){
					_tinyPort = true;
					_topOffset = '108';
				}
			}else{
				if(_tinyPort==true){
					_tinyPort =false;
					_topOffset = '134';
				}
			}
			
			sliderPosition =this.tabWidth*this.topTabSelectedIndex;
			$(_topNavIndicator).css({'width':(this.tabWidth)-2});
			$(_topNavIndicator).css({left:sliderPosition});
		},
		select: function(link,label,tab, noNav){
			if($(_topNavIndicator).hasClass('hideElement')){
				$(_topNavIndicator).removeClass('hideElement');
				$(_headerButtonsWrapper).children().find('span').removeClass('selectedButton');
			}
			fnb.utils.mobile.mobiSubtabInitialized = false;
			fnb.utils.mobile.popUpInitialized = false;

			this.topTabSelectedIndex = $(tab).index();
			this.selectedTab = tab;
			this.topTabOldSelectedIndex = this.topTabSelectedIndex;
			$(tab).parent().find('li').removeClass("selected");
			$(tab).toggleClass("selected", 1000);
			
			var sliderPos = $(tab).width()* this.topTabSelectedIndex;

			this.animateMenuSlider(link,label,sliderPos, noNav);
		},
		animateMenuSlider:function(link,label,pos, noNav){
			if(_smallPort){
				if (!noNav) fnb.utils.topTabs.load(link,label);
			}else{
				$(_topNavIndicator).animate({
					left:pos
				}, {
					duration: 300, 
					easing: 'swing',
					complete: function() {
						if (!noNav) fnb.utils.topTabs.load(link,label);
					}
				}); 
			}
		},
		load: function(link,label){
			var loadObj = {url: link,queue:false}
			fnb.controls.controller.eventsObject.raiseEvent('topTabSelect', loadObj);
		},
		appendMenuButtons: function(){
			var topLeftButton = $('<a id="leftScrollButton" class="leftScrollButton" onclick="fnb.utils.topTabs.scrollLeft(false)"></a>');
			var topRightButton = $('<a id="rightScrollButton" class="rightScrollButton" onclick="fnb.utils.topTabs.scrollRight(false)"><div class="rightScrollBottomBorder"></div></a>');
			$(topRightButton).appendTo($(_topNavWrapper));
			$(topLeftButton).prependTo($(_topNavWrapper));
		},
		scrollLeft: function(){
			this.topScroller.previous();
		},
		scrollRight: function(){
			this.topScroller.next();
		},
		createHeaderObject: function(){
			var timeline;
			timeline = new TimelineMax();
			$('#headerButtonsWrapper').find("div[id^='headerButton']").each(function() {
				timeline.append( new TweenMax.to($(this), 0.2, {css:{top:'0'}, ease:Quart.easeOut}));
			});
		},
		headerButtonSelect: function(button){
			
			$("#topTabs").find('span').attr('data-selected','');
			$(_headerButtonsWrapper).children().find('span').removeClass('selectedButton');
			$(button).find('span').addClass('selectedButton');
			if(!$(_topNavIndicator).hasClass('hideElement')) $(_topNavIndicator).addClass('hideElement');
			var url=$(button).parent().attr('data-value');
			
			if(typeof url=='undefined') url=$(button).attr('data-value');

			if($(button).hasClass('applyBtn')){
				
				fnb.controls.controller.eventsObject.raiseEvent('popupLoadUrl', url);
				
			}else if($(button).parent().attr('id') == 'helpText'){
							
				return false;
			}else if($(button).attr('id') == 'submitInput'){
				var target = fnb.hyperion.$('#BranchAssistContainer');
				var inputVal = $(button).parent().find('.input');
				var url = url+'&' + inputVal.attr('id') + '=' + inputVal.val();
				fnb.hyperion.controller.raiseEvent('asyncLoadContent', {url : url,target : target});
			}else{
				
				fnb.controls.controller.eventsObject.raiseEvent('topButtonsLoadUrlToWorkspace', url);
				
			}
		}
	};
	namespace("fnb.utils.topTabs",topTabs);
});

///---------------------------------///
/// developer: Donovan
///
/// OVERLAYS
///---------------------------------///
$(function(){
	function overlay(){
		this.overlayWrapper;
		this.overlayPanel;
		this.overlayType;
		this.expanded;
	};
	overlay.prototype = {
		init: function(){	

		},
		show: function(){
			this.expanded = true;
			if($(_overlay).hasClass('hidden')){
				_this = this
				setTimeout(_this.display, 100);
			}
		},
		hide: function(){
			this.expanded = false;
			if(!$(_overlay).hasClass('hidden')){
				$(_overlay).addClass('hidden');
			}
		},
		display: function(){
			if(fnb.utils.overlay.expanded == true){
				$(_overlay).removeClass('hidden');
			}
		},
		adjust: function(){

		}
	};

	namespace("fnb.utils.overlay",overlay);
	
});

///----------------------------///
/// developer: Donovan
///
/// ERRORS
///----------------------------///
$(function(){
	function errorPanel(){
		this.errorMessage;
		this.errorHeight;
		this.errorObject = {};
	}
	errorPanel.prototype = {
		init: function(){	

		},
		show: function(errorObject){
			this.rawErrorObject = errorObject;
			this.errorMessage = this.rawErrorObject.message;
			this.errorHeight = this.rawErrorObject.height;
			this.errorObject = this.rawErrorObject.errors;
			this.errorExpanded = true;
			this.append();
		},
		hide: function(){
			if(!$(_errorPanel).hasClass('hidden')){
				var _this = this;
				TweenMax.to($(_errorPanel), 0.2, {css:{top:-$(_errorPanel).height()-26}, ease:Quart.easeOut,onComplete:_this.remove});
				this.errorExpanded = false;	
			}
		},
		remove: function(){
			$(_errorPanel).addClass('hidden');
		},
		setOnOpen: function(){
			$(_errorPanel).addClass('hidden');
		},
		append: function(){
			_this = this;
			var errorsString = '';
			if(typeof _this.errorObject=="object"){
				$.each(_this.errorObject, function(errorIndex, error) {
					errorsString += "<div class='errorWrapper'><div class='errorText'>"+this.error+"</div></div>";
				});
				$(_errorMessageWrapper).html(_this.errorMessage)
				$(_errorPanel).css({'min-height':_this.errorHeight});
			}else{
				errorsString += "<div class='errorWrapper'><div class='errorText'>"+this.rawErrorObject+"</div></div>";
				$(_errorPanel).css({'min-height':'134px'});
			}
			
		 	$(_errorsWrapper).html(errorsString)
			$(_errorPanel).css({'top':-$(_errorPanel).height()});
			$(_errorPanel).removeClass('hidden');
			TweenMax.to($(_errorPanel), 0.2, {css:{top:0}, ease:Quart.easeOut});
		}
	};
	namespace("fnb.utils.errorPanel",errorPanel);
});

///---------------------------------///
/// developer: Donovan
///
/// ACTION MENU
///---------------------------------///
$(function(){
	function actionMenu(){
		this.actionMenuExpanded = false;
		this.isPaging = false;
		this.actionButtonDisplaying = false;
		this.contentLabel ;
		this.isExpanding ;
	};
	actionMenu.prototype = {
		init: function(){	

		},
		set: function(){
			if($(_actionMenuWrapper).is('*')){
				fnb.utils.actionMenu.showButton();
				_actionMenu.adjust($(window).width());
			}
		},
		showHide: function(target){
			if(this.isExpanding!=true){
				if($(_actionMenuButton).hasClass('notExpanded')){
					$('#actionWrap').addClass('grid100');
					this.isExpanding=true;
					fnb.controls.controller.eventsObject.raiseEvent('actionMenuShow', target);
				}else{
					$('#actionWrap').removeClass('grid100');
					fnb.controls.controller.eventsObject.raiseEvent('actionMenuHide', target);
				}
			}
			
		},
		showButton: function(){
			if($(_actionMenuButton).is('*')){
				if($(_actionMenuButton).hasClass('hiddenContent')) $(_actionMenuButton).removeClass('hiddenContent');
				if(_isIE8) fnb.functions.ie8.doCheck(); 
			}
		},
		hideButton: function(){
			if($(_actionMenuButton).is('*')){
				if(!$(_actionMenuButton).hasClass('hiddenContent')) $(_actionMenuButton).addClass('hiddenContent');
			}
		},
		show: function(){
			var _this = this;
			if($(_actionMenuWrapper).is('*')){
				$('html').addClass('htmlForceBG');
				$(_actionMenuWrapper).parent().find('#moreOptionsDownArrow').removeClass('displayNone');
				$(_actionMenuWrapper).parent().find('#actionMenuBottomLabel').removeClass('displayNone');
				$('#actionMenu').find('.actionMenuCol').removeClass('displayNone');
				this.actionMenuExpanded = true;
				$('.pageWrapper').hide();
				$(_actionMenuWrapper).find('.moreOptionsDownArrow').addClass('visibleContent');
				var wrapperWidth;
				$('#actionMenuOrangeBanner').removeClass('offScreen');
				$(_actionMenuWrapper).removeClass('offScreen');
				$(_actionMenuButton).removeClass('notExpanded');
				$(_actionMenuButton).addClass('isExpanded');
				$(_actionMenuWrapper).addClass('actionTable');

				wrapperWidth = $(_pageContainer).width();

				function showComplete(){
					$('#actionMenuOrangeBanner').css({width:''});
					$(_actionMenuWrapper).css({width:'100%'}); 
					if($(_actionMenuWrapper).height()<$(window).height()&&_tinyPort==true) $(_actionMenuWrapper).height($(window).height()); 
					_this.isExpanding=false;
				}

				timeline = new TimelineMax({onComplete:showComplete});
				var _sliderOffset = $(_actionMenuButton).width();
				var actionButtonLeft = $(window).width()-_sliderOffset;
				if(actionButtonLeft>(_siteMaxWidth-_sliderOffset)&&_isMobile==false) actionButtonLeft = _siteMaxWidth-_sliderOffset;

				timeline.insertMultiple([new TweenMax.to($(_actionMenuWrapper), 0.3, {css:{width:'100%'}, ease:Quart.easeOut}),
														new TweenMax.to($('#actionMenuOrangeBanner'), 0.2, {css:{width:'100%'}})]);

				if(_browserName=="MSIE"&&_browserVersion<9){

				}else{
					new TweenMax.to($('#actionMenuIcon'), 0.3, {css:{rotation:180},ease:Circ.easeOut})
				}
				
				function resetActionMenuButton() {
					if($(_actionMenuButton).is('*')){
						if($(_actionMenuWrapper).find('.moreOptionsDownArrow').is('*')) new TweenMax.to($(_actionMenuWrapper).find('.moreOptionsDownArrow'), 0.5, {css:{bottom:'-38'}, ease:Bounce.easeOut, delay:0.1});
					}
				}

				TweenMax.delayedCall(0.3, resetActionMenuButton);

				$('html,body').scrollTop(0);
				
			}
		},
		hide: function(){
			if($(_actionMenuWrapper).is('*')){
				$('html').removeClass('htmlForceBG');
				this.actionMenuExpanded = false;
				if(!$(_actionMenuButton).hasClass('notExpanded')){
					$(_actionMenuWrapper).parent().find('.moreOptionsDownArrow').addClass('displayNone');
					$(_actionMenuWrapper).parent().find('.actionMenuBottomLabel').addClass('displayNone');
					$(_actionMenuButton).addClass('notExpanded')
					$(_actionMenuButton).removeClass('isExpanded');
					$('.pageWrapper').show();
					$(_actionMenuWrapper).find('.moreOptionsDownArrow').hide();
					$(_actionMenuWrapper).find('.moreOptionsDownArrow').css({'bottom':'0'})
					function hideComplete(){					
						$(_actionMenuWrapper).removeClass('actionTable');
						
						$(_actionMenuWrapper).addClass('offScreen');
						$('#actionMenuOrangeBanner').addClass('offScreen');
						///TweenMax.to( new TweenMax.to($(_actionMenuButton), 0.2, {css:{height:''}, ease:Bounce.easeOut}) );
						$(_actionMenuWrapper).css({'min-height':''}); 
					}

					$('#main').height('');
					$(_actionMenuUrlWrapper).removeClass('visibleContent');
					$(_actionMenuUrlWrapper).html('');
						
					timeline = new TimelineMax({onComplete:hideComplete});

					timeline.insertMultiple([new TweenMax.to($(_actionMenuWrapper), 0.2, {css:{width:'0%'}}),
											new TweenMax.to($('#actionMenuOrangeBanner'), 0.2, {css:{width:'0%'}})
											]);	
					
					if(_browserName=="MSIE"&&_browserVersion<9){
					
					}else{
						new TweenMax.to($('#actionMenuIcon'), 0.2, {css:{rotation:0},ease:Circ.easeOut})
					}
					$(_actionMenuUrlWrapper).height('');
				}
			}
		},
		loadTargetToActionMenu: function(url,target){
			if(fnb.hyperion.utils.actionMenu.active==true){
				this.contentLabel = $(target).find('p').text();
				fnb.controls.controller.eventsObject.raiseEvent('loadToActionMenu', url)
			}else{
				fnb.controls.controller.eventsObject.raiseEvent('loadUrlToTarget',{target:_main,url:url});
			}
		},
		loadTargetToActionMenuComplete: function(){
			var headingText=$(_actionMenuUrlWrapper).find('h1');
			var headingTextValue = $(headingText).text();
			$(_actionMenuUrlWrapper).prepend('<div class="actionMenuLeftBar borderImgRightWhite"></div>')
			$(_actionMenuUrlWrapper).find('.actionMenuLeftBar').prepend('<p>'+headingTextValue+'</p>')
			$(_actionMenuUrlWrapper).find('.actionMenuLeftBar').prepend('<h2>'+this.contentLabel+'</h2>')
			$(_actionMenuUrlWrapper).prepend('<div id="actionTableClose" onclick="fnb.utils.actionMenu.clearLoadedActionBar(this)"></div>')
			$(headingText).remove();
			$(_actionMenuButton).addClass('hiddenContent');
			$(_actionMenuUrlWrapper).addClass('visibleContent');
			$('#actionMenu').find('.actionMenuCol').addClass('displayNone');
		},
		adjust: function(windowWidth){
			if(this.actionMenuExpanded == true){
				if(_smallPort==true){
					$(_actionMenuWrapper).find('.actionMenuContents').css({'height':''});
					$(_actionMenuWrapper).css({'min-height':''}); 
				}
			}
		},
		clearLoadedActionBar : function(target) {
			$(_actionMenuUrlWrapper).removeClass('visibleContent');
			$(target).parent().html('');
			$(_actionMenuWrapper).find('.actionMenuColUp').addClass('opacity100');
			$(_actionMenuButton).show();
			$('#actionMenu').find('.actionMenuCol').removeClass('displayNone');
			$(_actionMenuButton).removeClass('hiddenContent');
			$(_actionMenuWrapper).find('.actionMenuColUp').show();
			$('#main').show();
		}
	};
	namespace("fnb.utils.actionMenu",actionMenu);

});

///-------------------------------///
/// developer: Donovan
///
/// Handle Navigation Error
///-------------------------------///
$(function(){
	function navError(){

	};
	navError.prototype = {
		validate: function(xhr,postLoadingCallBack,eventsGroup){
			var responseHeaders = xhr.getAllResponseHeaders();
			var navErrorCode = xhr.getResponseHeader("NAV_ERROR_CODE");
			var navErrorMessage = xhr.getResponseHeader("NAV_ERROR_MESSAGE");
			var navDetailMessage = "";
			try{
				if(xhr.getResponseHeader("NAV_DETAIL_MESSAGE")!=null){
					navDetailMessage = xhr.getResponseHeader("NAV_DETAIL_MESSAGE");
				}
			}catch(e){
				console.log("Error while trying to read NAV_DETAIL_MESSAGE from response");
			}
			if(navErrorCode!=null && navErrorCode!=0){
				if (navErrorCode == -1) {
					var errorMessage = navDetailMessage +"<br/>"+ xhr.responseText;
					if ((navDetailMessage == "null")||(navDetailMessage == "Invalid Parameter")) {
						errorMessage = xhr.responseText;
						if (errorMessage == "<br/>") errorMessage = "(E-" + navErrorCode +") "+  navErrorMessage +"<br/>"+ xhr.responseText;
						fnb.controls.controller.eventsObject.raiseEvent('navError',{height:'134px',message: 'Some required fields are not valid...', errors:[{error: errorMessage}]});
					}
					else {
						if (errorMessage == "<br/>") errorMessage = "(E-" + navErrorCode +") "+  navErrorMessage +"<br/>"+ xhr.responseText;
						fnb.controls.controller.eventsObject.raiseEvent('navError',{height:'134px',message: 'Some errors have occurred...', errors:[{error: errorMessage}]});
					}
				}
				else if (navErrorCode == 4 || navErrorCode == 5 || navErrorCode == 370) {
					var errorMessage = navDetailMessage +"<br/>"+ xhr.responseText;
					if ((navDetailMessage == "null")||(navDetailMessage == "Invalid Parameter")) errorMessage = xhr.responseText; 
					if (errorMessage == "<br/>") errorMessage = "(E-" + navErrorCode +") "+  navErrorMessage +"<br/>"+ xhr.responseText;
					fnb.controls.controller.eventsObject.raiseEvent('navError',{height:'134px',message: 'Some required fields are not valid...', errors:[{error: errorMessage}]});
				}
				else if (navErrorCode == 1544) {
					var errorMessage = navDetailMessage +"<br/>"+ xhr.responseText;
					fnb.controls.controller.eventsObject.raiseEvent('navError',{height:'134px',message: 'OTP Sent...', errors:[{error: errorMessage}], 'errorCode': navErrorCode});
				}
				else if (navErrorCode == 1539) {
					var errorMessage = navDetailMessage +"<br/>"+ xhr.responseText;
					fnb.controls.controller.eventsObject.raiseEvent('navError',{height:'134px',message: 'Please note...', errors:[{error: errorMessage}], 'errorCode': navErrorCode});
				}
				else if(navErrorCode == 2001) {
					var errorMessage = "";
					var errorMsgs = navErrorMessage.split(",")
					var i = 0;
					while(i < errorMsgs.length) {
						errorMessage += errorMsgs[i] +"<br/>"+ xhr.responseText;
						i++;
					}
					fnb.controls.controller.eventsObject.raiseEvent('navError', {height:'134px',message: 'Some errors have occurred...', errors:[{error: errorMessage}]});
				}
				else {
					var errorMessage
					if (navDetailMessage != "" && navDetailMessage != "null" && navDetailMessage != null) {
						errorMessage = "(E-" + navErrorCode +") "+  navDetailMessage +"<br/>"+ xhr.responseText;
					}
					else {
						errorMessage = "(E-" + navErrorCode +") "+ navErrorMessage +"<br/>"+ xhr.responseText;
					}
					fnb.controls.controller.eventsObject.raiseEvent('navError',{height:'134px',message: 'Some errors have occurred...', errors:[{error: errorMessage}]});
				}
				if(typeof(postLoadingCallBack)=="function"){postLoadingCallBack(eventsGroup,xhr)};
				return false;
			}
			return true;

		}
	};
	namespace("fnb.utils.navError",navError);
});

///-------------------------------///
/// developer: Donovan
///
/// Handle OTP Error
///-------------------------------///
$(function(){
	function handleOTP(){

	};
	handleOTP.prototype = {
		validate: function(xhr){
			var screenType = xhr.getResponseHeader("SCREEN_TYPE");
			if(screenType!=null && screenType=="OTP"){ 
				var r = jQuery.parseJSON(xhr.responseText);
				fnb.utils.otp.primary = r.otpPrimary;
				fnb.utils.otp.secondary = r.otpSecondary;
				var intoEzi= fnb.hyperion.utils.eziPanel.active;
				fnb.controls.controller.eventsObject.raiseEvent('otpShow', {url: '/banking/Controller?nav=navigator.otp.OtpLanding&ezi='+intoEzi})
				return true;
			}
			return false;
		}
	};
	namespace("fnb.utils.handleOTP",handleOTP);
});

///-------------------------------///
/// developer: Donovan
///
///OTP
///-------------------------------///
$(function(){
	function otp(){
		this.primary;
		this.secondary;
	};
	otp.prototype = {
		complete: function(){
			$(_errorsWrapper).find('.cellNumber').html(this.primary);
			$(_errorsWrapper).find('.email').html(this.secondary);
		},
		submit: function(formname,intoWorkspace){
			fnb.utils.eziSlider.submit(formname,intoWorkspace,'',true);
		}
	};
	namespace("fnb.utils.otp",otp);
});
///---------------------------------///
/// developer: Donovan
/// developer: Vaughan - 21/6/2013 (modified adjust method)
///
/// EZI SLIDER
///---------------------------------///
$(function(){
	var counter = 0;
	function eziSlider(){
		this.params;
		this.expanded=false;
		counter = 0;
	};
	eziSlider.prototype = {
		init: function(windowWidth){
			counter = 0;
		},
		show: function(){
			if($(_eziWrapper).parent().parent().hasClass('hidden')){
				this.expanded = true;
				var _this = this;
				$(_eziWrapper).parent().parent().removeClass('hidden');
				TweenMax.to($(_eziWrapper), 0.2, {css:{right:0}, ease:Quart.easeOut,onComplete:_this.showButtons});
			}
			counter = 0;
		},
		showButtons: function(){
			if($('#eziPannelButtonsWrapper').is('*')) $('#eziPannelButtonsWrapper').removeClass('hidden');
		},	
		hide: function(){
			var _this = this;
			if(!$(_eziWrapper).parent().parent().hasClass('hidden')){
				this.expanded = false;
				if($('#eziPannelButtonsWrapper').is('*')) $('#eziPannelButtonsWrapper').addClass('hidden');
				var wrapperWidth = 0.40*$(_pageContainer).width();
				if(_smallPort==true){
					wrapperWidth = $(_pageContainer).width()-25;
				}
				var parent = this;
				TweenMax.to($(_eziWrapper), 0.2, {css:{right:-wrapperWidth}, ease:Quart.easeOut,onComplete:_this.remove});
			}
		},
		remove: function(){
			$(_eziWrapper).parent().parent().addClass('hidden');
			$(_eziProgressWrapperContents).html('');
		},
		submit: function(formName, intoWorkspace,buttonTarget,preventDefaults){
			if(!extraOptions) var extraOptions = {};

			if(typeof intoWorkspace=='undefined') intoWorkspace=false;
			
			if (intoWorkspace == 'true'||intoWorkspace == true) {
				fnb.functions.submitFormToWorkspace.submit(formName,'','',extraOptions,preventDefaults,true);
			}else {
				
	            extraOptions.keepFooter = true;
	            
	            $(_eziProgressWrapperContents).hide();
	            
				fnb.controls.controller.eziSubmitForm(formName, _eziProgressWrapperContents, '', '', buttonTarget,extraOptions,preventDefaults);
			}
		},
		checkLoadError: function(){
			var _this=this;
			setTimeout(function() {
				if(progressBar.progressActive==true){
					counter++;
					if (counter < fnb.clientTimeout) _this.checkLoadError();
						else  {
							fnb.controls.controller.eventsObject.raiseEvent('eziSliderHide', '');
							counter = 0;
						}
				}
				else if (fnb.utils.errorPanel.errorExpanded == true) {
					fnb.controls.controller.eventsObject.raiseEvent('eziSliderHide', '');
					counter = 0;
				}
			}, 500);
		}
	};
	namespace("fnb.utils.eziSlider",eziSlider);
});

///---------------------------------///
/// developer: Donovan
///
/// POPUPS
///---------------------------------///
$(function(){
	function popup(){
		this.height;
	};
	popup.prototype = {
		init: function(){	

		},
		show: function(){
			if($(_popupWrapper).hasClass('hidden')){
				setTimeout(function() {
					fnb.utils.popup.adjust($(_popupWrapper).outerHeight(true));
				}, 500);
			}
		},
		hide: function(){
			if(!$(_popupWrapper).hasClass('hidden')){
				$(_popupWrapper).addClass('hidden');
			}
			this.clear();
			if($('#selectorDeviceHolderWrapper')){
				if(!$('#selectorDeviceHolderWrapper').hasClass('hidden')){
					$('#selectorDeviceHolderWrapper').addClass('hidden')
				}
			}
		},
		clear: function(){
			$(_popupWrapper).html("");
		},
		adjust: function(height){
			var topVal = ($(window).height()-height)/2;
			$(_popupWrapper).css({'top':topVal+'px'});
			$(_popupWrapper).removeClass('hidden');
		},
		orientationChanged: function(){
			if(!$(_popupWrapper).hasClass('hidden')){
				setTimeout(function() {
					fnb.utils.popup.adjust($(_popupWrapper).outerHeight(true));
				}, 500);
			}

		}
		
	};

	namespace("fnb.utils.popup",popup);
});

///---------------------------------///
/// developer: Donovan
///
/// HORIZONTAL SCROLLER
///---------------------------------///
$.support.touch = ('ontouchstart' in window );

var horizontalScroller = function() {
    this.startX = null;
    this.endX = null;
    this.startOffset = null;
    this.scrollableParent = null;
    this.scrollerChildren = null;
    this.x=0;
    this.currentIndex =0;
	this.scrollSpeed =0;
    this.fixedStops = true;
    this.scrollStopWidth = 0;
    this.maxStops = 0;
    this.moveTreshold = 0.3;
    this.isTouch = $.support.touch;
    this.tap_treshold = 0;
    this.tap = function(){ };
    this.afterStop =  function(index){  };
    this.doVertical = false;
    this.startElement = null;
    this.bindLive = false;
	this.enabled = false;
	this.moving = false;
	this.initialized = false;
	this.internalEvent = false;
	
    var parent = this;

    function isset(v){
        return(typeof v != 'undefined');
    }

    function mouseX(event){
        return (isset(event.originalEvent.targetTouches)) ? event.originalEvent.targetTouches[0].pageX : event.pageX;
    }

    this.bindEvents = function(){
        if(this.isTouch){
           if(_browserName!='BlackBerry'&&_browserVersion!=100){
				this.bindTouchEvents();
			}
        } else {
            this.bindClickEvents();
        }
    };

    function start(e){
        e.preventDefault();
        parent.startElement = e.target;  
        parent.startX = parent.endX = mouseX(e);
        if($.browser.webkit){
            parent.scrollableParent.css("-webkit-transition-duration", "0s");
        }

        if(parent.isTouch) {
            $(document).bind({
                'touchmove': move,
                'touchend': end,
                'touchcancel': cancel
            });
        } else {
            $(document).bind({
                'mousemove': move,
                'mouseup': end,
                'mouseleave': cancel
            });
        }
    };

    function move(e){
		if(parent.enabled){
			parent.moving = true;
			e.preventDefault();
			if(parent.startX !== null && parent.scrollableParent !== null){
				parent.endX = mouseX(e);
				var val = parent.x+(parent.endX-parent.startX);
				if($.browser.webkit){
					parent.scrollableParent.css("-webkit-transform", "translate3d("+val +"px,0px,0px)");
				} else {
					parent.scrollableParent.css({'left':val+'px'});
				}
			}
		}
    };

    function end(e){
		
        if(parent.fixedStops && parent.startX !== null && parent.endX !== null && parent.scrollableParent !== null){
            parent.moveToClosest();
            parent.startElement = e.target;  
            var moveX = Math.abs(parent.startX - parent.endX);
            if (moveX <= parent.tap_treshold * parent.scrollStopWidth) {
                if( parent.startElement != null ) { parent.tap( parent.startElement ); }
            }
        }

        parent.startX = parent.endX = parent.startElement = null;
        
        if(parent.isTouch) {
            $(document).unbind({
                'touchmove': move,
                'touchend': end,
                'touchcancel': cancel
            });
        } else {
            $(document).unbind({
                'mousemove': move,
                'mouseup': end,
                'mouseleave': cancel
            });
        }

    };

    function cancel(e){
        e.preventDefault();
        if(parent.fixedStops && parent.startX !== null && parent.endX !== null && parent.scrollableParent !== null){
            parent.moveToClosest();
        }
        parent.startX = parent.endX = parent.startElement = null;
    };

    this.moveToClosest = function (){
        var moveX = this.startX-this.endX,
            currI = Math.round((-1*this.x) / this.scrollStopWidth),
            newI = currI,
            newloc = this.scrollStopWidth*(currI);

        if(moveX > this.moveTreshold*this.scrollStopWidth && currI+1 <= (this.maxStops)){
            newI = currI+1;
        }

        if(((-1)*moveX) > this.moveTreshold*this.scrollStopWidth && currI-1 >= 0){
             newI = currI-1;
        }

        newloc = Math.round(this.scrollStopWidth*(newI));
        this.currentIndex = newI;
        this.x = -1*(newloc);
  
        if($.browser.webkit){
			this.scrollableParent.css("-webkit-transition-duration", "0."+this.scrollSpeed+"s");
			this.scrollableParent.css("-webkit-transform", "translate3d("+(-1*newloc) +"px,0px,0px)");
			setTimeout(function() {
				parent.moving = false;
			}, this.scrollSpeed); 
        } else {
			this.scrollableParent.stop().animate({'left': (-1*newloc)},{ duration: this.scrollSpeed,  complete: function() { parent.moving = false; }});
        }

        setTimeout ($.proxy( function () { this.afterStop(newI); }, this ), this.scrollSpeed);

    };

    this.moveTo = function(index, nostop){
		if(this.initialized == false||this.internalEvent == true){
			var newloc = this.scrollStopWidth*(index);
			if($.browser.webkit){
				if(_browserName!='BlackBerry'&&_browserVersion!=100){
					this.scrollableParent.css("-webkit-transition-duration", "0."+this.scrollSpeed+"s");
					this.scrollableParent.css("-webkit-transform", "translate3d("+(-1*newloc) +"px,0px,0px)");
					setTimeout(function() {
						parent.moving = false;
					}, this.scrollSpeed);
				}else{
					this.scrollableParent.css({'left':newloc});
				}
			} else {
				this.scrollableParent.stop().animate({'left': (-1*newloc)},{ duration: this.scrollSpeed,  complete: function() {   parent.moving = false; }});
			}
			this.currentIndex = index;
			this.x = -1*(newloc);
			if(typeof nostop == "undefined") { setTimeout ($.proxy( function () { this.afterStop(index); }, this ), 250); }
			this.internalEvent = false;
			this.initialized = true;
		}
    };

    this.next = function(){
        if(this.currentIndex+1 <= this.maxStops){
			this.internalEvent = true;
			this.moving = true;
            this.moveTo(this.currentIndex+1);
        }
    };

    this.previous = function(){
        if(this.currentIndex-1 >= 0){
			this.internalEvent = true;
			this.moving = true;
            this.moveTo(this.currentIndex-1);
        }
    };

    this.centerIndex = function (index){
		if (this.scrollableParent !== null){
			if(isset(index)){
				this.currentIndex = index;
			} else {
				index = this.currentIndex;
			}
			var loc = -1*((index)*this.scrollStopWidth);
			if($.browser.webkit){
				this.scrollableParent.css({
					"-webkit-transform": "translate3d("+loc+"px,0px,0px)",
					"-webkit-transition-duration": "0s"
				});
			} else {
				this.scrollableParent.stop().css('left',loc+'px');
			}
			this.x = loc;
		}
    };

    this.bindTouchEvents = function(){
        if(this.scrollerChildren !== null){
            if (this.bindLive) {
                this.scrollerChildren.live({
                    'touchstart': start
                });
            } else {
                this.scrollerChildren.bind({
                    'touchstart': start
                });
            }
        }
    };

    this.bindClickEvents = function() {
        if(this.scrollerChildren !== null){
            if (this.bindLive) {
                this.scrollerChildren.live({
                    'mousedown': start
                });
            } else {
                this.scrollerChildren.bind({
                    'mousedown': start
                }); 
            }
        }
    };
};
///-------------------------------///
/// developer: Donovan
///
/// Subtabs
///-------------------------------///
$(function(){
	function subtabs(){

	};
	subtabs.prototype = {
		select: function(target){

			var url = target.attr('data-value');
			var disabled = target.attr('data-disabled');
			
			if(typeof disabled=='undefined'){
				disabled = target.parent().attr('data-disabled')
			}
			if(!disabled) {
				if(typeof url=='undefined'){
					url = target.parent().attr('data-value');
				}if(!fnb.utils.mobile.subtabs.subTabTopScroller){
					fnb.controls.controller.eventsObject.raiseEvent('loadResultScreen',url)
				}else{
					setTimeout(function() {
						if(fnb.utils.mobile.subtabs.subTabTopScroller.moving == false) fnb.controls.controller.eventsObject.raiseEvent('loadResultScreen',url);
					}, 200);
				}
			}
		}
	};
	namespace("fnb.utils.subtabs",subtabs);
});
///----------------------------///
/// developer: Donovan
///
/// MOBILE EXTENTIONS
///----------------------------///
$(function(){
	function mobile(){
		var expandedTableRowButton;
		var expandedTableRow;
		var expandedTableRowId;
		var tableRowExpanded = undefined;
		
		var mobiSubtabInitialized = false;
		var mobiSubtabIndex;
		
		var switcherExpanded;
		var targetSwitcher;
		
		var targetSwitcherWrapperHeight;
		
		var popUpInitialized;
		var popUpExpanded;
		var popUpObjects = [];
		var popEventsBound = false;
		
		this.subTabTopScroller;
		
		this.headerControlsMouseDown = false;
		this.headerControlsExpanding = false;;
		this.headerControlsExpanded = false;
		
		this.mobileMoved;
		this.mobileStartX;
		this.mobileStartY;
		
		this.originalCoord = { x: 0, y: 0 };
        this.finalCoord = { x: 0, y: 0 };
		this.threshold = {x: 30, y: 10};

		this.subtabScrollerApplied = false;
	}
	mobile.prototype = {
		adjust: function(windowWidth){
			this.subtabs.adjust(windowWidth);
			this.utils.adjust();
			this.table.adjust(windowWidth);
			this.headerControls.adjust(windowWidth);
		}
	};
	mobile.prototype.table = {
		init : function() {
			
		},
		expandRow: function(row){
			if(this.tableRowExpanded==true&&$(row).parent().parent().parent().attr('id')!=this.expandedTableRowId){
				this.contractRow(this.expandedTableRow);
			}
			this.expandedTableRowButton = row;
			this.expandedTableRowId = $(this.expandedTableRowButton).parent().parent().parent().attr('id');
			this.expandedTableRow = $(this.expandedTableRowButton).parent();
			
			if(this.tableRowExpanded==false||typeof(this.tableRowExpanded)=="undefined"){
				$(this.expandedTableRow).css({height:'auto',display:'block'});
				var expandableHeight = $(this.expandedTableRow).height()+18;
				$(this.expandedTableRow).css({height:'0'})
				$(this.expandedTableRow).find('.phoneContentButton').addClass('greyBack');
				$(this.expandedTableRow).animate({
					height:expandableHeight
				}, {
					duration: 300, 
					easing: 'swing',
					step: function( step ){

					},
					complete: function() {
					}
				}); 
				this.tableRowExpanded = true;
			}else{
				this.contractRow(this.expandedTableRow);
			}
		},
		contractRow: function(row){
			this.tableRowExpanded = false;
			$(row).find('.phoneContentButton').removeClass('greyBack');
 			$(row).animate({
				height:0
			}, {
				duration: 300, 
				easing: 'swing',
				step: function( step ){

				},
				complete: function() {

				}
			}); 
		},
		adjust: function(windowWidth){
			if(_smallPort){
				if(this.tableRowExpanded==true){
					$(this.expandedTableRow).css({'height':'auto'});		
				}
			}
		}
	};
	mobile.prototype.subtabs = {
		init : function(tabIndex,label) {
			
		},
		bind : function() {
			
		},
		destroy : function() {

		},
		select : function() {
			
		},
		scrollLeft: function(){
			this.subTabTopScroller.previous();
		},
		scrollRight: function(){
			this.subTabTopScroller.next();	
		},
		adjust: function(windowWidth){
			if (windowWidth < _phoneWindowWidthMax) {
				var scrollerWidth = Math.round($('#pageContent').width()-60);
				if($(_subTabsScrollable).children().length>=3){
					this.subTabTopScroller = new horizontalScroller();
					this.subTabTopScroller.scrollableParent = $(_subTabsScrollable);
					this.subTabTopScroller.scrollerChildren = $(_subTabsScrollable).children();
					this.subTabTopScroller.scrollStopWidth = 200;
					this.subTabTopScroller.scrollSpeed = 500;
					this.subTabTopScroller.maxStops = 1;
					this.subTabTopScroller.moveTreshold = 0.20;
					this.subTabTopScroller.bindEvents();
					this.subTabTopScroller.enabled = true;
					$(_subTabsScrollable).parent().parent().find('.subTabScrollLeft').removeClass('hidden');
					$(_subTabsScrollable).parent().parent().find('.subTabScrollRight').removeClass('hidden');
					var tabWidth = Math.round((scrollerWidth/3)*$(_subTabsScrollable).children().length)+9;
					if(this.subTabTopScroller){
						this.subTabTopScroller.maxStops = Math.round($(_subTabsScrollable).children().length/3)
						this.subTabTopScroller.scrollStopWidth = scrollerWidth;
					}
				}
				this.subtabScrollerApplied = true;
				$(_subTabsScrollable).parent().width(scrollerWidth);
				$(_subTabsScrollable).width(tabWidth);
				var childrenWidths = Math.round($('#subTabsContainer').width()/3);
				$(_subTabsScrollable).children().css({'width':childrenWidths+'px'});
				if($(_subTabsScrollable).find('div:eq(0)').outerWidth(true)>childrenWidths){
					var newWidth = $(_subTabsScrollable).find('div:eq(0)').outerWidth(true)-childrenWidths;
					newWidth = childrenWidths-newWidth;
					$(_subTabsScrollable).children().css({'width':newWidth+'px'});
				}
			}else{
					if(this.subtabScrollerApplied==true){
						this.subtabScrollerApplied = false;
						if(this.subTabTopScroller) this.subTabTopScroller = undefined;
						$('#tableHeaderUtils').height('');
						$('#tableHeaderUtils').css({'overflow':'visible'});
						$(_subTabsScrollable).parent().parent().find('.subTabScrollLeft').addClass('hidden');
						$(_subTabsScrollable).parent().parent().find('.subTabScrollRight').addClass('hidden');
						$(_subTabsScrollable).width('auto');
						$(_subTabsScrollable).parent().width('auto');
						$(_subTabsScrollable).children().css({'width':''});
					}
			}
		}
	};
	mobile.prototype.switcher = {
		init : function(switcher) {
			
		},
		expandSwitcher : function(switcher) {
			this.targetSwitcher = switcher;
			this.targetSwitcherParent = $(switcher).closest('#tableHeaderUtils');
			this.targetSwitcherWrapper = $(switcher).parent().find('.tableSwitcherItemsContainer');
			if(this.switcherExpanded==false||typeof(this.switcherExpanded)=="undefined"){
				$(this.targetSwitcher).addClass('mobi-dropdown-trigger-expanded');
				this.originalHeight = $(this.targetSwitcherParent).height();
				$(this.targetSwitcherWrapper).css({height:'auto'});
				$(this.targetSwitcherParent).css({height:'auto'});
				var expandableHeight = $(this.targetSwitcherParent).height()+39;
				$(this.targetSwitcherParent).css({height:this.originalHeight+'px'});
				$(this.targetSwitcherParent).animate({
					height:expandableHeight
				}, {
					duration: 300, 
					easing: 'swing',
					step: function( step ){
					
					}
				});
				this.switcherExpanded = true;
			}else{
				this.contractSwitcher();
			}
		},
		contractSwitcher: function(){
			_this = this;
			this.switcherExpanded = false;
			$(this.targetSwitcher).removeClass('mobi-dropdown-trigger-expanded');
 			$(this.targetSwitcherWrapper).animate({
				height:'28px'
			}, {
				duration: 300, 
				easing: 'swing',
				step: function( step ){

				},
				complete: function() {
					$(_this.targetSwitcherParent).height(_this.originalHeight);
				}
			}); 
		},
		destroy : function() {

		},
		adjust: function(windowWidth){
			
		}
	};
	mobile.prototype.headerControls = {
		mouseDown : function(event) {
			if(_smallPort == true){
				this.headerControlsMouseDown=true;
				var yPos = this.pageY(event)

				this.headerControlsStartPosition = yPos;
				this.headerControlsPrevPosition = yPos;
			}
		},
		mouseMove : function(event) {
			if(this.headerControlsMouseDown==true){
				var yPos = this.pageY(event)
				this.headerControlsPagePosition = yPos - this.headerControlsStartPosition;
				if(yPos>this.headerControlsPrevPosition){
					this.menuSlideDown();
				}else{
					this.menuSlideUp();
				}
			}

		},
		menuSlide : function(event) {
			if(this.headerControlsExpanding!=true){
				event.preventDefault();
				if(!$('.tableHeaderControls').hasClass('tableHeaderControlsExpanded')){
					this.headerControlsExpanding = true;
					$('.tableHeaderControls').addClass('tableHeaderControlsExpanded');
					this.menuSlideDown();
				}else{
					$('.tableHeaderControls').removeClass('tableHeaderControlsExpanded');
					this.menuSlideUp();
				}
			}
		},
		menuSlideDown : function() {
			var _this=this;
			$('.tableHeaderControls').height('auto');
			var menuHeight = $('.tableHeaderControls').height();
			if(menuHeight<30) menuHeight = 30;
			$('.tableHeaderControls').height(5);
			menuHeight = menuHeight+29;
			$('.tableHeaderControls').animate({
					height:menuHeight
			}, {
				duration: 200, 
				easing: 'swing',
				complete: function() {
					_this.headerControlsExpanding = false;
					_this.headerControlsExpanded = true;
				}
			});
		},
		menuSlideUp : function() {
			$('.tableHeaderControls').animate({
					height:25
			}, {
				duration: 200, 
				easing: 'swing',
				complete: function() {
					_this.headerControlsExpanded = false;
				}
			}); 
		},
		mouseUp : function(event) {
			if(this.headerControlsMouseDown==true){
				this.headerControlsMouseDown=false;
			}
		},
		pageY: function(event){
			return ( typeof (event.originalEvent.targetTouches)!= 'undefined') ? event.originalEvent.targetTouches[0].pageY : event.pageY;
		},
		scrollRight: function(){
			
		},
		adjust: function(windowWidth){
			if(windowWidth>_phoneWindowWidthMax&&this.headerControlsExpanded==true){
				$('.tableHeaderControls').height('');
				$('#subTabsContainer').width('');
			}
		}
	};
	mobile.prototype.popup = {
		init : function() {
			
		},
		show : function(elements) {
			$('#footerMessage').addClass('hideElement');
			$('#footerWrapper').addClass('hideElement');
			fnb.utils.mobile.popUpObjects = [];
			this.appendElements(elements);
			fnb.utils.mobile.popUpInitialized = true;
			fnb.utils.mobile.popUpExpanded = true;
			fnb.controls.controller.eventsObject.raiseEvent("mobileHideDefaults",'');
			fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup);
		},
		hide : function(defaults) {
			if(fnb.utils.mobile.popUpExpanded==true){
				if(defaults==true){
					fnb.controls.controller.eventsObject.raiseEvent("mobileShowDefaults",'');
				}else{
					fnb.controls.controller.eventsObject.raiseEvent("mobileHideDefaults",'');
				}
				fnb.utils.mobile.popUpExpanded = false;
				if(currentPageTotal>0) $('#footerMessage').removeClass('hideElement');
				$('#footerWrapper').removeClass('hideElement');
				$('#mobiPopupWrapper').remove();
				$('body').height('');
				fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup);
			}
		},
		appendElements : function(elements) {
			var thisParent = this;
			var mobiPopupWrapper = $("<div id='mobiPopupWrapper' class='mobiPopupWrapper'><div class='mobiPopupInnerWrapper'></div><div id='eziPannelButtonsWrapper'><div id='eziPannelButtons'><div class='gridCol footerBtn mobiHiddenFooterButton'  onclick='fnb.utils.mobile.popup.hide(true)' ><div class='actionMenuButtonIcon'></div><a onclick='fnb.utils.mobile.popup.hide(true)' target='_self' id='mainBtnHref' href='#'>Close</a></div></div></div></div>").appendTo( $('#pageContent') );
			$.each(elements, function(elementIndex, elementObject) {
				
				fnb.utils.mobile.popUpObjects.push($(elementObject.element));
				
				var clonedObj = $(elementObject.element).clone();
				
				$(elementObject.element).find('input:not(.nonSubmittable)').addClass('nonSubmittable');
				clonedObj.find('input').removeClass('nonSubmittable');
								
				var clonedObjOnclick  = clonedObj.find('a').attr('onclick');
				
				if(typeof clonedObjOnclick!='undefined'){
					clonedObj.find('a').attr('onclick','')
					clonedObj.attr('onclick',clonedObjOnclick)
				}; 
				
				var footerObj = false;
				
				$.each(elementObject.attributes, function(attributeIndex, attributeObject) {
					if(attributeObject.attributeName =='html'){
						footerObj = true;
						clonedObj.find(attributeObject.id).html(attributeObject.attributeValue);
					}else{
						clonedObj.find(attributeObject.id).attr(attributeObject.attributeName, attributeObject.attributeValue);
					}
				});
				
				if(footerObj==true){
					clonedObj.prependTo($('#mobiPopupWrapper').find('#eziPannelButtons'));
				}else{
					clonedObj.prependTo($('#mobiPopupWrapper').find('.mobiPopupInnerWrapper'));
				}
				
				if(elementObject.type == "footer"){
					$('<div class="actionMenuButtonIcon"></div>').prependTo($(clonedObj));
				}
				
			 });
		},
		destroy : function() {

		},
		adjust: function(windowWidth){
			
		}
	};
	mobile.prototype.properties = {
		init : function() {			
			if(_isMobile){
				if(this.supportOverflowScrolling()==false){ this.removeFixed();}else{this.checkClasses()};
			}
		},
		removeFixed : function() {
		 	$(_formFooterButtons).addClass('positionRelative');
			$(_footerWrapper).addClass('positionRelative');
			$(_formFooterButtons).addClass('footerButtonsNoScroll');
			$(_footerWrapper).addClass('footerWrapperNoScroll');
		},
		checkClasses : function() {
			if($(_formFooterButtons).hasClass('positionRelative')){
				$(_formFooterButtons).removeClass('positionRelative');
				$(_footerWrapper).removeClass('positionRelative');
				$(_formFooterButtons).removeClass('footerButtonsNoScroll');
				$(_footerWrapper).removeClass('footerWrapperNoScroll');
			}
		},
		supportOverflowScrolling : function() {
			if (this.hasCSSProperty('overflow-scrolling') ||
				this.hasCSSProperty('-webkit-overflow-scrolling') ||
				this.hasCSSProperty('-moz-overflow-scrolling') ||
				this.hasCSSProperty('-o-overflow-scrolling')) {
				return true;
			} else {
				return false
			}
		},
		hasCSSProperty: function(prop){
			if (window.getComputedStyle) {
				return window.getComputedStyle(document.body, null)[prop];
			} else {
				return document.body.currentStyle[prop];
			}
		}
	};
	mobile.prototype.utils = {
		init : function() {

		},
		touchStart : function(e) {
			this.threshold = {x: 30, y: 10};
			this.originalCoord = { x: 0, y: 0 };
			this.finalCoord = { x: 0, y: 0 };
			
			var touch = e.originalEvent.touches[0];
            this.originalCoord.y = touch.pageY;
            this.originalCoord.x = touch.pageX;
		},
		touchMove : function(e) {
			if(this.finalCoord){
				var touch = e.originalEvent.touches[0];
				
				this.finalCoord.x = touch.pageX;
	            this.finalCoord.y = touch.pageY;
	            var changeY = 0;
				if(this.finalCoord.y>this.originalCoord.y){
					changeY = this.finalCoord.y - this.originalCoord.y;
				}else{
					changeY = this.originalCoord.y - this.finalCoord.y;
				}
	          
				if(changeY<0)  Math.abs(changeY);
				if(changeY > this.threshold.y) {
					this.mobileMoved = true;
	            }
			}
			
		},
		touchEnd : function(e) {
			_this=this;
			if(_this.mobileMoved == true){
				setTimeout(function () {
					_this.mobileMoved = false;
				}, 300);
			}
		},
		adjust : function() {
		
		},
		preventDefault : function(event) {
			if(_isMobile){
				event.preventDefault();
			}
		},
		changeOrientation : function(event) {
			if(_isMobile){

				switch ( window.orientation ) {
					case 0:
						if(!$('#mobileOrientationError').hasClass('hidden')){
							$('#mobileOrientationError').addClass('hidden');
							fnb.controls.controller.setBodyHeight();
						}
					break;
					case 90:
						if($(window).height()<420||$(window).width()<420){
							if($('#mobileOrientationError').hasClass('hidden')){
								$('#mobileOrientationError').removeClass('hidden');
								this.rotate('mobileOrientationError', -90);
								fnb.controls.controller.clearBodyHeight();
							}
						}
					break;
					case -90:
						if($(window).height()<420||$(window).width()<420){
							if($('#mobileOrientationError').hasClass('hidden')){
								$('#mobileOrientationError').removeClass('hidden');
								this.rotate('mobileOrientationError', 90);
								fnb.controls.controller.clearBodyHeight();
							}
						}
					break;
				}
			}
		},
		rotate : function(el, degs) {
			var iedegs = degs/90;
			if (iedegs < 0) iedegs += 4
				transform = 'rotate('+degs+'deg)';
				iefilter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+iedegs+')';
			styles = {
				transform: transform,
				'-webkit-transform': transform,
				'-moz-transform': transform,
				'-o-transform': transform,
				filter: iefilter,
				'-ms-filter': iefilter
			};
			$(el).css(styles);
		}
	}; 
	namespace("fnb.utils.mobile",mobile);
});
///-------------------------------------------///
/// developer: Donovan
///
/// DEVICE/BROWSER DETECTION
///-------------------------------------------///
$(function(){
	function currentDevice(){
		this.browser = {};
	};
	currentDevice.prototype = {
		getDevice: function(){
			var ua = navigator.userAgent;
			var isMobile = false;
			var platform=navigator.platform;
			//PH - required for BTS Event
			var width = 0;
			var height = 0;
			
			if(window.self==top){
				width = $(window).width();
				height = $(window).height();
			}
			
			var device = {
				firefox: ua.match(/Firefox/),
				chrome: ua.match(/Chrome/),
				windowsPhone: ua.match(/Windows Phone/),
				ie: ua.match(/MSIE/),
				iphone: ua.match(/iPhone/),
				ipod: ua.match(/iPod/),
				ipad: ua.match(/iPad/),
				blackberry: ua.match(/BlackBerry/),
				android: ua.match(/Android/),
				opera: ua.match(/Opera/),
				webOs: ua.match(/webOS/)
			};
			
			(function(a){jQuery.browser.mobile=/android.+mobile|ipad|avantgo|bada\/|blackberry|wp7|zunewp7|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
			if(jQuery.browser.mobile)
			{
				isMobile = true;
			}
			else
			{
			  	isMobile = false;
			}
			
			if(device.firefox){
				this.browser = {mobile: isMobile, browser: 'Firefox', version: ua.substring(ua.indexOf('Firefox/') + 8), platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.windowsPhone){
				this.browser = {mobile: isMobile, browser: 'Windows Phone', version: 0, platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.chrome){
				this.browser = {mobile: isMobile, browser: 'Chrome', version: ua.substring(ua.indexOf('Chrome/') + 7), platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.ie){
				var ieVersion = 0;
				this.compatibilityMode = false;
				
				var ieRegex = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (ieRegex.exec(ua) == null)
					this.exception = "The user agent detected does not contai Internet Explorer.";
		 
				this.renderVersion = parseFloat(RegExp.$1);
				ieVersion = this.renderVersion;
		 
				if (ua.indexOf("Trident/6.0") > -1) {
					if (ua.indexOf("MSIE 7.0") > -1) {
						this.compatibilityMode = true;
						ieVersion = 10;                  // IE 10
					}
				}
				else if (ua.indexOf("Trident/5.0") > -1) {      
					if (ua.indexOf("MSIE 7.0") > -1) {
						this.compatibilityMode = true;
						ieVersion = 9;                   // IE 9
					}
				}
				else if (ua.indexOf("Trident/4.0") > -1) {
					if (ua.indexOf("MSIE 7.0") > -1) {
						this.compatibilityMode = true;
						ieVersion = 8;                   // IE 8
					}
				}
					
				this.browser = {mobile: isMobile, browser: 'MSIE', version: ua.substring(ua.indexOf('MSIE') + 5, ua.indexOf ('.', ua.indexOf('MSIE'))), platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.iphone){
				this.browser = {mobile: isMobile, browser: 'iPhone', version: 0, platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.ipod){
				this.browser = {mobile: isMobile, browser: 'iPod', version: 0, platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.ipad){
				this.browser = {mobile: isMobile, browser: 'iPad', version: 0, platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.blackberry){
				this.browser = {mobile: isMobile, browser: 'BlackBerry', version: ua.indexOf("Version/") + 8, platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.android){
				this.browser = {mobile: isMobile, browser: 'Android', version: ua.substring(ua.indexOf('Android/') + 8), platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.opera){
				this.browser = {mobile: isMobile, browser: 'Opera', version: ua.substring(ua.indexOf('Chrome/') + 8), platform: platform, width: width, height: height}
				return this.browser;
			}else if(device.webOs){
				this.browser = {mobile: isMobile, browser: 'webOS', version: 0, platform: platform, width: width, height: height}
				return this.browser;
			}else{
				this.browser = {mobile: isMobile, browser: 'Unknown Browser', version: 0, platform: platform, width: width, height: height}
				return this.browser;
			}
		},
		getIEVersion: function(ua){
			var version="NA";
			var na=ua;
			var ieDocMode="NA";
			var ie8BrowserMode="NA";
			if(/msie/i.test(na) && (!_w.opera)){
				if(_w.attachEvent && _w.ActiveXObject){		
					version = (na.match( /.+ie\s([\d.]+)/i ) || [])[1];
					if(parseInt(version)==7){				
						if(_d.documentMode){
							version = 8;
							if(/trident\/\d/i.test(na)){
								ie8BrowserMode = "Compat Mode";
							}else{
								ie8BrowserMode = "IE 7 Mode";
							}
						}
					}else if(parseInt(version)==8){
						if(_d.documentMode){ ie8BrowserMode = "IE 8 Mode";}
					}	
					ieDocMode = (_d.documentMode) ? _d.documentMode : (_d.compatMode && _d.compatMode=="CSS1Compat") ? 7 : 5;	   			
				}
			}
			return {
				"UserAgent" : na,
				"Version" : version,
				"BrowserMode" : ie8BrowserMode,
				"DocMode": ieDocMode
			}
		}
	};
	namespace("fnb.utils.currentDevice",currentDevice);
});
///---------------------------------///
/// developer: Donovan
///
/// RETURN PARAMS
///---------------------------------///
$(function(){
	function params(){

	};
	params.prototype = {
		getParams: function(formName, targetDiv, buttonTarget, extraOptions){
			var targeteUrl; 
			var alternateUrl;
			var noForm;
			if(typeof(extraOptions)  != "undefined") { 
				alternateUrl = extraOptions["alternateUrl"];
				noForm = extraOptions["noForm"];
			}
			var target = $(targetDiv);
			
			var formTarget = $("form[name='"+formName+"']");
			
			if(formTarget.length==0) formTarget = $("#"+formName);
			
			var parms = {};
			
			targeteUrl = formTarget.attr("action");

			if(typeof(alternateUrl) != "undefined" && alternateUrl){
				targeteUrl = alternateUrl;
				console.log("alternateUrl : " + alternateUrl);
			}

			parms["targetDiv"] = $(targetDiv).attr("id");
			
			//	where fields with the same name exist on a page, we need to submit 
			//	the values as both comma seperated values, and list type values
			//	the listTypeParameters object caters for this
			var listTypeParameters = {};
			
			if(typeof(noForm) != "undefined" && noForm){
				formTarget = target;	
			};			
			
			formTarget.find("input,textarea").each(function(element){
				if(!$(this).hasClass('nonSubmittable')){
					var inputElement = $(this);
					if(inputElement.attr("name") == undefined || inputElement.attr("name")==""){
						return;
					}
					if (inputElement.attr('type') == "checkbox") {
						if(inputElement.prop('defaultChecked')==true||typeof(inputElement.attr('data-value'))!="undefined") {
							if(parms[this.name]){
								var parmsArray = new Array();
								if(typeof(parms[this.name]) == "object"){
									parmsArray = parms[this.name];
								}else if(typeof(parms[this.name]) == "string"){
									parmsArray.push(parms[this.name]);
								}
								if(typeof(inputElement.attr('data-value'))!="undefined"&&inputElement.prop('defaultChecked')==false){
									parmsArray.push(inputElement.attr('data-value'));
								}else{
									parmsArray.push(inputElement.val());
								}
								parms[this.name] = parmsArray;
							} else {
								if(typeof(inputElement.attr('data-value'))!="undefined"&&inputElement.prop('defaultChecked')==false){
									parms[this.name] = inputElement.attr('data-value');
								}else{
									parms[this.name] = inputElement.val();
								}
							}
						}
					}else{
						//check if inpput is new framework input.
						var placeHoleder = inputElement.attr('data-placeholder'); 
						var currentValue = (placeHoleder != undefined) ? 
														(placeHoleder ==  inputElement.val()) ?
															 '': inputElement.val() 
															 	: inputElement.val();

						if(inputElement.attr('name')=='branchSearchName'){
							if(currentValue=='Waiting branch code') currentValue = "";
						}
						if(inputElement.attr('name')=='branchSearchCode'){
							if(currentValue=='Enter branch code') currentValue = "";
						}
						if(inputElement.attr('name')=='biSearchCode'){
							if(currentValue=='Enter BIC Code') currentValue = "";
						}
						if(inputElement.hasClass('phoneNumber')){
							if(currentValue=='Code'||currentValue=='Number') currentValue = "";
						}
						if(typeof inputElement.attr('class')!= 'undefined'){
							if(inputElement.hasClass('currencyInput')){
								currentValue = currentValue.replace(/[,]/g,'');
							}
						}

						if(parms[this.name]){
							if(this.name.substring(0, 10)!="methodCode") {
								parms[this.name] = parms[this.name] + "," + currentValue;
								listTypeParameters[this.name]=true;
							}
						}else {
							parms[this.name] = currentValue;
						}
					}
				}
			});
			
			// 
			for(parmName in listTypeParameters){
				var parmValues = parms[parmName].split(",");
				try{
					for(parmIndex=0; parmIndex<parmValues.length ; parmIndex++){
						parms[parmName+parmIndex] = parmValues[parmIndex];	
					}
				}catch(e){
				
				}
			}
			
			var targetParent = $(buttonTarget).parent().parent();

			targetParent.children().each(function(element){
				if(!$(this).hasClass('nonSubmittable')){
					if($(this).attr('class') !== undefined){
						var inputElement = $(this);
						if(!$(inputElement).hasClass('footerBtn')||$(inputElement).get(0)==$(buttonTarget).parent().get(0)){
							$(inputElement).find('input').each(function(){
								if($(this).attr('id')=="action"){
									targeteUrl = $(this).val();
								}else{
									parms[this.name] = $(this).val();
								}					
							});
						}
					}
				}
			});
			//MOBI SUBMISSIONS
			if(fnb.utils.mobile.popUpInitialized){
				$('#mobiPopupWrapper').find('input').each(function(){
					if(!$(this).hasClass('nonSubmittable')){
						if($(this).attr('id')=="action"){
							targeteUrl = $(this).val();
						}else{
							parms[this.name] = $(this).val();
						}		
					}
				});
			}
			fnb.controls.controller.setUrl(targeteUrl);
			fnb.controls.controller.setParams(parms);
		}
	};
	namespace("fnb.utils.params",params);
});
///---------------------------------///
/// developer: Donovan
///
/// GRAPHS
///---------------------------------///
/// -------- USAGE
/// namespace("fnb.utils.graph", new fnb.utils.graph());
/// fnb.utils.graph.type = "stackedGroup";
/// fnb.utils.graph.target = "#Target";
/// fnb.utils.graph.init(DATA);
/// -------- TYPES : stackedGroup, pyramids, verticalBar
/// -------- DATA EXAMPLES
/// stackedGroup: [{minVal:0,maxVal:2000,val:1500,onclick:"alert('Clicked')",legend:'test1'},{minVal:0,maxVal:2000,val:800,onclick:"alert('Clicked2')",legend:'test2'}];
/// pyramids: [{val:1500,valPrefix:'eB ',onclick:"alert('Clicked Pyramid 1')",legend:'Feb'},{val:800,valPrefix:'eB ',onclick:"alert('Clicked Pyramid 2')",legend:'Mar'},{val:1000,valPrefix:'eB ',onclick:"alert('Clicked Pyramid 3')",legend:'Apr'},{val:100,valPrefix:'eB ',onclick:"alert('Clicked Pyramid 3')",legend:'May'},{val:600,valPrefix:'eB ',onclick:"alert('Clicked Pyramid 3')",legend:'Jun'},{val:1900,valPrefix:'eB ',onclick:"alert('Clicked Pyramid 3')",legend:'Jul'}];
/// verticalBar: [{val:15811,valPrefix:' pts*',label:' Your score',legend:'back in eBucks',xAxisData:[{heading:'',val:0,valPrefix:' pts'},{heading:'0.4%',val:5000,valPrefix:' pts'},{heading:'0.6%',val:10000,valPrefix:' pts'},{heading:'0.8%',val:14000,valPrefix:' pts'},{heading:'1.2%',val:16000,valPrefix:' pts'},{heading:'2.5%',val:18500,valPrefix:' pts'}]}];
$(function(){
	function graph(){
		this.type;
		this.target;
		this.overrideWidth;
		this.colors = new Array('#699ba6', '#a7cf5f', '#b56d81', '#d8a160', '#998b98','#306787','#84d001','#772c41','#ae906c');
		
	}
	graph.prototype = {
		init: function(values,target,overrideWidth){	
			
			var parentObject = this;
			parentObject.target = target;
			if(overrideWidth != undefined) {
				parentObject.overrideWidth = overrideWidth
			};
			
			switch(this.type)
			{
				case 'stackedGroup':
					this.drawStackedGroup(values);
				break;
				case 'pyramids':
					this.drawPyramids(values);
				break;
				case 'verticalBar':
					this.drawVerticalBar(values);
				break;
				case 'bar':
					this.drawBar(values);
				break;
				default:
				break;
			}
			
			
		},
		drawStackedGroup: function(values){
			var counter = 1;
			var _this = this;
			if($(this.target).find('.stackedGroup') != undefined) $(this.target).find('.stackedGroup').remove();
			var wrapper = '<div class="stackedGroup clearfix">';
			$.each(values, function(objIndex, obj) {
				var maxVal = obj.maxVal;
				var minVal = obj.minVal;
				var val = obj.val;
				var valPrefix = obj.valPrefix;
				var onclick = obj.onclick;
				var breakdownTextYouEarned = '<div class="breakdownTextYouEarned">You collected</div>';
				var breakdownTextMaxValue = '<div class="breakdownTextMaxValue">Max Points:<br />' + maxVal + ' per month</div>';
				var legend = '<div class="stackedGroupCellLegend">' + obj.legend + '</div>';
				var label = '<div class="stackedGroupCellLabel">' + breakdownTextYouEarned + val + valPrefix + '</div>' + breakdownTextMaxValue;
				var segSize = (minVal+maxVal)/25;
				var valSize = Math.ceil(val/segSize);
				var graph = '<div class="stackedGroupGraphWrapper graphNo' + counter + ' stackedGraphs" data-value="' + counter + '" onclick="'+onclick+'">';
				counter ++;
				graph += '<div class="stackedGroupGraph">';
				var cells = '';
				for (var z = 0; z < (25-valSize); z++) {
					cells += '<div class="stackedGroupEmptyCell"></div>';
				}
				for (var i = 0; i < valSize; i++) {
					cells += '<div class="stackedGroupCell"></div>';
				}
				graph+=cells;
				graph+='</div>';
				graph+=legend;
				graph+=label + '</div>';
				wrapper+=graph;
			});
			wrapper+='</div>';
			this.appendGraph(wrapper);
		},
		drawPyramids: function(values){
			var _this = this;			
			if($(_this.target).find('.pyramidGroup') != undefined) $(_this.target).find('.pyramidGroup').remove();
			var wrapper = '<div class="pyramidGroup">';
			var targetHeight = $(_this.target).height();
			var targetWidth = $(_this.target).width();
			if(_this.overrideWidth != undefined){targetWidth = _this.overrideWidth};
			var shuffledColors = this.shuffleArray(_this.colors);
			var columns = '';
			var actualWidth = Math.ceil(targetWidth/values.length);
			var percWidth = Math.ceil((actualWidth)/2);
			var percWidthLeft = (percWidth)/2
			percWidth +=percWidthLeft;
			var highestValue = this.getHighestValue(values);
			var topGap = 0.10*highestValue;
			var increments = targetHeight/(highestValue+topGap);
			var left = $(_this.target).position().left;
			var labelLeft = $(_this.target).position().left;
			var selectedColor;
			var i = 0;
					
			$.each(values, function(objIndex, obj) {
				var val = Math.round(obj.val*increments);
				if(isNaN(val)) val = 0;
				var valPrefix = obj.valPrefix;
				var columnHeight=targetHeight-val;
				var onclick = obj.onclick;
				var legend ='<div class="pyramidColumnLabel" style="left: '+labelLeft+'px;width:'+(percWidth)*2+'px;margin-top: '+(targetHeight+10)+'px;">'+obj.legend+'</div>';
				var border ='<div class="pyramidColumnBorder"  style="left: '+labelLeft+'px;width:'+(percWidth)*2+'px;margin-top: '+targetHeight+'px;"></div>';
				var dot ='<div class="pyramidDot"  style="left: '+labelLeft+'px;width:'+(percWidth)*2+'px;margin-top: '+(columnHeight-50)+'px;"></div>';
				var displayValue='<div class="pyramidValue"  style="left: '+labelLeft+'px;width:'+(percWidth)*2+'px;margin-top: '+(columnHeight-20)+'px;">'+valPrefix+obj.val+'</div>';
				if(i>(shuffledColors.length)-1) i=0; shuffledColors = _this.shuffleArray(_this.colors); 
				var randomColor = shuffledColors[i];
				if(selectedColor != randomColor){selectedColor = randomColor}else{randomColor = _this.colors[Math.floor(Math.random() * _this.colors.length)]};
				var column = '<div class="pyramidColumn" style="left: '+left+'px;height: '+columnHeight+'px;border-left: '+percWidth+'px solid transparent;border-right: '+percWidth+'px solid transparent;border-bottom: '+val+'px solid '+randomColor+';" onclick="'+onclick+'"></div>';
				columns += column;
				columns += legend;
				columns += border;
				columns += dot;
				columns += displayValue;
				left+=percWidth;
				labelLeft+=percWidth;
				i++;
			});
			wrapper+=columns;
			wrapper+='</div>';
			this.appendGraph(wrapper);
		},
		drawVerticalBar: function(values){
			var _this = this;
			if($(this.target).find('.verticalBarGroup') != undefined)$(this.target).find('.verticalBarGroup').remove();
			var wrapper = '<div class="verticalBarGroup">';
			var targetHeight = $(this.target).height();
			var targetWidth = $(this.target).width();
			var barOffset = 18;
			var nextIsFull = false;
			$.each(values, function(objIndex, obj) {
				var columnHeight =  (targetHeight/values[objIndex].xAxisData.length)-(barOffset/values[objIndex].xAxisData.length);
				var val = obj.val;
				var valPrefix = obj.valPrefix;
				var level = obj.level;
				if(typeof level =='undefined') level = 2; 
				var label = obj.label;
				var legend = obj.legend;
				var prevVal = 0;
				var bumpVal = obj.bumpVal ? parseFloat(obj.bumpVal) : 0;
				var bumpLabel = obj.bumpValLabel;
				var bumpValPrefix = obj.bumpValPrefix;
				var lowestVal = _this.getLowestValue(values[objIndex].xAxisData);
				var highestVal = _this.getHighestValue(values[objIndex].xAxisData);
				var newHighestVal = (highestVal/5)+highestVal;
				var barHeight;
				var totalVal = parseFloat(val)+parseFloat(bumpVal);
				$.each(values[objIndex].xAxisData.reverse(), function(itemIndex, Item) {
					var positionClass = 'verticalBarColumnNegAxisIndicator';
					var labelPositionClass = '';
					var columnClass = 'verticalBarColumn';
					if(level<2) columnClass="";
					var xAxisInicator = '';
					var bumpDevided = '';
					var barLength = values[objIndex].xAxisData.length-itemIndex;
					if(Item.val<totalVal&&level!=0){var positionClass = 'verticalBarColumnPosAxisIndicator';};
						if(nextIsFull){
							nextIsFull = false;
							positionClass = 'verticalBarColumnPosFullAxisIndicator';
						}
						if(totalVal<newHighestVal){
							if(Item.val<totalVal&&totalVal<prevVal&&level!=0){
								positionClass = 'verticalBarColumnPosFullAxisIndicator';
								barHeight = (columnHeight*(barLength))-columnHeight;
								barDevided = (columnHeight/(prevVal-Item.val))*(totalVal-Item.val);
								barHeight=barHeight+barDevided;
								labelPositionClass = ' fullLabel';
							}else if(Item.val==totalVal&&level!=0&&itemIndex!=0){
								barHeight = (columnHeight*(barLength))-columnHeight;
								barDevided = (columnHeight/(prevVal-Item.val))*(totalVal-Item.val);
								barHeight=barHeight+barDevided; 
								nextIsFull = true;
							}else{
								if(totalVal==Item.val){
									barHeight =columnHeight*(barLength-1);
								}else if(totalVal>highestVal){
								
									barHeight = targetHeight-(0.13*targetHeight);
								}
							}
						}else{
							barHeight = targetHeight-(0.1*targetHeight);
						}
						
						if(level==1&&itemIndex<(values[objIndex].xAxisData.length-1)){
							positionClass = 'verticalBarColumnNegAxisIndicator';
						}else if(level==1&&itemIndex==(values[objIndex].xAxisData.length-1)){
							positionClass = 'verticalBarColumnPosFullAxisIndicator';
						}
						if(level<2) labelPositionClass=" displayNone";
						if(itemIndex==0&&totalVal>Item.val) positionClass = 'verticalBarColumnPosFullAxisIndicator';
						if(itemIndex==0&&totalVal==Item.val) nextIsFull=true;
					
						if(Item.heading!=''){
							xAxisInicator = '<div class="verticalBarXaxisIndicator '+positionClass+'" style="left: -'+(columnHeight/2)+'px;height: '+columnHeight+'px;width: '+columnHeight+'px"><div class="verticalBarXaxisIndicatorLabel">'+Item.heading+'</div></div>';
						}else{
							columnClass +=' noXAxisIndicator';
						}

						if(Item.val<totalVal&&totalVal<prevVal&&level>1||prevVal==totalVal&&level>1||itemIndex==0&&totalVal>Item.val&&level>1){
							xAxisInicator += '<div class="verticalBarXaxisLabel">'+legend+'</div>';
						}
						if(Item.val==0){
							bumpHtml = '';
							if(bumpVal>0){
								bumpDevided = bumpVal*columnHeight;
								bumpHtml = '<div class="bumpVerticalBar bumpVerticalBarVisible" style="height: '+bumpDevided+'px"><div class="bumpVerticalBarIndicator"></div><div class="verticalBarLabel">'+label+' '+val+' '+valPrefix+'</div><div class="verticalBarBumpLabel">'+bumpLabel+'</div></div>';
							}else{
								bumpHtml = '<div class="bumpVerticalBar bumpVerticalBarNotVisible"><div class="verticalBarLabel">'+label+' '+val+' '+valPrefix+'</div></div>';
							}
							if(level>1) xAxisInicator+= '<div class="verticalWrapper" style="bottom: '+barOffset+'px"><div class="verticalBar" style="height: '+barHeight+'px">'+bumpHtml+'</div></div>';
						}	
						var column = '<div class="'+columnClass+'"  style="height: '+columnHeight+'px">'+xAxisInicator+'<div id="verticalBarColumnLabel'+itemIndex+'" class="verticalBarColumnLabel'+labelPositionClass+'">'+Item.val+Item.valPrefix+'</div></div>';
						wrapper+=column;
						prevVal = Item.val;
					
				})
			});
			wrapper+='</div>';
			this.appendGraph(wrapper);
		},
		drawBar: function(values){

			var _this = this;
			var targetHeight = $(this.target).height();
			var targetWidth = $(this.target).width();
			
			var allGroupsHighestValues = [];
			$.each(values, function(objIndex, obj) {
				allGroupsHighestValues.push(_this.getHighestValue(values[objIndex].xAxisData));
			});
			var highestValue = Math.max.apply( null, allGroupsHighestValues);

			var roundToVal = Math.pow( 1, Math.floor( Math.round( Math.log(highestValue) / Math.LN10 * 1e10 ) / 1e10 ) );
			var graphTopValue = _this.roundTo((highestValue+(0.10*highestValue)),roundToVal);
			var yIndexCount = 6;
			var subtractVal = graphTopValue/5;
			graphTopValue = Math.round(graphTopValue+subtractVal);
			
			var pixelHeights = (targetHeight-(0.20*targetHeight))/graphTopValue;

			$.each(values, function(objIndex, obj) {
				var displayXaxis = obj.displayXaxisVals;
				var displayYaxis = obj.displayYaxisVals;
				var yAxisWidth = obj.yAxisWidth;
				var xValPrefix =obj.xValPrefix;
				var xValSuffix =obj.xValSuffix;
				var legend = obj.legend;
				var percWidth = Math.round(100/values.length);
				var wrapper = '<div class="barGroup" style="width:'+percWidth+'%;height:100%">';
				var barsCount = values[objIndex].xAxisData.length;
				var yAxisPercWidth = 0;
				if(displayYaxis==true){
					yAxisPercWidth = yAxisWidth/targetWidth*100;
					var barYaxisWrapperHeight = 0.80*targetHeight
					var barYaxisWrapper = '<div class="barYAxisWrapper" style="height:'+barYaxisWrapperHeight+'px;width:'+yAxisPercWidth+'%">';
					if(graphTopValue<10) yIndexCount = graphTopValue; subtractVal=1;
					var currentXvalue = yIndexCount;
					var yAxisHeight = 100/(graphTopValue/subtractVal);
					for (var n = 0; n < yIndexCount; ++ n){						
						currentXvalue = currentXvalue-subtractVal;
						barYaxisWrapper+= '<div class="yAxisLabelContainer yAxisLabelContainer'+n+'" style="height:'+yAxisHeight+'%"><div class="yAxisLabel yAxisLabel'+n+'">'+xValPrefix+currentXvalue+xValSuffix+'</div></div>';
					}
					barYaxisWrapper+='</div>';
					wrapper+=barYaxisWrapper;
				}
				$.each(values[objIndex].xAxisData.reverse(), function(itemIndex, Item) {
					var yAxisOffset = 0;
					if(displayYaxis==true){
						yAxisOffset = yAxisWidth/barsCount;
					}
					var colPxWidth = targetWidth/barsCount;
					colPxWidth = colPxWidth-yAxisOffset;
					var colPercWidth = colPxWidth/targetWidth*100;
					var currentColLegend = Item.legend;
					var currentColVal = Item.val;
					var currentColOnClick =Item.onclick;
					var currentColHeight = pixelHeights*currentColVal;
					var currentColPosClass = "";
					if(itemIndex==0){
						currentColPosClass = ";border-left: 4px solid #dddddd;";
					}else if(itemIndex==(barsCount-1)){
						currentColPosClass = ";border-right: 4px solid #dddddd;";
					}
					var currentColMarginTop = Math.round((0.80*targetHeight)-currentColHeight)+2;
					var columnWrapper = '<div class="barColumnWrapper barColumnWrapper'+itemIndex+'" style="width:'+colPercWidth+'%;height:90%'+currentColPosClass+'">';
					var column = '<div class="barColumn barColumn'+itemIndex+'" style="height:'+(currentColHeight+2)+'px;margin-top:'+currentColMarginTop+'px"></div>';
					columnWrapper+=column;
					if(displayXaxis==true){
						if(currentColLegend!=''||typeof currentColLegend!='undefined'){
							var columnLegend = '<div class="barColumnLegend barColumnLegend'+itemIndex+'">'+currentColLegend+'</div>';
							columnWrapper+=columnLegend;
						}
					}
					columnWrapper+='</div>';
					wrapper+=columnWrapper;
				});
				if(legend!=''||typeof legend!='undefined'){
					var barLegend = '<div class="barLegend barColumnLegend'+objIndex+'" style="width:'+(100-yAxisPercWidth)+'%">'+legend+'</div>';
					wrapper+=barLegend;
				}
				wrapper+='</div>';
				_this.appendGraph(wrapper);
			});
		},
		getHighestValue: function(collection){
			var valuesArray = [];
			$.each(collection, function(objIndex, obj) {
				valuesArray.push(obj.val);
			});
			return Math.max.apply( null, valuesArray);
		},
		getLowestValue: function(collection){
			var valuesArray = [];
			$.each(collection, function(objIndex, obj) {
				valuesArray.push(obj.val);
			});
			return Math.min.apply( null, valuesArray);
		},
		shuffleArray: function(collection){
			for(var j, x, i = collection.length; i; j = parseInt(Math.random() * i), x = collection[--i], collection[i] = collection[j], collection[j] = x);
			return collection;
		},
		roundTo: function(number, to) {
			return ((number%to) > 0)?number-(number%to) + to:number;
		},
		appendGraph: function(html){
			$(this.target).append(html);
		},
		removeGraph: function(){
		  
			var parentObject = this;

			//$(this.target).find('.pyramidGroup').remove();
		},
		reset: function() {
		
		this.removeGraph();
					
		}
	};

	namespace("fnb.utils.graph",graph);
});
///---------------------------------///
/// developer: Donovan
///
/// SCROLLING TOUCH BANNER
///---------------------------------///
$(function(){
	function scrollingBanner(){
		this.bannerScroller = [];
		this.bannerParentItems = [];
		this.bannerScrollerScrolling = false;
		this.bannerScrollerStops;
		this.bannerScrollerStopWidth;
		this.bannerWidth;
		this.bannerParent;
		this.bannerScrollerParent;
		this.bannerScrollerWidth;
		this.bannerScrollingBannerContainer;
		this.bannerItems;
		this.bannerEnableScrolling = true;
		this.childCount;
		this.firstChild;
		this.bannerItemHeight;
		this.bannerItemWidth;
		this.bannerItemSideMargins;
		this.bannerItemsOnScreenCount;
		this.bannerScrollStopWidth;
		this.bannerItemsOnScreenGap;
		this.bannerItemsOnScreenFill;
		this.doSpacing = 'false';
	};
	scrollingBanner.prototype = {
		init: function(parent,visible,doSpacing){

			if(typeof this.bannerParent=='undefined') this.bannerParent = [];
			this.bannerParentItems.push(parent);
			this.bannerParent[parent] = $('#'+parent);
			this.bannerParent[parent].parentId = parent;
			this.bannerParent[parent].doSpacing = (doSpacing) ? true : false;
			this.bannerParent[parent].bannerEnableScrolling = false;
			this.bannerParent[parent].bannerScrollerParent = this.bannerParent[parent].find('#scrollableBanner');
			this.bannerParent[parent].bannerScrollingBannerContainer =  this.bannerParent[parent].find('#scrollingBannerContainer');
			this.bannerParent[parent].bannerScrollingBannerWrapper =  this.bannerParent[parent].find('#scrollWrapper');
			this.bannerParent[parent].bannerItems = this.bannerParent[parent].bannerScrollingBannerWrapper.find('.scrollingBannerItem');
			this.bannerParent[parent].childCount = this.bannerParent[parent].bannerItems.length;
			var _current = this;
			this.show(parent);
			setTimeout(function(){
				_current.doCalculations(parent);
			},200); 
		},
		doCalculations: function(parent){
			
			var maxWidth = $(_workspace).width();
			var itemsWidth = this.bannerParent[parent].find('.scrollingBannerItem:eq(0)').outerWidth()*this.bannerParent[parent].find('.scrollingBannerItem').length;
			
			if(itemsWidth>maxWidth){

				this.firstChild = this.bannerParent[parent].find('.scrollingBannerItem:eq(0)');
				var bannerItemWidth = Math.floor($(this.firstChild).outerWidth(true))-1;
				this.bannerParent[parent].bannerItemHeight = $(this.firstChild).outerHeight(true);
				
				var bannerWidth =  Math.round(this.bannerParent[parent].width());
				var bannerItemsOnScreenCount = Math.floor(bannerWidth/bannerItemWidth);
				
				this.bannerParent[parent].scrollerWidth = "";
				
				if(bannerItemsOnScreenCount<this.bannerParent[parent].childCount){
					this.bannerParent[parent].bannerEnableScrolling = true;
					if(this.bannerParent[parent].doSpacing==false){
						var newBannerWidth = Math.round(bannerWidth/bannerItemsOnScreenCount);
						this.bannerParent[parent].bannerItems.css({'width':newBannerWidth});
						this.bannerParent[parent].scrollerWidth =this.bannerParent[parent].childCount*newBannerWidth;
					}else{
						this.bannerParent[parent].bannerItemSideMargins = this.firstChild.outerWidth(true) - this.firstChild.outerWidth();
						var bannerItemsOnScreenGap = (bannerWidth - (bannerItemsOnScreenCount*bannerItemWidth))-bannerItemsOnScreenCount;
						this.bannerParent[parent].bannerItemsOnScreenFill = Math.round((bannerItemsOnScreenGap/bannerItemsOnScreenCount)/2);
						this.bannerParent[parent].scrollerWidth =this.bannerParent[parent].childCount*bannerWidth;
					}
					this.bannerParent[parent].bannerScrollerStopWidth =bannerWidth;
					var scrollerStops = Math.round(this.bannerParent[parent].scrollerWidth/(bannerWidth/bannerItemsOnScreenCount))-1;
					this.bannerParent[parent].bannerScrollerStops = scrollerStops;
					this.setupBannerItems(parent);
					this.setupBanner(parent);
					this.initHorizontalScroller(parent);
				}else{
					if(typeof this.bannerParent[parent].bannerScroller !='undefined') this.bannerParent[parent].bannerScroller.enabled = false;
				}

			}
		},
		initHorizontalScroller: function(parent){
			this.bannerParent[parent].bannerScroller = new horizontalScroller();
			this.bannerParent[parent].bannerScroller.scrollableParent = this.bannerParent[parent].bannerScrollerParent;
			this.bannerParent[parent].bannerScroller.scrollerChildren = this.bannerParent[parent].find('.scrollingBannerItem');
			this.bannerParent[parent].bannerScroller.scrollStopWidth = this.bannerParent[parent].bannerScrollerStopWidth;
			this.bannerParent[parent].bannerScroller.scrollSpeed = 500;
			this.bannerParent[parent].bannerScroller.maxStops = this.bannerParent[parent].bannerScrollerStops;
			this.bannerParent[parent].bannerScroller.moveTreshold = 0.50;
			this.bannerParent[parent].bannerScroller.bindEvents();
			this.bannerParent[parent].bannerScroller.enabled = this.bannerParent[parent].bannerEnableScrolling;
		},
		resetBannerItems: function(parent){
			_this=this;
			_this.bannerParent[parent].bannerScrollerParent.css({'width':''});
			_this.bannerParent[parent].bannerItems.css({'margin':'0','width':''});
			
		},
		setupBannerItems: function(parent){
			_this=this;
			var onScreenMargin = Math.floor((this.bannerParent[parent].bannerItemSideMargins/2)+this.bannerParent[parent].bannerItemsOnScreenFill);
			var onScreenMarginString = '0 '+onScreenMargin+'px 0 '+onScreenMargin+'px';
			$.each(_this.bannerParent[parent].bannerItems, function(bannerItemIndex, bannerItem) {
				$(bannerItem).css({'margin':onScreenMarginString});
			});
		},
		setupBanner: function(parent){
			this.bannerParent[parent].height(this.bannerParent[parent].bannerItemHeight);
			this.bannerParent[parent].bannerScrollerParent.width(this.bannerParent[parent].scrollerWidth);
		},
		show: function(parent){
			this.bannerParent[parent].scrollingBannerVisible = true;
			this.bannerParent[parent].removeClass('hidden');
		},
		hide: function(parent){
			this.bannerParent[parent].scrollingBannerVisible = false;
			this.bannerParent[parent].addClass('hidden');
		},
		scrollLeft: function(parent){
			this.bannerParent[parent].bannerScroller.previous();
		},
		scrollRight: function(parent){
			this.bannerParent[parent].bannerScroller.next();
		},
		adjust: function(windowWidth,specificParent){

			_this=this;
			if(typeof specificParent=='undefined'){
				if(this.bannerParentItems.length>0){
					$.each(_this.bannerParentItems, function(index, parentId) {
						_this.resetBannerItems(parentId);
						_this.doCalculations(parentId);
					});
				}
			}else{
				_this.resetBannerItems(specificParent);
				_this.doCalculations(specificParent);
			}
		}
	};
	namespace("fnb.utils.scrollingBanner",scrollingBanner);
});
///---------------------------------///
/// developer: Donovan
///
/// CREATE SITE OBJECTS
///---------------------------------///
$(function(){
	function objectsInitializer(){
		
	};
	objectsInitializer.prototype = {
		init: function(){
			namespace("fnb.utils.frame", new fnb.utils.frame());
			fnb.controls.controller.registerObj('frame',fnb.utils.frame);
			namespace("fnb.utils.topTabs", new fnb.utils.topTabs());
			fnb.controls.controller.registerObj('topTabs',fnb.utils.topTabs);
			fnb.controls.controller.eventsObject = new fnb.controls.events(this);
			fnb.controls.controller.registerObj('eventsObject',this.eventsObject);
			namespace("fnb.controls.page", new fnb.controls.page());
			fnb.controls.controller.registerObj('pageObject',fnb.controls.page);
			namespace("fnb.utils.load", new fnb.utils.load());
			fnb.controls.controller.registerObj('load',fnb.utils.load);
			namespace("fnb.utils.ajaxManager", new fnb.utils.ajaxManager());
			fnb.controls.controller.registerObj('fnb.utils.ajaxManager',fnb.utils.ajaxManager);
			namespace("fnb.utils.loadUrl", new fnb.utils.loadUrl());
			fnb.controls.controller.registerObj('loadUrl',fnb.utils.loadUrl);
			namespace("fnb.forms.input", new fnb.forms.input());
			fnb.controls.controller.registerObj('input',fnb.forms.input);
			namespace("fnb.utils.navError", new fnb.utils.navError());
			fnb.controls.controller.registerObj('error',fnb.utils.navError);
			namespace("fnb.utils.handleOTP", new fnb.utils.handleOTP());
			fnb.controls.controller.registerObj('otp',fnb.utils.handleOTP);
			namespace("fnb.utils.overlay", new fnb.utils.overlay());
			fnb.controls.controller.registerObj('overlay',fnb.utils.overlay);
			namespace("fnb.utils.errorPanel", new fnb.utils.errorPanel());
			fnb.controls.controller.registerObj('errorPanel',fnb.utils.errorPanel);
			namespace("fnb.utils.actionMenu", new fnb.utils.actionMenu());
			fnb.controls.controller.registerObj('fnb.utils.actionMenu',fnb.utils.actionMenu);
			namespace("fnb.utils.mobile",new fnb.utils.mobile());
			fnb.controls.controller.registerObj('fnb.utils.mobile',fnb.utils.mobile);
			namespace("fnb.utils.currentDevice",new fnb.utils.currentDevice());
			fnb.controls.controller.registerObj('fnb.utils.currentDevice',fnb.utils.currentDevice);
			namespace("fnb.forms.extendedPageHeading",new fnb.forms.extendedPageHeading());
			fnb.controls.controller.registerObj('fnb.utils.currentDevice',fnb.forms.extendedPageHeading);
			namespace("fnb.forms.dropdown",new fnb.forms.dropdown());
			fnb.controls.controller.registerObj('fnb.forms.dropdown',fnb.forms.dropdown);
			namespace("fnb.forms.radioButtons",new fnb.forms.radioButtons());
			fnb.controls.controller.registerObj('fnb.forms.radioButtons',fnb.forms.radioButtons);
			namespace("fnb.utils.eziSlider",new fnb.utils.eziSlider());
			fnb.controls.controller.registerObj('fnb.utils.eziSlider',fnb.utils.eziSlider);
			namespace("fnb.functions.branchSearch",new fnb.functions.branchSearch());
			fnb.controls.controller.registerObj('fnb.functions.branchSearch',fnb.functions.branchSearch);
			namespace("fnb.functions.bicSearch",new fnb.functions.bicSearch());
			fnb.controls.controller.registerObj('fnb.functions.bicSearch',fnb.functions.bicSearch);
			namespace("fnb.forms.checkBox",new fnb.forms.checkBox());
			fnb.controls.controller.registerObj('fnb.forms.checkBox',fnb.forms.checkBox);
			namespace("fnb.utils.params",new fnb.utils.params());
			fnb.controls.controller.registerObj('fnb.utils.params',fnb.utils.params);
			namespace("fnb.functions.reloadDropdown",new fnb.functions.reloadDropdown());
			fnb.controls.controller.registerObj('fnb.functions.reloadDropdown',fnb.functions.reloadDropdown);
			namespace("fnb.functions.loadDropDownDiv",new fnb.functions.loadDropDownDiv());
			fnb.controls.controller.registerObj('fnb.functions.loadDropDownDiv',fnb.functions.loadDropDownDiv);
			namespace("fnb.utils.popup",new fnb.utils.popup());
			fnb.controls.controller.registerObj('fnb.utils.popup',fnb.utils.popup);
			namespace("fnb.functions.notifications",new fnb.functions.notifications());
			fnb.controls.controller.registerObj('fnb.functions.notifications',fnb.functions.notifications);
			namespace("fnb.functions.showHideToggleElements",new fnb.functions.showHideToggleElements());
			fnb.controls.controller.registerObj('fnb.functions.showHideToggleElements',fnb.functions.showHideToggleElements);
			fnb.controls.controller.registerObj('fnb.functions.toggleClassName',fnb.functions.toggleClassName);
			namespace("fnb.functions.toggleClassName",new fnb.functions.toggleClassName());
			fnb.controls.controller.registerObj('fnb.functions.toggleClassName',fnb.functions.toggleClassName);
			namespace("fnb.functions.loadUrlToPrintDiv",new fnb.functions.loadUrlToPrintDiv());
			fnb.controls.controller.registerObj('fnb.functions.loadUrlToPrintDiv',fnb.functions.loadUrlToPrintDiv);
			namespace("fnb.functions.submitFormToWorkspace",new fnb.functions.submitFormToWorkspace());
			fnb.controls.controller.registerObj('fnb.functions.submitFormToWorkspace',fnb.functions.submitFormToWorkspace);
			namespace("fnb.utils.otp",new fnb.utils.otp());
			fnb.controls.controller.registerObj('fnb.utils.otp',fnb.utils.otp);
			namespace("fnb.utils.subtabs",new fnb.utils.subtabs());
			fnb.controls.controller.registerObj('fnb.utils.subtabs',fnb.utils.subtabs);
			namespace("fnb.functions.unhider",new fnb.functions.unhider());
			fnb.controls.controller.registerObj('fnb.functions.unhider',fnb.functions.unhider);
			namespace("fnb.forms.tooltip",new fnb.forms.tooltip());
			fnb.controls.controller.registerObj('fnb.forms.tooltip',fnb.forms.tooltip);
			namespace("fnb.functions.accountDropdown",new fnb.functions.accountDropdown());
			fnb.controls.controller.registerObj('fnb.functions.accountDropdown',fnb.functions.accountDropdown);
			namespace("fnb.functions.lotto",new fnb.functions.lotto());
			fnb.controls.controller.registerObj('fnb.functions.lotto',fnb.functions.lotto);
			namespace("fnb.forms.textAreaHandler",new fnb.forms.textAreaHandler());
			fnb.controls.controller.registerObj('fnb.forms.textAreaHandler',fnb.forms.textAreaHandler);	
			namespace("fnb.functions.navigateTo",new fnb.functions.navigateTo());
			fnb.controls.controller.registerObj('fnb.functions.navigateTo',fnb.functions.navigateTo);	
			namespace("fnb.functions.gotoUrl",new fnb.functions.gotoUrl());
			fnb.controls.controller.registerObj('fnb.functions.gotoUrl',fnb.functions.gotoUrl);
			namespace("fnb.functions.siteLoadComplete", new fnb.functions.siteLoadComplete());
			namespace("fnb.functions.checkboxHierarchySwitcher",new fnb.functions.checkboxHierarchySwitcher());
			fnb.controls.controller.registerObj('fnb.functions.checkboxHierarchySwitcher',fnb.functions.checkboxHierarchySwitcher);
			namespace("fnb.functions.rowHandler",new fnb.functions.rowHandler());
			fnb.controls.controller.registerObj('fnb.functions.rowHandler',fnb.functions.rowHandler);
			namespace("fnb.forms.tableUtils", new fnb.forms.tableUtils());
			fnb.controls.controller.registerObj('fnb.forms.tableUtils',fnb.forms.tableUtils);
			namespace("fnb.utils.paypal.windows",new fnb.utils.paypal.windows());
			fnb.controls.controller.registerObj('fnb.utils.paypal.windows',fnb.utils.params);
			namespace("fnb.forms.scrollUtil",new fnb.forms.scrollUtil());
			fnb.controls.controller.registerObj('fnb.forms.scrollUtil', fnb.forms.scrollUtil);
			namespace("fnb.functions.submitFormToEziPanel",new fnb.functions.submitFormToEziPanel());
			fnb.controls.controller.registerObj('fnb.functions.submitFormToEziPanel', fnb.functions.submitFormToEziPanel);
			namespace("fnb.functions.submitFormToDiv",new fnb.functions.submitFormToDiv());
			fnb.controls.controller.registerObj('fnb.functions.submitFormToDiv', fnb.functions.submitFormToDiv);
			namespace("fnb.functions.timeOut",new fnb.functions.timeOut());
			fnb.controls.controller.registerObj('fnb.functions.timeOut', fnb.functions.timeOut);
			/*			namespace("fnb.functions.logOff",new fnb.functions.logOff());
			fnb.controls.controller.registerObj('fnb.functions.logOff', fnb.functions.logOff);*/
			namespace("fnb.utils.graph",new fnb.utils.graph());
			fnb.controls.controller.registerObj('fnb.utils.graph', fnb.utils.graph);
			namespace("fnb.utils.scrollingBanner",new fnb.utils.scrollingBanner());
			fnb.controls.controller.registerObj('fnb.utils.scrollingBanner', fnb.utils.scrollingBanner);
			namespace("fnb.functions.bigThree",new fnb.functions.bigThree());
			fnb.controls.controller.registerObj('fnb.functions.bigThree',fnb.functions.bigThree);
			namespace("fnb.functions.logonHandler",new fnb.functions.logonHandler());
			fnb.controls.controller.registerObj('fnb.functions.logonHandler',fnb.functions.logonHandler);
			namespace("fnb.forms.fileUpload",new fnb.forms.fileUpload());
			fnb.controls.controller.registerObj('fnb.forms.fileUpload',fnb.forms.fileUpload);
			namespace("fnb.functions.tableMoreButton",new fnb.functions.tableMoreButton());
			fnb.controls.controller.registerObj('fnb.functions.tableMoreButton',fnb.functions.tableMoreButton);	
			namespace("fnb.functions.hyperlink",new fnb.functions.hyperlink());
			fnb.controls.controller.registerObj('fnb.functions.hyperlink',fnb.functions.hyperlink);				
			namespace("fnb.functions.isScrolling",new fnb.functions.isScrolling());
			fnb.controls.controller.registerObj('fnb.functions.isScrolling',fnb.functions.isScrolling);
			namespace("fnb.functions.loadUrlToExpandableRow",new fnb.functions.loadUrlToExpandableRow());
			fnb.controls.controller.registerObj('fnb.functions.loadUrlToExpandableRow',fnb.functions.loadUrlToExpandableRow);
			namespace("fnb.functions.cozaContent",new fnb.functions.cozaContent());
			fnb.controls.controller.registerObj('fnb.functions.cozaContent',fnb.functions.cozaContent);
			namespace("fnb.functions.ie8",new fnb.functions.ie8());
			fnb.controls.controller.registerObj('fnb.functions.ie8',fnb.functions.ie8);
			namespace("fnb.functions.slowConnection",new fnb.functions.slowConnection());
			fnb.controls.controller.registerObj('fnb.functions.slowConnection',fnb.functions.slowConnection);
			namespace("fnb.functions.footer",new fnb.functions.footer());
			fnb.controls.controller.registerObj('fnb.functions.footer',fnb.functions.footer);
		}
	};
	
	namespace("fnb.utils.objectsInitializer",objectsInitializer);

});


///-------------------------------------------///
/// developer: Donovan
///
/// Event Controller
///-------------------------------------------///
$(function(){
	function eventObject(sender) {
		this._sender = sender;
	}
	eventObject.prototype = {
		eventList: {},
		getEvent: function(eventName, create){
			if (!this.eventList[eventName]){
				if (!create) {
					return null;
				}
				this.eventList[eventName] = [];
			}
			return this.eventList[eventName];
		},
		attachEvent: function(eventName,handler,args) {
			var evt = this.getEvent(eventName, true);
			var func;
			switch(typeof(handler)) {
				case 'function':
					func = handler
				break;
				default:
					func = new Function(args,handler);
			};
			evt.push(func);
		},
		insertEvent: function(eventName, handler,args , position) {
			var evt = this.getEvent(eventName, true);
			var func;
			switch(typeof(handler)) {
				case 'function':
					func = handler
				break;
				default:
					func = new Function(args,handler);
			};
			evt.splice(position, 0, func);
		},
		detachEvent: function(eventName, handler) {
			var evt = this.getEvent(eventName);
			if (!evt) { return; }
			var getArrayIndex = function(array, item){
				for (var i = 0; i < array.length; i++) {
					if (array[i] && array[i] === item) {
						return i;
					}
				}
				return -1;
			};
			var index = getArrayIndex(evt, handler);
			if (index > -1) {
				evt.splice(index, 1);
			}
		},
		raiseEvent: function(eventName, eventArgs) {
			console.log('Events Controller -- Event Raised : '+eventName)
			
			if(eventArgs){
				if (eventArgs.url) { 
					eventArgs.url = eventArgs.url.replace(/'/gi, "'");
				}
			}

			if(typeof(this.getEventHandler(eventName))!='undefined'){
				if (this.getEventHandler(eventName)) {
					this.getEventHandler(eventName)(this._sender, eventArgs);
				}
			}
		},
		getEventHandler: function(eventName) {
			var evt = this.getEvent(eventName, false);
			if (!evt || evt.length === 0) { return null; }
			var _handler = function(sender, args) {
				for (var i = 0; i < evt.length; i++) {
					evt[i](sender, args);
				}
			};
			return _handler;
		}
	};
	namespace("fnb.controls.events",eventObject);
});


///-------------------------------///
/// developer: Donovan
///
/// First page Loaded
///-------------------------------///
$(function(){
	function siteLoadComplete(){

	};
	siteLoadComplete.prototype = {
		complete: function(){
			$('html').addClass('htmlBackGround');
			$(_header).removeClass('visibilityHidden');
			$(_pageContainer).removeClass('visibilityHidden');
			$('#footerWrapperNew').removeClass('visibilityHidden');
			progressBar.progressClass = " progressWrapperStandard";
			fnb.controls.controller.setSkin();
			
		}
	};
	namespace("fnb.functions.siteLoadComplete",siteLoadComplete);
});
$(function(){
	function logonHandler(){

	};
	logonHandler.prototype = {
		loggedOn: function(){
			
			var _leftSideBar = $(_topMenu).find('.left-sidebar-top');	
			if($(_topNav).hasClass('hideTopNav')){$(_topNav).removeClass('hideTopNav')};
			if(_leftSideBar.hasClass('minimalTopMenuAdjust')){_leftSideBar.removeClass('minimalTopMenuAdjust')};
		}
	};
	namespace("fnb.functions.logonHandler",logonHandler);
});

///-------------------------------///
/// developer: Donovan
///
/// SHOW HIDE TOGGLE
///-------------------------------///
$(function(){
	function showHideToggleElements(){
		this.elements = [];
		this.parentFunction = this;
	};
	showHideToggleElements.prototype = {
			showHideToggle: function(elements){
				this.elements = $.makeArray(elements);
				var main = this.parentFunction;
				$.each(this.elements, function(elementsIndex, elementObject) {
					 switch(elementObject.show){
				         case 'true':
				        	 main.showElement(elementObject);
				        	 break;
				         case 'false':
				        	 main.hideElement(elementObject);
				        	 break;
				         case 'toggle':
				        	 main.toggleElement(elementObject);
				        	 break;	
					 }    
				 })
			},
			showElement: function(object){
				if(object.animation){
					this.animateElement('show',object);
	        	}else{
	        		$(object.element).show();
	        	}
			},
			hideElement: function(object){				
				if(object.animation){
					this.animateElement('hide',object);
		       	}else{
		       		$(object.element).hide();
		       	}
			},
			toggleElement: function(object){
				$(object.element).toggle();
			}
	};
	namespace("fnb.functions.showHideToggleElements",showHideToggleElements);
	
});
///-------------------------------///
/// developer: Donovan
///
/// BRANCH SEARCH
///-------------------------------///
$(function(){
	function branchSearch(){
		
		this.lowercodes = [];
		this.bankNames = [];
		this.nums = [];
		this.xRefCodes = [];
		
		this.bankList = [];
		this.bankOptionsList = [];
		this.bankOptionsDropdownList = [];
		
		this.parent;
		this.parentWrapper;
		
		this.focusFlag = true;
		this.error = true;
		
		this.dropDownItemSearch;
		
		this.selectedCountryCode;
		this.selectedDropdownItem;
		this.selectedDropdownValue;
		
		this.country = '';
		
	};
	branchSearch.prototype = {
			initialize: function(lowerCodes,bankNames,nums, xRefCodes, country){
				this.lowercodes = lowerCodes.substring(1, lowerCodes.length - 1).split(',');
				this.bankNames = bankNames.substring(1, bankNames.length - 1).split(',');
				this.nums = nums.substring(1, nums.length - 1).split(',');
				this.xRefCodes = xRefCodes.substring(1, xRefCodes.length - 1).split(', ');
				this.country = country;
			},
			appendBanksList: function(countryCode,returnValue,displayValue){
				this.bankList.push({countryCode:countryCode, returnValue:returnValue, displayValue:displayValue});
			},
			appendBankOptionsList: function(bankId,returnType,returnValue,countryCode){
				this.bankOptionsList.push({bankId:bankId, returnType:returnType, returnValue:returnValue, countryCode:countryCode});
			},
			appendBankOptionsDropdownsList: function(bankId,countryCode,displayValue,returnValue){
				this.bankOptionsDropdownList.push({bankId:bankId, countryCode:countryCode, displayValue:displayValue, returnValue:returnValue});
			},
			selectCountry: function(selection){

				this.dropDownItemSearch = $(selection).parent().find('.dropdown-content-top');
				this.selectedDropdownItem = selection;
				this.parent = $(this.selectedDropdownItem).parents(".dropDown");
				this.selectedDropdownValue = $(this.selectedDropdownItem).attr('data-value');
				
				$('#dynamicInputElement').parent().parent().parent().hide();
				$('#dynamicDropdownElement_parent').hide();
					
				this.clearDropdown($('#selectBankDropdown_parent').find('.dropdown-content'));

				var selectedAvailableBanks = [];

				selectedAvailableBanks = $.grep(this.bankList, function(option, index) {
			        return ( option.countryCode == fnb.functions.branchSearch.selectedDropdownValue );
			    });

				var optionsDiv = $('#selectBankDropdown_parent').find('.dropdown-content');

				$(this.dropDownItemSearch).appendTo($(optionsDiv));

				$.each(selectedAvailableBanks, function(index, item) {
					var clonedDropdownItem = $(fnb.functions.branchSearch.selectedDropdownItem).clone();
					$(clonedDropdownItem).attr('data-value',item.returnValue);
					$(clonedDropdownItem).find('.dropdown-item-row').html(item.displayValue);
					$(clonedDropdownItem).attr('onclick','fnb.functions.branchSearch.selectBank(this)').bind('click');
					$(clonedDropdownItem).appendTo($(optionsDiv));
			    }); 

			},
			selectBank: function(selection){
				
				this.selectedDropdownItem = selection;
				this.selectedDropdownValue = $(this.selectedDropdownItem).attr('data-value');
				this.selectedCountryCode = $('#selectCountryDropdown').attr('value');

				var selectedBranches = [];

				selectedBranches = $.grep(this.bankOptionsList, function(option, index) {
			        return ( option.countryCode == fnb.functions.branchSearch.selectedCountryCode && option.bankId == fnb.functions.branchSearch.selectedDropdownValue);
			    });
				
				if(selectedBranches.length>0){
					switch(selectedBranches[0].returnType)
			        {
			          	case '0':
			          		var filteredBranches = [];
							filteredBranches = $.grep(this.bankOptionsDropdownList, function(option, index) {
						        return ( option.countryCode == fnb.functions.branchSearch.selectedCountryCode && option.bankId == fnb.functions.branchSearch.selectedDropdownValue);
						    });

							$('#dynamicInputElement').parent().parent().parent().hide();
							$('#dynamicDropdownElement_parent').show();
				
							this.clearDropdown($('#dynamicDropdownElement_parent').find('.dropdown-content'));
							
							var optionsDiv = $('#dynamicDropdownElement_parent').find('.dropdown-content');

							$.each(filteredBranches, function(index, item) {
								var clonedDropdownItem = $(fnb.functions.branchSearch.selectedDropdownItem).clone();
								$(clonedDropdownItem).attr('data-value',item.returnValue);
								$(clonedDropdownItem).find('.dropdown-item-row').html(item.displayValue);
								$(clonedDropdownItem).attr('onclick','fnb.functions.branchSearch.returnBranchCode("'+item.returnValue+'", "'+item.displayValue+'")').bind('click');
								$(clonedDropdownItem).appendTo($(optionsDiv));
						    });
				        break;
				        case '1':
				        	fnb.functions.branchSearch.returnBranchCode(selectedBranches[0].returnValue,$(this.selectedDropdownItem).find('h3').text());
					    break;
					}	
				}else{
					if (this.selectedDropdownValue!=0) {
						$('#dynamicInputElement').parent().parent().parent().show();
						$('#dynamicDropdownElement_parent').hide();
					}
					else {
						$('#dynamicInputElement').parent().parent().parent().hide();
						$('#dynamicDropdownElement_parent').hide();
						
					}
				}
			},
			returnBranchCode: function(returnValue, displayValue){
				this.focusFlag = true;
				
				$('#branchSearchCode').val(returnValue);
				
				if(displayValue!=""){
					$('#branchSearchName').val(displayValue);
					$('#branchSearchName').parent().attr('style','');
					$('#BranchSearchNameContainer').addClass('input disabled');
					$('#BranchSearchNameContainer').children(':first-child').addClass('inputColor turqDarkBg roundedLeft');
				}else{
					fnb.functions.branchSearch.findName(returnValue);
				}
				
				$('#dynamicInputElement').parent().parent().parent().hide();
				$('#dynamicDropdownElement_parent').hide();
				
				fnb.controls.controller.eventsObject.raiseEvent('eziSliderHide', '');
				
				fnb.hyperion.controller.clipOverflow(false);
				checkBankName();
			},
			inputKeypress: function(input,event){
				
				fnb.functions.branchSearch.parentWrapper = $(event.target).parent().parent().parent().parent();
				
				var inputVal = $(input).val();
				var subInputVal = '';
				var inputCount = $(input).val().length;
				if (!isNaN(inputVal)) {
					inputVal = parseInt($(input).val());
				}
				else {
					if ((typeof inputVal != 'undefined')&&inputCount>=4) subInputVal=inputVal.substring(0,4);
				}
				
				var bankName = 'Waiting branch code';
				
					
				if(this.error = true){
					fnb.functions.branchSearch.parentWrapper.removeClass('formElement error').addClass('formElement');
					this.error = false;
				}
				if(event.keyCode == 13){
					if(inputCount<6){
						$('#branchSearchName').val('');
					}
					else if ((fnb.functions.branchSearch.country==83)&&(inputCount == 11)) {
							$.each(fnb.functions.branchSearch.xRefCodes, function(index, item) {
									if (subInputVal == fnb.functions.branchSearch.xRefCodes[index]){
										bankName = fnb.functions.branchSearch.bankNames[index];
									}
							});
							$('#branchSearchName').val(bankName);
					}else{
						$.each(fnb.functions.branchSearch.lowercodes, function(index, item) {
							var previousIndex = 0;
							if(index>0) previousIndex = parseInt(fnb.functions.branchSearch.lowercodes[index-1]);

							if(inputVal>previousIndex && inputVal<parseInt(item)){
								bankName = fnb.functions.branchSearch.bankNames[index-1];
							}
						});
						$('#branchSearchName').val(bankName);
					}
				}
				var selectionStart = $(input).get(0).selectionStart;
				var selectionEnd = $(input).get(0).selectionEnd;
				
				var c = event.keyCode;
			    var ctrlDown = event.ctrlKey||event.metaKey; // Mac support
			    // Check for Alt+Gr
			    if (ctrlDown && event.altKey) return false;
			    // Check for ctrl+c, v and x
			    else if (ctrlDown && c==67) return true; // c
			    else if (ctrlDown && c==86) return true; // v
			    else if (ctrlDown && c==88) return true; // x
			    else if (ctrlDown && c==90) return true; // z
			    else if((((fnb.functions.branchSearch.country==83)&&inputCount<=12)||((fnb.functions.branchSearch.country!=83&&inputCount<=7))) || event.keyCode == 8 || event.keyCode == 9){
					if(event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || event.keyCode == 32)				
					{
						return true;
					}
					else
					if((fnb.functions.branchSearch.country!=83)&&(event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ))
					{
							return false;	
					}else{
						if(((fnb.functions.branchSearch.country==83)&&(inputCount<11))||((inputCount<6)&&(fnb.functions.branchSearch.country!=83))){
							return true;
						}else{
							return false;
						}
					}
				}else{
					return false;
				}
			},
			inputBlur: function(){
				if(fnb.functions.branchSearch.focusFlag){
					var inputVal = $('#branchSearchCode').val();
					fnb.functions.branchSearch.findName(inputVal);
				}
				checkBankName();
			},
			findName: function(returnValue){
				var inputVal = returnValue;
				var subInputVal = '';
				if (!isNaN(inputVal)) {
					inputVal = parseFloat(returnValue);
				}
				else {
					if ((typeof inputVal != 'undefined')&&inputVal.length>=4) subInputVal=returnValue.substring(0,4);
				}
				
				var inputCount = returnValue.length;
				var bankName = 'Waiting branch code';
				var found = false;
				var lastIndex = 0;
				var previousValue = 0;
				
				if(inputCount<6){
					this.error = true;
					$('#branchSearchName').val(bankName);
				}else{
					if (inputCount == 11) {
						$.each(fnb.functions.branchSearch.xRefCodes, function(index, item) {
								if (subInputVal == fnb.functions.branchSearch.xRefCodes[index]){
									bankName = fnb.functions.branchSearch.bankNames[index];
								}
						});
						$('#branchSearchName').val(bankName);					
					}if(inputCount < 11 && (fnb.functions.branchSearch.country==83)){
						this.error = true;
						$('#branchSearchName').val(bankName);
					}else {
						$.each(fnb.functions.branchSearch.lowercodes, function(index, item) {
							var previousIndex = 0;
							if(index>0) previousIndex = parseInt(fnb.functions.branchSearch.lowercodes[index-1]);
							previousValue = previousIndex;
							lastIndex = index; 
							if(inputVal>=previousIndex && inputVal<parseFloat(item)){
								bankName = fnb.functions.branchSearch.bankNames[index-1];
								found = true;
							}
						});
						if ((!found) && (inputVal >= previousValue)) {
							bankName = fnb.functions.branchSearch.bankNames[lastIndex];
						}
						$('#branchSearchName').val(bankName);
					}

				}
			},
			clearDropdown: function(dropdownID){
				$(dropdownID).children().remove();
			}
	};

	namespace("fnb.functions.branchSearch",branchSearch);
});

///-------------------------------///
/// developer: Nishal
///
/// BIC SEARCH
///-------------------------------///
$(function(){
	function bicSearch(){

		this.bicCodes = [];
		this.bicBankNames = [];
		this.bankList = [];

		this.parent;
		this.parentWrapper;
		
		this.focusFlag = true;
		this.error = true;
		
		this.dropDownItemSearch;
		
		this.selectedCountryCode;
		this.selectedDropdownItem;
		this.selectedDropdownValue;
		
		this.country = '';
		
	};
	bicSearch.prototype = {
			initialize: function(bicCodes,bankNames){
				this.bicCodes = bicCodes.substring(1, bicCodes.length - 1).split(',');
				this.bicBankNames = bankNames.substring(1, bankNames.length - 1).split(',');
				
				
				for(var i=0; i <= this.bicBankNames.length-1; i++){
					fnb.functions.bicSearch.appendBanksList(this.bicBankNames[i],this.bicCodes[i]);
				}
				
				//console.log(this.bankList.length);
				
			},
			appendBanksList: function(displayValue,bicCode){
				this.bankList.push({displayValue:displayValue, bicCode:bicCode});
			},
			selectCountry: function(selection){

				this.dropDownItemSearch = $(selection).parent().find('.dropdown-content-top');
				this.selectedDropdownItem = selection;
				this.parent = $(this.selectedDropdownItem).parents(".dropDown");
				this.selectedDropdownValue = $(this.selectedDropdownItem).attr('data-value');
				
				this.clearDropdown($(selection).closest("#bicCodeSearchForm").find('#selectBankDropdown_parent').find('.dropdown-content'));

				var selectedAvailableBanks = [];

				selectedAvailableBanks = $.grep(this.bankList, function(option, index) {
			        return ( option.countryCode == fnb.functions.bicSearch.selectedDropdownValue );
			    });

				var optionsDiv = $('#selectBankDropdown_parent').find('.dropdown-content');

				$(this.dropDownItemSearch).appendTo($(optionsDiv));

				$.each(selectedAvailableBanks, function(index, item) {
					var clonedDropdownItem = $(fnb.functions.bicSearch.selectedDropdownItem).clone();
					$(clonedDropdownItem).attr('data-value',item.bicCode);
					$(clonedDropdownItem).find('.dropdown-item-row').html(item.displayValue);
					$(clonedDropdownItem).attr('onclick','fnb.functions.bicSearch.selectBank(this)').bind('click');
					$(clonedDropdownItem).appendTo($(optionsDiv));
			    }); 
				
				fnb.forms.dropdown.setValue($('#selectBankDropdown_dropId'), 'Please select', 0);

			},
			selectBank: function(selection){
				
				this.selectedDropdownItem = selection;
				this.selectedDropdownValue = $(this.selectedDropdownItem).attr('data-value');
				this.selectedCountryCode = $('#selectCountryDropdown').attr('value');

				fnb.functions.bicSearch.returnBicCode(this.selectedDropdownValue,$(this.selectedDropdownItem).find('.dropdown-h4').text());
				
			},
			returnBicCode: function(bicCode, displayValue){
				this.focusFlag = true;
				
				$('#bicSearchCode').val(bicCode);
				$('#bicSearchName').val(displayValue);
				$('#bicSearchName').parent().attr('style','');
				$('#BranchSearchNameContainer').addClass('input disabled');
				$('#BranchSearchNameContainer').children(':first-child').addClass('inputColor turqDarkBg roundedLeft');
				
			},
			inputKeypress: function(input,event){
				
				fnb.functions.bicSearch.parentWrapper = $(event.target).parent().parent().parent().parent();
				
				var inputVal = $(input).val();
				var subInputVal = '';
				var inputCount = $(input).val().length;
				var bankName = 'Waiting BIC code';
				
				if(this.error = true){
					fnb.functions.bicSearch.parentWrapper.removeClass('formElement error').addClass('formElement');
					this.error = false;
				}
				if(event.keyCode == 13){
					
					if(inputCount<8){
						$('#bicSearchName').val('');
					}
					else{
						$.each(fnb.functions.bicSearch.bankList, function(index, item) {
							if(inputVal == $.trim(item.bicCode)){
								bankName = item.displayValue;
								$('#bicSearchName').val(bankName);
								return false;
							}
							else
								{bankName = 'Waiting BIC code';}
						});
						$('#bicSearchName').val(bankName);
					}
				}
				var selectionStart = $(input).get(0).selectionStart;
				var selectionEnd = $(input).get(0).selectionEnd;
				
				var c = event.keyCode;
			    var ctrlDown = event.ctrlKey||event.metaKey; // Mac support
			    // Check for Alt+Gr
			    if (ctrlDown && event.altKey) return false;
			    // Check for ctrl+c, v and x
			    else if (ctrlDown && c==67) return true; // c
			    else if (ctrlDown && c==86) return true; // v
			    else if (ctrlDown && c==88) return true; // x
			    else if (ctrlDown && c==90) return true; // z
			    else if((((fnb.functions.bicSearch.country==83)&&inputCount<=12)||((fnb.functions.bicSearch.country!=83&&inputCount<=12))) || event.keyCode == 8 || event.keyCode == 9){
					if(event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9)				
					{
						return true;
					}
					else
					if((fnb.functions.bicSearch.country!=83)&&(event.keyCode < 48 || event.keyCode > 90) && (event.keyCode < 96 || event.keyCode > 105 ))
					{
							return false;	
					}else{
						if(((inputCount<12)&&(fnb.functions.bicSearch.country!=83))){
							return true;
						}else{
							return false;
						}
					}
				}else{
					return false;
				}
			},
			inputBlur: function(input){
				var inputVal = $(input).val();
				var inputCount = $(input).val().length;
				var bankName = 'Waiting BIC code';
				
					if(inputCount<8){
						$('#bicSearchName').val('');
					}
					else{
						$.each(fnb.functions.bicSearch.bankList, function(index, item) {

							if(inputVal == $.trim(item.bicCode)){
								bankName = item.displayValue;
								$('#bicSearchName').val(bankName);
								return false;
							}
							else
								{bankName = 'Waiting BIC code';}
						});
						$('#bicSearchName').val(bankName);
						
					}
				
			},
			submitBIC: function(){
				
				if ( (typeof fnb.functions.bicSearch.selectedDropdownValue != "undefined") && (fnb.functions.bicSearch.selectedDropdownValue != "0"))
				{
					fnb.controls.controller.eventsObject.raiseEvent('eziSliderHide', '');
					fnb.hyperion.controller.clipOverflow(false);
					}
				else
					{
					/*$('#bicSearchCode').val("");
					$('#bicSearchName').val("Not Selected");*/
					fnb.controls.controller.eventsObject.raiseEvent('eziSliderHide', '');
					fnb.hyperion.controller.clipOverflow(false);
					fnb.controls.controller.eventsObject.raiseEvent('navError', {height:'134px',message: 'Page error.', errors:[{error: 'Please select a bank'}]});
					}
						
			},
			clearDropdown: function(dropdownID){
				$(dropdownID).children().remove();
			}
	};

	namespace("fnb.functions.bicSearch",bicSearch);
});

///-------------------------------///
/// developer: Donovan
///
/// ADD NOTIFICATIONS
///-------------------------------///
$(function(){
	function notifications(){
		
	};
	notifications.prototype = {
		initialize: function(parent,row,max,emailLimit,smsLimit,faxLimit){
			this.parent = parent;
			this.row = row;
			this.max = max;
			this.emailLimit = emailLimit;
			this.emailIsMax = false;
			this.smsLimit = smsLimit;
			this.smsIsMax = false;
			this.faxLimit = faxLimit;
			this.faxIsMax = false;
			this.row.find('.phoneCode').attr({
				id: 'methodCodeInput0',
				name: 'methodCodeInput0'
			});
		},
		setOptions: function(row,option,valObj){
			var methodInputWrapper = row.find('.methodInputWrapper');
			var methodInputInnerContainer = methodInputWrapper.find('.input-container-inner');
			var firstAvailableDropdownItemVal = row.find('li:eq('+option+')').attr('data-value');
			row.attr('data-option',option);
			var code = valObj ? valObj.code : 'Code';
			var method =valObj ? valObj.method : 'Number';
			var subject = valObj ? valObj.subject : 'Proof of Payment';
			var addressee = valObj ? valObj.addressee : '';
			switch(option)
			{
				case 0:
					var updatedMethod = (method=='Number' ? '' : method);
					methodInputInnerContainer.removeClass('phoneNumberContainer').find('.phoneCodeContainer').addClass('hidden').val(code);
					methodInputInnerContainer.find('input:eq(1)').removeClass('phoneNumber').removeClass('phoneEmpty numberOnly').val(updatedMethod).removeAttr('maxlength','10');
					row.find('.subjectInputWrapper').removeClass('hidden').find('input').val(subject);
					row.find('.addresseeInputWrapper').removeClass('hidden').find('input').val(addressee);
					row.find('.addresseeInputWrapper').find('.formElementLabel').html('Addressed to');
				break;
				case 1:
					methodInputInnerContainer.addClass('phoneNumberContainer').find('.phoneCodeContainer').removeClass('hidden');
					methodInputInnerContainer.find('input:eq(0)').val(code);
					methodInputInnerContainer.find('input:eq(1)').addClass('phoneNumber numberOnly').val(method).attr('maxlength','10');
					if(code == 'Code'){methodInputInnerContainer.find('input:eq(0)').addClass('phoneEmpty');}else{methodInputInnerContainer.find('input:eq(0)').removeClass('phoneEmpty');}
					if(method == 'Number'){methodInputInnerContainer.find('input:eq(1)').addClass('phoneNumber').addClass('phoneEmpty');}else{methodInputInnerContainer.find('input:eq(1)').removeClass('phoneEmpty');}
					row.find('.subjectInputWrapper').addClass('hidden');
					row.find('.subjectInputWrapper').val();
					row.find('.addresseeInputWrapper').addClass('hidden');
					row.find('.addresseeInputWrapper').find('input').val('-');
				break;
				case 2:
					methodInputInnerContainer.addClass('phoneNumberContainer').find('.phoneCodeContainer').removeClass('hidden');
					methodInputInnerContainer.find('input:eq(0)').val(code);
					methodInputInnerContainer.find('input:eq(1)').addClass('phoneNumber numberOnly').val(method).attr('maxlength','10');
					if(code == 'Code'){methodInputInnerContainer.find('input:eq(0)').addClass('phoneEmpty');}else{methodInputInnerContainer.find('input:eq(0)').removeClass('phoneEmpty');}
					if(method == 'Number'){methodInputInnerContainer.find('input:eq(1)').addClass('phoneNumber').addClass('phoneEmpty');}else{methodInputInnerContainer.find('input:eq(1)').removeClass('phoneEmpty');}
					row.find('.subjectInputWrapper').addClass('hidden');
					row.find('.subjectInputWrapper').val();
					row.find('.addresseeInputWrapper').removeClass('hidden').find('input').val(addressee);
					row.find('.addresseeInputWrapper').find('.formElementLabel').html('Attention');
				break;
			}

			methodInputWrapper.find('.formElementLabel').html(firstAvailableDropdownItemVal);
			row.find('.dropdown-hidden-input').val(firstAvailableDropdownItemVal);
			row.find('.dropdown-selection-white').find('.singleLine').text(firstAvailableDropdownItemVal);
		},
		dropdownSelect: function(option){
			this.setOptions($(option).closest('.addRecipientRowParent'),$(option).index());
		},
		cloneRow: function(valObj,index){
			var doClone = true;
			if(this.emailIsMax==true&&this.smsIsMax==true&&this.faxIsMax==true) doClone = false;
			if(doClone==true){
				var selectedIndex = index;
				this.clonedRow = this.row.clone();
				this.clonedRow.find('div[id^="addRecipientsRemoveButton"]').removeClass('hidden');
				this.parent.children().last().before(this.clonedRow);
				this.resetRowAttr();
				if(typeof selectedIndex=='undefined') selectedIndex = this.clonedRow.find('li:not(".hidden"):eq(0)').index();
				this.setOptions(this.clonedRow,selectedIndex,valObj);
				this.checkDropdowns();
			}
		},
		removeRow: function(obj){
			var removeRow = $(obj).closest('#addRecipientRowParent');
			removeRow.remove();
			this.resetRowAttr();
			this.checkDropdowns();
		},
		checkDropdowns: function(){
			var emailCount = this.parent.children('div[data-option="0"]').length;
			var phoneCount = this.parent.children('div[data-option="1"]').length;
			var faxCount = this.parent.children('div[data-option="2"]').length;
			if(emailCount>this.emailLimit&&this.emailIsMax==false){
				this.emailIsMax=true;
				var val = 'Email address';
				this.showHideDropDownOption(false,val)
			}else if(emailCount<=this.emailLimit&&this.emailIsMax==true){
				this.emailIsMax=false;
				var val = 'Email address';
				this.showHideDropDownOption(true,val)
			}
			if(phoneCount>this.smsLimit&&this.smsIsMax==false){
				this.smsIsMax=true;
				var val = 'Cell number';
				this.showHideDropDownOption(false,val)
			}else if(phoneCount<=this.smsLimit&&this.smsIsMax==true){
				this.smsIsMax=false;
				var val = 'Cell number';
				this.showHideDropDownOption(true,val)
			}
			if(faxCount>this.faxLimit&&this.faxIsMax==false){
				this.faxIsMax=true;
				var val = 'Fax number';
				this.showHideDropDownOption(false,val)
			}else if(faxCount<=this.faxLimit&&this.faxIsMax==true){
				this.faxIsMax=false;
				var val = 'Fax number';
				this.showHideDropDownOption(true,val)
			}
		},
		showHideDropDownOption: function(visible,label){
			this.parent.find('.addRecipientRowParent').each(function(){
				var parentObject = $(this).find('.dropdown-content');
				var filter = "> li div[class*='dropdown-h']:icontains('" + label + "')";
				if(visible==true){
					$(filter, parentObject).parent().parent().removeClass('hidden');
				}else{
					$(filter, parentObject).parent().parent().addClass('hidden');
				}
			});
		},
		resetRowAttr: function(){
			this.parent.find('.addRecipientRowParent').each(function(rowIndex,row){
				var currentRow = $(row);
				var selectedType = currentRow.find('input[id^="selectedTypeInput"]');
				var selectedCode =currentRow.find('input[id^="methodCodeInput"]');
				var selectedMethod =currentRow.find('input[id^="methodContactInput"]');
				var selectedSubject =currentRow.find('input[id^="subjectInput"]');
				var selectedAddressee =currentRow.find('input[id^="addresseeInput"]');
				selectedType.attr({
					id: 'selectedTypeInput'+rowIndex,
					name: 'selectedTypeInput'+rowIndex
				});
				selectedCode.attr({
					id: 'methodCodeInput'+rowIndex,
					name: 'methodCodeInput'+rowIndex
				});
				selectedMethod.attr({
					id: 'methodContactInput'+rowIndex,
					name: 'methodContactInput'+rowIndex
				});
				selectedSubject.attr({
					id: 'subjectInput'+rowIndex,
					name: 'subjectInput'+rowIndex
				});
				selectedAddressee.attr({
					id: 'addresseeInput'+rowIndex,
					name: 'addresseeInput'+rowIndex
				});
			});
		}
	};

	namespace("fnb.functions.notifications",notifications);
});

///-------------------------------///
/// developer: Donovan
///
/// ADD NOTIFICATIONS
///-------------------------------///
$(function(){
	function notifications(){
		
	};
	notifications.prototype = {
		initialize: function(parent,row,max,emailLimit,smsLimit,faxLimit){
			this.parent = parent;
			this.row = row;
			this.max = max;
			this.emailLimit = emailLimit;
			this.emailIsMax = false;
			this.smsLimit = smsLimit;
			this.smsIsMax = false;
			this.faxLimit = faxLimit;
			this.faxIsMax = false;
			this.row.find('.phoneCode').attr({
				id: 'methodCodeInput0',
				name: 'methodCodeInput0'
			});
		},
		setOptions: function(row,option,valObj){
			var methodInputWrapper = row.find('.methodInputWrapper');
			var methodInputInnerContainer = methodInputWrapper.find('.input-container-inner');
			var firstAvailableDropdownItemVal = row.find('li:eq('+option+')').attr('data-value');
			row.attr('data-option',option);
			var code = valObj ? valObj.code : 'Code';
			var method =valObj ? valObj.method : 'Number';
			var subject = valObj ? valObj.subject : 'Proof of Payment';
			var addressee = valObj ? valObj.addressee : '';
			switch(option)
			{
				case 0:
					var updatedMethod = (method=='Number' ? '' : method);
					methodInputInnerContainer.removeClass('phoneNumberContainer').find('.phoneCodeContainer').addClass('hidden').val(code);
					methodInputInnerContainer.find('input:eq(1)').removeClass('phoneNumber').removeClass('phoneEmpty numberOnly').val(updatedMethod).removeAttr('maxlength','10');
					row.find('.subjectInputWrapper').removeClass('hidden').find('input').val(subject);
					row.find('.addresseeInputWrapper').removeClass('hidden').find('input').val(addressee);
					row.find('.addresseeInputWrapper').find('.formElementLabel').html('Addressed to');
				break;
				case 1:
					methodInputInnerContainer.addClass('phoneNumberContainer').find('.phoneCodeContainer').removeClass('hidden');
					methodInputInnerContainer.find('input:eq(0)').val(code);
					methodInputInnerContainer.find('input:eq(1)').addClass('phoneNumber numberOnly').val(method).attr('maxlength','10');
					if(code == 'Code'){methodInputInnerContainer.find('input:eq(0)').addClass('phoneEmpty');}else{methodInputInnerContainer.find('input:eq(0)').removeClass('phoneEmpty');}
					if(method == 'Number'){methodInputInnerContainer.find('input:eq(1)').addClass('phoneNumber').addClass('phoneEmpty');}else{methodInputInnerContainer.find('input:eq(1)').removeClass('phoneEmpty');}
					row.find('.subjectInputWrapper').addClass('hidden');
					row.find('.subjectInputWrapper').val();
					row.find('.addresseeInputWrapper').addClass('hidden');
					row.find('.addresseeInputWrapper').find('input').val('-');
				break;
				case 2:
					methodInputInnerContainer.addClass('phoneNumberContainer').find('.phoneCodeContainer').removeClass('hidden');
					methodInputInnerContainer.find('input:eq(0)').val(code);
					methodInputInnerContainer.find('input:eq(1)').addClass('phoneNumber numberOnly').val(method).attr('maxlength','10');
					if(code == 'Code'){methodInputInnerContainer.find('input:eq(0)').addClass('phoneEmpty');}else{methodInputInnerContainer.find('input:eq(0)').removeClass('phoneEmpty');}
					if(method == 'Number'){methodInputInnerContainer.find('input:eq(1)').addClass('phoneNumber').addClass('phoneEmpty');}else{methodInputInnerContainer.find('input:eq(1)').removeClass('phoneEmpty');}
					row.find('.subjectInputWrapper').addClass('hidden');
					row.find('.subjectInputWrapper').val();
					row.find('.addresseeInputWrapper').removeClass('hidden').find('input').val(addressee);
					row.find('.addresseeInputWrapper').find('.formElementLabel').html('Attention');
				break;
			}

			methodInputWrapper.find('.formElementLabel').html(firstAvailableDropdownItemVal);
			row.find('.dropdown-hidden-input').val(firstAvailableDropdownItemVal);
			row.find('.dropdown-selection-white').find('.singleLine').text(firstAvailableDropdownItemVal);
		},
		dropdownSelect: function(option){
			this.setOptions($(option).closest('.addRecipientRowParent'),$(option).index());
		},
		cloneRow: function(valObj,index){
			var doClone = true;
			if(this.emailIsMax==true&&this.smsIsMax==true&&this.faxIsMax==true) doClone = false;
			if(doClone==true){
				var selectedIndex = index;
				this.clonedRow = this.row.clone();
				this.clonedRow.find('div[id^="addRecipientsRemoveButton"]').removeClass('hidden');
				this.parent.children().last().before(this.clonedRow);
				this.resetRowAttr();
				if(typeof selectedIndex=='undefined') selectedIndex = this.clonedRow.find('li:not(".hidden"):eq(0)').index();
				this.setOptions(this.clonedRow,selectedIndex,valObj);
				this.checkDropdowns();
			}
		},
		removeRow: function(obj){
			var removeRow = $(obj).closest('#addRecipientRowParent');
			removeRow.remove();
			this.resetRowAttr();
			this.checkDropdowns();
		},
		checkDropdowns: function(){
			var emailCount = this.parent.children('div[data-option="0"]').length;
			var phoneCount = this.parent.children('div[data-option="1"]').length;
			var faxCount = this.parent.children('div[data-option="2"]').length;
			if(emailCount>this.emailLimit&&this.emailIsMax==false){
				this.emailIsMax=true;
				var val = 'Email address';
				this.showHideDropDownOption(false,val)
			}else if(emailCount<=this.emailLimit&&this.emailIsMax==true){
				this.emailIsMax=false;
				var val = 'Email address';
				this.showHideDropDownOption(true,val)
			}
			if(phoneCount>this.smsLimit&&this.smsIsMax==false){
				this.smsIsMax=true;
				var val = 'Cell number';
				this.showHideDropDownOption(false,val)
			}else if(phoneCount<=this.smsLimit&&this.smsIsMax==true){
				this.smsIsMax=false;
				var val = 'Cell number';
				this.showHideDropDownOption(true,val)
			}
			if(faxCount>this.faxLimit&&this.faxIsMax==false){
				this.faxIsMax=true;
				var val = 'Fax number';
				this.showHideDropDownOption(false,val)
			}else if(faxCount<=this.faxLimit&&this.faxIsMax==true){
				this.faxIsMax=false;
				var val = 'Fax number';
				this.showHideDropDownOption(true,val)
			}
		},
		showHideDropDownOption: function(visible,label){
			this.parent.find('.addRecipientRowParent').each(function(){
				var parentObject = $(this).find('.dropdown-content');
				var filter = "> li div[class*='dropdown-h']:icontains('" + label + "')";
				if(visible==true){
					$(filter, parentObject).parent().parent().removeClass('hidden');
				}else{
					$(filter, parentObject).parent().parent().addClass('hidden');
				}
			});
		},
		resetRowAttr: function(){
			this.parent.find('.addRecipientRowParent').each(function(rowIndex,row){
				var currentRow = $(row);
				var selectedType = currentRow.find('input[id^="selectedTypeInput"]');
				var selectedCode =currentRow.find('input[id^="methodCodeInput"]');
				var selectedMethod =currentRow.find('input[id^="methodContactInput"]');
				var selectedSubject =currentRow.find('input[id^="subjectInput"]');
				var selectedAddressee =currentRow.find('input[id^="addresseeInput"]');
				selectedType.attr({
					id: 'selectedTypeInput'+rowIndex,
					name: 'selectedTypeInput'+rowIndex
				});
				selectedCode.attr({
					id: 'methodCodeInput'+rowIndex,
					name: 'methodCodeInput'+rowIndex
				});
				selectedMethod.attr({
					id: 'methodContactInput'+rowIndex,
					name: 'methodContactInput'+rowIndex
				});
				selectedSubject.attr({
					id: 'subjectInput'+rowIndex,
					name: 'subjectInput'+rowIndex
				});
				selectedAddressee.attr({
					id: 'addresseeInput'+rowIndex,
					name: 'addresseeInput'+rowIndex
				});
			});
		}
	};

	namespace("fnb.functions.notifications",notifications);
});
///-------------------------------///
/// developer: Donovan
///
/// Unhider
///-------------------------------///
$(function(){
	function unhider(){

	};
	unhider.prototype = {
		unhide: function(id, what, direction, menu, old_item){
			calculateDimensions();
			if (windowWidth < 760) {

				if (menu == 'hide') {
					$('#topBar').hide();
					$('#headerTabs').hide();
					$('#submenu').hide();
				}

			}

			$('html').css('overflow', 'hidden');

			if (typeof (old_item) != "undefined") {
				whichDivCurrent = $(old_item).attr('id');
			} else {
				whichDivCurrent = $('.pageGroup:visible').attr('id');
			}

			$(what).show();

			if (direction == "left") {
				$(what).css('position', 'absolute');
				$(what).css('left', '100%');

				$('#' + whichDivCurrent).animate({
					left : '-=100%'
				}, 500, function() {
					$('#' + whichDivCurrent).css('display', 'none');
					$('html').css('overflow', 'auto');
				});

				$(what).animate({
					left : '-=100%'
				}, 500, function() {

				});
			}

			else if (direction == "right") {

				$(what).css('position', 'absolute');
				$(what).css('left', '-100%');
				$('#' + whichDivCurrent).animate({
					left : '+=100%'
				}, 500, function() {
					$('#' + whichDivCurrent).css('display', 'none');
					$('html').css('overflow', 'auto');
				});

				$(what).animate({
					left : '+=100%'
				}, 500, function() {
					// Animation complete.
				});

			}

			else if (direction == "down") {
				// set the start position of the unhidden iSroll
				$(what).css('position', 'absolute');
				$('#' + whichDivCurrent).css('position', 'absolute');
				$(what).css('top', '-100%');

				$('#' + whichDivCurrent).animate({
					top : '+=100%'
				}, 500, function() {
					// Animation complete.
					$('#' + whichDivCurrent).css('display', 'none');
					$('html').css('overflow', 'auto');

				});

				$(what).animate({
					top : '+=100%'
				}, 500, function() {
					// Animation complete.
					$(what).css('height', 'auto');
					$(what).css('overflow', 'auto');
					if (windowWidth < 760) {
						$(what).css('position', 'static');

						if (menu == 'show') {
							$('#topBar').show();
							$('#headerTabs').show();
							$('#submenu').show();
						}

					}

				});
			}

			else if (direction == "up") {
				// set the start position of the unhidden iSroll
				$(what).css('position', 'absolute');
				$('#' + whichDivCurrent).css('position', 'absolute');
				$(what).css('top', '100%');

				$('#' + whichDivCurrent).animate({
					top : '-=100%'
				}, 500, function() {
					// Animation complete.
					$('#' + whichDivCurrent).css('display', 'none');
					$('html').css('overflow', 'auto');

				});

				$(what).animate({
					top : '-=100%'
				}, 500, function() {
					// Animation complete.
					$(what).css('height', 'auto');
					$(what).css('overflow', 'auto');
					if (windowWidth < 760) {
						$(what).css('position', 'static');

						if (menu == 'show') {
							$('#topBar').show();
							$('#headerTabs').show();
							$('#submenu').show();
						}

					}
				});
			}

			// function to handle sub tabs
			// $(subtab).css('display','block');
			// $('li.'+subtab).css('background','#006666');

			$(what).show();
			return false;
		}
	};
	namespace("fnb.functions.unhider",unhider);
});

///-------------------------------///
/// developer: Donovan
///
/// ReloadDropdown
///-------------------------------///
$(function(){
	function reloadDropdown(){

	};
	reloadDropdown.prototype = {
		reload: function(dropdown,targetDiv,targetUrl,fieldName){

			preTargetUrl = targetUrl;
			preTarget = $(targetDiv);
			
			if(preTarget.length==0) preTarget = $('#'+targetDiv);
			var dropDownValue =$(dropdown).attr('data-value');
			
			preTargetOnClick = $(preTarget).parent().parent().find('.dropdown-item').attr('onclick');

			var paramName = "";
			if (fieldName && (fieldName != "")){
				paramName = fieldName;
			}else{
				paramName = "id";
			}
			if(preTargetUrl.indexOf("?")>0){
				preTargetUrl += "&" +paramName+ "=" + dropDownValue;
			}else{
				preTargetUrl += "?" +paramName+ "=" + dropDownValue;
			}
			var targetParent = $(preTarget).parent().parent().parent();
			var postLoadingCallBackFunction;
			if(targetParent){
				postLoadingCallBackFunction = function(){
					targetParent.find('li').attr('onclick',preTargetOnClick);
				}
			}
			var loadObj = {url: preTargetUrl,target:targetParent,postLoadingCallBack:postLoadingCallBackFunction};
			fnb.controls.controller.eventsObject.raiseEvent('reloadDropdown', loadObj);
		}
	};
	namespace("fnb.functions.reloadDropdown",reloadDropdown);
});
///-------------------------------///
/// developer: Donovan
///
/// Load Dropdown To Div
///-------------------------------///
$(function(){
	function loadDropDownDiv(){

	};
	loadDropDownDiv.prototype = {
		load: function(url, target, options){
			var postLoadCallback;
			if(options){
				postLoadCallback = options["afterCallback"];
			}
			var loadObj = {url: url,target:'#'+target,postLoadingCallBack:postLoadCallback};
			fnb.controls.controller.eventsObject.raiseEvent('reloadDropdown', loadObj);
		}
	};
	namespace("fnb.functions.loadDropDownDiv",loadDropDownDiv);
});
///-------------------------------///
/// developer: Donovan
///
/// Load URL to Print div
///-------------------------------///
$(function(){
	function loadUrlToPrintDiv(){

	};
	loadUrlToPrintDiv.prototype = {
		load: function(url){
			var postLoadCallback = function (){
				var loadObj = {target: '#hiddenPrintDiv'};
				fnb.hyperion.controller.raiseEvent('printPage', loadObj);
			};
					
			var loadObj = {url: url,target: _printDiv,postLoadingCallBack:postLoadCallback};
			fnb.controls.controller.eventsObject.raiseEvent('loadUrltoPrintDiv', loadObj);
		},
		processData: function(data){
			console.log(data)
		},
		getData: function(){
			return $(_printDivWrapper).html();
		}
	};
	namespace("fnb.functions.loadUrlToPrintDiv",loadUrlToPrintDiv);
});
///-------------------------------///
/// developer: Donovan
///
/// Submit Form To Workspacete
///-------------------------------///
$(function(){
	function submitFormToWorkspace(){

	};
	submitFormToWorkspace.prototype = {
		submit: function(formName, optionalFunction,buttonTarget, extraOptions,preventDefaults,fromEzi){
			$.ajaxSettings.data = [];
			fnb.controls.controller.submitForm(formName, _workspace, '', '', buttonTarget, extraOptions,preventDefaults,fromEzi);
		}
	};
	namespace("fnb.functions.submitFormToWorkspace",submitFormToWorkspace);
});

$(function(){
	function submitFormToDiv(){

	};
	submitFormToDiv.prototype = {
		submit: function(formName, targetDiv, optionalFunction,buttonTarget, extraOptions,preventDefaults){
			if(!extraOptions) var extraOptions = {};
			extraOptions.keepFooter = true;
			
			fnb.controls.controller.submitForm(formName, targetDiv, '', '', buttonTarget, extraOptions,preventDefaults);
		}
	};
	namespace("fnb.functions.submitFormToDiv",submitFormToDiv);
});
///-------------------------------///
/// developer: Edzard
///
/// Submit Form To EzPa
///-------------------------------///
$(function(){
	function submitFormToEziPanel(){

	};
	submitFormToEziPanel.prototype = {
		submit: function(formName, paramName, paramValue, optionalFunction,buttonTarget, extraOptions){
			fnb.controls.controller.submitFormToEzi(formName, paramName, paramValue, _eziWrapper, '', '', buttonTarget, extraOptions);
		}
	};
	namespace("fnb.functions.submitFormToEziPanel",submitFormToEziPanel);
});

$(function(){
	function submitFormToTargetDiv(){

	};
	submitFormToTargetDiv.prototype = {
		submit: function(formName, paramName, paramValue,targetDiv, optionalFunction,buttonTarget, extraOptions){
			fnb.controls.controller.submitFormToTargetDiv(formName, paramName, paramValue, targetDiv, '', '', buttonTarget, extraOptions);
		}
	};
	namespace("fnb.functions.submitFormToTargetDiv",submitFormToTargetDiv);
});

$(function(){
	function loadUrlToExpandableRow(){
	};
	loadUrlToExpandableRow.prototype = {
		load: function(targetDiv,url,caller){
						
			if($(caller).data('state') == 'open'){
			$(targetDiv).html('');
			$(caller).data('state','closed');
			$(caller).val($(caller).data('originalLabel'))
			}else{
			$(caller).data('originalLabel',$(caller).val())
			fnb.controls.controller.loadUrl("loadUrlToExpandableRow",targetDiv,url)
			$(caller).val('Close');
			$(caller).data('state','open');
			}
		}
	};
	namespace("fnb.functions.loadUrlToExpandableRow",loadUrlToExpandableRow);
});

$(function(){
	function submitFormFromEziToTarget(){

	};
	submitFormFromEziToTarget.prototype = {
		submit: function(formName, paramName, paramValue, targetDiv, optionalFunction,buttonTarget, extraOptions){
			fnb.controls.controller.submitFormFromEziToTarget(formName, paramName, paramValue, targetDiv, '', '', buttonTarget, extraOptions);
		}
	};
	namespace("fnb.functions.submitFormFromEziToTarget",submitFormFromEziToTarget);
});
///-------------------------------///
/// developer: Donovan
///
/// Account Dropdown Change Type
///-------------------------------///
$(function(){
	function accountDropdown(){

	};
	accountDropdown.prototype = {
		changeType: function(me,country){
			var selectedValue = $(me).attr('data-value');
			switch(selectedValue)
			{
				case 'W':
					$('#BranchSearchCodeContainer').addClass('input disabled');
					$('#branchSearchCode').attr('disabled','disabled');
					$('#branchSearchButton').addClass('formButtonDisabled');
					$('#branchSearchButton').attr('onclick','').unbind('click');
					$('#branchSearchCode').val('250345');
					$('#branchSearchName').val('WesBank');
					break;
				case 'F':
					$('#BranchSearchCodeContainer').addClass('input disabled');
					$('#branchSearchCode').attr('disabled','disabled');
					$('#branchSearchButton').addClass('formButtonDisabled');
					$('#branchSearchButton').attr('onclick','').unbind('click');
					var countryIndex = -1;
					var theBranchCode = '';
					if(country == 55)	{
						theBranchCode = '282767';
					} else if(country == 45){
						theBranchCode = '280179';
					} else	{
						theBranchCode = '255105';
					}
					$('#branchSearchCode').val(theBranchCode);
					$('#branchSearchName').val('First National Bank');
					
					break;
				default:
					$('#BranchSearchCodeContainer').addClass('input');
					$('#branchSearchCode').removeAttr('disabled');
					$('#BranchSearchCodeContainer').removeClass('input disabled').addClass('input');
					$('#branchSearchButton').removeClass('formButtonDisabled');
					$('#branchSearchButton').attr('onclick','fnb.controls.controller.eventsObject.raiseEvent("eziSliderShow", {url: "/banking/Controller?nav=navigator.branchsearch.simple.BranchSearchLanding"})').bind('click');
					break;
			}
		}
	};
	namespace("fnb.functions.accountDropdown",accountDropdown);
});

///-------------------------------///
/// developer: Donovan
/// developer 2: Wpienaar
/// Lotto
///-------------------------------///
$(function(){
	function lotto(){
		this.parentFunction = this;
		this.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		this.selectedBoardCollection = [];
		this.selectedBoardNumbers = null;
		this.boardPrice;
		this.lottoType;
		this.maxBoardNumbers ;
		this.maxBoards = 20;
		this.boardIndex;
		this.lottoType;
		this.elemheight = 45;
		this.curindex = 0;
		this.elemCount = 2;
		this.selectedClass='numberSelected';
	};
	lotto.prototype = {
		init: function(type,boardPrice,maxBoards,maxBoardNumbers){
			this.boardPrice = boardPrice;
			this.lottoType = type;
			this.maxBoardNumbers = Number(maxBoardNumbers);
			this.curindex=0;
		},
		numberPickerInitialize: function(index){
			
			this.boardIndex = index;
			
			if(this.lottoType == "lotto" || this.lottoType == "powerball"){
				this.numberPickerClearSelections();
				fnb.functions.showHideToggleElements.showHideToggle([{show:'true',element:'#numberPicker'},{show:'true',element:'#numberClose'},{show:'true',element:'#numberClear'},{show:'true',element:'#numberDone'},{show:'true',element:'#numberNumberPickerHeader'},{show:'false',element:'#playLottoLanding'},{show:'false',element:'#lottoCancel'},{show:'false',element:'#lottoBuy'},{show:'false',element:'#lottoNumberPickerHeader'}]);
			}
			
			$("#numberPickerHeader_left").find(":header").html('Board '+this.alphabet[this.boardIndex]);
			$("#numberPickerHeader_left").find("p").html(this.boardPrice);

			$('#lottoBoardViewItem0').find('.lottoBoardlistItemNumbers').html('');
			$('#lottoBoardViewItem0').find('.lottoBoardViewItemName').html('Board '+this.alphabet[this.boardIndex]);
			$('#powerballSelectBall').html('');

			var viewParent = $("#lottoBoardViewItem0");
			if($('#board'+index).val() != ''){
				var numbersString = $('#board'+index).val();
				var numbersArray = numbersString.split(',');
				$.each(numbersArray, function(NumberIndex, number) {
					if(this.lottoType=="powerball"&&NumberIndex==5){
						$(viewParent).find('.lottoBoardlistItemNumbers').append('<span style="float:left;margin:4px 4px 0 0;">Powerball</span>');
					}
						$(viewParent).find('.lottoBoardlistItemNumbers').append('<div class="numberPickerNumber"><div class="numberPickerNumberText">'+number+'</div></div>');
					
					
				});
				
				var ltype = this.lottoType;
				var numberSelected=this.selectedClass;
				$('#_Grid > div').each(function() {
					var tempNumber = $(this).find('.numberPickerCellTextInner').html();
					var cell = this;
					$.each(numbersArray, function(NumberIndex, number) {
						if (number == tempNumber){
							if (!(ltype == 'powerball' && NumberIndex == 5)) $(cell).find('.numberPickerCellText').addClass(numberSelected);
						}
					});
				});
				if (this.lottoType == 'powerball'){
					$('#powerballNum_Grid > div').each(function(){
						var tempNumber = $(this).find('.numberPickerCellTextInner').html();
						if (numbersArray[5] == tempNumber){
							$(this).find('.numberPickerCellText').addClass(numberSelected);
						}
					});
				}
			}
			
		},
		numberPickerSelectNumber: function(numberObject, boardType){

			var viewParent = $("#lottoBoardViewItem0");
			var numberSelected=this.selectedClass;
			var selectedCellVal = $(numberObject).find('.numberPickerCellText').hasClass(numberSelected);
			var selectedNumber = $(numberObject).find('.numberPickerCellTextInner').html();
			var selectedNumberCount = 0;
			$('#_Grid > div').each(function () {
				if($(this).find('.numberPickerCellText').hasClass(numberSelected)){
					selectedNumberCount++;
				}
			});
			
			var maxBoardNumbers = this.maxBoardNumbers;
			if(this.lottoType=='powerball'){
				maxBoardNumbers = 5;
				var powerballNumber = 0;
				$('#powerballNum_Grid > div').each(function () {
					if($(this).find('.numberPickerCellText').hasClass(numberSelected)){
						powerballNumber = $(this).find('.numberPickerCellTextInner').html();
					}
				});
			}

			var goOn=false;
			switch(selectedCellVal)
		    {
				case false:
					if(this.lottoType=='powerball'){
						if ((powerballNumber==0 && boardType=='PB') || (selectedNumberCount<maxBoardNumbers && boardType!='PB')){
							goOn=true;
							//if (boardType!='PB' && selectedNumber==powerballNumber) goOn=false;
							/*if (boardType=='PB'){
								$(viewParent).find('.lottoBoardlistItemNumbers > div').each(function(){
									var num = $(this).find('.numberPickerNumberText').html();
									if (selectedNumber==num) goOn=false;
								});
							}*/
						}
					} else {
						if(selectedNumberCount<maxBoardNumbers) goOn=true;
					}
					if (goOn){
						var currentCount = selectedNumberCount+1;
						$(numberObject).find('.numberPickerCellText').addClass(numberSelected);
						
						
						//$(numberObject).find('.numberPickerCellText').css('background-color', '#ADDBDB');
						//$(numberObject).find('.numberPickerCellTextInner').css('color', '#FFF');
						$("#numberPickerHeaderNumber_wrapper").append('<div id="numberPickerNumber'+currentCount+'" class="numberPickerNumber" style="display:none"><div class="numberPickerNumberText">'+selectedNumber+'</div></div>');
						$("#numberPickerNumber"+currentCount).fadeIn("200");
						
						if (boardType=='PB')
							$('#powerballSelectBall').html('<span style="float:left;margin:6px 5px 0px 10px;">Powerball</span><div class="numberPickerNumber"><div class="numberPickerNumberText">'+selectedNumber+'</div></div>');
						else
							$(viewParent).find('.lottoBoardlistItemNumbers').append('<div class="numberPickerNumber"><div class="numberPickerNumberText">'+selectedNumber+'</div></div>');
						
					}
				break;
				case true:
					$(numberObject).find('.numberPickerCellText').removeClass(numberSelected);
					
					
					//$(numberObject).find('.numberPickerCellText').css('background-color', '#FFF');
					//$(numberObject).find('.numberPickerCellTextInner').css('color', '#099');
					var selectedNumber = $(numberObject).find('.numberPickerCellTextInner').html();
					if (boardType=='PB'){
						$('#powerballSelectBall').html('');
					} else {
						$('#lottoBoardViewItem0').find('.lottoBoardlistItemNumbers').find('.numberPickerNumber').each(function () {
							var tempNumber = $(this).find('.numberPickerNumberText').html();
							if(selectedNumber == tempNumber){
							  $(this).animate({
									opacity: 0
								  }, 200, function() {
										$(this).animate({
											width: 0
										}, 200, function() {
											$(this).attr('id','');
											$(this).remove();
											var l = 0;
											$("#numberPickerHeaderNumber_wrapper > div").each(function() {
												l++;
										        $(this).attr("id", "numberPickerNumber"+l);
											});
										});
								});
							}
						});
					}
			    break;
				default:
					
				break;
		    }
			
		},
		numberPickerSubmitNumbers: function(){
		
			this.selectedBoardNumbers = {};
			var numbersString = '';
			var numberSelected=this.selectedClass;
			var countNumbers = 0;

			$('#_Grid > div').each(function() {
				if($(this).find('.numberPickerCellText').hasClass(numberSelected)){
					var tempNumber = $(this).find('.numberPickerCellTextInner').html();
					countNumbers++;
					numbersString += tempNumber +',';
				}
			});
			if (this.lottoType == 'powerball'){
				$('#powerballNum_Grid > div').each(function() {
					if($(this).find('.numberPickerCellText').hasClass(numberSelected)){
						var tempNumber = $(this).find('.numberPickerCellTextInner').html();
						countNumbers++;
						numbersString += tempNumber +',';
					}
				});
			}
			if(countNumbers<this.maxBoardNumbers){
				/*if (this.lottoType == 'powerball')
					this.lottoError('01',"Please select 5 numbers per board and\none Powerball number.");
				else
					this.lottoError('01','Please select '+this.maxBoardNumbers+' numbers per board.');*/
			}else{
				numbersString = numbersString.substring(0, numbersString.length - 1);
				this.selectedBoardNumbers = numbersString;
				
				fnb.functions.showHideToggleElements.showHideToggle([{show:'false',element:'#numberPicker'},{show:'false',element:'#numberClose'},{show:'false',element:'#numberClear'},{show:'false',element:'#numberDone'},{show:'false',element:'#numberNumberPickerHeader'},{show:'true',element:'#playLottoLanding'},{show:'true',element:'#lottoCancel'},{show:'true',element:'#lottoBuy'},{show:'true',element:'#lottoNumberPickerHeader'}]);
				
				this.lottoAppendBoard();
			}
		},
		numberPickerClearSelections: function(){
			$("#numberPickerHeaderNumber_wrapper > div").each(function() {
				$(this).animate({
				    opacity: 0
				}, 50, function() {
					$(this).remove();
				});
			});

			$('#lottoBoardViewItem0').find('.lottoBoardlistItemNumbers').html('');
			$('#powerballSelectBall').html('');

			var numberSelected=this.selectedClass;
			$('#_Grid > div').each(function () {
				if ($(this).find('.numberPickerCellText').hasClass(numberSelected)) $(this).find('.numberPickerCellText').removeClass(numberSelected);
			});
			if (this.lottoType == 'powerball'){
				$('#powerballNum_Grid > div').each(function () {
					if ($(this).find('.numberPickerCellText').hasClass(numberSelected)) $(this).find('.numberPickerCellText').removeClass(numberSelected);
				});
			}
		},
		lottoAddBoard: function(){
			if($("#lottoBoardlistRow > div").size() < this.maxBoards){
				var index = $("#lottoBoardlistRow > div").size();
				var $orginalAddLottoBoardRow = $('#lottoBoardlistItem0');
				var $clonedAddLottoBoardRow = $orginalAddLottoBoardRow.clone();
				$clonedAddLottoBoardRow.attr('id','lottoBoardlistItem'+index);
				$clonedAddLottoBoardRow.find('.lottoBoardlistItemName').html('<a onclick="fnb.functions.lotto.numberPickerInitialize('+index+');" id="boardLink" target="_self">Board '+this.alphabet[index]+'</a>');
				$clonedAddLottoBoardRow.find('.numberPickerNumber').remove();
				$clonedAddLottoBoardRow.find('#numbersLink').remove();
				$clonedAddLottoBoardRow.find(":input").attr('value','');
				$clonedAddLottoBoardRow.find(":input").attr('name','board'+index);
				$clonedAddLottoBoardRow.find(":input").attr('id','board'+index);
				$clonedAddLottoBoardRow.find('.lottoBoardlistItemNumbers').html('');
				$clonedAddLottoBoardRow.find('.lottoBoardlistItemNumbers').append('<a target="_self" id="numbersLink" onclick="fnb.functions.lotto.numberPickerInitialize('+index+')">Choose Numbers</a>');
				$clonedAddLottoBoardRow.find('.lottoBoardlistClose').find('.formButton').remove();
				$clonedAddLottoBoardRow.find('.lottoBoardlistClose').append('<a class="formButton inverted small" target="_self" onclick="fnb.functions.lotto.lottoRemoveBoard('+index+');">X</a>');
				$clonedAddLottoBoardRow.css('height', 0);
				$clonedAddLottoBoardRow.animate({height: 45}).appendTo('#lottoBoardlistRow');
				//$("#lottoBoardViewRow").append('<div id="lottoBoardViewItem'+index+'" class="lottoBoardlistItem"><div class="lottoBoardViewItemName">Board '+this.alphabet[index]+'</div><div class="lottoBoardlistItemNumbers"></div></div>');
				
				/*if (this.elemCount>=3){
					this.activateScrollTop(true);
					this.curindex = this.elemCount-3;
					this.scrollDown();
				}*/
				this.elemCount++;
				
			}else{
				//this.lottoError('01','You can only add '+this.maxBoards+' boards.');
				$('#maxMessage').animate({opacity: 100}, 100, function() { $('#maxMessage').animate({opacity: 0}, 2000)});
			}
		},
		lottoAppendBoard: function(){
			var numbersString = this.selectedBoardNumbers;
			var numbersArray = numbersString.split(',');
			var selectedParent = $('#lottoBoardlistItem'+this.boardIndex);
			var viewParent = $("#lottoBoardViewItem"+this.boardIndex);
			$(selectedParent).find('#numbersLink').remove();
			$(selectedParent).find(":input").attr('value',numbersString.toString());
			$(selectedParent).find('.lottoBoardlistItemNumbers').html('');
			$(viewParent).find('.lottoBoardlistItemNumbers').html('');
			var ltype = this.lottoType;
			$.each(numbersArray, function(NumberIndex, number) {
				if(ltype=="powerball"&&NumberIndex==5){
					$(selectedParent).find('.lottoBoardlistItemNumbers').append('<span style="float:left;margin:12px 4px 0 0;color:#000;">Powerball</span>');
					$(viewParent).find('.lottoBoardlistItemNumbers').append('<span style="float:left;margin:4px 4px 0 0;">Powerball</span>');
				}
				$(selectedParent).find('.lottoBoardlistItemNumbers').append('<div id="numberPickerNumber'+NumberIndex+'" class="numberPickerNumber"><div class="numberPickerNumberText">'+number+'</div></div>');
				$(viewParent).find('.lottoBoardlistItemNumbers').append('<div class="numberPickerNumber"><div class="numberPickerNumberText">'+number+'</div></div>');
			});
		},
		lottoRemoveBoard: function(index){
			$('#board'+index).val('');
			var parent = $("#lottoBoardlistRow").find('.lottoBoardlistItem:eq('+index+')');
			//var viewParent = $('#lottoBoardViewItem'+index);
			var alphabet = this.alphabet;
			if (this.elemCount>=3){ //if(index>1){
				$(parent).animate({
					opacity: 0
				},
				200,
				function() {
					$(parent).animate({
						height: 0
					},
					200,
					function() {
						$(parent).remove();
						var i =0;
						$("#lottoBoardlistRow > div").each(function() {
							$(this).attr('id','lottoBoardlistItem'+i);
							$(this).find("#boardLink").html('Board '+alphabet[i]);
							$(this).find("#boardLink").attr('onclick','fnb.functions.lotto.numberPickerInitialize('+i+');');
							$(this).find(":input").attr('name','board'+i);
							$(this).find(":input").attr('id','board'+i);
							$(this).find("#numbersLink").attr('onclick','fnb.functions.lotto.numberPickerInitialize('+i+');');
							$(this).find("div.lottoBoardlistClose a").attr('onclick','fnb.functions.lotto.lottoRemoveBoard('+i+');');
							i++;
						});
					});
				});
				
				this.elemCount--;
				if (this.elemCount<=3){
					this.activateScrollTop(false);
					this.activateScrollBottom(false);
				}
				if (this.curindex > 0) this.scrollUp();
			}else{
				if($(parent).find('.lottoBoardlistItemNumbers').find('div[id^="numberPickerNumber"]').is('*')){
					//$(parent).find('.lottoBoardlistItemNumbers').find('.numberPickerNumber').remove();
					$(parent).find('.lottoBoardlistItemNumbers').html('');
					$(parent).find('.lottoBoardlistItemNumbers').append('<a target="_self" id="numbersLink" onclick="fnb.functions.lotto.numberPickerInitialize('+index+')">Choose Numbers</a>');
				}
			}
		},
		lottoError: function(errorCode,message){
			//alert(errorCode + ' - ' + message);
		},
		populateConfirmNumbers: function(boardNumbers, index){
			var splitBoardNumbers = boardNumbers.split(',');
			var ltype = this.lottoType;
			$("#lottoBoardlistItem"+index).find('#boardLink').html('Board '+this.alphabet[index]);
			$.each(splitBoardNumbers, function(NumberIndex, number) {
				if(ltype=="powerball"&&NumberIndex==5){
					$('#lottoBoardlistItem'+index).find('.lottoBoardlistItemNumbers').append('<span style="float:left;margin:12px 4px 0 0;color:#000;">Powerball</span>');
				}
				$("#lottoBoardlistItem"+index).find('.lottoBoardlistItemNumbers').append('<div id="numberPickerNumber'+NumberIndex+'" class="numberPickerNumber"><div class="numberPickerNumberText">'+number+'</div></div>');
			});
		},
		scrollUp: function(){
			if ((this.curindex+3)==this.elemCount) this.activateScrollBottom(true);
			this.curindex--;
			if (this.curindex==0) this.activateScrollTop(false);
			$("div#lottoBoardlistRow").animate({top: (-this.curindex*this.elemheight)}, 400);
		},
		scrollDown: function(){
			if (this.curindex==0) this.activateScrollTop(true);
			this.curindex++;
			if ((this.curindex+3)==this.elemCount) this.activateScrollBottom(false);
			$("div#lottoBoardlistRow").animate({top: (-this.curindex*this.elemheight)}, 400);
		},
		activateScrollTop: function(active){
			if (active){
				$("#lottoScrollTop").attr('onclick', 'fnb.functions.lotto.scrollUp();return false;').animate({opacity: 100}, 100);
			} else {
				$("#lottoScrollTop").attr('onclick', 'return false;').animate({opacity: 0}, 100);
			}
		},
		activateScrollBottom: function(active){
			if (active){
				$("#lottoScrollBottom").attr('onclick', 'fnb.functions.lotto.scrollDown();return false;').animate({opacity: 100}, 100);
			} else {
				$("#lottoScrollBottom").attr('onclick', 'return false;').animate({opacity: 0}, 100);
			}
		},
		setElemCount: function(nrElems){
			this.elemCount = nrElems;
			if (this.elemCount>3){
				this.activateScrollBottom(true);
			}
		}
	};
	namespace("fnb.functions.lotto",lotto);
});
///-------------------------------///
/// developer: Donovan
///
/// SHOWDIV
///-------------------------------///
$(function(){
	function showDiv(){

	};
	showDiv.prototype = {
		show: function(targetDiv,old_item){
			fnb.functions.unhider.unhide(null,targetDiv,'left','hide',old_item);
		}
	};
	namespace("fnb.functions.showDiv",showDiv);
});
///-------------------------------///
/// developer: Donovan
///
/// NAVIGATE TO
///-------------------------------///
$(function(){
	function navigateTo(){

	};
	navigateTo.prototype = {
		navigate: function(me){
			fnb.functions.footer.clear();
			
			$(me).find('a:eq(0)').trigger('onclick');
		}
	};
	namespace("fnb.functions.navigateTo",navigateTo);
});
///-------------------------------///
/// developer: Donovan
///
/// NAVIGATE TO
///-------------------------------///
$(function(){
	function gotoUrl(){

	};
	gotoUrl.prototype = {
		go: function(url){
			window.top.location=url;
		}
	};
	namespace("fnb.functions.gotoUrl",gotoUrl);
});
///-------------------------------///
/// developer: Donovan
///
/// Hyperlink
///-------------------------------///
$(function(){
	function hyperlink(){

	};
	hyperlink.prototype = {
		navigate: function(url,title,width,height,resizable,status,menubar){
			var popup = window.open(url,title,"width="+width+",height="+height+",resizable="+resizable+",status="+status+",menubar="+menubar);
			popup.focus();
		}
	};
	namespace("fnb.functions.hyperlink",hyperlink);
});

///-----------------------------------------------------------------///
/// developer: Vaughan
///
/// CHECKBOX HIERARCHY SWITCHER
///   manipulate checkbox column children states via data attribute,
///   for current clicked checkbox (data comes from Java)
///-----------------------------------------------------------------///
$(function(){
	function checkboxHierarchySwitcher(){
		this.childDisabled = true;
		this.childDeselected = true;
		this.dataAttrName = 'data-extended';
	}
	checkboxHierarchySwitcher.prototype = {
		checkboxClick: function(clickedCheckbox){
			var children = this.getChildrenAsIdentifierString(clickedCheckbox);
			
			if(clickedCheckbox.parent().hasClass('checked')){
				$(children).setCheckbox(true);
				if(this.childDisabled) $(children).disableCheckbox();
			} else {
				$(children).enableCheckbox();
				if(this.childDeselected) $(children).setCheckbox(false);
			}
		},
		getChildrenAsIdentifierString: function(clickedCheckbox){
			var theString = '';

			//retrieve children as string from data attribute as supplied by Java
			if(typeof clickedCheckbox.attr(this.dataAttrName) != 'undefined'){
				if(clickedCheckbox.attr(this.dataAttrName) != '') theString = '#' + (clickedCheckbox.attr(this.dataAttrName).replace(/, /g, '.checkbox-input,#')) + '.checkbox-input';
			}
			
			return theString;
		},
		getChildren: function(checkedCheckbox){
			var validItems = [];
			var itemsAsString = this.getChildrenAsIdentifierString(checkedCheckbox);
			
			if(typeof itemsAsString != 'undefined'){
				var items = itemsAsString.split(',');

		  		$.each(items, function(i, checkbox){
		  			//do not push any Java given elements that do not exist
		  			if($(checkbox).length != 0) validItems.push($(checkbox));
		  		});
			}
			
			return validItems;
		}
	};

	namespace("fnb.functions.checkboxHierarchySwitcher",checkboxHierarchySwitcher);
});

///-------------------------------------------///
/// developer: Vaughan
///
/// TABLE ROW HANDLER
///   table row and its children DOM iterator
///-------------------------------------------///
$(function(){
	function rowHandler(){}
	rowHandler.prototype = {
		getRows: function(){
			return $($('.tableContainer').find('.tableRow'));
		},
		getRowCheckboxes: function(row){
			var checkboxes = [];
			var checkboxesAsString = row.find('.checkbox-input');
			
			if(checkboxesAsString != ''){
				$.each(checkboxesAsString, function(i, checkbox){
					checkboxes.push($(checkbox));
				});
			}
			
			return checkboxes;
		},
		getRowViaCheckbox: function(checkbox){
			return checkbox.closest('.tableRow');
		},
		getLastCheckbox: function(checkboxes){
			return checkboxes[checkboxes.length - 1];
		}
	}
	namespace("fnb.functions.rowHandler",rowHandler);
});

$(function(){
	function toggleClassName(){
		
	};
	toggleClassName.prototype = {
			toggle: function(element,className){
				var parent = this;
				$(element).toggleClass(className);
				fnb.hyperion.utils.footer.configFooterButtons()
			}
	}
	namespace("fnb.functions.toggleClassName",toggleClassName);
	
});
/* Developer: Donovan
Big Three*/
$(function() {
	this.initialized = false;
	this.scrollingBannerId;
	function bigThree() {

	};
	bigThree.prototype = {
		init : function() {
			this.initialized = true;
			this.scrollingBannerId = $('#scrollingBannerContainer');
			this.adjust($(window).width());
			this.bindEvents();
		},
		onclick: function() {
			
		},
		bindEvents: function() {
			this.scrollingBannerId.on('click touchend', '.scrollingBannerItem', function(event) {fnb.functions.bigThree.select(event)});
		},
		select: function(event) {
			setTimeout(function() {
				var isMoving = false;
				$.each(fnb.utils.scrollingBanner.bannerParentItems, function(index, parentId) {
					 if(typeof fnb.utils.scrollingBanner.bannerParent[parentId].bannerScroller!="undefined"){
						if(fnb.utils.scrollingBanner.bannerParent[parentId].bannerScroller.moving == true) isMoving=true  
					 }
				});
				if( isMoving == false) {
					var url = $(event.target).find(">:first-child").attr('data-value');
					if(typeof url == 'undefined') url = $(event.target).parent().parent().attr('data-value');
					if(typeof url == 'undefined') url = $(event.target).parent().attr('data-value');
					if(typeof url == 'undefined') url = $(event.target).attr('data-value');
					if(typeof url != 'undefined') fnb.controls.controller.eventsObject.raiseEvent('loadUrlToWorkspace', {url: url})
				}
			}, 200);
		},
		adjust: function(windowWidth) {

			if(this.scrollingBannerId.find('.scrollingBannerItem').length>0){

				var maxWidth = $(_workspace).width();
				var bigThreeWidth = this.scrollingBannerId.find('.scrollingBannerItem').first().outerWidth()*this.scrollingBannerId.find('.scrollingBannerItem').length;

				if(maxWidth>bigThreeWidth){
					this.scrollingBannerId.width('');
					this.scrollingBannerId.find('.scrollingBannerItem').removeAttr('style');
					this.scrollingBannerId.find('.scrollingBannerItem').width('');
				}else{
					if(fnb.utils.scrollingBanner.bannerEnableScrolling=="false"){
						fnb.utils.scrollingBanner.init('scrollingBannerContainer','true','true');
						fnb.utils.scrollingBanner.bannerScrollerStopWidth = windowWidth-25;
					}
				}
			}
		}
	}
	namespace("fnb.functions.bigThree",bigThree);
});
/* Developer: Donovan
Session Timeout */
$(function() {
	function timeOut() {
		parentFunction = this;
	};
	timeOut.prototype = {
		keepSessionAlive: function() {
			this.doAliveRequest();
		},
		doAliveRequest: function() {
			var loadObj = {url: "/banking/Controller?nav=KeepSessionAlive",target: _hiddenLogOffDiv,expectResponse:false};
			fnb.controls.controller.eventsObject.raiseEvent('keepSessionAlive', loadObj);
			fnb.hyperion.utils.timeOut.reset();
		}
	}	
	namespace("fnb.functions.timeOut",timeOut);
});

/* Developer: Donovan
Session Timeout */
/*$(function() {
	var parentFunction;
	var logOffTimer;
	var logOffTime = 300000;
	var logOffTimeCounter;
	var timedOutPopup;
	var timedOutStarted = false;
	function timeOut() {
		parentFunction = this;
	};
	timeOut.prototype = {
		init : function() {
			console.log('Init Logoff')
			var _this = this;
			timedOutStarted = false;
			this.logOffTime = logOffTime;
			this.logOffTimeCounter = this.logOffTime;
			this.reset();
		},
		triggerTimeOut: function() {
			fnb.controls.controller.eventsObject.raiseEvent('timedOut', '');
		},
		reset: function() {
			var _this = this;
			if(loggedIn=='true'){
				_this.clearTimer();
				setTimeout(function() {
					 if(timedOutStarted == false&&progressBar.progressActive==false){
						 _this.logOffTimeCounter = _this.logOffTime;
						_this.createTimer();
					}
				}, 4000);
			}else if(typeof fnb.functions.timeOut.logOffTimer!='undefined'){
				_this.clearTimer();
			}
		},
		showPopup: function() {
			if(!_isMobile) var timedOutPopup = window.open("includes/sessionTimedOutPopup.jsp","BANKit","width=680,height=395,resizable=false,status=false,menubar=false");
			$(_overlay).addClass('timeOverlay');
			$(_sessionTimedOutOverlay).removeClass('hidden');
			fnb.functions.logOff.init();
			clearTimeout(_this.logOffTimer);
			timedOutStarted = true;
			if(!_isMobile){
				if(timedOutPopup){
					timedOutPopup.focus();
				}
			}
		},
		hideInternal: function() {
			$(_sessionTimedOutOverlay).addClass('hidden');
			fnb.functions.logOff.stopTimer();
		},
		logOff: function() {
			fnb.controls.controller.eventsObject.raiseEvent('loadResultScreen', '/banking/Controller?nav=navigator.UserLogoff');
		},
		createTimer: function() {
			var _this = this;
			this.logOffTimer = setTimeout(function() {
			    if (_this.logOffTimeCounter < 1&&loggedIn=='true') {
					_this.triggerTimeOut();
			    }else{
					_this.clearTimer();
					_this.logOffTimeCounter= _this.logOffTimeCounter-1000;
					_this.createTimer();
				}
			}, 1000);
		},
		clearTimer: function() {
			clearTimeout(fnb.functions.timeOut.logOffTimer); 
			timedOutStarted = false;
		},
		keepSessionAlive: function() {
			$(_overlay).removeClass('timeOverlay');
			timedOutStarted = false;
			this.reset();
			this.doAliveRequest();
		},
		doAliveRequest: function() {
			var loadObj = {url: "/banking/Controller?nav=KeepSessionAlive",target: _hiddenLogOffDiv,expectResponse:false};
			fnb.controls.controller.eventsObject.raiseEvent('keepSessionAlive', loadObj);
		},
		doSimpleAliveRequest: function() {
			//var loadObj = {url: "/banking/Controller?nav=KeepSessionAlive",target: _hiddenLogOffDiv,expectResponse:false};
			//fnb.controls.controller.loadUrl("keepSessionAlive",loadObj.target,loadObj.url,"","","","",loadObj.expectResponse)
		}
	}
	namespace("fnb.functions.timeOut",timeOut);
});
 Developer: Donovan
Internal Popup functions
$(function() {
	this.logOffTimer2;
	this.parentWindow;
	this.logOffTime = 120;
	function logOff() {
		parentFunction = this;
	};
	logOff.prototype = {
		init : function() {
			this.startTimer();
		},
		logOff: function() {
			clearTimeout(this.logOffTimer2);
			fnb.functions.timeOut.logOff();
		},
		exit: function() {
			clearTimeout(this.logOffTimer2);
			$(_sessionTimedOutOverlay).addClass('hidden');
			fnb.functions.timeOut.keepSessionAlive();
		},
		startTimer: function() {
			var _this = this;
			this.logOffTime = 120;
			document.getElementById("timer").innerHTML = this.logOffTime;
			this.createTimer();
		},
		createTimer: function() {
			var _this = this;
			this.logOffTimer2 = setTimeout(function() {
				_this.logOffTime--;
			    document.getElementById("timer").innerHTML = _this.logOffTime;
			    if (_this.logOffTime == 0) {
			       clearTimeout(this.logOffTimer2);
			        _this.logOff();
			    }else{
					clearTimeout(_this.ogOffTimer2);
					_this.createTimer();
				}
			}, 1000);
		},
		stopTimer: function() {
			clearTimeout(this.logOffTimer2);
		}
	}
	namespace("fnb.functions.logOff",logOff);
});*/
/* Developer: Donovan
More Row Select*/
$(function(){
	function tableMoreButton(){
		
	};
	tableMoreButton.prototype = {
			checkSelection: function(attr,event){
				if(_isMobile){
					if(fnb.utils.mobile.utils.mobileMoved == false||typeof fnb.utils.mobile.utils.mobileMoved=='undefined'){
						event.preventDefault();
						event.stopPropagation();
						fnb.controls.controller.eventsObject.raiseEvent('tableMoreOptions', attr);
					}
				}else{
					fnb.controls.controller.eventsObject.raiseEvent('tableMoreOptions', attr);
				}
			}
	}
	namespace("fnb.functions.tableMoreButton",tableMoreButton);
	
});
/* Developer: Donovan
FooterButtonTransfer*/
$(function(){
	function transferFooterContent(){
		
	};
	transferFooterContent.prototype = {
			transfer: function(parent,content){
				var currentContent = content;
				parent.html('');
				$('#footerWrapper').find('.right-sidebar-bottom').html(currentContent);
			},
			clear: function(){
				$('#footerWrapper').find('.right-sidebar-bottom').html('');
			},
			reset: function(){
				$('#footerMessage').addClass('hideElement');
				this.clear();
			}
	}
	namespace("fnb.functions.transferFooterContent",transferFooterContent);
	
});
/* Developer: Donovan
Scroll Listener*/
$(function(){
	function isScrolling(){
		this.moreWrapper = $('#forMore');
	};
	isScrolling.prototype = {
			init: function(){
				if(typeof this.moreWrapper=='undefined') this.moreWrapper = $('#forMore');
			},
			checkPos: function(){
				if(fnb.utils.overlay.expanded==false){
					var myDiv = document.getElementById("pageContent");
					var height = myDiv.scrollHeight;
					var position = $(document).scrollTop();
					var scrollbar = myDiv.clientHeight;
					
					if((position+$(window).height()) < (scrollbar-50)){
						if(this.moreWrapper.hasClass('visibilityHidden')){
							this.moreWrapper.removeClass('visibilityHidden');
						}
					}else{
						if(!this.moreWrapper.hasClass('visibilityHidden')){
							this.moreWrapper.addClass('visibilityHidden');
						}
					}
				}
			},
			doScroll: function(pos){
				var scrollPos = pos;
				var position = $(document).scrollTop();
				if(typeof scrollPos=='undefined'){
					scrollPos = $(window).height();
				}else{
					position = 0;
				}
				var myDiv = document.getElementById("pageContent");
				var toPos = position+scrollPos;
				$("html, body").animate({ scrollTop:  toPos+"px" });
			},
			hide: function(){
				if(typeof this.moreWrapper=='undefined') this.moreWrapper = $('#forMore');
				if(!this.moreWrapper.hasClass('visibilityHidden')){
					this.moreWrapper.addClass('visibilityHidden');
				}
			}
	}
	namespace("fnb.functions.isScrolling",isScrolling);
});

/* Developer: Donovan
Slow Connection popup*/
$(function(){
	function slowConnection(){
		
	};
	slowConnection.prototype = {
		show: function(){
			if($(_slowConnectionOverlay).hasClass('hidden')) $(_slowConnectionOverlay).removeClass('hidden');
		},
		hide: function(){
			if(!$(_slowConnectionOverlay).hasClass('hidden')) $(_slowConnectionOverlay).addClass('hidden');
		},
		continueWaiting: function(){
			this.hide();
		},
		endNow: function(){
			this.hide();
			fnb.controls.controller.eventsObject.raiseEvent('abortLoadUrl', 'abort');
		}
	}
	namespace("fnb.functions.slowConnection",slowConnection);
});

/* Developer: Donovan
Coza Content*/
$(function(){
	function cozaContent(){
		
	};
	cozaContent.prototype = {
		select: function(event,target){
			var url = $(event.target).attr('link');
			if(typeof url == 'undefined') url = $(event.target).parent().attr('link');
			if(typeof url == 'undefined') url = $(event.target).parent().parent().attr('link');
			if(typeof url != 'undefined'){
				var loadObj = {url: url+'?bankingFrame=true',target: target};
				fnb.controls.controller.eventsObject.raiseEvent('loadUrl', loadObj);
			}
		},
		selectHref: function(event,target){
			var url = $(event.target).attr('href');
			if(typeof url == 'undefined') url = $(event.target).parent().attr('href');
			if(typeof url == 'undefined') url = $(event.target).parent().parent().attr('href');
			if(typeof url == 'undefined') url = $(event.target).parent().parent().parent().attr('href');
			if(typeof url != 'undefined'){
				var loadObj = {url: url+'?bankingFrame=true',target: target};
				fnb.controls.controller.eventsObject.raiseEvent('loadUrl', loadObj);
			}
		}
	}
	namespace("fnb.functions.cozaContent",cozaContent);
});


/* Developer: Donovan
Clone footer*/
$(function(){
	function footer(){
		
	};
	footer.prototype = {
		add: function(){

			var footerHtml = $('#formFooterButtons').children(0).html();
			
			var buttons = $('#formFooterButtons').children(0).children().get().reverse();
			
			for(i=0; i < buttons.length; i++){

				$('#footerButtonsContainer').append(buttons[i]);
			}

		},
		clear: function(){
			console.log('fnb.functions.footer: Clear Footer Buttons')
			$('#footerButtonsContainer').html('');
			
		}
	}
	namespace("fnb.functions.footer",footer);
});

/* Developer: Donovan
IE8 Content*/
$(function(){
	function ie8(){
		this.isAdded = false;
	};
	ie8.prototype = {
		doCheck: function(){
			if(_browserName=="MSIE"&&_browserVersion<9){
				var windowWidth = $(window).width();
				if(windowWidth>_siteMaxWidth&&this.isAdded!=true){
					this.addClasses();
					this.isAdded = true;
				}else if(windowWidth<_siteMaxWidth&&this.isAdded==true){
					this.removeClasses();
					this.isAdded = false;
				}else if(windowWidth>_siteMaxWidth&&this.isAdded==true){
					$('#actionMenuTextWrapper').addClass('ie8-actionMenuTextWrapper');
					$('#actionMenuButtonWrapper').find('.actionMenuButtonWrapperInner').addClass('ie8-actionMenuButtonWrapperInner');
					$('#formFooterButtons').addClass('ie8-formFooterButtons');
					$('#main').addClass('ie8-main');
					$('#main').find('.pageWrapper').addClass('ie8-pageWrapper');
				}
			}
		},
		addClasses: function(){
			$('html').addClass('ie8-htmlBackGround');
			$('#main').addClass('ie8-main');
			$('#formFooterButtons').addClass('ie8-formFooterButtons');
			$('#topNavWrapper').addClass('ie8-topNavWrapper');
			$('#eziPannelButtons').addClass('ie8-eziPannelButtons');
			$('#eziWrapper').addClass('ie8-eziWrapper');
			$('#actionMenuTextWrapper').addClass('ie8-actionMenuTextWrapper');
			$('#actionMenuButtonWrapper').find('.actionMenuButtonWrapperInner').addClass('ie8-actionMenuButtonWrapperInner');
			$('#footerWrapperNew').find('.left-sidebar-bottom').addClass('ie8-left-sidebar-bottom');
			$('#fnb-logo').addClass('ie8-footerWrapperNewfnb-logo');
			
			$('#topMenu').find('.left-sidebar-top').addClass('ie8-left-sidebar-top');
			$('#footerMessage').find('.footerMessageInner').addClass('ie8-footerMessageInner');
			$('.pageWrapper').addClass('ie8-pageWrapper');
			$('#actionWrap').addClass('ie8-actionWrap');
			$('#popupWrapper').addClass('ie8-popupWrapper');
			$('#overlay').addClass('ie8-overlay');
			$('#calendarWrapper').find('.bcal-container').addClass('ie8-bcal-container');
			
			$('#footerWrapperNew').addClass('ie8-footerContent');
			
		},
		removeClasses: function(){
			$('html').removeClass('ie8-htmlBackGround');
			$('#main').removeClass('ie8-main');
			$('#formFooterButtons').removeClass('ie8-formFooterButtons');
			$('#topNavWrapper').removeClass('ie8-topNavWrapper');
			$('#eziPannelButtons').removeClass('ie8-eziPannelButtons');
			$('#eziWrapper').removeClass('ie8-eziWrapper');
			$('#actionMenuTextWrapper').removeClass('ie8-actionMenuTextWrapper');
			$('#actionMenuButtonWrapper').find('.actionMenuButtonWrapperInner').removeClass('ie8-actionMenuButtonWrapperInner');
			$('#footerWrapperNew').find('.left-sidebar-bottom').removeClass('ie8-left-sidebar-bottom');
			$('#fnb-logo').removeClass('ie8-footerWrapperNewfnb-logo');		
			
			$('#topMenu').find('.left-sidebar-top').removeClass('ie8-left-sidebar-top');
			$('#footerMessage').find('.footerMessageInner').removeClass('ie8-footerMessageInner');
			$('.pageWrapper').removeClass('ie8-pageWrapper');
			$('#actionWrap').removeClass('ie8-actionWrap');
			$('#popupWrapper').removeClass('ie8-popupWrapper');
			$('#overlay').removeClass('ie8-overlay');
			$('#calendarWrapper').find('.bcal-container').removeClass('ie8-bcal-container');
			
			$('#footerWrapperNew').removeClass('ie8-footerContent');
		}
	}
	namespace("fnb.functions.ie8",ie8);
});

var functionsArray =['Calendar','$','jQuery','_gsDefine','Ease','Power4','Strong','Quint','Power3','Quart','Power2','Cubic','Power1','Quad','Power0','Linear','TweenLite','TweenPlugin','TweenMax','TimelineLite','TimelineMax','BezierPlugin','CSSPlugin','BackOut','BackIn','BackInOut','SlowMo','SteppedEase','RoughEase','BounceOut','BounceIn','BounceInOut','CircOut','CircIn','CircInOut','ElasticOut','ElasticIn','ElasticInOut','ExpoOut','ExpoIn','ExpoInOut','SineOut','SineIn','SineInOut','horizontalScroller','namespace','ChameleonTable','onbeforeunload','changePage','verifyDateValid','verifyDateValidCustomString','confirmHoliday']

///-------------------------------------------///

/// developer: Donovan
///
/// Inputs
///-------------------------------------------///
$(function(){
	function input(){
		this.undeletableChars = ['(',')'];
		this.currentInputVal = '';
		this.firstFocus = false;
	};
	input.prototype = {
		init: function(){
			this.ctrlDown = false;
		},
		delegateEvents: function(event){
			_this = this;
			var eventName = event.type;
			var isNumberOnly = $(event.target).hasClass('numberOnly');
			var isNumber = $(event.target).hasClass('number');
			var isPhoneNumber = $(event.target).hasClass('phoneNumber');
			var isCurrency = $(event.target).hasClass('currencyInput');
			var isTotaller = $(event.target).parent().hasClass('tableAmountInputItem');
			if(isCurrency){
				switch(eventName)
				{
					case 'focusin':
						_this.focusEvent(event);
					break;
					case 'keypress':
						return _this.currencyKeypress(event);
					break;
					case  'keyup':
						if(isTotaller){
							var validInput = _this.currencyKeypressUp(event);
							if(validInput) _this.updateTotaller();
							return validInput;
						}else{
							return _this.currencyKeypressUp(event);
						}
					break;
					case  'focusout':
						_this.currencyBlurEvent(event);
					break;
				}
			}else if(isNumberOnly&&!isPhoneNumber){
				switch(eventName)
				{
					case 'focusin':
						_this.addFocus(event.target);
					break;
					case  'focusout':
						_this.removeFocus(event.target);
					break;
					case  'keydown':
						return _this.numberOnlyInput(event);
					break;
				}

			}else if(isNumber){
				switch(eventName)
				{
					case 'focusin':
						_this.addFocus(event.target);
					break;
					case  'focusout':
						_this.removeFocus(event.target);
					break;
					case  'keydown':
						return _this.numberInput(event);
					break;
				}

			}else if(isPhoneNumber){
				switch(eventName)
				{
					case 'focusin':
						_this.phoneFocusIn(event);
					break;
					case  'focusout':
						_this.phoneFocusOut(event);
					break;
 					case  'keyup':
						return _this.phoneKeypressUp(event);
					break;
					case  'keydown':
						return _this.phoneKeypress(event);
					break;
				}
			}else{
				switch(eventName)
				{
					case 'focusin':
						_this.addFocus(event.target);
					break;
					case  'focusout':
						_this.removeFocus(event.target);
					break;
				}
			}
		},
		addFocus: function(target){
			if(this.firstFocus==false){
				this.firstFocus == true;
				$(target).addClass('input-focus');
			}
			fnb.forms.scrollUtil.tabScroll(target);
		},
		removeFocus: function(target){
			this.firstFocus == false;
			$(target).removeClass('input-focus');
		},
		focusEvent: function(e){
			if(this.firstFocus==false){
				_this.addFocus(e.target);
				this.currentInputVal = $(e.target).val();
				this.firstFocus == true;
				if($(e.target).val() == "0.00" || $(e.target).val() == "0") {
					$(e.target).val("");
				}
			}
		},
		currencyKeypress: function(e){
			var key = e.charCode||e.keyCode||e.which;
			if (key == undefined) return false; 
			if (key<48||key>57) {
				if (key==13||key==9||key==8||key==37||key==39||key==46) {
					return true;
				} else {
					return false;
				}
			}else{
				return true;
			}
		},
		currencyKeypressUp: function(e){
			var e = e;
			var keyUnicode = e.charCode || e.keyCode;
			if (e !== undefined) {
				switch (keyUnicode) {
					//ERB Removed backspace so trigger  
					//case 8: return true; break;
					case 46: return true; break;
					case 16: return false; break;
					case 17: return false; break;
					case 18: return false; break;
					case 27: e.target.value = ''; return false; break;
					case 35: return false; break;
					case 36: return false; break;
					case 37: return false; break;
					case 38: return false; break;
					case 39: return false; break;
					case 40: return false; break;
					case 78:  return false; break;
					case 110: return false; break;
					case 190: return false; break;
					default:
					var cursorPosition = $(e.target).getCursorPosition();
					var originalVal =  $(e.target).val();
					var currentVal = e.target.value.replace(/[,]/g,"");
					
					var nextChar = currentVal.charAt(cursorPosition);
					var offsetCount = currentVal.match(/ /ig) || [];

					if(!jQuery.browser.mobile)
					{
					$(e.target).maskCurrency({ colorize: true, negativeFormat: '-%s%n', roundToDecimalPlace: -1, eventOnDecimalsEntered: true });
					}

					var maskedVal = $(e.target).val();
					var offsetPos = maskedVal.indexOf(" ");
					var newOffsetCount = maskedVal.match(/ /ig) || [];
					
					
					if (maskedVal.length > originalVal.length)
					{cursorPosition++;}
					
					if (currentVal.indexOf(".") == 0)
					{cursorPosition++;}
					
					$(e.target).setCursorPosition(cursorPosition);
					return true;
				}
			}else{
				return false;
			}
		},
		currencyBlurEvent: function(e){
			this.firstFocus == false;
			_this.removeFocus(e.target);
			var currentcyDecimal = parseInt($(e.target).attr('data-decimal'));
			if (e.target.value == "") {
				if (currentcyDecimal == '0') $(e.target).val('0') 
					else $(e.target).val('0.00');
			}
			$(e.target).maskCurrency({ colorize: true, negativeFormat: '-%s%n', roundToDecimalPlace: currentcyDecimal });
		},
		numberInput: function(event){
			if(event.keyCode >= 48 && event.keyCode <= 57||event.keyCode >= 96 && event.keyCode <= 105||event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9|| event.keyCode == 37|| event.keyCode == 39)				
			{
				return true;
			}else{
				return false;	
			}
		},
		numberOnlyInput: function(event){
			var keyUnicode = event.which || event.keyCode;
			var isShift = event.shiftKey ? true : false;
			if(isShift){
				return false;
			}else{
				if(keyUnicode == 8 || keyUnicode == 9 || keyUnicode == 37 || keyUnicode == 39 || keyUnicode == 46 || keyUnicode == 48 || keyUnicode == 49 || keyUnicode == 50 || keyUnicode == 51 || keyUnicode == 52 || keyUnicode == 53 || keyUnicode == 54 || keyUnicode == 55 || keyUnicode == 56 || keyUnicode == 57 || keyUnicode == 96 || keyUnicode == 97 || keyUnicode == 98 || keyUnicode == 99 || keyUnicode == 100 || keyUnicode == 101 || keyUnicode == 102 || keyUnicode == 103 || keyUnicode == 104 || keyUnicode == 105 || keyUnicode == 110 || keyUnicode == 111){
					return true;
				} else {
					return false;
			    }
			}
			
		},
		phoneFocusIn: function(event){
			_this.addFocus(event.target);
			if($(event.target).hasClass('phoneCode')){
				if($(event.target).hasClass('phoneEmpty')){
					$(event.target).val('')
					$(event.target).removeClass('phoneEmpty');
				}
			}else if($(event.target).hasClass('phoneNumber')){
				if($(event.target).hasClass('phoneEmpty')){
					$(event.target).val('')
					$(event.target).removeClass('phoneEmpty');
				}
			}
		},
		phoneFocusOut: function(event){
			_this.removeFocus(event.target);
			if($(event.target).val()==''&&$(event.target).hasClass('phoneCode')){
				if(!$(event.target).hasClass('phoneEmpty')){
					$(event.target).val('Code')
					$(event.target).addClass('phoneEmpty');
				}
			}else if($(event.target).val()==''&&$(event.target).hasClass('phoneNumber')){
				if(!$(event.target).hasClass('phoneEmpty')){
					$(event.target).val('Number');
					$(event.target).addClass('phoneEmpty');
				}
			}
		},
		phoneKeypress: function(event){
			var keyUnicode = event.charCode || event.keyCode;
			if(keyUnicode==17){
				this.ctrlDown = true;
				return true;
			}else{
				if(this.ctrlDown==true&&keyUnicode==86||this.ctrlDown==true&&keyUnicode==67||this.ctrlDown==true&&keyUnicode==88){
					return true;
				}else{
					return _this.numberOnlyInput(event);
					if($(event.target).val()==''&&$(event.target).hasClass('phoneCode')){
						if(!$(event.target).hasClass('phoneEmpty')){
							$(event.target).val('Code')
							$(event.target).addClass('phoneEmpty');
						}
					}else if($(event.target).val()==''&&$(event.target).hasClass('phoneNumber')){
						if(!$(event.target).hasClass('phoneEmpty')){
							$(event.target).val('Number');
							$(event.target).addClass('phoneEmpty');
						}
					}
				}
			}

		},
		phoneKeypressUp: function(event){
			this.ctrlDown = false;
		},
		setInputCursorPosition: function(input, pos){
			if (_browserName=="MSIE"&&input.createTextRange) {
		        var range = input.createTextRange();
		        range.collapse(true);
		        range.moveEnd('character', pos);
		        range.moveStart('character', pos);
		        range.select();
		    }
			else {
				input.selectionStart = pos;
				input.selectionEnd = pos;
			}
			return true;
		},
		getInputCursorPosition: function(input){
			var inputPos = 0;
			if (document.selection) {
				input.focus ();
				var selection = document.selection.createRange ();
				selection.moveStart ('character', -input.value.length);
				inputPos = selection.text.length;
			}else if (input.selectionStart || input.selectionStart == '0')
				inputPos = input.selectionStart;
				return (inputPos);
		},
		getInputSelectedText: function(el){
			 var start = 0, end = 0, normalizedValue, range,
				textInputRange, len, endRange;

			if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
				start = el.selectionStart;
				end = el.selectionEnd;
			} else {
				range = document.selection.createRange();

				if (range && range.parentElement() == el) {
					len = el.value.length;
					normalizedValue = el.value.replace(/\r\n/g, "\n");

					textInputRange = el.createTextRange();
					textInputRange.moveToBookmark(range.getBookmark());

					endRange = el.createTextRange();
					endRange.collapse(false);

					if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
						start = end = len;
					} else {
						start = -textInputRange.moveStart("character", -len);
						start += normalizedValue.slice(0, start).split("\n").length - 1;

						if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
							end = len;
						} else {
							end = -textInputRange.moveEnd("character", -len);
							end += normalizedValue.slice(0, end).split("\n").length - 1;
						}
					}
				}
			}

			return {
				start: start,
				end: end
			};
		},
		updateTotaller: function(){
			currentPageTotal = 0;
			$.each( currentPageTotalItems, function( index, item ) {
				var currentVal = $('#'+item).val().replace(/[,]/g,'');
				if(currentVal=='') currentVal = 0;
				currentPageTotal += parseFloat(currentVal);
			});
			var tableTotalFloat = currentPageTotal;
			if(tableTotalFloat>0){
				
				var splitNumber = parseFloat(tableTotalFloat).toFixed(2).toString().split('.');
				var charCount = 0;
				var totalChars = '';
				splitNumber[0].replace(/[,]/g,'').reverse().forEach(function(entry) {
	    			if (charCount==3) {
	    				entry = ',' + entry;
	    				charCount = 0; 
	    			}
	    			charCount++;
	    			totalChars = totalChars + entry;
				});
				totalChars = totalChars.reverse() + '.' + splitNumber[1];
				$('#footerMessageTotal').text(totalChars);
				if($('#footerMessage').hasClass('hideElement')) $('#footerMessage').removeClass('hideElement');
			}else{
				if(!$('#footerMessage').hasClass('hideElement')) $('#footerMessage').addClass('hideElement');
			}
		},
		predictiveText: function(event, obj, arr, dest, submit, nav){

			
			event.preventDefault();
			
			var values = "";
			if (arr !== null && arr != '') {
				values = arr;
			}
			
			var code = event.keyCode || event.which;
			 if(code == 13) { 
				
			 }
			 else if ((code == 40) || (code == 38))
				 {
				 
				 }
			 

			 if(obj.value.length >= 3) {

				if (nav !== undefined && nav != '' ) {
					
					$.ajax({
						type: "GET",
						url: nav,
						dataType:'html',
						cache: false,
						beforeSend : function (jqXHR){},
						complete : function (jqXHR, textStatus) {
						},
						success: function(data, textStatus, jqXHR) {
							values = data.trim().split("|");
							fnb.forms.input.buildPredictiveTextOptions(event, obj, dest, values, submit);
						}
					});
				}
				else {
					if(values.indexOf('|') >= 0)
					{values = values.trim().split("|");}
					fnb.forms.input.buildPredictiveTextOptions(event, obj, dest, values, submit);
				}
				
			}
			 else {
				$(obj).closest(".predictable").removeClass('predictable');
			 }	
			
		},
		buildPredictiveTextOptions: function(event, obj, dest, values, submit){

			
			var parent = $(event.target).parent(); 
			
			if (!parent.hasClass('predictable')) {
				$(obj).blur(function(event){
					$(event.target).parent().removeClass('predictable');
					$(obj).unbind( "blur" );
				});
				parent.addClass('predictable');
			}
			
			$('#predictive_'+dest).remove();
			query = obj.value;
			if(query != '') {
				filtered = $.grep(values, function(a){
					var temp = a.toString();
					return temp.toUpperCase().indexOf(query.toUpperCase()) >=0;
				});
				
				if(filtered.length < 1){
				return false;
				}
				
				var new_node = document.createElement('div');
				new_node.id = "predictive_"+dest;
				
				for(var i=0; i< filtered.length; i++) {
					var new_node2 = document.createElement('div');
					new_node2.innerHTML = filtered[i].toString().replace(new RegExp(query, "gi"), "<b>"+query+"</b>");
					new_node2.setAttribute("data-value",filtered[i]);
					$(new_node2).appendTo(new_node);
				}
				
				$(obj).after(new_node);
				$(new_node).addClass('predictions');
				$('.predictions > div').click(function(event){
					event.stopImmediatePropagation();
					obj.value = event.currentTarget.getAttribute("data-value");
					if(submit) {
						$(obj).closest("form").trigger("submit");
					}
					$(obj).closest(".predictable").removeClass('predictable');
				});
			}
			
			
		}
		
	};

	namespace("fnb.forms.input",input);

});

///----------------------------///
/// first developer: Donovan
/// second developer: Leon
/// developer: Vaughan (12/06/2013) - added enable/disable/setValue methods + onChangeCallback var
///
/// DROPDOWNS
///----------------------------///
$(function(){
	function dropdown(){
		var reverse = false;
		var dropUp = false;
		this.onclick;
		this.currentChild;
		this.scrollPos;
		this.didAdjust = false;
		this.didAdjustPos = 0;
		this.onChangeCallback;
		this.tableRow;
	};
	dropdown.prototype = {
		init: function(obj,index){
			this.reverse = false;
			this.dropUp = false;
			var contentObject = $(obj).parent().find('ul[class^="dropdown-content"]');
			index = ( (index == undefined) || (index == '') && (index != 0) ) ? 'dropdownIndexUndefined' : index;
			if ( index == 'dropdownIndexUndefined' ) {
				index = $(contentObject).index($('li.selected-item'));
			} else {
				var foundIndex = index;
				if(index != 'dropdownIndexUndefined'){
					$(contentObject).find('li').each(function(itemIndex, item) {
						if($(this).attr('data-value')  == index) foundIndex = itemIndex;
					});
				}
				
				var dropdownDownSelection = (index != 'dropdownIndexUndefined') ? $(contentObject).find('li:eq('+foundIndex+')') : [];
				if ($(dropdownDownSelection).length == 0) {
					var arrItems = $(contentObject).children();
					$.each(arrItems,function(i,n){
						var foundIndex = $("div:contains('" + foundIndex + "')",n);
						if (foundIndex.length != 0) {
							foundIndex = i-1;
						}
					});
				}
			}
			if($(contentObject).find('li').length<5) $(contentObject).find('.dropdown-content-top').remove();
			if(foundIndex=='') foundIndex = 0;
			if($(contentObject).find('li:eq('+foundIndex+')').is('*')){
				var dropdownDownSelection = $(contentObject).find('li:eq('+foundIndex+')');
				this.select($(dropdownDownSelection));
				var labelWidth = $(contentObject).attr('data-labelwidth');
				var selectWidth = $(contentObject).attr('data-selectwidth');
			}else if (foundIndex == 0){
				$(obj).find('.dropdown-selection-white').text('No Data');
			}
			else{
				$(obj).find('.dropdown-selection-white').text('Please Select');
			}
		},
		expand: function(obj,type,searchClassName,reverse,height,isAccount){

			if(!$(obj).closest('.formElementWrapper').hasClass('dropdown-disabled')){
				if(_tinyPort){
					this.reverse = false;
				}else{
					this.reverse = reverse;
				}
				var parentFunction = this;
				var enableSearch = false;
				var contentObject = $(obj).parent().parent().find('div[class*="dropdown-content-wrapper"]');
				
				$(contentObject).find('.dropdown-input').val('');
				
				$(contentObject).css({width: $(contentObject).parent().find('.dropdown-initiator').width()})
				$(contentObject).find('.dropdown-item').show();

				if(!$(contentObject).hasClass('dropdown-expanded')){
					if(_isMobile) $("#main").css('position','static');
					
					if(_tinyPort){
						this.tableRow = $(obj).closest('.tableRow');
						if(this.tableRow.length>0){
							this.tableRow.addClass('addStatic');
						}
					}
					if(_tinyPort){
						fnb.forms.scrollUtil.setScrollPos();
						fnb.controls.controller.clearBodyHeight();
						fnb.controls.controller.scrollToTop();
					}
					fnb.controls.controller.clearActiveElements();
					if(type==2){
						$(contentObject).children('ul:eq(0)').addClass('dropdown-static');
					}

					$(contentObject).addClass("dropdown-expanded");
					$(contentObject).parent().parent().addClass("dropdown-wrapper-expanded");

					parentFunction.animate($(contentObject).children('ul:eq(0)'),false,height,this.reverse);
				}else{
					if(_isMobile) $("#main").css('position','');
					
					if(_tinyPort&&!$('#mobiPopupWrapper').is('*')){
						fnb.controls.controller.setBodyHeight();
						fnb.forms.scrollUtil.scrollPosUpdate();
					}
					
					
					$(contentObject).removeClass("dropdown-expanded");
					parentFunction.animate($(contentObject).children('ul:eq(0)'),true,height,this.reverse);

					if(_isMobile){
						$(contentObject).closest('.formElementWrapper').css('position', '');
						$(contentObject).closest('.gridGroup').css('position', '');
					}

					
				}
			}
		},
		animate: function(obj,state,height,reverse){
			$(obj).show();
			
			//if(!_isMobile) $('.pageGroup ').addClass('superPadBottom');
			$(obj).parent().show();
			$(obj).parent().css({'top':''});

			var parentFunction = this;
			var objHeight = $(obj).height();

			var isMobiWrapped = $(obj).closest('#mobiPopupWrapper').length;
			var isFooterWrapped = $(obj).closest('#footerButtonGroup').length;
			
			height = 0;
			var fixHeight = false;
			if($(obj).find('li').length>5){
				fixHeight = true;
				height = Math.round((objHeight/$(obj).find('li').length)*6);
			}

			if(height>300||height==0) height= 300;
			if(fixHeight == true) objHeight = height;

			if(isMobiWrapped>0) reverse='false';

			if(($(_main).outerHeight(true))>$(_main).outerHeight(true)&&isMobiWrapped<1&&isFooterWrapped<1){
				reverse='true';
				if($(window).height()-179>($(_main).height()+objHeight)){
					reverse='false';
				}else{
					if($(obj).parent().position().top<objHeight){
						objHeight = ($(obj).parent().position().top)-($(obj).closest('.dropdownElementWrapper').height())-12;
					}
				}
			}

			if(reverse=='true'){
				var posTop = $(obj).parent().parent().position().top - objHeight;
				if($(obj).closest('.pagination').length == 0) posTop-=12;
				$(obj).parent().css({'top':posTop+'px'});
				parentFunction.dropUp = true;
			}else{
				if(!_tinyPort&&fnb.hyperion.utils.eziPanel.active == false){
					if(state==false){
						var currentScrollTop = $(document).scrollTop();
						this.didAdjustPos = currentScrollTop;
						var currentWindowHeight = $(window).height();
						var calc = ($(obj).parent().position().top-currentScrollTop)+objHeight+$(_topMenu).height()+$(_formFooterButtons).height();
						if(calc>currentWindowHeight){
							this.didAdjust = true;
							var newScrollPos = (calc-currentWindowHeight)+(currentScrollTop+48);
							fnb.functions.isScrolling.doScroll(newScrollPos);
						}
					}else if(this.didAdjust==true){
						fnb.functions.isScrolling.doScroll(this.didAdjustPos);
					}
				}else if(_tinyPort){
					objHeight = $(window).height()-30;
				}
			}
			if(state == false){
				if(_smallPort){
					if($('#main').height()<$(window).height())  $('#main').css({'min-height': $(window).height()+'px'});
					this.scrollPos = $(window).scrollTop();
				}
				if(parentFunction.dropUp == true){
					$(obj).css({'max-height':objHeight}).show();
					$(obj).parent().parent().find('.dropdown-trigger').addClass('dropup-trigger-selected');
				}else{
					$(obj).show().css({
							'max-height': 0
						}).stop().animate({
							'max-height':objHeight
						}, {
							duration: 200, 
							easing: 'swing',
							step: function( progress ){

							},
							complete: function() {
								$(obj).parent().parent().find('.dropdown-trigger').addClass('dropdown-trigger-selected');
							}
					});
				}
			}else if(state == true){
				if(_smallPort){
					window.scrollTo(0, this.scrollPos);
				}
				if(parentFunction.dropUp == true){
					$(obj).parent().parent().find('.dropdown-trigger').removeClass('dropup-trigger-selected');
					$(obj).css({'max-height':''})
					$(obj).hide();
					$(obj).parent().hide();
				}else{
					$('#main').height('');
					$(obj).animate({
						'max-height':0
					}, {
						duration: 200, 
						easing: 'swing',
						step: function( progress ){

						},
						complete: function() {
							$(obj).parent().parent().find('.dropdown-trigger').removeClass('dropdown-trigger-selected');
							$(obj).hide();
							$(obj).parent().hide();
							$(obj).css({'max-height':''})
						}
					});
				}
			}
		}, 
		mobileTriggerOnclick: function(obj){
			$(obj).trigger('onclick');
		},
		checkSelect: function(e,onclick){
			
			var _this = this;
			if(_isMobile){
			
				if(fnb.utils.mobile.utils.mobileMoved == false||typeof fnb.utils.mobile.utils.mobileMoved=='undefined'){
					if(_tinyPort){if(_this.tableRow.length>0) _this.tableRow.removeClass('addStatic')};
					var newObj = $(e.currentTarget);
					if(typeof $(newObj).attr('onclick')!='undefined'){
					}else if(typeof $(newObj).parent().attr('onclick')!='undefined'){
						newObj = $(newObj).parent();
					}else if(typeof $(newObj).parent().parent().attr('onclick')!='undefined'){
						newObj = $(newObj).parent().parent();
					}
					_this.select(newObj,onclick);
				}else{
					e.preventDefault();
				}
				
			}else{
				_this.select($(e.target),onclick);
				if(_tinyPort){if(_this.tableRow.length>0) _this.tableRow.removeClass('addStatic')};
			}
		},
		checkExpand: function(e){

			e.preventDefault();
			if(fnb.utils.mobile.utils.mobileMoved == false||typeof fnb.utils.mobile.utils.mobileMoved=='undefined'){
				
				var newObj = $(e.currentTarget);

				newObj.closest('.formElementWrapper').css('position', 'static');
				newObj.closest('.gridGroup').css('position', 'static');
				
				if(typeof $(newObj).attr('onclick')=='undefined'){
					newObj = $(newObj).closest('.dropdown-initiator');
				}
				
				var onclickSplit = $(newObj).attr('onclick').split(',');
				
				onclickSplit = onclickSplit[3].replace(/'/g,"");
				
				fnb.forms.dropdown.expand(newObj,'','dropdown-h4',onclickSplit,'');
				
			}
		},
		select: function(obj,onclick){
			
			if(_tinyPort&&!$('#mobiPopupWrapper').is('*')){
				fnb.forms.scrollUtil.scrollPosUpdate();
				fnb.controls.controller.setBodyHeight();
			}
			
			var dropDownWrapper = $(obj).closest('.dropdown-wrapper');
			if(dropDownWrapper.length==0) dropDownWrapper = $(obj).closest('.dropdownElementWrapper');
			var isAccount = dropDownWrapper.attr('data-value');
			var objValue = $(obj).attr('data-value');
			
			if(typeof(objValue) == 'undefined'){
				obj = $(obj).closest('li');
				objValue = $(obj).attr('data-value');
			}
			
			var dropdownInput = $(dropDownWrapper).find('.dropdown-hidden-input');
			if(dropdownInput.length==0) dropdownInput = $(dropDownWrapper).parent().find('.dropdown-hidden-input');

			$(dropdownInput).val(objValue);
			$(obj).parent().find('li').removeClass("selected-item");
			$(obj).addClass("selected-item");

			var selectedObjectContents = $(obj).html();
			var clonedSelection = $(selectedObjectContents).clone();
			
			clonedSelection.off();
			
			var destination;
			
			
			var downloadValue = $(dropDownWrapper).parent().find('.formElementLabel').find('input');
		
			if(downloadValue != undefined) downloadValue.val($(clonedSelection).find('.dropdown-item-row').html());
			
			destination =  $(dropDownWrapper).find('div[class^="dropdown-selection-white"]');
			$(destination).contents().remove();
			$(clonedSelection).appendTo($(destination));
			if(typeof(isAccount)!='undefined'&&$(obj).find('input').is('*')){
				var controllerUrl = $(obj).find('input').val();
				var targetDiv =$(destination).find('div[class^="ammountsHolder"]');
				if(typeof controllerUrl!='undefined'||objValue!='-1'){
					var loadObj = {url: controllerUrl, target: targetDiv,queue:false};
					fnb.controls.controller.eventsObject.raiseEvent('dropdownLoadAmounts', loadObj)
				}
			}
			if($(obj).parent().parent().hasClass('dropdown-expanded')){
				$(obj).parent().parent().removeClass("dropdown-expanded");
				$(dropDownWrapper).removeClass("dropdown-wrapper-expanded");
				this.animate($(obj).parent(),true);
			}

			if(_isMobile&&onclick) fnb.forms.dropdown.mobileTriggerOnclick(obj);
			
		},
		keypress: function(obj){
			var parentObject = $(obj).parent().parent().parent().parent();
			$(parentObject).parent().css({'margin-top':''});
			var inputValue = $(obj).val().toLowerCase();
			$(parentObject).find('li[class*="dropdown"]').show();
			if(inputValue.length>0){
				$(parentObject).find('li[class*="dropdown"]').hide();
				var filter = "> li div[class*='dropdown-h']:icontains('" + inputValue + "')";
				$(filter, parentObject).parent().parent().show();
			}
			if(_tinyPort==false){
				var newParentHeight;
				if(fnb.forms.dropdown.reverse){
					newParentHeight = $(parentObject).parent().outerHeight(true);
					var dropdownNewPos = $(parentObject).parent().position().top;
					var dropdownNewMar = (Math.abs(dropdownNewPos)-newParentHeight)+4;
					$(parentObject).parent().css({'margin-top':dropdownNewMar});
				}else if(fnb.forms.dropdown.dropUp==true){
					newParentHeight = $(parentObject).parent().find('ul[class*="dropdown-content"]').height();
				}
			}
		}, 
		close: function(){
			if($('.dropdown-content-wrapper').hasClass('dropdown-expanded')){
				if(_tinyPort&&!$('#mobiPopupWrapper').is('*')){
					fnb.forms.scrollUtil.scrollPosUpdate();
					fnb.controls.controller.setBodyHeight();
					
				}
				this.animate($('.dropdown-expanded').find('.dropdown-content'),true);
				$('.dropdown-content-wrapper').removeClass("dropdown-expanded");
				$('.pageGroup ').removeClass('superPadBottom');
			}
		},
		focusIn: function(event){
			$(event.target).parent().find('.dropdown-selection-white').addClass('dropdown-focus');
			$(event.target).addClass('dropdown-has-focus');
			fnb.forms.scrollUtil.tabScroll(event.target);
		},
		focusOut: function(event){
			$(event.target).parent().find('.dropdown-selection-white').removeClass('dropdown-focus');
			$(event.target).removeClass('dropdown-has-focus');
		},
		focusKeyup: function(event){
			if (event.keyCode == 40) { 
				if(!$(event.target).parent().find('.dropdown-content-wrapper').hasClass('dropdown-expanded')){
					var initiator = $(event.target).parent().find('.dropdown-initiator');
					var getAttrValue = function(attributeName) {
						var a = $(initiator).attr(attributeName);
						$(initiator).removeAttr(attributeName);
						return a;
					}
					var attrOverflow = getAttrValue('data-disabled-overflow');
					var attrSearchClass = getAttrValue('data-disabled-searchclass');
					var attrReverse = getAttrValue('data-disabled-reverse');
					var attrHeight = getAttrValue('data-disabled-height');
					fnb.forms.dropdown.expand($(initiator),attrOverflow,attrSearchClass,attrReverse,attrHeight);
				}else{
					if(!this.currentChild){
						this.currentChild = $(event.target).parent().find('.selected-item').next("li");
					}else{
						this.currentChild = this.currentChild.next("li")
					}
					if(this.currentChild.length == 0) $(event.target).parent().find("li").eq(0);
					$(event.target).parent().find("li").removeClass('selected-item');
					this.currentChild = this.currentChild.addClass('selected-item')
				}
			}else if(event.keyCode == 38 ){
				if($(event.target).parent().find('.dropdown-content-wrapper').hasClass('dropdown-expanded')){
					if(!this.currentChild){
						this.currentChild = $(event.target).parent().find('.selected-item').prev("li");
					}else{
						this.currentChild = this.currentChild.prev("li")
					}
					if(this.currentChild.length == 0) $(event.target).parent().find("li").last();
					$(event.target).parent().find("li").removeClass('selected-item');
					this.currentChild = this.currentChild.addClass('selected-item')
				}
			}if(event.keyCode == 13 ){
				if($(event.target).parent().find('.dropdown-content-wrapper').hasClass('dropdown-expanded')){
					this.currentChild.click();
				}
			}
		},		
		adjust: function(){
			$('body').find('.dropdown-expanded').css({width: $('body').find('.dropdown-expanded').parent().find('.dropdown-initiator').width()})
		},
		
		setValue: function(obj, visualVal, actualVal){
			var wrapper = obj.closest('.formElementWrapper');
			
			wrapper.find('.dropdown-initiator').find('.dropdown-item-row').text(visualVal);
			
			wrapper.find('.dropdown-hidden-input').attr('value', actualVal);
			
			wrapper.find('.dropdown-item').removeClass("selected-item");
			
			wrapper.find('.dropdown-item[data-value="' + actualVal + '"]').addClass('selected-item');
		},
		enable: function(root){
			//if not root
			if(!root.hasClass('dropdownElementWrapper')) root = root.closest('.formElementWrapper');
			
			//I dont agree that the "row" wrapper should be disabled (incl. label) as only the graphic is being disabled
			root.removeClass('dropdown-disabled');
			
			var wrapper = root.find('.dropdownElementWrapper');
			
			wrapper.removeClass('disabled');
		},
		disable: function(root){
			if(!root.hasClass('dropdownElementWrapper')) root = root.closest('.formElementWrapper');
			
			//I dont agree that the "row" wrapper should be disabled (incl. label) as only the graphic is being disabled
			root.addClass('dropdown-disabled');
			
			var wrapper = root.find('.dropdownElementWrapper');
			
			wrapper.addClass('disabled');
		}
	};
	namespace("fnb.forms.dropdown",dropdown);
});
///-------------------------------///
/// developer: Mike
/// File Upload
///-------------------------------///

$(function(){
	function fileUpload(){
	
	};
	fileUpload.prototype = {
		buttonClick: function(event) {
			var id  = $(event.target).attr('id').split('-')[0];	
			$('#'+id).trigger('click');
		},
		inputClick: function(event) {
		
			var id  = $(event.target).attr('id').split('-')[0];
			$('#'+id).trigger('click');

		},
		inputChanged: function(event){
		
			var id = $(event.target).attr('id')
			$('#'+ id +'-fake-input' ).val($(event.target).val())
			
		}
	}
	namespace("fnb.forms.fileUpload",fileUpload);		
});
///-------------------------------///
/// developer: Gerhard
/// reworked: Donovan - Needs to be rebuild
/// developer: Vaughan - 25/06/2013 (added button group wrapper disabled handling)
/// Radio Buttons
///-------------------------------///
$(function(){
	function radioButtons(){
		this._radioInput;
		this._radioInputParent;
		this._radioInputValue;
	};
	radioButtons.prototype = {
		radioAction: function(radioButton){
			this._radioInput = $(radioButton).find("input");
			this._radioInputValue = $(radioButton).attr('data-value');
    		this._radioInputParent = $(radioButton).parent().parent().children();
    		
    		if (!$(radioButton).parent().hasClass("disabled") && !$(radioButton).closest('.radioButtonsGroup').hasClass("disabled")){
    			for(i = 0; i < this._radioInputParent.length; i ++){
        			$(this._radioInputParent[i]).removeClass("switcherWrapperSelected");
        		}
        		 
        		$(radioButton).parent().addClass("switcherWrapperSelected");
        		$(this._radioInputParent).attr("value",this._radioInputValue);
        		$(this._radioInputParent).trigger("change");
    		}
    		
		},
		focusIn: function(event){
			$(event.target).parent().addClass('radio-has-focus');
			$(event.target).parent().find(".switcherWrapper").eq(0).addClass('radio-focus');
			fnb.forms.scrollUtil.tabScroll(event.target);
		},
		focusOut: function(event){
			$(event.target).parent().removeClass('radio-has-focus');
			$(event.target).parent().find(".switcherWrapper").removeClass('radio-focus');
		},
		focusKeyup: function(event){
			if (event.keyCode == 39) {
				var focusedChild = $(event.target).parent().find('.radio-focus');
				$(focusedChild).removeClass('radio-focus');
				var nextChild = $(focusedChild).next("div");
				if(nextChild.length==0) nextChild = $(event.target).parent().find(".switcherWrapper").eq(0);
				this.radioAction(nextChild.find(">:first-child"));
				nextChild.find(">:first-child").click();
				$(nextChild).addClass('radio-focus');
			}else if(event.keyCode == 37){
				var focusedChild = $(event.target).parent().find('.radio-focus');
				$(focusedChild).removeClass('radio-focus');
				var prevChild = $(focusedChild).prev("div");
				if(prevChild.length==0) prevChild = $(event.target).parent().find(".switcherWrapper").last();
				this.radioAction(prevChild.find(">:first-child"));
				prevChild.find(">:first-child").click();
				$(prevChild).addClass('radio-focus');
			}
		}
	};
	namespace("fnb.forms.radioButtons",radioButtons);
});

///-------------------------------///
/// developer: Leon
/// developer: Vaughan - 24/6/2013 (modified toggleAll to fire checkbox onclick function calls)
///
/// Rebuilt/reworked Checkboxes
///-------------------------------///

$(function(){
	function checkBox(){
		this.isToggling = false;
	};
	checkBox.prototype = {
		checkboxClick: function(me){

			if (!$(me).closest('.formElementWrapper').hasClass('pending')) {

				var maxAllowed = $(me).closest('.checkboxGroup').data('maxallowed');
				var checkedInputs = $(me).closest('.checkboxGroup').find("input.checkbox-input:checked").length;
				
				if (maxAllowed == "" || maxAllowed === undefined) {
					if ($(me).parent().hasClass('checked')) {
						$(me).parent().setCheckbox(false);
					} else {
						$(me).parent().setCheckbox(true);
					}
				} else {
					if ($(me).parent().hasClass('checked') && checkedInputs < maxAllowed) {
						$(me).parent().setCheckbox(false);
						$(me).closest('.checkboxGroup').find("input.checkbox-input").enableCheckbox();
					} else {
						$(me).parent().setCheckbox(true);
						
						if (checkedInputs >= maxAllowed) {
							$(me).closest('.checkboxGroup').find("input.checkbox-input:not(:checked)").disableCheckbox();
						} else {
							$(me).closest('.checkboxGroup').find("input.checkbox-input").enableCheckbox();
						}
					}			
				}
			}
		},
		checkboxTouch: function(me){

			if(!$(me.currentTarget).closest('.formElementWrapper').hasClass('pending')||$(me).closest('.formElementWrapper')==-1){
				
				if($(me.currentTarget).hasClass('checked') ){
					$(me.currentTarget).setCheckbox(false)	// UNCHECK
				}else{
					$(me.currentTarget).setCheckbox(true);	
				}// CHECK
				if($(me.currentTarget).attr('onclick')!=undefined&&_isMobile){
					$(me.currentTarget).trigger('onclick');
				}
			}
		},
		toggleAll:function(alink,event){ 
			if(typeof this.isToggling!='undefined'||this.isToggling==false){
				this.isToggling = true;
				if((alink instanceof jQuery) == false) alink = $(alink);
				
				var toggleSelected = alink.hasClass('checkall-check-link') ?  true : false;

				// on tables selectString = ".tableRowGroup${groupNumber} .col${columnNumber}"
				// which makes it possible to have ONE table with multiple select-all columns in multiple groups
				var selectString = alink.attr('data-check-group') + ' .checkbox-input:checkbox';

				$(selectString).each(function (ev,el) {
					// this check is for IE compatibility
					if (!($(el).parent().hasClass('disabled'))) {
						var checkbox = $(el).not(':disabled').not('[disabled="disabled"]');

						
						// checkbox has onclick method then call it
						if (checkbox.attr('onclick') != '')
							{checkbox.trigger('click');}
						
						checkbox.parent().setCheckbox(toggleSelected);
		
						
		
						alink.hide();
		
					}
				});
				
				toggleSelected ? alink.parent().children('.checkall-uncheck-link').css('display','inline-block') : alink.parent().children('.checkall-check-link').css('display','inline-block');
				this.isToggling = false;
			}

		},
		enableElement:function(elem){		// ENABLE
			if (typeof(elem) === 'object') elem.disableCheckbox()
			else $(elem).disableCheckbox();
		},
		disableElement:function(elem){		// DISABLE
			if (typeof(elem) === 'object') elem.enableCheckbox()
			else $(elem).enableCheckbox();
		}
	};
	namespace("fnb.forms.checkBox",checkBox);
});

///-------------------------------///
/// developer: Donovan
///				Vaughan (03/06/2013)
///
/// Tooltip
///-------------------------------///

$(function(){
	function tooltip(){
		this.displaying = {};
		this.currentActiveObject;
	};
	
	tooltip.prototype = {
	
		show : function(obj) {
			this.currentActiveObject = obj;
			var data = this.data(obj);
			var tooltip = data.tooltip;
			var icon = data.icon;
			var position = data.position;
			
			if ($(obj).data('active')) {
				
				this.state('hide', obj, tooltip, icon, position);
				
				this.displaying = {};
				
			} else {
				
				this.state('show', obj, tooltip, icon, position);
				
				//hide current visible tooltip
				if(!$.isEmptyObject(this.displaying)){
					
					var data = this.data(this.displaying);
					var tooltip = data.tooltip;
					var icon = data.icon;
					var position = data.position;
					
					this.state('hide', this.displaying, tooltip, icon, position);
					
				}
				
				this.displaying = obj;

			}

		},
		
		data: function(obj){
			var data = {};
			
			var parent = this;
			data.tooltip = obj.find('.tooltip');
			data.icon = data.tooltip.parent().find('.tooltipButton');
			var pageWidth = $(window).width();
			var offset = obj.offset();
			data.position = parent.determinedPosition(pageWidth, offset.left);
			
			return data;
		},
		state: function(state, obj, tooltip, icon, position){
			if (!$(tooltip).hasClass('static')){
				if(state == 'hide'){
					if (position == 'left') {
						tooltip.removeClass('leftScreen displayBlock');
					} else {
						tooltip.removeClass('rightScreen displayBlock');
					}
					icon.removeClass ("tooltipButtonCross");
									
					$(obj).data('active', false);
				} else {
					if (position == 'left') {
						tooltip.addClass('leftScreen displayBlock');
					} else {
						tooltip.addClass('rightScreen displayBlock');
					}
					
					icon.addClass ("tooltipButtonCross");
					
					$(obj).data('active', true);
				}
			}
		},
		determinedPosition : function(pageWidth, offset) {

			var positionOffset;

			if ((offset + 610) > pageWidth) {
				positionOffset = 'right'
			} else {
				positionOffset = 'left'
			}

			return positionOffset

		},
		hide : function() {
			if(this.currentActiveObject){
				var data = this.data(this.currentActiveObject);
				var tooltip = data.tooltip;
				var icon = data.icon;
				var position = data.position;
				
				if ($(this.currentActiveObject).data('active')) {
					
					this.state('hide', this.currentActiveObject, tooltip, icon, position);
					
					this.displaying = {};
					
				}
			}
		}
	};
	namespace("fnb.forms.tooltip",tooltip);
});

/// first developer: Mike Stott
///
/// Text Area
///-------------------------------///
$(function() {
	function textAreaHandler() {

		this._textArea;
		this._textAreaWrapper;
		this._maxChars;
		this._characterCount;
		this._scrollTop;

	}

	textAreaHandler.prototype = {
		
		init : function(target, maxChars) {
		
		},
		availChars : function(target, maxChars) {
			var parent = this;
			
			parent._textAreaWrapper = $(target)
			parent._textArea = $(target).find('textarea');
			parent._maxChars = maxChars
			parent._characterCount = 0;
			parent._characterCountDiv = parent._textAreaWrapper.find('.charCount')
		
			parent._characterCount = parent._textArea.val().length;

			if (parent._characterCount > parent._maxChars) {
			parent._characterCount = 0;	
			parent._textArea.val(parent._textArea.val().slice(0,parent._maxChars));
			parent._textArea.scrollTop(5000);
			}else {;
			
			parent._characterCountDiv.html(parent._maxChars - parent._characterCount);
			
			}
			
	
		}
	};

	namespace("fnb.forms.textAreaHandler",textAreaHandler);

});
///----------------------------///
/// developer: Leon
///
/// EXTENDED PAGE HEADING
///----------------------------///
$(function(){
	function extendedPageHeading(){
	};
	extendedPageHeading.prototype = {
		init: function(){
	
			var subTabsPresent =  ($('.subTabsMenu').length);
			if (subTabsPresent) {
				$("#extendedPageHeader").addClass('subTabsHeader').appendTo($('#subTabsPageHeader'));
			}
		}
	};
	namespace("fnb.forms.extendedPageHeading",extendedPageHeading);
});
///-------------------------------///
/// developer: Donovan
///
/// DATE PICKER
///-------------------------------///
var _datePicker=function(){
	this.selectedDatePicker;
	this.currentDatePicker;
	this.datePickerParent;
	this.datePickerExpanded = false;
	this.datePickerEziExpanded = false;
	this.datePickerYear;
	this.datePickerMonthName;
	this.datePickerMonth;
	this.datePickerDay;
	this.datePickerWeekdaySelect;
	this.datePickerWeekday;
	this.datePickerSmallPort;
	this.datePickerSelectedDate;
	this.disablePast;
	this.currentDatePickerObj;
	this.currentDatePickerTarget;
	this.checkPublicHolidays;
	this.noticeDays;
	this.alreadyCheckedPublicHolidays=false;
	this.isEziDate;
	this.scrollPos;
	this.previousDate;
	this.past;
	this.future;
	return{
		init:function(obj,selectedDate,noticeDays){
			this.noticeDays = (noticeDays!='') ? parseInt(noticeDays) : 0;
			this.disablePast = (noticeDays>0) ? true : false;
			this.checkPublicHolidays=undefined;
			this.alreadyCheckedPublicHolidays=false;
			this.previousDate=undefined;
			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			this.datePickerWeekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			var hours = '';
			var minutes = '';
			var second = '';
			obj = $('#'+obj);
			if(selectedDate){
				var dateArray = selectedDate.split("-");
				if(dateArray.length>1){
					this.datePickerYear  = dateArray[0];
					this.datePickerMonth = dateArray[1];
					this.datePickerDay =  dateArray[2];
					hours = '';
					minutes = '';
					second = '';
				}else if(selectedDate.split(" ").length==4){
					dateArray = selectedDate.split(" ");
					this.datePickerYear  = dateArray[3];
					var monthIndex = $.inArray(dateArray[2],  months)
					this.datePickerMonth = (monthIndex+1);
					this.datePickerDay =  dateArray[1];
					hours = '';
					minutes = '';
					second = '';
				}else if(selectedDate.match(/^[0-9]{4}[0-9]{2}[0-9]{2}$/)){
					this.datePickerYear  = selectedDate.substring(0,4);
					this.datePickerMonth = selectedDate.substring(4,6);
					this.datePickerDay =  selectedDate.substring(6,8);
					hours = '';
					minutes = '';
					second = '';
				}
			}else{
				var now = new Date();
				this.datePickerYear = now.getFullYear();
				this.datePickerMonth = now.getMonth()+1;
				this.datePickerDay = now.getDate();
				hours = now.getHours();
				minutes = now.getMinutes();
				second = now.getDate();
			}

			var currentDate = this.datePickerYear  + '/' +
				((''+this.datePickerMonth).length<2 ? '0' : '') + this.datePickerMonth + '/' +
				((''+this.datePickerDay).length<2 ? '0' : '') + this.datePickerDay + 'T' +
				((''+hours).length<2 ? '0' : '') + hours + ':' +
				((''+minutes).length<2 ? '0' : '') + minutes + ':' +
				'00Z';

			if((''+this.datePickerDay).length<2) this.datePickerDay = '0'+this.datePickerDay;
			if((''+this.datePickerMonth).length<2) this.datePickerMonth = '0'+this.datePickerMonth;
			
			this.datePickerSelectedDate = this.datePickerYear + '-' +  this.datePickerMonth + '-' + this.datePickerDay;

			$(obj).find('.formsDatePickerValue').val(this.datePickerSelectedDate);

			var prettyDate = this.createPrettyDate(currentDate);
			var prettyDay = new Date(this.datePickerSelectedDate);
			
			this.datePickerWeekdaySelect = this.datePickerWeekday[prettyDay.getDay()];
			
			if(prettyDate!='date'){
				$(obj).find('.monthName').html(prettyDate);
				$(obj).find('.datePickerDay').html('');
				$(obj).find('.datePickerYear').html('');
				$(obj).find('.datePickerWeekday').html('');
			}else{
				$(obj).find('.monthName').html(months[parseInt(this.datePickerMonth)-1]);
				$(obj).find('.datePickerDay').html(this.datePickerDay);
				$(obj).find('.datePickerYear').html(this.datePickerYear);
				$(obj).find('.datePickerWeekday').html(this.datePickerWeekdaySelect);
			}
		},
		show:function(obj){

			fnb.forms.scrollUtil.setScrollPos();
			
			var parmWrapper = $(obj).closest('.datePicker');
			
			this.past = 101;
			this.future =3;
			
			if(typeof parmWrapper.attr('data-past')!='undefined') this.past = parmWrapper.attr('data-past');
			if(typeof parmWrapper.attr('data-future')!='undefined') this.future = parmWrapper.attr('data-future');
						
			this.isEziDate = $(obj).closest(_eziWrapper).is('*');
			this.isMobiDate = $(obj).closest('#mobiPopupWrapper').is('*');
			
			if(this.isEziDate){
				_datePicker.ezishow(obj,"eziPageContent");
			}else{
				this.selectedDatePicker = this;
				this.selectedDatePicker.currentDatePickerObj = $(obj).closest('.datePicker');
				var selectedDate = $(obj).closest('.datePicker').find('input').val();
				
				if(selectedDate){
					var dateArray = selectedDate.split("-");
					if(dateArray.length>1){
						this.selectedDatePicker.datePickerYear  = dateArray[0];
						this.selectedDatePicker.datePickerMonth = dateArray[1];
						this.selectedDatePicker.datePickerDay =  dateArray[2];
						hours = '';
						minutes = '';
						second = '';
					}else if(selectedDate.split(" ").length==4){
						dateArray = selectedDate.split(" ");
						this.selectedDatePicker.datePickerYear  = dateArray[3];
						var monthIndex = $.inArray(dateArray[2],  months)
						this.selectedDatePicker.datePickerMonth = (monthIndex+1);
						this.selectedDatePicker.datePickerDay =  dateArray[1];
						hours = '';
						minutes = '';
						second = '';
					}else if(selectedDate.match(/^[0-9]{4}[0-9]{2}[0-9]{2}$/)){
						this.selectedDatePicker.datePickerYear  = selectedDate.substring(0,4);
						this.selectedDatePicker.datePickerMonth = selectedDate.substring(4,6);
						this.selectedDatePicker.datePickerDay =  selectedDate.substring(6,8);
						hours = '';
						minutes = '';
						second = '';
					}
				}else{
					
					now = new Date();
					this.selectedDatePicker.datePickerYear = now.getFullYear();
					this.selectedDatePicker.datePickerMonth = now.getMonth();
					this.selectedDatePicker.datePickerDay = now.getDate();
					hours = now.getHours();
					minutes = now.getMinutes();
					second = now.getDate();
				}
				
				if((''+this.selectedDatePicker.datePickerDay).length<2) this.selectedDatePicker.datePickerDay = '0'+this.selectedDatePicker.datePickerDay;
				if((''+this.selectedDatePicker.datePickerMonth).length<2) this.selectedDatePicker.datePickerMonth = '0'+this.selectedDatePicker.datePickerMonth;
				
				this.selectedDatePicker.datePickerSelectedDate = this.selectedDatePicker.datePickerYear + '-' +  this.selectedDatePicker.datePickerMonth + '-' +this.selectedDatePicker.datePickerDay;
				
				this.selectedDatePicker.currentDatePickerTarget = 'dropArrow';
				this.selectedDatePicker.datePickerParent= $(obj).closest('.datepickerWrapper');
				this.datePickerEziExpanded = false;
				this.datePickerExpanded = true;
				this.datePickerSmallPort = false;
				
				var calOffset = 1;
				var calCount = 3;
				if($(window).width()<490){
					calCount = 1;
					this.datePickerSmallPort = true;
				}
				
				this.currentDatePicker = new Calendar({
					element:this.selectedDatePicker.currentDatePickerTarget,
					weekNumbers: false,
					startDay: 0,
					year: this.selectedDatePicker.datePickerYear,
					month: (this.selectedDatePicker.datePickerMonth)-calOffset,
					months: calCount,
					past:this.past ,
					future:this.future,
					noticeDays:this.noticeDays,
					disablePast: this.disablePast,
					selectedDate:this.selectedDatePicker.datePickerSelectedDate,
					onSelect: function (element, selectedDate, date, cell) {	
						_datePicker.selectedDatePicker.datePickerYear = _datePicker.currentDatePicker.selectedDate.getFullYear();
						_datePicker.selectedDatePicker.datePickerMonth = _datePicker.currentDatePicker.selectedDate.getMonth()+1;
						_datePicker.selectedDatePicker.datePickerMonthName = _datePicker.currentDatePicker.opts.monthNames[(_datePicker.selectedDatePicker.datePickerMonth-1)]
						_datePicker.selectedDatePicker.datePickerDay = _datePicker.currentDatePicker.selectedDate.getDate();
						_datePicker.selectedDatePicker.datePickerWeekdaySelect = _datePicker.datePickerWeekday[_datePicker.currentDatePicker.selectedDate.getDay()];
						_datePicker.hide(true,true);
					}
				});
				
				$('div[id^="bcal-container"]').addClass('opacity100');
				
				//New frame hack
				fnb.hyperion.controller.clipOverflow(true);

				//Set datepicker to visible
				fnb.hyperion.controller.datePickerElement.show();

				this.adjust($(window).width());
			}
			
		},
		hide:function(selectValue,valid){
			var parent = this;
			if($('div[id^="bcal-container"]').is('*')){
				if(valid==true&&this.checkPublicHolidays!=false){
					this.selectedDatePicker.datePickerSelectedDate =this.selectedDatePicker.datePickerYear + '-' +  this.selectedDatePicker.datePickerMonth + '-' + this.selectedDatePicker.datePickerDay;
					fnb.functions.datePickerVerify.verifyDateValid(this.selectedDatePicker.datePickerSelectedDate);
					var day = this.selectedDatePicker.datePickerDay;
					var month = this.selectedDatePicker.datePickerMonth;
					if((''+this.selectedDatePicker.datePickerDay).length<2) day = '0'+this.selectedDatePicker.datePickerDay;
					if((''+this.selectedDatePicker.datePickerMonth).length<2) month = '0'+this.selectedDatePicker.datePickerMonth;
					var currentDate = this.selectedDatePicker.datePickerYear + '-' +  month + '-' + day;
					if (fnb.functions.datePickerVerify.dateVerified==true&&fnb.functions.datePickerVerify.validDate==false&&this.previousDate != currentDate) {
						if (this.previousDate!='undefined') this.alreadyCheckedPublicHolidays = false;
						this.previousDate = currentDate;
					}
				}
				if(fnb.functions.datePickerVerify.dateVerified==true&&fnb.functions.datePickerVerify.validDate==true||valid==false||this.alreadyCheckedPublicHolidays==true){
					this.datePickerExpanded = false;
					this.datePickerEziExpanded = false;
					function remove(){
						$('div[id^="bcal-container"]').remove();
					}
					
					TweenMax.to($('div[id^="bcal-container"]'), 0, {css:{opacity:0},ease:Circ.easeOut,onComplete:remove});

					//New frame hack
					//New frame hack v 0.2
					if(!fnb.hyperion.utils.eziPanel.active){
						fnb.hyperion.controller.clipOverflow(false);
					}
					//Set datepicker to visible
					fnb.hyperion.controller.datePickerElement.hide();
				
					if(selectValue==true){
 					
						var currentDate =this.selectedDatePicker.datePickerYear + '/' +
						((''+this.selectedDatePicker.datePickerMonth ).length<2 ? '0' : '') + this.selectedDatePicker.datePickerMonth  + '/' +
						((''+this.selectedDatePicker.datePickerDay).length<2 ? '0' : '') + this.selectedDatePicker.datePickerDay + 'T' +
						((''+'00').length<2 ? '0' : '') + '00' + ':' +
						((''+'00').length<2 ? '0' : '') + '00' + ':' +
						'00Z';

						var tempDatePickerMonth =  this.selectedDatePicker.datePickerMonth;

						if((''+this.selectedDatePicker.datePickerDay).length<2) this.selectedDatePicker.datePickerDay = '0'+this.selectedDatePicker.datePickerDay
						if((''+this.selectedDatePicker.datePickerMonth).length<2) this.selectedDatePicker.datePickerMonth = '0'+this.selectedDatePicker.datePickerMonth
						if((''+tempDatePickerMonth).length<2) tempDatePickerMonth = '0'+tempDatePickerMonth

						this.selectedDatePicker.datePickerSelectedDate = this.selectedDatePicker.datePickerYear + '-' +  this.selectedDatePicker.datePickerMonth + '-' + this.selectedDatePicker.datePickerDay;
						var prettyDate = this.createPrettyDate(currentDate);

						$(this.selectedDatePicker.currentDatePickerObj).closest('div[id*="_datePicker"]').find('.formsDatePickerValue').val(this.selectedDatePicker.datePickerYear + '-' +  tempDatePickerMonth + '-' + this.selectedDatePicker.datePickerDay);

						if(prettyDate!='date'){
							this.selectedDatePicker.datePickerParent.find('.monthName').text(prettyDate);
							this.selectedDatePicker.datePickerParent.find('.datePickerDay').text('');
							this.selectedDatePicker.datePickerParent.find('.datePickerYear').text('');
							this.selectedDatePicker.datePickerParent.find('.datePickerWeekday').text('');
						}else if(prettyDate=='undefined'||prettyDate=='date'){
							this.selectedDatePicker.datePickerParent.find('.monthName').text(this.selectedDatePicker.datePickerMonthName);
							this.selectedDatePicker.datePickerParent.find('.datePickerDay').text(this.selectedDatePicker.datePickerDay);
							this.selectedDatePicker.datePickerParent.find('.datePickerYear').text(this.selectedDatePicker.datePickerYear);
							this.selectedDatePicker.datePickerParent.find('.datePickerWeekday').text(this.selectedDatePicker.datePickerWeekdaySelect);
						}
					}
					if(!this.isEziDate&&!this.isMobiDate){
						fnb.controls.controller.eventsObject.raiseEvent('closeDatePicker', this.selectedDatePicker);
					}else{
						$(_eziWrapper).find('#eziPannelButtonsWrapper').show();
						$(_eziWrapper).find('.eziPage').css({
							'margin': '0 0 75px 0'
						}).show();
						$(_eziWrapper).css({
							'height':'',
							'cursor': ''
						})
					}
				}else{
					this.notifyHolidayShow();
					this.alreadyCheckedPublicHolidays=true;
				}
			}
			fnb.forms.scrollUtil.scrollPosUpdate();
		},
		checkFooterDatePicker:function(popupUrl, submitForm, triggerButton, checkHoliday){
			var currentDate = $('#footerButtonGroup').find('.formsDatePickerValue').val();
			if(this.checkPublicHolidays!=false&&checkHoliday){
				if (fnb.functions.datePickerVerify.validDate==false&&this.previousDate != currentDate) {
					if (this.previousDate!='undefined') this.alreadyCheckedPublicHolidays = false;
					this.previousDate = currentDate; 
				}
			}
			if (checkHoliday&&fnb.functions.datePickerVerify.validDate==false&&!this.alreadyCheckedPublicHolidays) {
				fnb.controls.controller.eventsObject.raiseEvent('popupLoadUrl',popupUrl);
				$('#popupWrapper').addClass('trendOverlay');
				this.notifyHolidayShow();
			}
			else {
				fnb.functions.submitFormToWorkspace.submit(submitForm,'',triggerButton, {alternateUrl: ''});
			}
		},
		setAlreadyCheckedPublicHolidays:function(checkHoliday){
			this.alreadyCheckedPublicHolidays = checkHoliday;
		},
		ezishow:function(obj,target){
			this.selectedDatePicker = this;
			this.selectedDatePicker.currentDatePickerObj = obj;
			this.selectedDatePicker.currentDatePickerTarget =target;
      
			var selectedDate = $(obj).closest('.datePicker').find('input').val();
			if(selectedDate){
				var dateArray = selectedDate.split("-");
				if(dateArray.length>1){
					this.selectedDatePicker.datePickerYear  = dateArray[0];
					this.selectedDatePicker.datePickerMonth = dateArray[1];
					this.selectedDatePicker.datePickerDay =  dateArray[2];
					hours = '';
					minutes = '';
					second = '';
				}else if(selectedDate.split(" ").length==4){
					dateArray = selectedDate.split(" ");
					this.selectedDatePicker.datePickerYear  = dateArray[3];
					var monthIndex = $.inArray(dateArray[2],  months)
					this.selectedDatePicker.datePickerMonth = (monthIndex+1);
					this.selectedDatePicker.datePickerDay =  dateArray[1];
					hours = '';
					minutes = '';
					second = '';
				}else if(selectedDate.match(/^[0-9]{4}[0-9]{2}[0-9]{2}$/)){
					this.selectedDatePicker.datePickerYear  = selectedDate.substring(0,4);
					this.selectedDatePicker.datePickerMonth = selectedDate.substring(4,6);
					this.selectedDatePicker.datePickerDay =  selectedDate.substring(6,8);
					hours = '';
					minutes = '';
					second = '';
				}
			}else{
				now = new Date();
				this.selectedDatePicker.datePickerYear = now.getFullYear();
				this.selectedDatePicker.datePickerMonth = now.getMonth()+1;
				this.selectedDatePicker.datePickerDay = now.getDate();
				hours = now.getHours();
				minutes = now.getMinutes();
				second = now.getDate();
			}
			if((''+this.selectedDatePicker.datePickerDay).length<2) this.selectedDatePicker.datePickerDay = '0'+this.selectedDatePicker.datePickerDay;
			if((''+this.selectedDatePicker.datePickerMonth).length<2) this.selectedDatePicker.datePickerMonth = '0'+this.selectedDatePicker.datePickerMonth;
			
			this.selectedDatePicker.datePickerSelectedDate = this.selectedDatePicker.datePickerYear + '-' +  this.selectedDatePicker.datePickerMonth+ '-' +this.selectedDatePicker.datePickerDay;

			this.datePickerEziExpanded = true;
			this.datePickerExpanded = false;
			this.selectedDatePicker.datePickerParent= $(obj).closest('.datepickerWrapper');

			this.datePickerSmallPort = true;

			this.currentDatePicker = new Calendar({
				element: this.selectedDatePicker.currentDatePickerTarget,
				inline: true,
				weekNumbers: false,
				startDay: 0,
				year: this.selectedDatePicker.datePickerYear,
				month: (this.selectedDatePicker.datePickerMonth)-1,
				months: 3,
				selectedDate:this.selectedDatePicker.datePickerSelectedDate,
				onSelect: function (element, selectedDate, date, cell) {
					_datePicker.selectedDatePicker.datePickerYear = _datePicker.currentDatePicker.selectedDate.getFullYear();
					_datePicker.selectedDatePicker.datePickerMonth = _datePicker.currentDatePicker.selectedDate.getMonth()+1;
					_datePicker.selectedDatePicker.datePickerMonthName = _datePicker.currentDatePicker.opts.monthNames[(_datePicker.selectedDatePicker.datePickerMonth-1)]
					_datePicker.selectedDatePicker.datePickerDay = _datePicker.currentDatePicker.selectedDate.getDate();
					_datePicker.selectedDatePicker.datePickerWeekdaySelect = _datePicker.datePickerWeekday[_datePicker.currentDatePicker.selectedDate.getDay()];
					_datePicker.hide(true,true);
				}
			});
			/* $(_eziWrapper).css({
				'height':$(window).height()-205
			}) */
			$(_eziWrapper).find('.eziPage').css({
				'display':'none'
			})
			$(_eziWrapper).find('#eziPannelButtonsWrapper').css({
				'display':'none'
			})

			_datePicker.applyEziStyles();
			
			$(_eziWrapper).find('div[id^="bcal-container"]').find('div[id^="inner-bcal-container"]').verticallyAlign();
			$(_eziWrapper).find('div[id^="bcal-container"]').find('div[id^="backgound-bcal-container"]').verticallyAlign();
		
			$(_eziWrapper).find('.bcal-nav-left').on('click touchend', function(e) {
				$(_eziWrapper).find('.ezi-inner-bcal-container').addClass('displayNone');
				setTimeout(function(){_datePicker.applyEziStyles();
					$(_eziWrapper).find('.ezi-inner-bcal-container').removeClass('displayNone');	
				},50)
			});
			$(_eziWrapper).find('.bcal-nav-right').on('click touchend', function(e) {
				$(_eziWrapper).find('.ezi-inner-bcal-container').addClass('displayNone');
				setTimeout(function(){_datePicker.applyEziStyles();
				$(_eziWrapper).find('.ezi-inner-bcal-container').removeClass('displayNone');	
				},50)
			});
			
			$('div[id^="bcal-container"]').addClass('opacity100')

		},
		applyEziStyles:function(){
			$('div[id^="bcal-container"]').addClass('ezi-bcal-container');
			$('div[id^="inner-bcal-container"]').addClass('ezi-inner-bcal-container');
			$('div[class^="bcal-yearDiv"]').addClass('ezi-bcal-yearDiv');
			$('th[class^="bcal-nav-left"]').addClass('ezi-bcal-nav-left');
			$('.bcal-table').addClass('ezi-bcal-table');
			$('th[class^="bcal-nav-right"]').addClass('ezi-bcal-nav-right');
			$('th[class^="bcal-month"]').addClass('ezi-bcal-month');
			$('th[class^="bcal-monthName"]').addClass('ezi-bcal-monthName');
			$('div[id^="backgound-bcal-container"]').addClass('ezi-backgound-bcal-container');
		
			$(_eziWrapper).find('.bcal-nav-left').on('click touchend', function(e) {
				$(_eziWrapper).find('.ezi-inner-bcal-container').addClass('displayNone');
				setTimeout(function(){_datePicker.applyEziStyles();
					$(_eziWrapper).find('.ezi-inner-bcal-container').removeClass('displayNone');	
				},50)
			});
			$(_eziWrapper).find('.bcal-nav-right').on('click touchend', function(e) {
				$(_eziWrapper).find('.ezi-inner-bcal-container').addClass('displayNone');
				setTimeout(function(){_datePicker.applyEziStyles();
				$(_eziWrapper).find('.ezi-inner-bcal-container').removeClass('displayNone');	
				},50)
			});
		},
		createPrettyDate:function(time){
			var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);

			if ( isNaN(day_diff))
				return;
				//IF MINUTES ETC ARE REQUIRED
/* 			return day_diff < -1 && "date" ||
				day_diff == -1 && "Tommorow" ||
				day_diff == 0 && (
				diff < 60 && "Today" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
				day_diff == 1 && "Yesterday" ||
				day_diff < 7 && day_diff + " days ago" ||
				day_diff < 31 && "date"||
				day_diff > 31 && "date"; */
			return day_diff < -1 && "date" ||
				day_diff == -1 && "Tomorrow" ||
				day_diff == 0 && (
				diff < 60 && "Today" ||
				diff < 120 && "Today" ||
				diff < 3600 && "Today"  ||
				diff < 7200 && "Today"  ||
				diff < 86400 && "Today" )||
				day_diff == 1 && "Yesterday" ||
				day_diff > 1 && "date"
				;
		},
		notifyHolidayShow:function(){
			$('div[id^="inner-bcal-container"]').addClass('hideElement');
			$('#calendarCancelButton').addClass('hideElement');
			$('#calendarDoneButton').addClass('hideElement');
			$('#yearPicker_calendar').addClass('hideElement');
			$('#confirmHolidayButton').removeClass('hideElement');
			$('#cancelHolidayButton').removeClass('hideElement');
			$('#confirmHolidayTextWrapper').removeClass('hideElement');
		},
		notifyHolidayHide:function(){
			$('div[id^="inner-bcal-container"]').removeClass('hideElement');
			$('#calendarCancelButton').removeClass('hideElement');
			$('#calendarDoneButton').removeClass('hideElement');
			$('#yearPicker_calendar').removeClass('hideElement');
			$('#confirmHolidayButton').addClass('hideElement');
			$('#cancelHolidayButton').addClass('hideElement');
			$('#confirmHolidayTextWrapper').addClass('hideElement');
		},
		updateYear:function(element){
			var newDateYear = $(element).attr('data-value');
			this.currentDatePicker.detach();
			var displayMonths = 3
			var displayInline = false;
			$('div[id^="bcal-container"]').remove();
			
			if(this.datePickerSmallPort==true){
				displayMonths = 3; 
				displayInline = true;
			}

			this.currentDatePicker = new Calendar({
				element: this.currentDatePickerTarget,
				inline: displayInline,
				weekNumbers: false,
				startDay: 0,
				year: newDateYear,
				month: (_datePicker.datePickerMonth)-1,
				months: displayMonths,
				past:this.past ,
				future:this.future,
				selectedDate:_datePicker.datePickerSelectedDate,
				onSelect: function (element, selectedDate, date, cell) {			
					_datePicker.datePickerYear = newDateYear;
					_datePicker.datePickerMonth = _datePicker.currentDatePicker.selectedDate.getMonth()+1;
					_datePicker.datePickerMonthName = _datePicker.currentDatePicker.opts.monthNamesFull[(_datePicker.datePickerMonth-1)]
					_datePicker.datePickerDay = _datePicker.currentDatePicker.selectedDate.getDate();
					_datePicker.datePickerWeekdaySelect = _datePicker.datePickerWeekday[_datePicker.currentDatePicker.selectedDate.getDay()];
					_datePicker.hide(true,true);
				}
			});
			
			if(this.datePickerSmallPort==true){
				$('div[id^="bcal-container"]').css({opacity:1})

				$('#yearPicker_calendar').find('li').each(function (index, item) {
						if($(item).attr('data-value')==newDateYear) fnb.forms.dropdown.select($(item),false,false);
				});
				
				/*$(_eziWrapper).css({
					'height':$(window).height()-205
				})*/
				$(_eziWrapper).find('.eziPage').css({
					'display':'none'
				})
				$(_eziWrapper).find('#eziPannelButtonsWrapper').css({
					'display':'none'
				})

				_datePicker.applyEziStyles();

				$(_eziWrapper).find('div[id^="bcal-container"]').find('div[id^="inner-bcal-container"]').verticallyAlign();
				$(_eziWrapper).find('div[id^="bcal-container"]').find('div[id^="backgound-bcal-container"]').verticallyAlign();
				
				/*$(_eziWrapper).find('.bcal-nav-left').click(function(e) {
					_datePicker.applyEziStyles();
				});
				$(_eziWrapper).find('.bcal-nav-right').click(function(e) {
					_datePicker.applyEziStyles();
				});*/
				
				$(_eziWrapper).find('.bcal-nav-left').on('click touchend', function(e) {
					_datePicker.applyEziStyles();
				});
				$(_eziWrapper).find('.bcal-nav-right').on('click touchend', function(e) {
					_datePicker.applyEziStyles();
				});
			}
			$('div[id^="bcal-container"]').css({opacity:1})

		},
		adjust: function(windowWidth){
			if(this.datePickerExpanded == true){
				if(windowWidth<805){
					if(this.datePickerSmallPort==false){
						this.currentDatePicker.detach();
						$('div[id^="bcal-container"]').remove();
						
						this.currentDatePicker = new Calendar({
							element: 'dropArrow',
							weekNumbers: false,
							startDay: 0,
							year: _datePicker.datePickerYear,
							month: _datePicker.datePickerMonth,
							months: 1,
							selectedDate:_datePicker.datePickerSelectedDate,
							onSelect: function (element, selectedDate, date, cell) {			
								_datePicker.datePickerYear = _datePicker.currentDatePicker.selectedDate.getFullYear();
								_datePicker.datePickerMonth = _datePicker.currentDatePicker.selectedDate.getMonth()+1;
								_datePicker.datePickerMonthName = _datePicker.currentDatePicker.opts.monthNamesFull[(_datePicker.datePickerMonth-1)]
								_datePicker.datePickerDay = _datePicker.currentDatePicker.selectedDate.getDate();
								_datePicker.datePickerWeekdaySelect = _datePicker.datePickerWeekday[_datePicker.currentDatePicker.selectedDate.getDay()];
								_datePicker.hide(true,true);
							}
						});
						
						$('div[id^="bcal-container"]').css({opacity:1});
					}
/* 					$('div[id^="bcal-container"]').css({
						'height':$(window).height()-205,
						'top': _topOffset+'px',
						'margin-top':'auto'
					}) */
					this.datePickerSmallPort = true;
				}else{
					if(this.datePickerSmallPort==true){
						this.currentDatePicker.detach();
						$('div[id^="bcal-container"]').remove();
						
						this.currentDatePicker = new Calendar({
							element: 'dropArrow',
							weekNumbers: false,
							startDay: 0,
							year: _datePicker.datePickerYear,
							month: _datePicker.datePickerMonth,
							months: 3,
							selectedDate:_datePicker.datePickerSelectedDate,
							onSelect: function (element, selectedDate, date, cell) {			
								_datePicker.datePickerYear = _datePicker.currentDatePicker.selectedDate.getFullYear();
								_datePicker.datePickerMonth = _datePicker.currentDatePicker.selectedDate.getMonth()+1;
								_datePicker.datePickerMonthName = _datePicker.currentDatePicker.opts.monthNamesFull[(_datePicker.datePickerMonth-1)]
								_datePicker.datePickerDay = _datePicker.currentDatePicker.selectedDate.getDate();
								_datePicker.datePickerWeekdaySelect = _datePicker.datePickerWeekday[_datePicker.currentDatePicker.selectedDate.getDay()];
								_datePicker.hide(true,true);
							}
						});
						
						$('div[id^="bcal-container"]').css({opacity:1})
					}
					this.datePickerSmallPort = false;
				}
			}else if(this.datePickerEziExpanded==true){
				/* $(_eziWrapper).css({
					'height':$(window).height()-205
				}) */
			}
		},
		checkSelect:function(event){
			if(fnb.utils.mobile.utils.mobileMoved == false||typeof fnb.utils.mobile.utils.mobileMoved=='undefined'){
				
				event.preventDefault();
				
				event.stopPropagation();
				
				event.stopImmediatePropagation();
				
				fnb.controls.controller.clearActiveElements();
				
				fnb.controls.controller.eventsObject.raiseEvent('openDatePicker', event.currentTarget);

				fnb.controls.page.setActiveObject(event.currentTarget);

			}
		}
	};
}();

$(function() {
	function tableUtils() {
		
		this.groupOpen = false;
		this.container = "#tableActionButtons"
		this.searchOpen = false;
	};
	tableUtils.prototype = {
			
		init : function(target) {
		
			var parent = this;
			parent.groupOpen = false;
			parent.searchOpen = false;
			
			if(_isMobile){
				$('body').on('touchend', '.tableActionButtonContent', function(event){
					var target = event.target;
					event.stopImmediatePropagation();
					event.preventDefault();
					$(target).trigger('click');
				});
			};
		},	
		
		switcherClick : function(event) {

			if(fnb.utils.mobile.utils.mobileMoved == false||typeof fnb.utils.mobile.utils.mobileMoved=='undefined'){
				var parent = this;
				var target = $(event.target);
					
				if(target.attr('data-postcallback')){
					
					var container = target.parent();
					
					$(container.find('.tableSwitcherButton')).each(function(){
						if($(this).hasClass('tableSwitcherSelected')){
							$(this).removeClass('tableSwitcherSelected');
						}
					});
					target.addClass('tableSwitcherSelected');
					
					var functionRef = target.data('postcallback');
					var tempFunc = new Function(functionRef);
					
					tempFunc();
				
									
				}else{
					
					parent.switcherNavigate(target);
				}
			}
			
		},
		switcherNavigate: function(target) {
			
			var url = target.data('url');
			fnb.controls.controller.eventsObject.raiseEvent('loadResultScreen',url)	
			
		},
		actionButtonClick : function(target) {
			// type 0: action group
			// type 1: search button
			// type 2: download
			// type 3: print
			var parent = this;
			var type = target.data('type');
			switch(type){
				case 0:
					if(this.groupOpen){
						var container = $(this.container);
							parent.actionGroupClose(container);
					}else{
						parent.actionGroupOpen(target);	
					}
				break;
				case 1:
				if(parent.groupOpen) parent.actionGroupClose(target);
				if (parent.searchOpen == false) {
					parent.actionSearch(target);
				} else {
					parent.actionSearchClose(target);
				};
				break;
				case 2:
					if(parent.groupOpen) parent.actionGroupClose(target);
					parent.actionDownload(target);
				break;
				case 3:
					if(parent.groupOpen) parent.actionGroupClose(target);	
					parent.actionPrint(target);
				break;
				case 4:
					parent.actionSearchClose(target);
				break;
				default:
				break;
				};		

		},
		actionGroupCloseGroupOnClick :function(){
			var parent = this;
			parent.groupOpen = true;
		},
		actionGroupOpen : function(target) {
			var parent = this;
			
			var groupContainer = $(target).find('.tableActionButtonContent')

			if (parent.groupOpen) {

				parent.actionGroupClose(target)
			
			}else if(parent.groupOpen == false) {

				groupContainer.addClass('buttonGroupExpanded')
				parent.groupOpen = true;

			}
			if(target.attr('onclick')!=undefined&&_isMobile){
				target.trigger('onclick');
			}
		},
		actionGroupClose : function(target){
			
			var parent = this;
			parent.groupOpen = false;
			var groupContainer = $(target).find('.tableActionButtonContent.buttonGroupExpanded');
			groupContainer.removeClass('buttonGroupExpanded')	
			
		},
		actionDownload : function(target) {
			if(target.attr('onclick')!=undefined&&_isMobile){
				target.trigger('onclick');
			}
		},
		actionPrint : function(target) {
			if(target.attr('onclick')!=undefined&&_isMobile){
				target.trigger('onclick');
			}
		},
		actionSearch : function(target) {
			var parent = this;
			var container = $(parent.container);
			var actionButtons = container.find('.tableActionButton');
			var label = container.find('.headerControlLabel'); 
			var searchBar = container.find('.tableSearchBarWrapper'); 
			var searchInput = searchBar.find('input')
			var searchBarClose = container.find('.searchClose'); 
			var searchIcon = container.find('.searchButton');  
						
			label.addClass('displayNone');
			searchBar.addClass('displayBlock');
			searchBarClose.addClass('displayBlock');
			searchIcon.addClass('displayNone');
			
			searchInput.focus();
		
			parent.searchOpen = true;
		
		},
		actionSearchClose : function(target) {
			
			var parent = this;
			var container = $(parent.container);
			var actionButtons = container.find('.tableActionButton');
			var label = container.find('.headerControlLabel'); 
			var searchBar = container.find('.tableSearchBarWrapper');
			var searchInput = searchBar.find('input')
			var searchBarClose = container.find('.searchClose'); 
			var searchIcon = container.find('.searchButton');  
			
			searchInput.focus();
			searchInput.val(undefined);
			searchInput.trigger('keyup');
			
			label.removeClass('displayNone');
			searchBar.removeClass('displayBlock');
			searchBarClose.removeClass('displayBlock');
			searchIcon.removeClass('displayNone');
			
			
			$(actionButtons).each(function(){
				
				if($(this).hasClass('searchClose')){	
			
					$(this).removeClass('displayBlock');	
					
				}
			});
			
			parent.searchOpen = false;
			
		},
		countButtons : function() {
			var parent = this;
			var container = $(parent.container);
			var searchContainer = container.find('.tableSearchBarWrapper');
		},
		clearAmountsOnTable: function(colClass){
			var searchClass = '.'+colClass+' input.input-input';
			$('.tableContainer').find(searchClass).each(function(index, item){
				if($(item).val() != '0.00'){
					$(item).val('0.00');
					$(item).attr('data-value','0.00');
				}
			});
		}
			
	};
	namespace("fnb.forms.tableUtils", tableUtils);
});

$(function() {
	function scrollUtil() {
		this.scrollPos = 0;
		this.elementBottom;
		this.windowScroll;
		this.windowBottom;
		this.padding = 70;
		this.windowHeight = $(window).height();
	};
	scrollUtil.prototype = {
			
	setScrollPos : function() {
		var parent = this;
		parent.scrollPos = $(document).scrollTop();
	},
	
	scrollPosUpdate : function () {
		var parent = this;
		
		setTimeout(function(){$(document).scrollTop(parent.scrollPos);}, 100);
		
	},
	
	tabScroll : function (target) {
		var parentObject = this;
		// Constant amount of padding an element should be from the bottom of the window

		// Check their position relative to the window's scroll
		parentObject.elementBottom = $(target).offset().top + $(target).height();
		parentObject.windowScroll = $(window).scrollTop();
		parentObject.windowBottom = parentObject.windowScroll + parentObject.windowHeight;
		 
		if(parentObject.elementBottom + parentObject.padding > parentObject.windowBottom){
			$(window).scrollTop(parentObject.windowScroll + parentObject.padding);
		}
	}
	

	};
    namespace("fnb.forms.scrollUtil", scrollUtil);
});

///-------------------------------------------///
/// developer: Donovan
///
/// Page Controller
///-------------------------------------------///
$(function(){
	function pageObject() {
		this.activeObject;
		this.observerObject;
	}
	pageObject.prototype = {
		init : function (parent) {
			this.attachListeners(parent)   
		},
		attachListeners: function(observer) {
			_this = this;
			this.setObserverObject(observer);
			//TABBING
			/* GLOBAL IPHONE FIX */
			//---->> DROPDOWNS
			$(this.observerObject).on('focus', '.dropdown-keyboard-tab', function(event) {fnb.forms.dropdown.focusIn(event);});
			$(this.observerObject).on('blur', '.dropdown-keyboard-tab', function(event) {fnb.forms.dropdown.focusOut(event);});
			$(this.observerObject).on('keyup', '.dropdown-has-focus', function(event) {fnb.forms.dropdown.focusKeyup(event);});
			$(this.observerObject).on('keypress keydown', '.dropdown-has-focus', function(event) {if(event.keyCode == 40 ) fnb.utils.mobile.utils.preventDefault(event);});
			//FORMS
			$(this.observerObject).on('focus keypress keyup keydown blur', '.input-input', function(event) {fnb.controls.controller.clearActiveElements();fnb.controls.page.setActiveObject(event.target);return fnb.forms.input.delegateEvents(event);});
			$(this.observerObject).on('click touchend', '.switcherWrapper .radioButton', function(event) {fnb.controls.controller.clearActiveElements();fnb.forms.radioButtons.radioAction(event.target);fnb.controls.page.setActiveObject(event.target);});
			//---Checkbox
			if(!_isMobile){
				$(this.observerObject).on('click', '.checkbox-input', function(event) {fnb.utils.mobile.utils.preventDefault(event);fnb.controls.controller.clearActiveElements(event);fnb.forms.checkBox.checkboxClick(event.currentTarget);fnb.controls.page.setActiveObject(event.target);});
			}else{
				$(this.observerObject).on('touchend', '.checkbox-graphic-wrapper', function(event) {fnb.utils.mobile.utils.preventDefault(event);fnb.controls.controller.clearActiveElements(event);fnb.forms.checkBox.checkboxTouch(event);fnb.controls.page.setActiveObject(event.target);});
			}
			//---Checkbox END
			//---Dropdown

			if(!_isMobile){
				$(this.observerObject).on('click', '.dropdown-item', function(event) {fnb.forms.dropdown.checkSelect(event,true);fnb.controls.page.setActiveObject(event.target);});
				$(this.observerObject).on('click', '.dropdown-initiator', function(event) {event.stopPropagation()});
				$(this.observerObject).on('click', '.dropdown-input', function(event) {event.stopPropagation();});
			}else{
				
				
				$(this.observerObject).on('touchstart', '#eziPannelButtons', function(event) {event.stopPropagation();event.stopImmediatePropagation();});
				$(this.observerObject).on('touchstart', '#actionMenuBtt', function(event) {event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();});

				$(this.observerObject).on('touchend', '.dropdown-wrapper', function(event) {event.stopPropagation();});
				$(this.observerObject).on('touchend', '.dropdown-content-wrapper', function(event) {event.stopPropagation();});
				$(this.observerObject).on('touchend', '.dropdown-item-row-wrapper', function(event) {event.preventDefault();fnb.utils.mobile.utils.touchEnd(event);});
				$(this.observerObject).on('touchend', '.dropdown-item-row', function(event) {event.preventDefault();fnb.utils.mobile.utils.touchEnd(event);});
				
				/*$(this.observerObject).on('touchstart', '.dropdown-initiator', function(event) {event.preventDefault();event.stopImmediatePropagation();event.stopPropagation();});*/
				$(this.observerObject).on('touchend', '.dropdown-initiator', function(event) {event.preventDefault();event.stopImmediatePropagation();event.stopPropagation();fnb.forms.dropdown.checkExpand(event)});
				$(this.observerObject).on('touchend', '.dropdown-item', function(event) {fnb.utils.mobile.utils.preventDefault(event);fnb.forms.dropdown.checkSelect(event,true);});
				
				/*$(this.observerObject).on('touchend', '.dropdown-wrapper', function(event) {event.stopPropagation();});
				$(this.observerObject).on('touchend', '.dropdown-content-wrapper', function(event) {event.stopPropagation();});
				$(this.observerObject).on('touchend', '.dropdown-item-row-wrapper', function(event) {fnb.utils.mobile.utils.preventDefault(event);fnb.utils.mobile.utils.touchEnd(event);});
				$(this.observerObject).on('touchend', '.dropdown-item-row', function(event) {fnb.utils.mobile.utils.preventDefault(event);fnb.utils.mobile.utils.touchEnd(event);});
				$(this.observerObject).on('touchend', '.dropdown-initiator .dropdown-item-row', function(event) {event.stopPropagation();});
				$(this.observerObject).on('touchend', '.dropdown-input', function(event) {event.stopPropagation();});*/
			}
			
			$(this.observerObject).on('keyup', '.dropdown-input', function(event) {fnb.forms.dropdown.keypress(event.target);fnb.controls.page.setActiveObject(event.target);});
			
			//---Dropdown END			
			//---Datepicker
			if(!_isMobile){
				$(this.observerObject).on('click', '.datepickerWrapper', function(event) {fnb.controls.controller.clearActiveElements();fnb.controls.controller.eventsObject.raiseEvent('openDatePicker', event.target);fnb.controls.page.setActiveObject(event.target);});
				//---Datepicker END	
				$(this.observerObject).on('click', '#calendarCancelButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);_datePicker.hide(false,false);fnb.controls.page.setActiveObject(event.target);});
				$(this.observerObject).on('click', '#confirmHolidayButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);_datePicker.hide(true,false);fnb.controls.page.setActiveObject(event.target);});
				$(this.observerObject).on('click', '#cancelHolidayButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);_datePicker.notifyHolidayHide();fnb.controls.page.setActiveObject(event.target);});
				
			}else{

				$(this.observerObject).on('touchend', '.datepickerWrapper', function(event) {_datePicker.checkSelect(event);});
				//---Datepicker END	
				$(this.observerObject).on('touchend', '#calendarCancelButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);_datePicker.hide(false,false);fnb.controls.page.setActiveObject(event.target);});
				$(this.observerObject).on('touchend', '#confirmHolidayButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);_datePicker.hide(true,false);fnb.controls.page.setActiveObject(event.target);});
				$(this.observerObject).on('touchend', '#cancelHolidayButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);_datePicker.notifyHolidayHide();fnb.controls.page.setActiveObject(event.target);});
				
			}
			
			$(this.observerObject).on('focus', '.radioGroupValue', function(event) {fnb.forms.radioButtons.focusIn(event);});
			$(this.observerObject).on('blur', '.radioGroupValue', function(event) {fnb.forms.radioButtons.focusOut(event);});
			$(this.observerObject).on('keyup', '.radio-has-focus', function(event) {fnb.forms.radioButtons.focusKeyup(event);});
			//File upload widget
		//	$(this.observerObject).on('click touchend', '.file-button-fake', function(event) {fnb.forms.fileUpload.buttonClick(event);});
		//	$(this.observerObject).on('click touchend', '.file-input-fake', function(event) {fnb.forms.fileUpload.inputClick(event);});
		//	$(this.observerObject).on('change', '.input-file', function(event) {fnb.forms.fileUpload.inputChanged(event);});
			//File upload widget END
			$(this.observerObject).on('keyup', '.radio-has-focus', function(event) {fnb.forms.radioButtons.focusKeyup(event);});
			
			//TOOLTIPS
			if(!_isMobile){
				$(this.observerObject).on('click', '.tooltipParent', function(event) {event.stopPropagation();fnb.forms.tooltip.show($(event.target).parent());});
			}else{
				//$(this.observerObject).on('touchend', '.tooltipParent', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.forms.tooltip.show($(event.target).parent());});
				$(this.observerObject).on('touchend', '.tooltipButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.forms.tooltip.show($(event.target).parent().parent());});
			}
			
			//MOBILE DEVICE OFFER
			if(_isMobile){
				$(this.observerObject).on('touchend', '.selectButton', function(event) {$(event.currentTarget).trigger("click")});
			}
			
			//Table switcher
			if(!_isMobile){
				//OTHER
				$(this.observerObject).on('click', '.headerButton', function(event) {fnb.utils.topTabs.headerButtonSelect($(event.target).parent());});
				//Branch Assist
				$(this.observerObject).on('click', '.branchAssistButton', function(event) {fnb.utils.topTabs.headerButtonSelect($(event.target).parent());});
				//TABLES
				$(this.observerObject).on('click', '.rowMoreButton', function(event) {fnb.controls.controller.clearActiveElements();fnb.functions.tableMoreButton.checkSelection($(event.currentTarget).attr('data-value'))});
				
			}else{
				//OTHER
				$(this.observerObject).on('touchend', '.headerButton', function(event) {fnb.utils.topTabs.headerButtonSelect($(event.target).parent());});
				//Branch Assist
				$(this.observerObject).on('touchend', '.branchAssistButton', function(event) {fnb.utils.topTabs.headerButtonSelect($(event.target).parent());});
				//TABLES
				$(this.observerObject).on('touchend', '.rowMoreButton', function(event) {fnb.controls.controller.clearActiveElements();fnb.functions.tableMoreButton.checkSelection($(event.currentTarget).attr('data-value'),event)});
				
			}
		
			//Table switcher
			if(!_isMobile){
				$(this.observerObject).on('click', '.tableSwitcherButton', function(event) {fnb.forms.tableUtils.switcherClick(event)});
			}else{
				$(this.observerObject).on('touchend', '.tableSwitcherButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.forms.tableUtils.switcherClick(event)});
			}
			
			//---Table Action Button
			//---Table Action Button END
			if(!_isMobile){
				$(this.observerObject).on('click', '.tableActionButton', function(event) {fnb.forms.tableUtils.actionButtonClick($(event.currentTarget))});
			}else{
				$(this.observerObject).on('touchend', '.tableActionButtonLabel', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.forms.tableUtils.actionButtonClick($(event.target).parent())});
				$(this.observerObject).on('touchend', '.tableActionButton', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.forms.tableUtils.actionButtonClick($(event.target))});
			}
			//---Select All
			if(!_isMobile){
				$(this.observerObject).on('click', '.checkall-link', function(event) {fnb.utils.mobile.utils.preventDefault(event);fnb.forms.checkBox.toggleAll($(event.target),event)});
			}else{
				$(this.observerObject).on('touchend', '.checkall-link', function(event) {fnb.utils.mobile.utils.preventDefault(event);fnb.forms.checkBox.toggleAll($(event.target),event)});
				$(this.observerObject).on('touchstart', '.checkall-link', function(event) {fnb.utils.mobile.utils.preventDefault(event);});
			}
			//---Select All END
			//SUBTABS
			$(this.observerObject).on('click touchend', '.subTabButton', function(event) {fnb.controls.controller.clearActiveElements(event);fnb.utils.subtabs.select($(event.target))});
			//OVERLAY
			$(this.observerObject).on('click touchend', '.overlay', function(event) {event.stopPropagation();});
			//MOBILE
			$(this.observerObject).on('click touchend', '.mobi-header-trigger', function(event) {fnb.utils.mobile.headerControls.menuSlide(event)});

			$(this.observerObject).on('touchend', '.errorButtonWrapper', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.utils.errorPanel.hide()});
			//ACTION MENU
			if(!_isMobile){
				$(this.observerObject).on('click', '.actionMenuButtonWrapper', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.controls.controller.clearActiveElements();fnb.controls.controller.eventsObject.raiseEvent('actionMenuShowHide', $(event.target))});
			}else{
				$(this.observerObject).on('touchend', '.actionMenuButtonWrapper', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.controls.controller.clearActiveElements();fnb.controls.controller.eventsObject.raiseEvent('actionMenuShowHide', $(event.target))});
				$(this.observerObject).on('touchend', '.actionMenuTextWrapper', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.controls.controller.clearActiveElements();fnb.controls.controller.eventsObject.raiseEvent('actionMenuShowHide', $(event.target).closest('.actionMenuButtonWrapper'))});
				$(this.observerObject).on('touchend', '.actionMenuIcon', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.controls.controller.clearActiveElements();fnb.controls.controller.eventsObject.raiseEvent('actionMenuShowHide', $(event.target).closest('.actionMenuButtonWrapper'))});
				$(this.observerObject).on('touchend', '.moreoptionsActionMenuTextSwap', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.controls.controller.clearActiveElements();fnb.controls.controller.eventsObject.raiseEvent('actionMenuShowHide', $(event.target).closest('.actionMenuButtonWrapper'))});
				$(this.observerObject).on('touchend', '.actionMenuText', function(event) {fnb.utils.mobile.utils.preventDefault(event);event.stopPropagation();fnb.controls.controller.clearActiveElements();fnb.controls.controller.eventsObject.raiseEvent('actionMenuShowHide', $(event.target).closest('.actionMenuButtonWrapper'))});

				$(this.observerObject).on('touchstart', '.actionMenuButtonWrapper', function(event) {fnb.utils.mobile.utils.preventDefault(event);});
				$(this.observerObject).on('touchstart', '.actionMenuTextWrapper', function(event) {fnb.utils.mobile.utils.preventDefault(event);});
				$(this.observerObject).on('touchstart', '.actionMenuIcon', function(event) {fnb.utils.mobile.utils.preventDefault(event);});
				$(this.observerObject).on('touchstart', '.moreoptionsActionMenuTextSwap', function(event) {fnb.utils.mobile.utils.preventDefault(event);});
				$(this.observerObject).on('touchstart', '.actionMenuText', function(event) {fnb.utils.mobile.utils.preventDefault(event);});
			}

			if(_isMobile){
				$(this.observerObject).on('touchend', '.actionMenuButton', function(event) {$(event.currentTarget).trigger('click');event.stopPropagation();event.preventDefault();});
				
				$(this.observerObject).on('touchend', '.tableActionButtonContent a', function(event) {event.preventDefault();$(event.currentTarget).trigger('click')});
				
			}
			
			//ACTION MENU END
			$(this.observerObject).on('click touchend', '.footerBtn', function(event) {event.stopPropagation();});
			//$(this.observerObject).on('click touchend', '.datePickerDate', function(event) {event.stopPropagation();});
			$(this.observerObject).on('click touchend', '.formFooterButtons', function(event) {event.stopPropagation();});
			
			if(_isMobile){
				$(this.observerObject).on('touchstart', '.tableSwitcherButton', function(event) {fnb.utils.mobile.utils.touchStart(event);});
				$(this.observerObject).on('touchmove', '.tableSwitcherButton', function(event) {fnb.utils.mobile.utils.touchMove(event);});
				$(this.observerObject).on('touchend', '.tableSwitcherButton', function(event) {fnb.utils.mobile.utils.touchEnd(event);});
				
				$(this.observerObject).on('touchstart', '.tableRow', function(event) {fnb.utils.mobile.utils.touchStart(event);});
				$(this.observerObject).on('touchmove', '.tableRow', function(event) {fnb.utils.mobile.utils.touchMove(event);});
				$(this.observerObject).on('touchend', '.tableRow', function(event) {fnb.utils.mobile.utils.touchEnd(event);});
				
				$(this.observerObject).on('touchstart', '.dropdown-content', function(event) {fnb.utils.mobile.utils.touchStart(event);});
				$(this.observerObject).on('touchmove', '.dropdown-content', function(event) {fnb.utils.mobile.utils.touchMove(event)});
				$(this.observerObject).on('touchend', '.dropdown-content', function(event) {fnb.utils.mobile.utils.touchEnd(event)});
	
				$(this.observerObject).on('touchstart', '.dropdown-initiator', function(event) {fnb.utils.mobile.utils.touchStart(event);});
				$(this.observerObject).on('touchmove', '.dropdown-initiator', function(event) {fnb.utils.mobile.utils.touchMove(event)});
				$(this.observerObject).on('touchend', '.dropdown-initiator', function(event) {fnb.utils.mobile.utils.touchEnd(event)});

				$(this.observerObject).on('touchstart', '.datepickerWrapper', function(event) {fnb.utils.mobile.utils.touchStart(event);});
				$(this.observerObject).on('touchmove', '.datepickerWrapper', function(event) {fnb.utils.mobile.utils.touchMove(event)});
				$(this.observerObject).on('touchend', '.datepickerWrapper', function(event) {fnb.utils.mobile.utils.touchEnd(event)});
				
				
			}
			
			$(this.observerObject).on('touchstart', '.mobiDropdownClose', function(event) {event.stopPropagation();fnb.utils.mobile.utils.preventDefault(event);});
			$(this.observerObject).on('click touchend', '.mobiDropdownClose', function(event) {event.stopPropagation();fnb.utils.mobile.utils.preventDefault(event);fnb.forms.dropdown.close()});
			$(this.observerObject).on('click touchend', '.footerWrapper', function(event) {event.stopPropagation();fnb.utils.mobile.utils.preventDefault(event);});
			
			/* TIMEOUT */
			if(!_isMobile){
				$('html').on('click', 'body', function(event) {fnb.controls.controller.clearActiveElements();fnb.hyperion.utils.timeOut.reset()});
				
			}else{
				$('html').on('touchend', 'body', function(event) {fnb.controls.controller.clearActiveElements();fnb.hyperion.utils.timeOut.reset();});
				
			}
			
			//Mobile Error
			$(this.observerObject).on('click touchend', '.mobileOrientationError', function(event) {event.stopPropagation();});
			/* MORE DATA LISTENER */
			$(window).scroll(function () {fnb.functions.isScrolling.checkPos();});
			$(this.observerObject).on('click touchend', '#forMore', function(event) {event.stopPropagation();fnb.functions.isScrolling.doScroll()});
		},
		setObserverObject: function(target) {
			this.observerObject = target;
		},
		getObserverObject: function() {
			return this.observerObject;
		},
		setActiveObject: function(target) {
			this.activeObject = target;
		},
		getActiveObject: function() {
			return this.activeObject;
		},
		detachListeners: function() {
			$(this.observerObject).off('focus keypress keyup keydown blur', 'input');
		},
		destroy : function () {
			
		}
	};
	namespace("fnb.controls.page",pageObject);
});


///-------------------------------------------///
/// developer: Donovan
///
/// Controller
///-------------------------------------------///
$(function(){
	function controllerObject() {
		this.eventsObject;
		this.currentEventsGroup;
		this.url;
		this.target;
		this.preLoadingCallBack;
		this.postLoadingCallBack;
		this.params;
		this.queue;
		this.expectResponse;
		this.ajaxData;
		this.xhr;
		this.targetElement;
		this.beenSubmitted;
		
		this.rawImportedData;
		this.namespaceImports;
		this.rawImportedJs;
		this.jsImportTags;
		this.cssImportTags;
		this.contentImport;
		this.scriptsImportTags;
		this.importJsCounter;
		this.pendingJsSearch;
	}
	controllerObject.prototype = {
		activeObjectsList: {},
		init : function () {
			this.pendingJsSearch = false;
			this.createControllerObjects();
			this.attachTemplates();
			//this.setCurrentEventsGroup('loadSite');
			fnb.utils.eziSlider.init($(window).width());
			fnb.controls.controller.setSkin();
		},
		createTopMenuObj : function () {
			if(typeof (tabCount)!='undefined') fnb.utils.topTabs.init(tabCount);
			fnb.functions.isScrolling.init();
		},
		createPageObj : function (target) {
			fnb.controls.page.init(target);
		},
		load : function (eventsGroup,target,url) {
			if(typeof eventsGroup=='undefined') eventsGroup = '';
			this.setCurrentEventsGroup(eventsGroup+'LoadComplete');
			this.setUrl(url);
			this.setTarget(target);
			fnb.utils.load.loadUrl();
		},
		loadFormToFrame : function (eventsGroup,loadObject) {
			var form = $("form[name='"+loadObject["formName"]+"']");
			console.log("submitting form to frame...");
			form.submit();
		},
		loadUrl : function (eventsGroup,target,url,preLoadingCallBack, postLoadingCallBack,params,queue,expectResponse,preventDefaults) {
			this.setTarget(target);
			var readyState = 4;
			var doLoad = true;
			if(typeof fnb.utils.loadUrl.xhr!= 'undefined'){readyState = fnb.utils.loadUrl.xhr.readyState;};
			if(readyState==1){
				if(queue==false){
					fnb.utils.ajaxManager.stop();
					fnb.utils.loadUrl.stop();
				}else{
					doLoad = false;
					var reqObj = {eventsGroup:eventsGroup ,target:target,url:url,preLoadingCallBack:preLoadingCallBack, postLoadingCallBack:postLoadingCallBack,params:params,queue:queue,expectResponse:expectResponse,preventDefaults:preventDefaults};
					fnb.utils.ajaxManager.addRequest(reqObj);
				}
			}
			if(doLoad){
				fnb.utils.loadUrl.load(eventsGroup,url,target,preLoadingCallBack,postLoadingCallBack,params,queue,expectResponse,preventDefaults);
			}
		},
		loadUrlComplete : function (loadObj) {
			var navError = false;
			if(!fnb.utils.navError.validate(loadObj.xhr,loadObj.postLoadingCallBack,loadObj.eventsGroup)){
				$(_eziProgressWrapperContents).show();
				if(typeof loadObj.preventDefaults=='undefined'||loadObj.preventDefaults==false||fnb.hyperion.utils.eziPanel.active==false){	
					fnb.controls.controller.setDefaults();
				}else{
					fnb.controls.controller.setEziDefaults();
				}
				this.formBeenSubmitted = false;
				navError = true;
				return;
			};
 
			
			if(fnb.utils.handleOTP.validate(loadObj.xhr)) return;

			var eventsArray = ["loadUrlToWorkspace","loadUrl","actionMenuloadResultScreen","simpleLoadUrl","loadResultScreenFromActionMenu"];
			
			var inEventsGroup = eventsArray.indexOf(loadObj.eventsGroup)

			if(inEventsGroup!=-1&&navError==false&&!loadObj.async){
				console.log('Controller: Clear footer buttons')
		   		fnb.functions.footer.clear();
				fnb.hyperion.controller.raiseEvent("hideActionMenuButtonAndClear");
			}
			
			if(typeof(loadObj.preLoadingCallBack)=="function"){
				
				loadObj.preLoadingCallBack(loadObj.data,loadObj.eventsGroup,loadObj.xhr)};
				
			try{
				if(loadObj.data!=''){
					if(loadObj.url.indexOf("bankingFrame")==-1){
						$.ajaxSettings.data = [];
						$.ajaxSettings.traditional = false;
						$(loadObj.target).html(loadObj.data);
					}else{
						fnb.controls.controller.getExternalData(loadObj)
					}
				}else{
					if(loadObj.expectResponse!=false) this.setError('No data returned from request.')
				};
			}catch(e){
				if(typeof loadObj.preventDefaults=='undefined'||loadObj.preventDefaults==false) {this.setDefaults();}else{this.setEziDefaults();}
				fnb.controls.controller.eventsObject.raiseEvent('loadError', {height:'134px',message: 'Page error.', errors:[{error: e}]});
			}

			$(_eziProgressWrapperContents).show();
			// run collectScripts to import js page Data Objects
			var script = fnb.hyperion.load.collectScripts(loadObj.data);
			//Init page events for new framework
			fnb.hyperion.controller.initPageEvents();
			//Try send tracking data
			try{
				fnb.hyperion.utils.tracking.checkTrackingObject(loadObj.eventsGroup,loadObj);
			}catch(e){
				console.log("Tracking Error: "+e);
			};
			
			this.formBeenSubmitted = false;
			this.raiseEvent(loadObj.eventsGroup+'LoadUrlComplete', loadObj,navError);
			if(typeof(loadObj.postLoadingCallBack)=="function"){loadObj.postLoadingCallBack(loadObj.data,loadObj.eventsGroup,loadObj.xhr)};

			//this.inspectDomFunctions();
			
		},
		getExternalData : function (loadObj) {

			this.rawImportedData = loadObj.data;
			this.jsImportTags = this.rawImportedData.match(/<script[^>]*?class="webJsCore"[^>]*>([\s\S]*?)<\/script>/g);
			this.cssImportTags = this.rawImportedData.match(/<link[^>]*?[^>]*>/gi);
			this.scriptsImportTags = this.rawImportedData.match(/<script[^>]*?class="initJs"[^>]*>([\s\S]*?)<\/script>/g);
			
			this.rawImportedData = this.rawImportedData.replace(/<script[^>]*?[^>]*>([\s\S]*?)<\/script>/gi,'');
			this.rawImportedData = this.rawImportedData.replace(/<link[^>]*?[^>]*>/gi,'');
			this.rawImportedData = this.rawImportedData.replace(/<meta[^>]*?[^>]*>/gi,'');

			this.setExternalData(loadObj);
		},
		setExternalData : function (loadObj) {

			var targetElement = (document.getElementById('productFinderWrapper')!= undefined) ? "productFinderWrapper" : "pageContent"
			
			this.targetSelected = document.getElementById(targetElement);
			this.targetSelected.innerHTML = '';
			
			_this = this;
			
			for (var i=0;i<this.jsImportTags.length;i++)
			{
				var url = this.jsImportTags[i].match(/src="[\s\S]*?"/g);
				var rawUrl = url[0].replace('src="','').replace('"','');
				
				var importScript = document.createElement('script');
				importScript.type ="text/javascript";
				importScript.src = rawUrl;
				this.targetSelected.appendChild(importScript);
			}
			for (var i=0;i<this.cssImportTags.length;i++)
			{ 
				var url = this.cssImportTags[i].match(/href="[\s\S]*?"/g);
				var rawUrl = url[0].replace('href="','').replace('"','');
				
				var importCss = document.createElement('link');
				importCss.type ="text/css";
				importCss.rel="stylesheet"
				importCss.href = rawUrl;
				this.targetSelected.appendChild(importCss);
			}
			
			if(targetElement=='pageContent'){
				var wrapper = document.createElement('div');
				wrapper.className = 'pageWrapper';
				$(wrapper).append(this.rawImportedData);
				$(loadObj.target).append($(wrapper));
			}else{
				$(loadObj.target).append(this.rawImportedData);
			}

			setTimeout(function() {
				_this.setExternalComplete(loadObj);
			}, 200);
		},
		setExternalComplete : function (loadObj) {
			for (var i=0;i<_this.scriptsImportTags.length;i++)
			{ 
				var scriptsImportTags = document.createElement('script');
				scriptsImportTags.type = 'text/javascript';
				var code = _this.scriptsImportTags[i].replace(/<script[^>]*?[^>]*>([\s\S]*?)/gi,'').replace(/<\/script>/gi,'');
				code = code.replace('$(document).ready(function(){','');
				code = code.replace('});','');
				scriptsImportTags.appendChild(document.createTextNode(code));
				this.targetSelected.appendChild(scriptsImportTags);
			}
			
			$(this.targetSelected).off();
			
			for (var z=0;z<cozaBankingObserver.length;z++)
			{
				var eventsString = '';
				var functionsString = '';
				var targetString = '';
				for (var x=0;x<cozaBankingObserver[z].events.length;x++)
				{ 
					targetString = cozaBankingObserver[z].events[x].target;
					for (var y=0;y<cozaBankingObserver[z].events[x].events.length;y++)
					{ 
						eventsString+=cozaBankingObserver[z].events[x].events[y];
					}
					for (var s=0;s<cozaBankingObserver[z].events[x].funtions.length;s++)
					{ 
						functionsString+=cozaBankingObserver[z].events[x].funtions[s];
					}
				}
				$(this.targetSelected).on(eventsString,targetString, function(event) {new Function(functionsString)});
			}
			$(this.targetSelected).on('click touchend', '.ui-link, .ui-linkRedirect, .subTabContent .ui-subTabLabel, .cellInner-link, .ui-phoneMenu-link, .ui-productLabelItem-link, .ui-productBenefitHeading', function(event) {fnb.functions.cozaContent.select(event,loadObj.target);}).on('click touchend','.ui-submenu-link', function(event) {fnb.functions.cozaContent.selectHref(event,loadObj.target);});
			
			$(this.targetSelected).on('click touchend', '.ui-applyNow', function(event) {pages.fnb.shares.ProductFinder.showPopup();});
		},
		initExternalFunctions : function () {
			clearTimeout(fnb.functions.timeOut.logOffTimer);
			var target="Standard";
			if($(this.getTarget()).closest('#eziWrapper').length>0){target="Ezi";$(_eziProgressWrapperContents).addClass('displayNone')};
			progressBar.init(target);
		},
		setProgressBar : function () {
			clearTimeout(fnb.functions.timeOut.logOffTimer);
			var target="Standard";
			if($(this.getTarget()).closest('#eziWrapper').length>0){target="Ezi";$(_eziProgressWrapperContents).addClass('displayNone')};
			progressBar.init(target);
		},
		clearProgressBar : function () {
			progressBar.clear();
			if($(_eziProgressWrapperContents).hasClass('displayNone'))$(_eziProgressWrapperContents).removeClass('displayNone');
			fnb.functions.timeOut.reset();
		},
		setError : function (errorObject) {
			this.formBeenSubmitted = false;
			fnb.hyperion.utils.error.show(errorObject);
		},
		showFooterButtons : function () {
			if(fnb.hyperion.utils.eziPanel.active==false) fnb.utils.frame.showFooterButtons();
		},
		clearFooterButtons : function () {
			fnb.utils.frame.clearFooterButtons();
		},
		setDefaults : function () {
			if(fnb.hyperion.utils.eziPanel.active==false){fnb.controls.controller.raiseEvent('defaultsShow', '');}
		},
		setEziDefaults : function () {
			fnb.controls.controller.raiseEvent('eziDefaultsShow', '');
		},
		setUrl : function (url) {
			this.url = url;
		},
		getUrl : function () {
			return this.url;
		},
		setTarget : function (target) {
			this.target = target;
		},
		getTarget : function () {
			return this.target;
		},
		setParams : function (params) {
			this.params = params;
		},
		setLogin: function (state) {
			var parent = this;
			parent.loggedIn = state;
		},
		getParams : function () {
			return this.params;
		},
		overrideParam: function(name,val){	
			this.params[name]=val;
		},
		setPreLoadingCallBack : function (preLoadingCallBack) {
			this.preLoadingCallBack = preLoadingCallBack;
		},
		getPreLoadingCallBack : function () {
			return this.preLoadingCallBack;
		},
		setPostLoadingCallBack : function (postLoadingCallBack) {
			this.postLoadingCallBack = postLoadingCallBack;
		},
		getPostLoadingCallBack : function () {
			return this.postLoadingCallBack;
		},
		setQueue : function (queue) {
			this.queue = queue;
		},
		getQueue : function () {
			return this.queue;
		},
		setExpectResponse : function (expectResponse) {
			this.expectResponse = expectResponse;
		},
		getExpectResponse : function () {
			return this.expectResponse;
		},
		setOverrideError: function(overrideError){
			this.overrideError = overrideError;	
		},
		getOverrideError: function() {
			return this.overrideError;	
		},
		setCurrentEventsGroup : function (eventName) {
			this.currentEventsGroup = eventName;
		},
		getCurrentEventsGroup : function () {
			return this.currentEventsGroup;
		},
		clearCurrentEventsGroup : function () {
			this.currentEventsGroup = '';
		},
		setAjaxData : function (ajaxData) {
			this.ajaxData = ajaxData;
		},
		getAjaxData : function () {
			return this.ajaxData;
		},
		setXhr : function (xhr) {
			this.xhr = xhr;
		},
		getXhr : function () {
			return this.xhr;
		},
		doDownload : function (url) {
			window.open(url);
		},
		openWindow : function (url) {
			window.open(url);
		},
		scrollToTop : function () {
			$('html,body').scrollTop(0);
		},
		setTargetElement : function (target) {
			if(document.getElementById(target)!='undefined') this.targetElement = target;
		},
		getTargetElement : function () {
			return this.targetElement;
		},
		setBodyHeight : function () {
			if(fnb.hyperion.utils.eziPanel.active==false) fnb.hyperion.controller.clipOverflow(false);
		},
		clearBodyHeight : function () {
			fnb.hyperion.controller.clipOverflow(true);
		},
		setOverlay : function (target) {
			fnb.utils.overlay.show();
			this.clearBodyHeight();
		},
		clearOverlay : function () {
			this.setBodyHeight();
			if(!fnb.hyperion.utils.eziPanel.active){
				fnb.utils.overlay.hide();
			}
		},
		clearActiveElements : function () {
			fnb.forms.dropdown.close();
			//New frame hide
			fnb.hyperion.utils.error.hide();
			//fnb.utils.errorPanel.hide();
			//fnb.functions.bigThree.initialized = false;
			fnb.forms.tooltip.hide();
		},
		submitForm : function (formName, targetDiv, preLoadingCallBack,postLoadingCallBack, buttonTarget, extraOptions, preventDefaults, fromEzi) {

			if(!this.formBeenSubmitted){
				 
				this.formBeenSubmitted = true;
				
				var keepFooter = (extraOptions) ? (extraOptions.keepFooter) ? true : false : false;
				
				fnb.utils.params.getParams(formName, targetDiv, buttonTarget, extraOptions);
				
				var loadObj = {url: fnb.controls.controller.getUrl(),target:targetDiv,preLoadingCallBack:preLoadingCallBack,postLoadingCallBack:postLoadingCallBack,params:fnb.controls.controller.getParams(),formName:formName,preventDefaults:preventDefaults,extraOptions:extraOptions};
				var formTarget = $("form[name='"+formName+"']").attr("target");
				
				if(formTarget=="frameResponse"){
					fnb.controls.controller.eventsObject.raiseEvent('loadFormToFrame', loadObj);
				}else{
					if(keepFooter==true){
						fnb.controls.controller.eventsObject.raiseEvent('simpleLoadUrlKeepFooter', loadObj)
					}else if(loadObj.preventDefaults==true){
						if(fromEzi){
							fnb.controls.controller.eventsObject.raiseEvent('eziSimpleLoadUrl', loadObj);	
						}else{
							fnb.controls.controller.eventsObject.raiseEvent('simpleLoadUrl', loadObj);	
						}
						
					}else{
						fnb.controls.controller.eventsObject.raiseEvent('loadUrl', loadObj);	
					}
				}
			}
			
		},
		submitFormToEzi : function (formName, paramName, paramValue, targetDiv, preLoadingCallBack,postLoadingCallBack, buttonTarget, extraOptions, preventDefaults) {
			if(!this.formBeenSubmitted){
				fnb.utils.params.getParams(formName, targetDiv, buttonTarget, extraOptions);
				var loadObj = {url: fnb.controls.controller.getUrl(),target:targetDiv,preLoadingCallBack:preLoadingCallBack,postLoadingCallBack:postLoadingCallBack,params:fnb.controls.controller.getParams(),formName:formName,preventDefaults:preventDefaults};
				if(typeof paramName!='undefined') this.overrideParam(paramName,paramValue);
				this.formBeenSubmitted = true;
				fnb.controls.controller.eventsObject.raiseEvent('submitFormToEzi', loadObj);	
			}
		},
		submitFormToUrl : function (formName) {
			
		},
		eziSubmitForm : function (formName, targetDiv, preLoadingCallBack,postLoadingCallBack, buttonTarget, extraOptions, preventDefaults) {
			if(!this.formBeenSubmitted){
				this.formBeenSubmitted = true;
				fnb.utils.params.getParams(formName, targetDiv, buttonTarget, extraOptions);
				var loadObj = {url: fnb.controls.controller.getUrl(),target:targetDiv,preLoadingCallBack:preLoadingCallBack,postLoadingCallBack:postLoadingCallBack,params:fnb.controls.controller.getParams(),formName:formName,preventDefaults:preventDefaults};
				fnb.controls.controller.eventsObject.raiseEvent('eziSliderPaging', loadObj);
			}
		},
		clearSubTabObject : function () {
			if(fnb.utils.mobile.subtabs.subTabTopScroller)  fnb.utils.mobile.subtabs.subTabTopScroller = undefined;
		},
		attachEvent : function (sender,eventArgs) {
			this.eventsObject.attachEvent(sender,eventArgs);
		},
		detachEvent : function (sender,eventArgs) {
			this.eventsObject.detachEvent(sender,eventArgs);
		},
		raiseEvent : function (sender,val,navError) {
			if(fnb.hyperion.utils.eziPanel.active==false&&navError!=true||fnb.hyperion.utils.eziPanel.active==true&&navError!=true) this.eventsObject.raiseEvent(sender,val);
		},
		getObject: function(objName, create){
			if (!this.activeObjectsList[objName]){
				if (!create) {
					return null;
				}
				this.activeObjectsList[objName] = [];
			}
			return this.activeObjectsList[objName];
		},
		registerObj : function (objName, object) {
			var obj = this.getObject(objName, true);
			obj.push(object);
		},
		deRegisterObj : function (objName, object) {
			var obj = this.getObject(eventName);
			if (!obj) { return; }
			var getArrayIndex = function(array, item){
				for (var i = array.length; i < array.length; i++) {
					if (array[i] && array[i] === item) {
						return i;
					}
				}
				return -1;
			};
			var index = getArrayIndex(obj, handler);
			if (index > -1) {
				obj.splice(index, 1);
			}
		},
		createControllerObjects : function () {
			namespace("fnb.utils.objectsInitializer", new fnb.utils.objectsInitializer());
			this.registerObj('fnb.utils.objectsInitializer',fnb.utils.objectsInitializer);
			fnb.utils.objectsInitializer.init();
		},
		attachTemplates : function () {
			this.eventsObject.eventList = eventTemplates;
		},
		setSkin : function () {
			_skin = $("#workspace").find(".pageWrapper").attr('data-skin');
		},
		inspectDomFunctions : function() {
			_this = this;
			if (this.pendingJsSearch == false) {
				_this.pendingJsSearch = true;
				var functionsString = "";
				setTimeout(
						function() {
							var count = 0;
							for ( var x in window) {
								try{
									if (typeof window[x] === 'function'
											&& window[x].toString().indexOf('[native code]') == -1
											&& window[x].toString().search(/fnb./i) == -1
											&& $.inArray(x.toString(),functionsArray) == -1) {
										count++;
										console.log('Non namespaced function found=>> '+x.toString())
										functionsString += '&' + x.toString();
										//delete window[x];
									}
								}catch(e){
									console.log(e)
									console.log(window[x].toString())
								}
								
							}
							if (count > 0) {
								//$.post("/banking/Controller", {
								//	"nav" : "support.security.MWD",
								//	"functions" : functionsString
								//});
							}
							_this.pendingJsSearch = false;
						}, 5000);
			}
		}
	};
	namespace("fnb.controls.controller",controllerObject);
});


var eventTemplates ={
		'loadSite': [
			new Function('','fnb.hyperion.progress.start()'),
			new Function('','fnb.controls.controller.load("topMenu",_header,topMenuUrl)')
		],
		'loadSiteLoadUrlComplete': [
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.functions.siteLoadComplete.complete()'),
			new Function('','fnb.controls.controller.createTopMenuObj()'),
			new Function('','fnb.controls.controller.createPageObj(_body)'),
			new Function('','fnb.utils.mobile.properties.init()'),
			new Function('','fnb.hyperion.utils.topTabs.init();'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)')
		],
		'navError': [
     		new Function('','if(!fnb.hyperion.utils.eziPanel.active){fnb.hyperion.utils.notifications.hide()}'),
     		new Function('','if(!fnb.hyperion.utils.eziPanel.active){fnb.hyperion.utils.actionMenu.showButton()}'),
     		new Function('','fnb.hyperion.progress.stop()'),
     		new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
     		new Function('sender, errorObject','fnb.hyperion.utils.error.show(errorObject)')
     	],
		'loadError': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()'),
			new Function('','fnb.hyperion.utils.notifications.hide()'),
			new Function('sender, errorObject','fnb.hyperion.utils.error.show(errorObject)')
		],
		'topMenuLoadComplete': [
			new Function('','fnb.controls.controller.loadUrl("loadSite",_workspace,defaultUrl)')
		],
		'loadUrl': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.controls.controller.clearSubTabObject()'),
			new Function('','fnb.controls.controller.scrollToTop()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
			new Function('','fnb.hyperion.utils.notifications.hide()'),
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("loadUrl",loadObject.target,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,loadObject.params,loadObject.queue,loadObject.expectResponse,loadObject.preventDefaults)')
		],
		'loadUrlLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.functions.isScrolling.checkPos()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)')
		],
		'abortLoadUrl': [
			new Function('sender, target','fnb.utils.loadUrl.stop();'),
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'simpleLoadUrl': [
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("simpleLoadUrl",loadObject.target,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,loadObject.params,loadObject.queue,loadObject.expectResponse,loadObject.preventDefaults)')
		],
		'simpleLoadUrlLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
  			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
  			new Function('','fnb.functions.isScrolling.checkPos()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)')
			//new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			//new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'eziSimpleLoadUrl': [
		    new Function('','fnb.hyperion.progress.startEziLoader()'),
  			new Function('sender, loadObject','fnb.controls.controller.loadUrl("simpleLoadUrl",loadObject.target,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,loadObject.params,loadObject.queue,loadObject.expectResponse,loadObject.preventDefaults)')
  		],
  		'eziSimpleLoadUrlLoadUrlComplete': [
  			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
  			new Function('','fnb.hyperion.progress.stop()'),
  			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
  			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
  			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
  			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
  			new Function('','fnb.functions.isScrolling.checkPos()')
  		],
		'simpleLoadUrlKeepFooter': [
		    new Function('sender, loadObject','fnb.controls.controller.loadUrl("simpleLoadUrlKeepFooter",loadObject.target,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,loadObject.params,loadObject.queue,loadObject.expectResponse,loadObject.preventDefaults)')
	  	],
	  	'simpleLoadUrlKeepFooterLoadUrlComplete': [
	  		new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
	  		new Function('','fnb.hyperion.progress.stop()'),
	  		new Function('','fnb.hyperion.utils.eziPanel.hide()'),
	  		new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
	  		new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
	  		new Function('','fnb.functions.isScrolling.checkPos()')
	  	],
		'topTabSelect': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.controls.controller.clearSubTabObject()'),
			new Function('','fnb.controls.controller.scrollToTop()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.utils.notifications.hide()'),
			new Function('sender, target','_datePicker.hide(false,false)'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("topTabSelect",_workspace,loadObject.url,"","","",loadObject.queue)'),
			new Function('','fnb.forms.tableUtils.init()')
		],
		'topTabSelectLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'loadResultScreen': [
		    new Function('','fnb.hyperion.utils.eziPanel.hide()'),
	 		new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.controls.controller.clearSubTabObject()'),
			new Function('','fnb.controls.controller.scrollToTop()'),
			new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('','fnb.hyperion.utils.notifications.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.footer.clear()'),
			new Function('','fnb.hyperion.controller.raiseEvent("hideActionMenuButtonAndClear")'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.controller.clearHtmlTemplates()'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()'),
			new Function('sender, url','fnb.controls.controller.loadUrl("loadResultScreen",_workspace,url,"","","",true)'),
			new Function('','fnb.forms.tableUtils.init()'),
			new Function('','fnb.hyperion.controller.clearPageObjects()')
		],
		'loadResultScreenLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.functions.isScrolling.checkPos()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)')
		],
		'loadUrlToWorkspace': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.notifications.hide()'),
			new Function('','fnb.controls.controller.clearSubTabObject()'),
			new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('','fnb.controls.controller.scrollToTop()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.controller.clearHtmlTemplates()'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.menu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("loadUrlToWorkspace",_workspace,loadObject.url,loadObject.preLoadingCallBack)'),
			new Function('','fnb.forms.tableUtils.init()')
		],
		'loadUrlToWorkspaceLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
  			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()')
		] ,
		'loadUrlToTarget': [
		    new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("loadUrlToTarget",loadObject.target,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,"",loadObject.queue,loadObject.expectResponse)'),
			new Function('','fnb.forms.tableUtils.init()')
		],
		'loadUrlToExpandableRow': [
			new Function('sender, loadObject','fnb.functions.loadUrlToExpandableRow.load(loadObject.target,loadObject.url,loadObject.buttonTarget)'),
			new Function('','fnb.forms.tableUtils.init()')
		],
		'topButtonsLoadUrlToWorkspace': [
		    new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.utils.notifications.hide()'),
			new Function('','fnb.hyperion.controller.clearHtmlTemplates()'),
			//new Function('','fnb.functions.footer.clear()'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()'),
			new Function('sender,url','fnb.controls.controller.loadUrl("topButtonsLoadUrlToWorkspace",_workspace,url)')
		],
		'topButtonsLoadUrlToWorkspaceLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.footer.configFooterButtons()'),
			new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'topTabSelectLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'actionMenuloadResultScreen': [
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('sender, url','fnb.controls.controller.loadUrl("actionMenuloadResultScreen",_workspace,url)'),
			new Function('','fnb.controls.controller.setBodyHeight()'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()')
		],
		'actionMenuloadResultScreenLoadUrlComplete': [
		     new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
		     new Function('','fnb.hyperion.progress.stop()'),
		     new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
		     new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
		     new Function('','fnb.hyperion.controller.initPageObjects()'),
		     new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
		     new Function('','fnb.hyperion.utils.footer.configFooterButtons()'),
		     new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'doDownload': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('sender, url','fnb.controls.controller.doDownload(url)')
		],
		'openWindow': [
			new Function('sender, url','fnb.controls.controller.openWindow(url)')
		],
		'loadUrlSuccess': [
			new Function('','fnb.functions.slowConnection.hide()'),
			new Function('sender, eventsGroup','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
			new Function('sender, eventsGroup','fnb.controls.controller.loadUrlComplete(eventsGroup)'),
			new Function('','fnb.hyperion.utils.footer.configFooterButtons()'),
		],
		'actionMenuShowHide': [
			new Function('sender, target','fnb.utils.actionMenu.showHide(target)')
		],
		'actionMenuShow': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('sender, target','fnb.utils.actionMenu.show()')
		],
		'actionMenuHide': [
			new Function('sender, target','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'loadResultScreenFromActionMenu': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.controls.controller.scrollToTop()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()'),
			new Function('','fnb.hyperion.controller.clearHtmlTemplates()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("loadResultScreenFromActionMenu",_workspace,loadObject.url,"",loadObject.postLoadingCallBack,"",true)'),
			new Function('','fnb.hyperion.controller.clearPageObjects()')
		],
		'loadResultScreenFromActionMenuLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'loadToActionMenu': [
			new Function('','fnb.controls.controller.scrollToTop()'),
			new Function('sender, url','fnb.controls.controller.loadUrl("loadToActionMenu",_actionMenuUrlWrapper,url)')
		],
		'loadToActionMenuLoadUrlComplete': [
			new Function('sender, loadObj','fnb.utils.actionMenu.loadTargetToActionMenuComplete()')
		],
		'dropdownLoadAmounts': [
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("dropdownLoadAmounts",loadObject.target,loadObject.url,"","","",true)')
		],
		'tableMoreOptions': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('sender, url','fnb.controls.controller.loadUrl("tableMoreOptions",_eziProgressWrapperContents,url)'),
			new Function('','fnb.controls.controller.clearBodyHeight()'),
			new Function('','fnb.hyperion.utils.eziPanel.show()'),
			/*new Function('','fnb.hyperion.utils.eziPanel.removeSalesEziOverride()'),  this is breaking the eziSlides:= */
			new Function('','fnb.hyperion.progress.startEziLoader()')
		],
		'tableMoreOptionsLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()')
		],
		'eziSliderShow': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.notifications.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.utils.eziPanel.show()'),
			new Function('','fnb.hyperion.utils.eziPanel.removeSalesEziOverride()'),
			new Function('','$(window).scrollTop(0)'),
			new Function('','fnb.hyperion.progress.startEziLoader()'),
			new Function('','fnb.hyperion.controller.eziPageContentElement.hide()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("eziSliderShow",_eziProgressWrapperContents,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,loadObject.params,loadObject.queue,loadObject.expectResponse,loadObject.preventDefaults)')
		],
		'eziSalesSliderShow': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.notifications.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.utils.eziPanel.show()'),
			new Function('','fnb.hyperion.utils.eziPanel.addSalesEziOverride()'),
			new Function('','$(window).scrollTop(0)'),
			new Function('','fnb.hyperion.progress.startEziLoader()'),
			new Function('','fnb.hyperion.controller.eziPageContentElement.hide()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("eziSliderShow",_eziProgressWrapperContents,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,loadObject.params,loadObject.queue,loadObject.expectResponse,loadObject.preventDefaults)')
		],
		'eziSliderShowLoadUrlComplete': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.controller.eziPageContentElement.show()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.eziFooterButtonGroup)')

		],
		'eziSliderPaging': [
			new Function('','fnb.hyperion.progress.startEziLoader()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("eziSliderLoad",loadObject.target,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,loadObject.params,loadObject.queue,loadObject.expectResponse,loadObject.preventDefaults)')
		],
		'eziSliderLoad': [
			new Function('','fnb.hyperion.progress.startEziLoader()'),
			new Function('','fnb.hyperion.controller.eziPageContentElement.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.eziFooterButtonGroup)'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("eziSliderLoad",_eziProgressWrapperContents,loadObject.url,loadObject.preLoadingCallBack,loadObject.postLoadingCallBack,loadObject.params,loadObject.queue,loadObject.expectResponse,loadObject.preventDefaults)')
		],
		'eziSliderLoadLoadUrlComplete': [
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.controller.eziPageContentElement.show()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.eziFooterButtonGroup)')
		],
 	   'eziSliderShowBody': [
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()'),
			new Function('','fnb.functions.footer.clear()'),
			new Function('sender, url','fnb.controls.controller.loadUrl("eziSliderShowBody",_workspace,url)')
		],
		'eziSliderShowBodyLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.hyperion.controller.initHtmlTemplates({})'),
			new Function('','fnb.hyperion.controller.initPageObjects()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()'),
		],
		'eziSliderHide': [
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.controller.raiseEvent("pageHideEzi")')
		],
		'submitFormToEzi': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("submitFormToEzi",_eziProgressWrapperContents,loadObject.url,"","",loadObject.params)'),
			new Function('','fnb.controls.controller.clearBodyHeight()'),
			new Function('','fnb.hyperion.utils.eziPanel.show()'),
			new Function('','fnb.hyperion.utils.eziPanel.removeSalesEziOverride()'),
			new Function('','fnb.hyperion.progress.startEziLoader()')
		],
		'submitFormToEziLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()')
		],
		'defaultsShow': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()')
		],
		'eziDefaultsShow': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()')
		],
		'reloadDropdown': [
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("reloadDropdown",loadObject.target,loadObject.url,"",loadObject.postLoadingCallBack,"",true)')
		],
		'openDatePicker': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.controls.controller.clearActiveElements()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('sender, target','_datePicker.show(target)')
		],
		'closeDatePicker': [
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('sender, target','_datePicker.hide(false,false)')
		],
		'closeEziDatePicker': [
			new Function('sender, target','_datePicker.hide(false,false)')
		],
		'actionMenuPopupLoadUrl': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('sender, url','fnb.hyperion.utils.notifications.show()'),
			new Function('sender, url','fnb.controls.controller.loadUrl("popupLoadUrl",_popupWrapper,url)')
		],
		'popupLoadUrl': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()'),
			new Function('sender, url','fnb.controls.controller.loadUrl("popupLoadUrl",_popupWrapper,url)')
		],
		'popupLoadUrlLoadUrlComplete': [
		    new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
		    new Function('','fnb.hyperion.progress.stop()'),
            new Function('','fnb.hyperion.utils.notifications.show()')
		],
		'popupLoadUrlFromActionMenu': [
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('sender, url','fnb.hyperion.utils.notifications.show()'),
			new Function('sender,loadObject','fnb.controls.controller.loadUrl("popupLoadUrlFromActionMenu",_popupWrapper,loadObject.url,"","","","","",loadObject.preventDefaults)')
		],
		'popupClose': [
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('sender, url','fnb.hyperion.utils.notifications.hide()')
		],
		'popupActionMenuClose': [
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('sender, url','fnb.hyperion.utils.notifications.hide()')
		],
		'subTabLoadUrl': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('sender, url','fnb.controls.controller.loadUrl("subTabLoadUrl",_workspace,url)'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()')
		],
		'subTabLoadUrlLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()')
		],
		'loadUrltoPrintDiv': [
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("loadUrltoPrintDiv",_printDiv,loadObject.url,"",loadObject.postLoadingCallBack)')
		],
		'otpShow': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('sender, errorObject','fnb.hyperion.utils.error.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("otpShow",_eziProgressWrapperContents,loadObject.url,"","",loadObject.params)'),
			new Function('','fnb.controls.controller.clearBodyHeight()'),
			new Function('','fnb.hyperion.utils.eziPanel.show()'),
			new Function('','fnb.hyperion.utils.eziPanel.removeSalesEziOverride()'),
			new Function('','fnb.hyperion.progress.startEziLoader()'),
			new Function('','fnb.hyperion.controller.eziPageContentElement.hide()')
		],
		'otpShowLoadUrlComplete': [
			new Function('','fnb.hyperion.controller.raiseEvent("hideOverlay")'),
			new Function('','fnb.hyperion.progress.stop()'),
			new Function('','fnb.hyperion.controller.eziPageContentElement.show()'),
			new Function('sender, params','fnb.utils.otp.complete()')
		],
		'loadResultScreenToHiddenDiv': [
			new Function('sender, url','fnb.controls.controller.loadUrl("loadResultScreenToHiddenDiv",_hiddenDiv,url)')
		],
	 	'loadFormToFrame': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('sender, loadObject','fnb.controls.controller.loadFormToFrame("loadUrl",loadObject)'),
			new Function('','fnb.hyperion.controller.raiseEvent("showOverlay")'),
			new Function('','fnb.hyperion.progress.start()')
		],
		'timedOut': [
			new Function('','fnb.functions.isScrolling.hide()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()'),
			new Function('','fnb.hyperion.utils.notifications.hide()')
		],
		'keepSessionAlive': [
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()'),
			new Function('','fnb.functions.isScrolling.checkPos()'),
			new Function('sender, loadObject','fnb.controls.controller.loadUrl("keepSessionAlive",loadObject.target,loadObject.url,"","","","",loadObject.expectResponse)')
		],
		'mobileShowDefaults': [
			new Function('','fnb.controls.controller.setBodyHeight()'),
			new Function('','fnb.hyperion.utils.footer.show(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.functions.isScrolling.checkPos()'),
			new Function('','fnb.hyperion.utils.actionMenu.showButton()')
		],
		'mobileHideDefaults': [
			new Function('','fnb.controls.controller.clearSubTabObject()'),
			new Function('','fnb.controls.controller.scrollToTop()'),
			new Function('','fnb.controls.controller.clearBodyHeight()'),
			new Function('','fnb.hyperion.utils.footer.hide(fnb.hyperion.controller.footerButtonGroup)'),
			new Function('','fnb.hyperion.utils.eziPanel.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hide()'),
			new Function('','fnb.hyperion.utils.actionMenu.hideButton()')
		]
	};

///-------------------------------------------///
/// developer: Donovan
///
/// VARS
///-------------------------------------------///
var _body = "#bodyContainer";
var _header = "#header";
var _main = "#main";
var _bodyGlobalWidth = "#bodyGlobalWidth";
var _workspace = "#pageContent";
var _errorPanel = "#errorPanel";
var _errorsWrapper = "#errorsWrapper";
var _errorMessageWrapper = "#errorMessageWrapper";
var _eziWrapper = "#eziPageContent";
var _eziPannelButtons = "#eziPannelButtons";
var _eziProgressWrapperContents = '#eziPageContent';
var _actionMenuButton = "#actionMenuButtonWrapper";
var _actionMenuUrlWrapper = "#actionMenuUrlWrapper";
var _topNavWrapper = "#topNavWrapper";
var _topNavScrollable = "#topNavScrollable";
var _topNavContainer = "#topNavContainer";
var _topNav = '#topNav';
var _topMenu = '#topMenu';
var _topNavIndicator = "#topNavMenuSliderIndicator";
var _footerWrapper = "#footerWrapper";
var _footerMessage = "#footerMessage";
var _headerWrapper = "#headerButtonsWrapper";
var _pageContainer = "#pageContent";
var _defaultTargetContent = "#contentWrap";
var _headerButtonsWrapper = "#headerButtonsWrapper";
var _actionMenuWrapper = "#actionMenu";
var _overlay = "#overlay";
var _popupWrapper = '.notificationsInner';
var _printDiv = "#hiddenPrintDiv";
var _printDivWrapper = "#hiddenPrintWrapper";
var _hiddenDiv = "#logOff";
var _subTabsScrollable = "#subTabsScrollable"; 
var _formFooterButtons = "#formFooterButtons";
var _sessionTimedOutOverlay = "#sessionTimedOutOverlay";
var _slowConnectionOverlay = "#slowConnectionContainer";
var _hiddenLogOffDiv = "#logOff";
var _calendarWrapper = "#calendarWrapper";
var _smallPort = false; 
var _tinyPort = false;
var _tabMinHeight = 84;
var _topNavMinWidth = 720;
var _phoneWindowWidthMax = 782;
var _phoneWindowWidthMed = 576;
var _phoneWindowWidthMin = 430;
var _sliderOffset = 40;
var _topOffset = 124;
var _mobiTopOffset = 98;
var _topNavFreezePosition = 112;
var _device;
var _browserName;
var _browserVersion;
var _operatingSystem;
var _isMobile;
var _pageDataObject;
var _logOffTimer;
var _timeOut = 1000;
var _siteMaxWidth = 1280;
var _isIE8 = false;
var _skin;
///-------------------------------------------///
/// developer: Donovan
///
/// Document Load
///-------------------------------------------///
$(window).load(function() {


});

///-------------------------------------------///
/// developer: Donovan
///
/// Document Ready
///-------------------------------------------///
$(document).ready(function() {	

	namespace("fnb.controls.controller", new fnb.controls.controller());
	
	fnb.controls.controller.init();
	
	if ($(window).width() < 600)  _topOffset = '108';
	_device = fnb.utils.currentDevice.getDevice();
	var touch = ('ontouchstart' in window );
	var gesture = ('ongesturestart' in window);

	_isMobile = (fnbIsMobile) ? (fnbIsMobile=="false") ? false : true : false;

	_browserName = _device.browser;
	_browserVersion = _device.version;
	_operatingSystem = _device.platform;

	/*if(_browserName=="MSIE"&&$.support.boxModel==false||_browserName=="MSIE"&&parseInt(document.documentMode)<8){
		fnb.functions.gotoUrl.go('/banking/wrongBrowser.jsp');
	}

	if(_browserName=="MSIE"&&_browserVersion<9){
		_isIE8 = true;
	}
*/
	if ($(window).width() < 480) {
		if(_tinyPort==false){
			_tinyPort = true;
			_topOffset = '108';
		}
	}else{
		if(_tinyPort==true){
			_tinyPort =false;
			_topOffset = '134';
		}
	}
});
 
///-------------------------------------------///
/// developer: Donovan
///
/// Document Resize
///-------------------------------------------///
$(window).resize(function() {
 	//if(fnb.utils.topTabs) fnb.utils.topTabs.adjust($(window).width());
	//if(fnb.utils.actionMenu) fnb.utils.actionMenu.adjust($(window).width());
	//if(fnb.utils.eziSlider) fnb.utils.eziSlider.adjust();
	if(_datePicker.datePickerExpanded == true||_datePicker.datePickerEziExpanded) _datePicker.adjust($(window).width());
	//if(fnb.forms.dropdown) fnb.forms.dropdown.adjust();
	//fnb.utils.mobile.adjust($(window).width());
	fnb.utils.scrollingBanner.adjust($(window).width());
	if(fnb.functions.bigThree.initialized==true) fnb.functions.bigThree.adjust($(window).width());
	if(_isIE8) fnb.functions.ie8.doCheck();
	
	if ($(window).width() < 480) {
		if(_tinyPort==false){
			_tinyPort = true;
			_topOffset = '108';
		}
	}else{
		if(_tinyPort==true){
			_tinyPort =false;
			_topOffset = '134';
		}
	}
	
	//fnb.hyperion.utils.footer.configFooterButtons()
});

///-------------------------------------------///
/// developer: Donovan
///
/// Document Orientation Change
///-------------------------------------------///
$( window ).on( "orientationchange", function( event ) {
	
	fnb.utils.mobile.utils.changeOrientation(event);
	fnb.utils.popup.orientationChanged();
	
});

	/**
	 * A "controller" object responsible for controlling the action and behaviour of a given Chameleon table.	
	 * @param tableID
	 * @author michael
	 */
		
	function ChameleonTable(tableId){
		this.tableId = tableId; //Table ID
		this.serverUrl = null;
		
		this.pagingCallbackFunction = null;												//callback function to initiate server side paging 
		this.sortingCallbackFunction = null;											//callback function to initiate server side paging 
		this.searchCallbackFunction = null;												//callback function to initiate server side paging 
		this.changePageSizeCallbackFunction = null;
		
		this.formname = null;															//Formname should the table require field to submit 	
		
		this.columnSortFlags = [];															//last sorting direction on each column
		
		this.searchDelay = 1000;
		this.searchTimer = null;
		
		this.bindSearchHandler();														//bind the event listeners to the search box
	}
	
	
	ChameleonTable.prototype.bindSearchHandler = function(){
		var ct = this;
		var searchField = $('#' + ct.tableId).parent().find('#' + ct.tableId + '_searchField');
		if(searchField){	
			searchField.keyup(
				function(e){
					ct.searchTable(searchField.val());
					
					if(e.which == 13){
						e.preventDefault();
					}
				}
			);
			
			searchField.keypress(
				function(e){
					if(e.which == 13){
						e.preventDefault();
					}
				}
			);
		}
	}
	
	ChameleonTable.prototype.pageTable = function(pageNumber){
		if(this.pagingCallbackFunction){
			this.pagingCallbackFunction.call(this, this.tableId+"_tableContent", this.serverUrl, pageNumber, this.formname);									//do server call
		}
		return false;
	}
	
	ChameleonTable.prototype.changeTableSize = function(newPageSize){
		if(this.changePageSizeCallbackFunction){
			this.changePageSizeCallbackFunction.call(this, this.tableId+"_tableContent", this.serverUrl, newPageSize, this.formname);									//do server call
		}
		return false;
	}
	
	ChameleonTable.prototype.searchTable = function(searchString){
		if(this.searchCallbackFunction){
			
			if(this.searchTimer){
				clearTimeout(this.searchTimer);
			}
			
			var ct = this;
			
			this.searchTimer = setTimeout(function(){
				ct.searchCallbackFunction.call(ct, ct.tableId+"_tableContent", ct.serverUrl, searchString, this.formname);
			}, this.searchDelay);
			
		}	
	}
	
	
	ChameleonTable.prototype.sortTable = function(columnIndex, fieldName){
		if(this.sortingCallbackFunction){

			this.sortingCallbackFunction.call(this, this.tableId+"_tableContent", this.serverUrl, fieldName, this.formname);																												//do server side call
		}
	}
	
	ChameleonTable.prototype.setPaging = function(paging){
		this.paging = paging;
	}
	
	
	ChameleonTable.prototype.setServerUrl = function(url){
		this.serverUrl = url;
	}
	
	ChameleonTable.prototype.setPagingCallbackFunction = function(func){
		this.pagingCallbackFunction = func;
	}
	
	
	ChameleonTable.prototype.setSortingCallbackFunction = function(func){
		this.sortingCallbackFunction = func;
	}
	
	ChameleonTable.prototype.setSearchCallbackFunction = function(func){
		this.searchCallbackFunction = func;
	}
	
	ChameleonTable.prototype.setChangePageSizeCallbackFunction = function(func){
		this.changePageSizeCallbackFunction = func;
	}
	
	ChameleonTable.prototype.setFormname = function(formname){
		this.formname = formname;
	}
	
	/**
	 * DON.
	 */
	ChameleonTable.prototype.cloneElement = function(cloneTarget,cloneTargetParent) {
		
		var originalElement = $(cloneTargetParent).find(cloneTarget+':eq(0)');
		var elementCount = $(cloneTargetParent).find(cloneTarget).length;
		var lastMatchingElement = $(cloneTargetParent).find(cloneTarget+':eq('+(elementCount-1)+')');
		
		var clonedElement = originalElement.clone();

		$(clonedElement).find('input').each(function() {
			var inputId = $(this).attr('id');
			if(inputId){
				var inputIdBase = inputId.replace(/\d+/g, '');
				$(this).attr('id',inputIdBase+elementCount);
				$(this).attr('value','');
			}
		});
		
		var clonedElemenId = clonedElement.attr('id');
		var clonedElemenIdBase = clonedElemenId.replace(/\d+/g, '');
		clonedElement.attr('id',clonedElemenIdBase+(elementCount+1))
		
		clonedElement.insertAfter(lastMatchingElement);
	}
/**
 * FRONT-END DEVS: the purpose of this object was to provide an abstraction layer
 * around the ChameleonTable.js object so that we could implement server side searching and
 * sorting across the different back-end (e.g Sales, Banking, etc) systems whilst keeping
 * the core front-end search/sort components generic (i.e the ChameleonTable js object
 * provides the common generic front-end search/sort functionality and this layer is where
 * you would specify the server details for each of the various back-ends).
 * 
 * However since it now appears that each of the different applications (Sales, Banking, etc)
 * wont be sharing a common front-end code base, this object can probably be removed and the
 * functionality moved entirely to the ChameleonTable js object...
 * 
 * M.G
 */

	var MammothTableUtility = {
			
			
		changeTableSize : function(targetDivId, url, pageSize, formname){
			url += "&changePageSize=" + pageSize;
			if(formname){
				MammothTableUtility.submitForm(formname, url, targetDivId);
			}else{
				fnb.controls.controller.eventsObject.raiseEvent('loadUrlToTarget',{url:url, target:'#'+targetDivId, preLoadingCallBack:MammothTableUtility.prepareActionMenuNotToClose,postLoadingCallBack:MammothTableUtility.resetActionMenu});
			}
		},
			
		sortTable : function(targetDivId, url, methodName, formname){
			url += "&sortingMethodName=" + methodName;
			if(formname){
				MammothTableUtility.submitForm(formname, url, targetDivId);
			}else{
				fnb.controls.controller.eventsObject.raiseEvent('loadUrlToTarget',{url:url, target:'#'+targetDivId, preLoadingCallBack:MammothTableUtility.prepareActionMenuNotToClose,postLoadingCallBack:MammothTableUtility.resetActionMenu});
			}
		},

		pageTable : function(targetDivId, url, pageNumber, formname){
			url += "&goToPage=" + pageNumber;

			console.log('pageTable>>>>>>>> '+url)
			if(formname){
				MammothTableUtility.submitForm(formname, url, targetDivId);
			}else{
				fnb.controls.controller.eventsObject.raiseEvent('loadUrlToTarget',{url:url, target:'#'+targetDivId, preLoadingCallBack:MammothTableUtility.prepareActionMenuNotToClose,postLoadingCallBack:MammothTableUtility.resetActionMenu});
			}
		}, 
		
		
		searchTable : function(targetDivId, url, searchStr, formname){
			url += "&searchTableByValue=" +((searchStr && searchStr != "") ? searchStr : "noSearchValueEntered");
			if(formname){
				MammothTableUtility.submitForm(formname, url, targetDivId);
			}else{
				fnb.controls.controller.eventsObject.raiseEvent('loadUrlToTarget',{url:url, target:'#'+targetDivId, preLoadingCallBack:MammothTableUtility.prepareActionMenuNotToClose,postLoadingCallBack:MammothTableUtility.resetActionMenu});
			}
		},	
		
		submitForm : function(formname, url, targetDivId){
			MammothTableUtility.prepareForm(formname, url);
			if(fnb.hyperion.utils.eziPanel.active==true){
				fnb.controls.controller.eziSubmitForm(formname, '#'+targetDivId, MammothTableUtility.prepareActionMenuNotToClose,MammothTableUtility.resetActionMenu);
			}else{
				fnb.controls.controller.submitForm(formname, '#'+targetDivId, MammothTableUtility.prepareActionMenuNotToClose,MammothTableUtility.resetActionMenu, '', {keepFooter:true});
			}
			
			MammothTableUtility.resetForm(formname);
			
		},
		
		prepareForm : function(formname, url) {
			form = $("#"+formname);
			form.attr("action",url); 
			nav = $("#nav");
			if(nav){
				nav.attr("name","notUsedForPaging");
			}
			return true;
		},
		
		resetForm : function(formname) {
			form = $("#"+formname);
			form.attr("action","/banking/Controller");
			nav = $("#nav");
			nav.attr("name","nav");
			return true;
		},
		
		prepareActionMenuNotToClose : function() {
			//_actionMenu.isPaging = true;
			//return true;
		},
		
		resetActionMenu : function() {
			//_actionMenu.isPaging = false;
			//return true;
		}
		
	};