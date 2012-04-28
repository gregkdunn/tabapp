define([
	'searchableCollection',
	'modelChord'
], function( SearchableCollection, Chord ){
  "use strict";
  
	var Chords = SearchableCollection.extend({

		model: Chord,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id; //item.get("name").toLowerCase();
	    }

	  });

	return Chords;
});