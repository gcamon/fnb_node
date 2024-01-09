///-------------------------------------------///
/// developer: Donovan
///
/// Cookies Object
///-------------------------------------------///
/*EXAMPLE:
	//Setup fnb.hyperion.cookies
	fnb.hyperion.utils.cookies.defaults = {namespace: 'fnb.',expires: 365};
	
	//Get cookie
	fnb.hyperion.utils.cookies.get('userId')
	
	//Set cookies
	var cookies = {
	userId: '8767896787686',
	visitDate: '2014/02/01'
	}
	
	fnb.hyperion.utils.cookies.set(cookies)
*/
(function() {
    ///-------------------------------------------///
	/// Cookies Parent function
	///-------------------------------------------///
	function cookies() {

	};
	///-------------------------------------------///
	/// Cookies Methods
	///-------------------------------------------///
	cookies.prototype = {
		//Cookies defaults wrapper
		defaults:{},
		//Formula for expiry
		expiresMultiplier : 60 * 60 * 24,
		//Do init for cookies
		init: function () {
	  	
		},
		//Set cookie
		set: function (key, value, options) {
			//Test if key is plain object
			if (fnb.hyperion.cookies.utils.isPlainObject(key)) {
				//Loop keys in object and set cookie
				for (var k in key) {
					if (key.hasOwnProperty(k)) this.set(k, key[k], value);
				}
			} else {
				//Do test for options and set defaults
				options = fnb.hyperion.cookies.utils.isPlainObject(options) ? options : { expires: options };
				//Set expiry
				var expires = options.expires !== undefined ? options.expires : (this.defaults.expires || ''),
				    expiresType = typeof(expires);
				//Calculate expiry
				if (expiresType === 'string' && expires !== '') expires = new Date(expires);
				else if (expiresType === 'number') expires = new Date(+new Date + 1000 * this.expiresMultiplier * expires);
				//Expiry to string
				if (expires !== '' && 'toGMTString' in expires) expires = ';expires=' + expires.toGMTString();
				//Setup path
				var path = options.path || this.defaults.path;
				path = path ? ';path=' + path : '';
				//Setup Domain
				var domain = options.domain || this.defaults.domain;
				domain = domain ? ';domain=' + domain : '';
				//Setup Secure
				var secure = options.secure || this.defaults.secure ? ';secure' : '';
				//Setup namespace
				var namespace = options.namespace || this.defaults.namespace ? this.defaults.namespace : '';
				//Set cookie
				document.cookie = fnb.hyperion.cookies.utils.escape(namespace+key) + '=' + fnb.hyperion.cookies.utils.escape(value) + expires + path + domain + secure;

			}

			return this;
		},
		//Remove cookie
		remove: function (keys) {
			//Convert keys to array
			keys = fnb.hyperion.cookies.utils.isArray(keys) ? keys : fnb.hyperion.cookies.utils.toArray(arguments);
			//Test for namespace
			var namespace = this.defaults.namespace ? this.defaults.namespace : '';
			//Loop keys and remove
			for (var i = 0, l = keys.length; i < l; i++) {
				this.set(namespace+keys[i], '', -1);
			}

			return this;
		},
		//Remove cookie
		empty: function () {
			//Empty all cookies
			return this.remove(fnb.hyperion.cookies.utils.getKeys(this.all()));
		},
		//Get cookie
		get: function (keys, fallback) {
			//Setup fallback
			fallback = fallback || undefined;
			//Select all cookies
			var cookies = this.all();
			//Test for namespace
			var namespace = this.defaults.namespace ? this.defaults.namespace : '';
			//Loop retrieve if array
			if (fnb.hyperion.cookies.utils.isArray(keys)) {

				var result = {};

				for (var i = 0, l = keys.length; i < l; i++) {
					var value = namespace+keys[i];
					result[value] = fnb.hyperion.cookies.utils.retrieve(cookies[value], fallback);
				}

				return result;

			} else {
				return fnb.hyperion.cookies.utils.retrieve(cookies[namespace+keys], fallback);
			}
		},
		//Return all cookies
		all: function () {
			//Test for cookies
			if (document.cookie === '') return {};
			
			var cookies = document.cookie.split('; '),
				  result = {};
			//Loop cookies and seelct
			for (var i = 0, l = cookies.length; i < l; i++) {
				var item = cookies[i].split('=');
				result[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
			}

			return result;
		},
		//Test if cookies are enabled
		enabled: function () {
			if (navigator.cookieEnabled) return true;

			var ret = fnb.hyperion.cookies.set('_', '_').get('_') === '_';
			fnb.hyperion.cookies.remove('_');
			return ret;
		},
		//Remove current object from dom
		destroy: function () {
			fnb.tracking.cookies = {};
		}
	};
	
	///-------------------------------------------///
	/// Cookies Util Methods
	///-------------------------------------------///
	cookies.prototype.utils = {
		// Test if the given value an array?
		isArray: Array.isArray || function (value) {
			return Object.prototype.toString.call(value) === '[object Array]';
		},
		// Test the given value a plain object
		isPlainObject: function (value) {
			return !!value && Object.prototype.toString.call(value) === '[object Object]';
		},
		// Convert an array-like object to an array
		toArray: function (value) {
			return Array.prototype.slice.call(value);
		},
		// Get the keys of an object
		getKeys: Object.keys || function (obj) {
			var keys = [],
				 key = '';
			for (key in obj) {
				if (obj.hasOwnProperty(key)) keys.push(key);
			}
			return keys;
		},
		// Escapes characters that are not allowed in cookies.
		escape: function (value) {
			return String(value).replace(/[,;"\\=\s%]/g, function (character) {
				return encodeURIComponent(character);
			});
		},
		// Return fallback if the value is not defined, otherwise return value.
		retrieve: function (value, fallback) {
			return value == null ? fallback : value;
		}
	};
	
	//Namespace cookies
	fnb.namespace('cookies', cookies, true);

})();