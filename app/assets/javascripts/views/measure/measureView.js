//measuresView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measures/measureEdit.html'
], 
function($, _, Backbone, measureEditTemplate){
  "use strict";

  var measureEditView = Backbone.View.extend({
    events: {

    },
    initialize: function(){
      debug('measuresEditView.init');	
    },
    render: function(){
      debug('measuresEditView.render');	
      var data = {},
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