define([
	'searchableCollection',
	'modelGranularity'
], function( SearchableCollection, Granularity ){
  "use strict";
  
	var Granularities = SearchableCollection.extend({

		model: Granularity,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id; //item.get("name").toLowerCase();
	    }

	  });

	return Granularities;
});