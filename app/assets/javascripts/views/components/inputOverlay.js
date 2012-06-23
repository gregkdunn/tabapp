
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
      
      initialize: function() {
        debug('overlayView.initialize');
        _.bindAll(this);
      },
      
      render: function() {
        debug('overlayView.render');
        var data = this.model.toJSON(),
            compiledTemplate;

        debug('data:', data);
        debugObject(data);

        compiledTemplate = _.template( overlayTemplate, data );

	      $(this.el)
	        .empty()
	        .append( compiledTemplate );

        this.renderKnob();  

        return this;
      },

      renderKnob: function() {
        debug('overlayView.renderKnob');
        var instrument_id = this.model.get('instrument').id,
            instrument = this.options.collections;
        console.log('overlay.model:', this.model);
        console.log('overlay', this);
        //console.log('overlay.options:', this.options);
        //console.log('overlay.options.collections:', this.options.collections);
        //console.log('instruments:', instrument);
        $(this.el).find('input').knob();

      }
       
    });

  window.overlayView = overlayView;

  return overlayView;
});