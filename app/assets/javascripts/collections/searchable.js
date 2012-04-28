define([],
 function( ){
  "use strict";
  
	var SearchableCollection = Backbone.Collection.extend({

	    search : function(letters){
			if(letters == "") return this;

			var pattern = new RegExp(letters,"gi");
			return _(this.filter(function(data) {
			  	return pattern.test(data.get("name"));
			}));
		}

	  });

	return SearchableCollection;
});