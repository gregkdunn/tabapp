define([
], function(){
  "use strict";
  
	var Measure = Backbone.Model.extend({
    urlRoot: '/measures',    
    initialize: function() {
    	var data = this.get('data');

    	////console.log('data:' + data);
    	
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