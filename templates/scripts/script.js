var SITENAME = SITENAME || {}

SITENAME = {
	'common' : {
		init : function(){
			console.log('Site wide common initialized');
		},
		finalize : function(){			
			console.log('Site wide common finalized');
			
			$('a[href^=#]').smoothmove();
		}
	},
	'body-class' : {
		init : function(){
			console.log('body-class page initialized');
		},
		'body-id' : function(){
			console.log('body-class page with body-id fired');
		},
		category : function(){
			
		}
	}
}

UTIL = {

	fire : function(func,funcname, args){

		var namespace = SITENAME;

		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		}

	},

	loadEvents : function(){

		var bodyId = document.body.id;

		// hit up common first.
		UTIL.fire('common');

		// do all the classes too.
		$.each(document.body.className.split(/\s+/),function(i,classname){
			UTIL.fire(classname);
			UTIL.fire(classname,bodyId);
		});

		UTIL.fire('common','finalize');

	} 

};

$(document).ready(UTIL.loadEvents);