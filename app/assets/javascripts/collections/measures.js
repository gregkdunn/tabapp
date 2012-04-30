define([
	'modelMeasure'
], function( Measure ){
  "use strict";
  
	var Measures = Backbone.Collection.extend({

		model: Measure,
		url: '/measures',

		initialize: function( options ){
		},

		comparator: function(item) {
	    return item.id;
	  }


	});

	return Measures;
});