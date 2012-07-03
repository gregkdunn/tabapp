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
    className: "measure",
    events: {

    },
    initialize: function(){
      //console.log('measureShowView.init');	
    },
    render: function(){
      //console.log('measureShowView.render');	
      var data = this.model.toJSON(),
          compiledTemplate;

      //console.log("data: " + JSON.stringify(data));
      compiledTemplate = _.template( measureShowTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );

      this.renderShow();

      return this;
    },
    renderShow: function() {
      //console.log('measureShowView.renderShow');

    }
  });

  return measureShowView;
});