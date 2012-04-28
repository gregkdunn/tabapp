define([
	'modelState'
], function( State ){
  "use strict";
  
	var States = Backbone.Collection.extend({

		model: State,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id; //item.id; //item.get("name").toLowerCase();
	    }

	  });

	return States;
});