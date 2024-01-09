///-------------------------------------------///
/// developer: Donovan
///
/// XML Builder Object
///-------------------------------------------///
(function() {
	//Clean utility
	function clean(node){
		var l = node.c.length;
		while( l-- ){
			if( typeof node.c[l] == 'object' )
				clean( node.c[l] );
		}
		node.n = node.a = node.c = null;	
	};

	//Format utility
	function format(node, indent, achar, buffer){
		var 
			xml = indent + '<' + node.n,
			nc = node.c.length,
			attr, child, i = 0;
			
		for(attr in node.a)
			xml += ' ' + attr + '="' + node.a[attr] + '"';
		
		xml += nc ? '>' : ' />';

		buffer.push(xml);
			
		if(nc){
			do{
				child = node.c[i++];
				if( typeof child == 'string' ){
					if( nc == 1 )//single text node
						return buffer.push( buffer.pop() + child + '</'+node.n+'>' );					
					else //regular text node
						buffer.push(indent+achar+child);
				}else if( typeof child == 'object' ) //element node
					format(child, indent+achar, achar, buffer);
			}while( i < nc );
			buffer.push(indent + '</'+node.n+'>');
		}
	};
	///-------------------------------------------///
	/// XML Builder Parent function
	///-------------------------------------------///
	function XMLWriter(encoding, version) {
		if(encoding)
			this.encoding = encoding;
		if(version)
			this.version = version;
	};
	///-------------------------------------------///
	/// XML Builder Methods
	///-------------------------------------------///
	XMLWriter.prototype = {
		//Default encoding
		encoding:'ISO-8859-1',
		//XML VERSION
		version:'1.0',
		//Default for,atting
		formatting: 'indented',
		//Default indent char
		indentChar:'\t',
		//Default indetation
		indentation: 1,
		//Default new line char
		newLine: '\n',
		//Var for frame to auto initialize module
		autoInit: false,
		//Do init for tracking
        init: function () {
        	
        },
        //Start a new document
        startDocument: function(standalone){
    		this.close();//cleanup
    		this.stack = [];
    		this.standalone = standalone;
    	},
    	//Get back to the root
    	endDocument: function(){
    		this.active = this.root;
    		this.stack = [ ];
    	},
    	//Set the text of the doctype
    	docType: function(dt){
    		this.doctype = dt;
    	},
    	//Start a new node with this name
    	startElement: function(name, namespace){
    		if( namespace ) name = namespace + ':' + name;
    		
    		var node = { n:name, a:{ }, c: [ ] };
    		
    		if( this.active ){
    			this.active.c.push(node);
    			this.stack.push(this.active);
    		}else
    			this.root = node;
    		this.active = node;
    	},
    	//Go up one node
    	endElement: function(){
    		this.active = this.stack.pop() || this.root;
    	},
    	//Add an attribute to the active node
    	attributeString: function(name, value){
    		if( this.active )
    			this.active.a[name] = value;
    	},
    	//Add a text node to the active node
    	string: function( text ){
    		if( this.active )
    			this.active.c.push(text);
    	},
    	//Shortcut, open an element, write the text and close
    	elementString: function(name, text, namespace){
    		this.startElement(name, namespace);
    		this.string( text );
    		this.endElement();
    	},
    	//Add a text node wrapped with CDATA
    	CDATA: function(text){
    		this.string( '<![CDATA[' + text + ']]>' );
    	},
    	//Add a text node wrapped in a comment
    	comment: function(text){
    		this.string('<!-- ' + text + ' -->');
    	},
    	//Generate the xml string, you can skip closing the last nodes
    	flush: function(){		
    		if(this.stack && this.stack[0]) this.endDocument();
    		
    		var achar = '', indent = '', num = this.indentation,
    			formatting = this.formatting.toLowerCase() == 'indented',
    			buffer = '<&#63;xml version="'+this.version+'" encoding="'+this.encoding+'"';

    			buffer = buffer.replace( '&#63;', '?' );
    			
    		if( this.standalone !== undefined )
    			buffer += ' standalone="'+!!this.standalone+'"';
    		buffer += ' ?>';
    		
    		buffer = [buffer];
    		
    		if( this.doctype && this.root )
    			buffer.push('<!DOCTYPE '+ this.root.n + ' ' + this.doctype+'>'); 
    		
    		if( formatting ){
    			while( num-- )
    				achar += this.indentChar;
    		}
    		
    		if( this.root )	format( this.root, indent, achar, buffer );
    		
    		return buffer.join( formatting ? this.newLine : '' );
    	},
    	//Cleanup
    	close: function(){
    		if( this.root )
    			clean( this.root );
    		this.active = this.root = this.stack = null;
    	},
    	getDocument: window.ActiveXObject
    		? function(){ //MSIE
    			var doc = new ActiveXObject('Microsoft.XMLDOM');
    			doc.async = false;
    			doc.loadXML(this.flush());
    			return doc;
    		}
    		: function(){// Mozilla, Firefox, Opera, etc.
    			return (new DOMParser()).parseFromString(this.flush(),'text/xml');
    	},
        //Remove current object from dom
        destroy: function () {
        	fnb.hyperion.XMLWriter = {};
        }
	};

	//Namespace XMLWriter
	fnb.namespace('XMLWriter', XMLWriter);
})();