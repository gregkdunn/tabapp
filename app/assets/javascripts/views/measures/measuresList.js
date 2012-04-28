//measuresView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measures/measuresList.html'
], 
function($, _, Backbone, measuresListTemplate){
  "use strict";

  var measuresListView = Backbone.View.extend({
    events: {

    },
    initialize: function(){
      debug('measuresListView.init');	
    },
    render: function(){
      debug('measuresListView.render');	
      var data = {},
          compiledTemplate = _.template( measuresListTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );

      this.renderList();

      return this;
    },
    renderList: function() {
      debug('measuresListView.renderList');
      
      

    }
  });

  return measuresListView;
});