define([
	'searchableCollection',
	'modelInstrument'
], function( SearchableCollection, Instrument ){
  "use strict";
  
	var Instruments = SearchableCollection.extend({

		model: Instrument,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id; //item.get("name").toLowerCase();
	    }

	  });

	return Instruments;
});