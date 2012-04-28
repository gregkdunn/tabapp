define([
	'modelMeasure'
], function( Measure ){
  "use strict";
  
	var Measures = Backbone.Collection.extend({

		model: Measure,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id;
	    }

	  });

	return Measures;
});