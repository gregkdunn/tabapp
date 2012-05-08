define([
], function(){
  "use strict";
  
	var Measure = Backbone.Model.extend({
		defaults: {
			time_signature: {id: 1, lower: 4, upper: 4}, 
			instrument: {id: 1, name: ''},
			state: 1,
	    positions: {}
	  },
    initialize: function() {
    	var that = this,
    	    data = this.get('data');

    	debug('data:' + data);
    	

        if(data) {
    	  data = JSON.parse(data);
    	  delete data.instrument
    	  delete data.state
    	  delete data.time_signature
    	  this.set(data);
    	}
    	this.set({data: {}});

    }
  });

	return Measure;
});