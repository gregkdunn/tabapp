define([
], function(){
  "use strict";
  
	var Measure = Backbone.Model.extend({
    initialize: function() {
    	var data = this.get('data');

    	//debug('data:' + data);
    	
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