
//overlayView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measure_components/inputOverlay.html',
  'knobify'
], 
function($, _, Backbone, overlayTemplate, knobify){
  "use strict";

   var overlayView = Backbone.View.extend({
      className: 'overlay_view',
      events: {

      },     

      knob_options : {
        'width': '75',
        'fgColor': '#ffec03',
        'skin' :'tron',
        'thickness': '.2',
        'displayPrevious':true
      }, 
      
      initialize: function() {
        //console.log('overlayView.initialize');
        _.bindAll(this);
      },
      
      render: function() {
        //console.log('overlayView.render');
        var data = this.model.toJSON(),
            compiledTemplate;

        //console.log('data:', data);
        //console.log(data);

        compiledTemplate = _.template( overlayTemplate, data );

	      $(this.el)
	        .empty()
	        .append( compiledTemplate );

        this.renderKnob();  

        return this;
      },

      renderKnob: function() {
        //console.log('overlayView.renderKnob');
        var instrument_id = this.model.get('instrument').id,
            instrument = this.options.collections;
        //console.log('overlay.model:', this.model);
        //console.log('overlay', this);
        ////console.log('overlay.options:', this.options);
        ////console.log('overlay.options.collections:', this.options.collections);
        ////console.log('instruments:', instrument);
        $(this.el).find('input').knob(this.knob_options);

      }
       
    });

  window.overlayView = overlayView;

  return overlayView;
});