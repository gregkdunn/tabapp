
define([
	'searchableCollection',
	'modelTimeSignature'
], function( SearchableCollection, TimeSignature ){
  "use strict";
  
	var TimeSignatures = SearchableCollection.extend({

		model: TimeSignature,

		initialize: function( options ){
		},

		comparator: function(item) {
	        return item.id;
	    }

	  });

	return TimeSignatures;
});