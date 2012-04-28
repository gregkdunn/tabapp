define([
	'searchableCollection',
	'modelAccent'
], function( SearchableCollection, Accent ){
	"use strict";
	
	var Accents = SearchableCollection.extend({

		model: Accent,

		initialize: function( options ){
		},

		comparator: function(item) {
					return item.id; //item.get("name").toLowerCase();
			}

		});

	return Accents;
});