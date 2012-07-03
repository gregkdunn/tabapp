define([
], function(){
  "use strict";
  
	var Instrument = Backbone.Model.extend({
	    initialize: function() {
	    	var data = this.get('data');
	    	//console.log('instrument_data:' + data);    	
        if(data) {
	    	  data = JSON.parse(data);
	    	  this.set(data);
	    	}
    	  this.set({data: {}});
      }
	});

	return Instrument;
});