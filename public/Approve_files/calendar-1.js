
(function (window, undefined) {
	var now = new Date(),
		today = [now.getFullYear(), now.getMonth(), now.getDate()].join('-'),
		midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
		newMidnight = '',
		defaultDate = '',
		d = window.document;

	function Calendar(options) {
		this.version = "1.5";
		this.isOpen = false;
		this.focus = false;
		this.id = null;
		this.container = null;
		this.element = null;
		this.selectedDate = null;
		this.opts = {
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
			day: new Date().getDate(),
			dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			startDay: 0,
			weekNumbers: false,
			selectOtherMonths: false,
			showOtherMonths: true,
			showNavigation: true,
			months: 1,
			future: 3,
			past: 101,
			inline: false,
			disablePast: false,
			dateFormat: 'Y-m-d',
			position: 'bottom',
			selectedDate: null,
			minDate: null,
			setCustomDate: true,
			noticeDays: 0,
			onBeforeOpen: function () {},
			onBeforeClose: function () {},
			onOpen: function () {},
			onClose: function () {},
			onSelect: function () {},
			onBeforeShowDay: function () {
				return [true, ''];
			}
		};
		for (var key in options) {
			if (options.hasOwnProperty(key)) {
				this.opts[key] = options[key];
			}
		}
		this.init.call(this);
	}
	/* Static functions */
	Calendar.Util = {
		addClass: function (ele, cls) {
			if (ele && !this.hasClass(ele, cls)) {
				ele.className += ele.className.length > 0 ? " " + cls : cls;
			}
		},
		hasClass: function (ele, cls) {
			if (ele && typeof ele.className != 'undefined' && typeof ele.nodeType != 'undefined' && ele.nodeType === 1) {
				return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
			}
			return false;
		},
		removeClass: function (ele, cls) {
			if (this.hasClass(ele, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				ele.className = ele.className.replace(reg, ' ');
			}
		},
		addEvent: function (obj, type, fn) {
			if(type=="click"&&_isMobile) type = "touchend"; 
			
			$(obj).on(type, fn);
			/*if (obj.addEventListener) {
				obj.addEventListener(type, fn, false);
			} else if (obj.attachEvent) {
				obj["e" + type + fn] = fn;
				obj[type + fn] = function () {
					obj["e" + type + fn](window.event);
				};
				obj.attachEvent("on" + type, obj[type + fn]);
			} else {
				obj["on" + type] = obj["e" + type + fn];
			}*/
		},
		getElementsByClass: function (searchClass, node, tag) {
			var classElements = [];
			if (node === null) {
				node = d;
			}
			if (tag === null) {
				tag = '*';
			}
			var els = node.getElementsByTagName(tag);
			var elsLen = els.length;
			var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
			for (var i = 0, j = 0; i < elsLen; i++) {
				if (pattern.test(els[i].className)) {
					classElements[j] = els[i];
					j++;
				}
			}
			return classElements;
		},
		getEventTarget: function (e) {
			var targ;
			if (!e) {
				e = window.event;
			}
			if (e.target) {
				targ = e.target;
			} else if (e.srcElement) {
				targ = e.srcElement;
			}
			if (targ.nodeType == 3) {
				targ = targ.parentNode;
			}	
			return targ;
		}
	};
	/* Private functions */
	function emptyRow(weekNumbers) {
		var i, cell, cols = weekNumbers ? 8 : 7,
			row = d.createElement('tr');
    	for (i = 0; i < cols; i++) {
    		cell = d.createElement('td');
    		Calendar.Util.addClass(cell, 'bcal-empty');
    		row.appendChild(cell);
    	}
    	return row;
	}
	/**
	 * @param Object obj
	 * @return Array
	 */
	function findPos(obj) {
		var curleft = 0, curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return [curleft, curtop];
		}
	}
	/**
	 * @param Number i
	 * @param Number month
	 * @return Number
	 */
	function getIndex(i, months) {
		if (i > 0 && i < months - 1) {
			return 0;
		} else if (i > 0 && i === months - 1) {
			return 2;
		} else if (i === 0 && i === months - 1) {
			return 3;
		} else if (i === 0 && i < months - 1) {
			return 1;
		}
	}
	/**
	 * Format date
	 * 
	 * @param String format
	 * @param Number date
	 * @return String
	 */
	function _formatDate(format, date) {
		
		function pad(input) {
			return (input + "").length === 2 ? input : "0" + input;
		}
		
		var i, len, f, 
			output = [], 
			dt = new Date(date);
		for (i = 0, len = format.length; i < len; i++) {
			f = format.charAt(i);
			switch (f) {
			case 'Y':
				output.push(dt.getFullYear());
				break;
			case 'y':
				output.push((dt.getFullYear() + "").slice(-2));
				break;
			case 'm':
				output.push(pad(dt.getMonth() + 1));
				break;
			case 'n':
				output.push(dt.getMonth() + 1);
				break;
			case 'F':
				output.push(this.opts.monthNamesFull[dt.getMonth()]);
				break;
			case 'M':
				output.push(this.opts.monthNames[dt.getMonth()]);
				break;
			case 'd':
				output.push(pad(dt.getDate()));
				break;
			case 'j':
				output.push(dt.getDate());
				break;
			case 'D':
				output.push(this.opts.dayNamesFull[dt.getDay()].slice(0, 3));
				break;
			case 'l':
				output.push(this.opts.dayNamesFull[dt.getDay()]);
				break;
			default:
				output.push(f);
			}
		}
		return output.join("");
	}
	
	function is(type, obj) {
		var clas = Object.prototype.toString.call(obj).slice(8, -1);
	    return obj !== undefined && obj !== null && clas === type;
	}
	
	Calendar.prototype = {
		/**
		 * @return Instance of calendar
		 */
		init: function () {
			var self = this,
				i = 0, attrname,
				body = d.getElementsByTagName("body")[0],
				div = d.createElement('div');
				innerDiv = d.createElement('div');
				backgroundDiv = d.createElement('div');

				buttonIconDiv = d.createElement('div');
				buttonIcon2Div = d.createElement('div');
				buttonIcon3Div = d.createElement('div');
				buttonIcon4Div = d.createElement('div');
				buttonIcon5Div = d.createElement('div');
				
				cancelButtonDiv = d.createElement('div');
				cancelButtonText = d.createElement('p');

				cancelHolidayButtonDiv = d.createElement('div');
				confirmHolidayButtonDiv = d.createElement('div');
				cancelHolidayButtonText = d.createElement('p');
				confirmHolidayButtonText = d.createElement('p');
				
				confirmHolidayTextDiv = d.createElement('div');
				confirmHolidayText = d.createElement('p');
				
			if(self.opts.selectedDate){
				var customYear = self.opts.year;
				var customMonth = self.opts.month;
				var customDay = self.opts.day;
				today =self.opts.selectedDate;
			}
			if(self.opts.selectedDate && self.opts.noticeDays){
				var newDate = new Date();
				newDate.setDate(newDate.getDate()+parseInt(self.opts.noticeDays)-1);
				defaultDate = [newDate.getFullYear(), (newDate.getMonth()+1) < 9 ? '0'+(newDate.getMonth()+1):(newDate.getMonth()+1), newDate.getDate()].join('-');
			}
			
			self.noticeDayCount = 0;
			self.id = Math.floor(Math.random() * 9999999);
			self.element = d.getElementById(self.opts.element);
			if (!self.element) {
				return;
			}
			if (self.element.nodeType === 1 && self.element.nodeName == "INPUT" && self.element.value.length > 0) {
				var now = new Date(self.element.value);
				self.selectedDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
				self.opts.year = self.selectedDate.getFullYear();
				self.opts.month = self.selectedDate.getMonth();
			}
			newMidnight = new Date(self.opts.selectedDate);
			self.element.style.cursor = 'pointer';
			div.setAttribute('id', ['bcal-container', self.id].join('-'));
			innerDiv.setAttribute('id', ['inner-bcal-container', self.id].join('-'));
			
			cancelButtonDiv.setAttribute('id', 'calendarCancelButton');
			
			confirmHolidayButtonDiv.setAttribute('id', 'confirmHolidayButton');
			cancelHolidayButtonDiv.setAttribute('id', 'cancelHolidayButton');

			confirmHolidayTextDiv.setAttribute('id', 'confirmHolidayTextWrapper');
			
			backgroundDiv.setAttribute('id', ['backgound-bcal-container', self.id].join('-'));
			Calendar.Util.addClass(div, 'bcal-container');
			Calendar.Util.addClass(innerDiv, 'inner-bcal-container');
			Calendar.Util.addClass(backgroundDiv, 'background-bcal-container');
			
			Calendar.Util.addClass(buttonIconDiv, 'calendarButtonIcon');
			Calendar.Util.addClass(buttonIcon2Div, 'calendarButtonIcon');
			Calendar.Util.addClass(buttonIcon3Div, 'calendarButtonIcon');
			Calendar.Util.addClass(buttonIcon4Div, 'calendarButtonIcon');
			Calendar.Util.addClass(buttonIcon5Div, 'calendarButtonIcon');
			Calendar.Util.addClass(cancelButtonDiv, 'calendarCancelButton');
			Calendar.Util.addClass(confirmHolidayButtonDiv, 'calendarOKButton hideElement');
			Calendar.Util.addClass(cancelHolidayButtonDiv, 'calendarHolidayCancelButton hideElement');
			Calendar.Util.addClass(confirmHolidayTextDiv, 'confirmHolidayText hideElement');
				
			cancelButtonDiv.appendChild(buttonIconDiv);
			cancelButtonText.appendChild(document.createTextNode('Cancel'));
			cancelButtonDiv.appendChild(cancelButtonText);
			
			confirmHolidayButtonDiv.appendChild(buttonIcon3Div);
			confirmHolidayButtonText.appendChild(document.createTextNode('OK'));
			confirmHolidayButtonDiv.appendChild(confirmHolidayButtonText);
						
			cancelHolidayButtonDiv.appendChild(buttonIcon4Div);
			cancelHolidayButtonText.appendChild(document.createTextNode('Cancel'));
			cancelHolidayButtonDiv.appendChild(cancelHolidayButtonText);
			
			confirmHolidayText.appendChild(document.createTextNode('Date entered is a Sunday or public holiday. Payments may be delayed and only processed on the next business day. Would you like to continue?'));
			confirmHolidayTextDiv.appendChild(confirmHolidayText);
			
			/* YearPicker */
			var datepickerTime = new Date();
			var datepickerYear =datepickerTime.getFullYear();
			var currentDatepickerYear =datepickerTime.getFullYear();
			
			var dropdownWrapper = $('<div id="yearPicker_calendar"><div class="gridCol grid100 dropdown-select dropdownElementWrapper"></div></div>');
			var dropdownInitiator = $('<div id="yearPicker_dropId" class="dropdown-initiator"><div class="dropdown-trigger"></div><div class="dropdown-selection-white clearfix"><div class="dropdown-item-row-h1"><div class="dropdown-h1">'+ self.opts.year+'</div></div><div class="dropdown-item-row-h2"><div class="dropdown-h2"></div></div></div></div>')
			var dropdownContentWrapper = $('<div class="dropdown-content-wrapper"><input type="hidden" id="yearPicker" name="yearPicker" value="'+ self.opts.year+'" class="dropdown-hidden-input"><ul class="dropdown-content" data-labelwidth="40" data-selectwidth="60"></ul></div>');

			dropdownInitiator.attr('onclick',"fnb.forms.dropdown.expand($(this),1,'','','','true')").bind('click');
			
			var date = datepickerYear - parseInt(self.opts.past); 
			var future = datepickerYear +parseInt(self.opts.future);
			
			do {
				date++;
				var selectedClass = '';
				if(date ==  self.opts.year) selectedClass = ' selected-item';
				$('<li class="dropdown-item clearfix'+selectedClass+'" data-value="' +date+ '"><div class="dropdown-item-row-h1"><div class="dropdown-h1">' +date+ '</div></div><div class="dropdown-item-row-h2"><div class="dropdown-h2"></div></div></li>').prependTo(dropdownContentWrapper.find('.dropdown-content'))
			}
			while (date < future);
			dropdownContentWrapper.find('.dropdown-content li').attr('onclick',"_datePicker.updateYear(this);").bind('click');
			
			dropdownContentWrapper.appendTo(dropdownWrapper.find('.dropdownElementWrapper'))
			dropdownInitiator.appendTo(dropdownWrapper.find('.dropdownElementWrapper'))
			
			/* YearPicker End*/
			if (!self.opts.inline) {
				//div.style.display = 'none';
				//div.style.position = 'absolute';
				Calendar.Util.addEvent(self.element, 'focus', function (e) {
					if (self.isOpen) {
						self.close();
					} else {
						self.open();
					}
				});
				Calendar.Util.addEvent(self.element, 'blur', function (e) {
					if (self.isOpen && !self.focus) {
						self.close();
					}
				});
				Calendar.Util.addEvent(self.element, 'keydown', function (e) {
					var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
					switch (key) {
						case 9: //Tab
							self.close();
							break;
						case 27: //Escape
							self.close();
							break;
					}
				});
				Calendar.Util.addEvent(document, "mousedown", function (e) {

					var target = Calendar.Util.getEventTarget(e);				
					if (target == self.element) {
						innerDiv.style.display = 'block';
						div.style.display = 'block';
					} else {
						//innerDiv.style.display = 'none';
						//div.style.display = 'none';
						//self.close();
					}
				});
				
				backgroundDiv.appendChild(confirmHolidayTextDiv);
				div.appendChild(backgroundDiv);
				div.appendChild(innerDiv);
				div.appendChild(cancelButtonDiv);
				div.appendChild(confirmHolidayButtonDiv);
				div.appendChild(cancelHolidayButtonDiv);

				$('#dateOverlay').find('.datePickerInner').html(div);
				
				//fnb.hyperion.controller.datePickerElement.add(div);  
				//body.appendChild(div);
				
				dropdownWrapper.appendTo('div[id^="bcal-container"]');
			} else {

				backgroundDiv.appendChild(confirmHolidayTextDiv);
				div.appendChild(backgroundDiv);
				div.appendChild(innerDiv);
				div.appendChild(cancelButtonDiv);
				div.appendChild(confirmHolidayButtonDiv);
				div.appendChild(cancelHolidayButtonDiv);
				self.element.appendChild(div);
				dropdownWrapper.appendTo('div[id^="bcal-container"]');
				
				//$('#eziPageContent').append(div);
			}
			self.container = innerDiv;
			var y = self.opts.year, m = self.opts.month;
			for (i = 0; i < self.opts.months; i++) {
				self.draw(y, parseInt(m) + i, getIndex(i, self.opts.months));
			} 
			return self;
		},
		/**
		 * @param String format
		 * @param Number date
		 * @return String
		 */
		formatDate: function () {
			return _formatDate.apply(this, arguments);
		},
		/**
		 * @param Number year
		 * @param Number month
		 * @param Number index (0 - without navigation, 1 - prev navigation, 2 - next navigation, 3 - prev and next navigation)
		 * @param Number id
		 */
		draw: function (year, month, index, id) {
			var self = this,
				autoId = typeof id === 'undefined' ? Math.floor(Math.random() * 9999999) : id,
				firstOfMonth = new Date(year, month, 1),
				daysInMonth = new Date(year, month + 1, 0).getDate(),
				daysInPrevMonth = new Date(year, month, 0).getDate(),
				startDay = firstOfMonth.getUTCDay(),
				first = firstOfMonth.getDay(),
				i, day, date, rows = 0, cols = self.opts.weekNumbers ? 8 : 7,
				table = d.createElement('table'),
				thead = d.createElement('thead'),
				tbody = d.createElement('tbody'),
				row, cell, text, yearVar, a, b, jsdate, current, oBsd,
				s_arr, si, slen,
				minDate = false;
			
			if (self.opts.minDate !== null) {
				minDate = true;
			}

			decreaseYearDiv = d.createElement('div');
			decreaseMonthNameDiv = d.createElement('div');
			Calendar.Util.addClass(decreaseYearDiv, "bcal-yearNameDecrease");
			Calendar.Util.addClass(decreaseMonthNameDiv, "bcal-monthNameDecrease");
			
			row = d.createElement('tr');
			// Prev month link
			cell = d.createElement('th');
			if (self.opts.showNavigation && (index === 1 || index === 3)) {
				Calendar.Util.addEvent(cell, 'click', function (e) {
					self.container.innerHTML = '';
					for (i = 0; i < self.opts.months; i++) {
						self.draw(year, month - self.opts.months + i, getIndex(i, self.opts.months));
						if (i === 0) {
							self.opts.month = month - self.opts.months;
							self.opts.year = year;
						}
					}
				});
				cell.style.cursor = 'pointer';
				Calendar.Util.addClass(cell, "bcal-nav-left");
				var prevMonthIndex = firstOfMonth.getMonth()-1;
				var currentYear = firstOfMonth.getFullYear();
				if(prevMonthIndex<0){
					prevMonthIndex = 11;
					currentYear = currentYear-1;
				}else if(prevMonthIndex>11){
					prevMonthIndex = 0;
					currentYear = currentYear+1;
				}
				text = d.createTextNode(self.opts.monthNamesFull[prevMonthIndex]);
				yearVar = d.createTextNode(currentYear);
				decreaseYearDiv.appendChild(yearVar);
				decreaseMonthNameDiv.appendChild(text);
				cell.appendChild(decreaseYearDiv);
				cell.appendChild(decreaseMonthNameDiv);
			} else {
				Calendar.Util.addClass(cell, "bcal-navi");
			}
			row.appendChild(cell);
			
			// Month name, Year
			cell = d.createElement('th');
			monthCell = d.createElement('th');
			cenCell = d.createElement('th');
			yearCell = d.createElement('th');
			yearDiv = d.createElement('div');
			increaseYearDiv = d.createElement('div');
			increaseMonthNameDiv = d.createElement('div');
			cell.colSpan = (cols === 7) ? 5 : 6;
			Calendar.Util.addClass(cell, "bcal-month");
			Calendar.Util.addClass(monthCell, "bcal-monthName");
			Calendar.Util.addClass(yearCell, "bcal-yearName");
			Calendar.Util.addClass(increaseYearDiv, "bcal-yearNameIncrease");
			Calendar.Util.addClass(increaseMonthNameDiv, "bcal-monthNameIncrease");
			Calendar.Util.addClass(cenCell, "bcal-cenName");
			Calendar.Util.addClass(yearDiv, "bcal-yearDiv");
			
			monthCell.appendChild(d.createTextNode(self.opts.monthNamesFull[firstOfMonth.getMonth()]));
			var fullYear = new String(firstOfMonth.getFullYear());
			var cen = fullYear.substring ( 0, 2 );
			var ye = fullYear.substring ( 2, 4 );

			yearCell.appendChild(d.createTextNode(ye));
			cenCell.appendChild(d.createTextNode(cen));
			yearDiv.appendChild(cenCell);
			yearDiv.appendChild(yearCell);
			cell.appendChild(monthCell);
			cell.appendChild(yearDiv);
			//cell.appendChild(d.createTextNode(self.opts.monthNamesFull[firstOfMonth.getMonth()] + ' ' + firstOfMonth.getFullYear()));
			row.appendChild(cell);

			// Next month link
			cell = d.createElement('th');
			if (self.opts.showNavigation && (index === 2 || index === 3)) {
				cell.style.cursor = 'pointer';
				Calendar.Util.addClass(cell, "bcal-nav-right");
				var increaseMonthName = firstOfMonth.getMonth()+1;
				if(increaseMonthName>11) increaseMonthName = 0;
				text = d.createTextNode(self.opts.monthNamesFull[increaseMonthName]);
				yearVar = d.createTextNode(firstOfMonth.getFullYear());
				increaseYearDiv.appendChild(yearVar);
				increaseMonthNameDiv.appendChild(text);
				Calendar.Util.addEvent(cell, 'click', function (e) {
					self.container.innerHTML = '';
					for (i = 0; i < self.opts.months; i++) {
						self.draw(year, month + i + 1, getIndex(i, self.opts.months));
						if (i === 0) {
							self.opts.month = month + 1;
							self.opts.year = year;
						}
					}
				});
				cell.appendChild(increaseYearDiv);
				cell.appendChild(increaseMonthNameDiv);
			} else {
				Calendar.Util.addClass(cell, "bcal-navi");
			}
			row.appendChild(cell);
			thead.appendChild(row);
			
			row = d.createElement('tr');
			if (self.opts.weekNumbers) {
				cell = d.createElement('th');
				cell.appendChild(d.createTextNode('wk'));
				Calendar.Util.addClass(cell, "bcal-wnum");
				row.appendChild(cell);
			}
					
			for (i = 0; i < 7; i++) {
				cell = d.createElement('th');
				text = d.createTextNode(self.opts.dayNames[(self.opts.startDay + i) % 7]);
				Calendar.Util.addClass(cell, "bcal-wday");
				cell.appendChild(text);
				row.appendChild(cell);
			}
			thead.appendChild(row);
			table.appendChild(thead);
			
			day = self.opts.startDay + 1 - first;
			while (day > 1) {
	    	    day -= 7;
	    	}
	    	while (day <= daysInMonth) {
	    		jsdate = new Date(year, month, day + startDay);
	    	    row = d.createElement('tr');
	    	    if (self.opts.weekNumbers) {
	    	    	cell = d.createElement('td');
	    	    	Calendar.Util.addClass(cell, 'bcal-week');
	    	    	a = new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate() - (jsdate.getDay() || 7) + 3);
	    	    	b = new Date(a.getFullYear(), 0, 4);
	    	    	cell.appendChild(d.createTextNode(1 + Math.round((a - b) / 864e5 / 7)));
	    	    	row.appendChild(cell);
	    	    }
	    	    for (i = 0; i < 7; i++) {
	    	    	cell = d.createElement('td');
	    	    	if (day > 0 && day <= daysInMonth) {
	    	    		current = new Date(year, month, day);
						
	    	    		cell.setAttribute('bcal-date', current.getTime());
						
						if(i==0||i==6){	
								Calendar.Util.addClass(cell, 'bcal-date-weekend');
						}else{
								Calendar.Util.addClass(cell, 'bcal-date');
						}

						var currentDateNumber = current.getDate();
						var currentDateString = ''+currentDateNumber;
						if(currentDateString.length<2){
							currentDateString = '0'+currentDateString;
						}
						
						var currentMonthNumber = current.getMonth()+1;
						var currentMonthString = ''+currentMonthNumber;
						if(currentMonthString.length<2){
							currentMonthString = '0'+currentMonthString;
						}

	    	    		if (today === [current.getFullYear(), currentMonthString, currentDateString].join('-')) {
		    	    			Calendar.Util.addClass(cell, 'bcal-today');
	    	    		}
	    	    		
	    	    		if(self.opts.noticeDays>0 && newMidnight != '')
	    	    			{midnight = newMidnight;
	    	    			if(defaultDate != '')
	    	    				{midnight = new Date(defaultDate);
	
	    	    				}
	    	    			}
	    	    		
	    	    		
	    	    		text = d.createTextNode(day);
	    	    		cell.appendChild(text);
	    	    		oBsd = self.opts.onBeforeShowDay.apply(self, [current]);
	    	    		if (self.opts.disablePast === true && current < midnight) {
	    	    			Calendar.Util.addClass(cell, 'bcal-past');
	    	    		} else if (minDate && current < self.opts.minDate) {
	    	    			Calendar.Util.addClass(cell, 'bcal-past');
	    	    		} else if (oBsd[0] === false) {
	    	    			Calendar.Util.addClass(cell, oBsd[1]);
	    	    		} else {
	    	    			self.bind.call(self, cell);
						}
	    	    		
	    	    	} else {
	    	    		if (self.opts.showOtherMonths) {
	    	    			var _day = day > 0 ? day - daysInMonth: daysInPrevMonth + day,
	    	    				_month = day > 0 ? month + 1 : month - 1;
	    	    			text = d.createTextNode(_day);
	    	    			cell.appendChild(text);
	    	    			
	    	    			current = new Date(year, _month, _day);
		    	    		cell.setAttribute('bcal-date', current.getTime());
	    	    			
	    	    			if (self.opts.selectOtherMonths) {
	    	    				self.bind.call(self, cell);
	    	    			}
	    	    		}
	    	    		Calendar.Util.addClass(cell, 'bcal-empty');
	    	    	}

					var selectedDateSplit = self.opts.selectedDate.split("-");
					var selectedTime = new Date(selectedDateSplit[0],(parseInt(selectedDateSplit[1])-1),selectedDateSplit[2]).getTime()
	    	    	if (self.opts.selectedDate !== null &&  selectedTime == current.getTime()&& (parseInt(selectedDateSplit[1])-1) == month) {
	    	    		Calendar.Util.addClass(cell, 'bcal-selected');
	    	    	}
	    	    	row.appendChild(cell);
	        	    tbody.appendChild(row);
	    	    	day++;
	    	    }
	    	    rows++;
	    	}
	    	if (rows === 5)	{
	    		tbody.appendChild(emptyRow(self.opts.weekNumbers));
	    	} else if (rows === 4) {
	    		tbody.appendChild(emptyRow(self.opts.weekNumbers));
	    		tbody.appendChild(emptyRow(self.opts.weekNumbers));
	    	}
			
			Calendar.Util.addClass(table, 'bcal-table');
			table.setAttribute('id', ['bcal-table', autoId].join('-'));
			table.appendChild(tbody);
			
			Calendar.Util.addEvent(table, 'click', function (e) {
				self.focus = true;
			});
			
			var tbl = d.getElementById(['bcal-table', autoId].join('-'));
			if (tbl) {
				self.container.removeChild(tbl);
			}
			self.container.appendChild(table);
		},
		bind: function (cell) {
			var self = this,
				s_arr, si, slen;
			Calendar.Util.addEvent(cell, 'click', (function (self, cell) {
    			return function () {

    				s_arr = Calendar.Util.getElementsByClass('bcal-selected', self.container, 'td');
    				for (si = 0, slen = s_arr.length; si < slen; si++) {
    					Calendar.Util.removeClass(s_arr[si], 'bcal-selected');
    				}
    				Calendar.Util.addClass(cell, 'bcal-selected');
    				var ts = parseInt(cell.getAttribute('bcal-date'), 10);
    				self.selectedDate = new Date(ts);
    				self.opts.year = self.selectedDate.getFullYear();
    				self.opts.month = self.selectedDate.getMonth();
					self.opts.day = self.selectedDate.getDate();
	    			if (self.opts.element && !self.opts.inline) {
    	    			//self.close();
    	    			self.element.value = self.formatDate(self.opts.dateFormat, ts);
	    			}
	    			self.opts.onSelect.apply(self, [self.element, self.formatDate(self.opts.dateFormat, ts), ts, cell]);
	    			//self.refresh.call(self);
    			};
    		})(self, cell));
		},
		/**
		 * @return Instance of calendar
		 */
		open: function () {
			var self = this,
				pos = findPos(self.element),
				result;
			result = self.opts.onBeforeOpen.apply(self, []);
			if (result === false) {
				return self;
			}
			switch (self.opts.position) {
				case 'bottom':
					self.container.style.top = (pos[1] + self.element.offsetHeight) + 'px';
					break;
				case 'top':
					self.container.style.display = '';
					self.container.style.top = (pos[1] - self.container.offsetHeight) + 'px';
					break;
			}
			self.container.style.left = pos[0] + 'px';			
			self.container.style.display = '';
			self.opts.onOpen.apply(self, [self.element]);
			self.isOpen = true;
			self.focus = true;
			return self;
		},
		/**
		 * @return Instance of calendar
		 */
		close: function () {
			var self = this,
				result;
			result = self.opts.onBeforeClose.apply(self, []);
			if (result === false) {
				return self;
			}
			self.container.style.display = 'none';
			self.opts.onClose.apply(self, []);
			self.isOpen = false;
			self.focus = false;
			return self;
		},
		detach: function () {
			var self = this;
			self.element.style.cursor = 'text';
			self.container.parentNode.removeChild(self.container);
			return self.element;
		},
		option: function (optName) {
			var self = this;
			switch (arguments.length) {
				case 1:
					if (is('String', optName) && self.opts[optName]) {
						return self.opts[optName];
					} else if (is('Object', optName)) {
						for (var x in optName) {
							if (optName.hasOwnProperty(x)) {
								self.opts[x] = optName[x];
							}
						}
					}
					break;
				case 2:
					if (self.opts[optName]) {
						self.opts[optName] = arguments[1];
					}
					break;
			}
			return self;
		},
		refresh: function () {
			var self = this;
			self.container.innerHTML = '';
			var y = self.opts.year, m = self.opts.month;
			for (i = 0; i < self.opts.months; i++) {
				self.draw(y, m + i, getIndex(i, self.opts.months));
			}
			return self;
		}
	};
	return (window.Calendar = Calendar);
})(window);