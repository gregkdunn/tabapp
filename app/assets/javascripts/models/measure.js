define([
], function(){
  "use strict";
  
	var Measure = Backbone.Model.extend({
		defaults: {
			time_signature: 1, 
			instrument: 1,
			state: 1,
	    "accent_positions": [],
	    "chord_positions": [],
	    "finger_positions": [],
	    "fret_positions": []
	  },
    initialize: function() {
    	var that = this,
    	    data = this.get('data');

    	//debug('data:' + data);
    	if(data) {
    	  data = JSON.parse(data);
    	  this.set(data);
    	}

    	this.set({data: {}})
    }
  });

	return Measure;
});