//measureEdit

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measure/measureEdit.html'
], 
function($, _, Backbone, measureEditTemplate){
  "use strict";

  var measureEditView = Backbone.View.extend({
    events: {

    },
    initialize: function(){
      debug('measureEditView.init');	
    },
    render: function(){
      debug('measureEditView.render');	
      var data = this.model,
          compiledTemplate = _.template( measureEditTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );

      this.renderEdit();

      return this;
    },
    renderEdit: function() {
      debug('measureEditView.renderEdit');
      
      

    }
  });

  return measureEditView;
});