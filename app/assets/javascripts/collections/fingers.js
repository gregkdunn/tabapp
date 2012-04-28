define([
	'searchableCollection',
	'modelFinger'
], function( SearchableCollection, Finger ){
  "use strict";
  
	var Fingers = SearchableCollection.extend({

		model: Finger,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id; //item.get("name").toLowerCase();
	    }

	  });

	return Fingers;
});