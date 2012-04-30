//measureShow

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measure/measureShow.html'
], 
function($, _, Backbone, measureShowTemplate){
  "use strict";

  var measureShowView = Backbone.View.extend({
    events: {

    },
    initialize: function(){
      debug('measureShowView.init');	
    },
    render: function(){
      debug('measureShowView.render');	
      var data = this.model.toJSON(),
          compiledTemplate;

      debug("data: " + JSON.stringify(data));
      compiledTemplate = _.template( measureShowTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );

      this.renderShow();

      return this;
    },
    renderShow: function() {
      debug('measureShowView.renderShow');

    }
  });

  return measureShowView;
});