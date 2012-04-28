define([
	'modelTab'
], function( Tab ){
  "use strict";
  
	var Tabs = Backbone.Collection.extend({

		model: Tab,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id;
	    }

	  });

	return Tabs;
});