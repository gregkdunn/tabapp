define([
], function(){
  "use strict";
  
	var Measure = Backbone.Model.extend({
    urlRoot: '/measures',    
    initialize: function() {
    	var defaults = this.createDefault(),
          data = this.get('data');
    	console.log('defaults:', defaults);
      console.log('data:', data);

      if(data) {
    	  data = JSON.parse(data);
    	  delete data.instrument;
    	  delete data.state;
    	  delete data.time_signature;
    	  
        //TODO: Arrays will not properly extend
        //data.positions = $.extend(true, data.positions, defaults.positions);
        //this.adjustBars(data);
        this.set(data);
    	}
    	this.set({data: {}});

    },

    createDefault: function() {
      var string_length = 6,
          bar_length = 16, 
          defaults = {
             positions: {}
           },
           i, 
           j;
      defaults.positions.bar = [];
      for(i = 0; i < bar_length; i++){
        var default_bar = {no: i+1, chord: '', pos: []};
        for(j = 0; j < string_length; j++){
          var default_string = {no: j+1, accent: '', finger:'', fret: ''};
          default_bar.pos.push(default_string);
        }  
        defaults.positions.bar.push(default_bar); 
      }
      return defaults;  
    },

    adjustBars: function(data) {
      //reconcile bars arrays with new bar count 
      var data_length = data.positions.bars.length,
          bar_length = data.bars,
          string_length = data.strings;
      if(data_length > bar_length) {
        data.positions.bars.splice(bar_length);
      } else if(data_length < bar_length) {
        var add_bars = bar_length - data_length,
            i,
            default_bar;
        for(i = 0; i < add_bars; i++){
          default_bar = {no: i+data_length+1, chord: '', pos: []};
          data.positions.bars.push(default_bar);
        }
      }

      _.each(data.positions.bars, function(bar) {
        this.adjustStrings(bar, string_length);
      })

      return data;
    },

    adjustStrings: function(bar, string_length) {
      var data_length = bar.pos.length;
      //reconcile strings arrays with new string count    
      if(data_length > strings_length) {
        bar.pos.splice(strings_length);
      } else if(data_length < strings_length) {
        var add_strings = strings_length - bar.pos.length,
            i,
            default_string;
        for(i = 0; i < add_strings; i++){
          default_string = {no: i+data_length+1, accent: '', finger:'', fret: ''};
          bar.pos.push(default_string);
        }
      } 

    }

  });

	return Measure;
});