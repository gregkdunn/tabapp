define([
	'searchableCollection',
	'modelNote'
], function( SearchableCollection, Notes ){
  "use strict";
  
	var Notess = SearchableCollection.extend({

		model: Notes,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id;
	    }

	  });

	return Notess;
});