//measuresView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measures/measuresEdit.html'
], 
function($, _, Backbone, measuresEditTemplate){
  "use strict";

  var measuresEditView = Backbone.View.extend({
    events: {

    },
    initialize: function(){
      debug('measuresEditView.init');	
    },
    render: function(){
      debug('measuresEditView.render');	
      var data = {},
          compiledTemplate = _.template( measuresEditTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );

      this.renderEdit();

      return this;
    },
    renderEdit: function() {
      debug('measuresEditView.renderEdit');
      
      

    }
  });

  return measuresEditView;
});