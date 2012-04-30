//measuresView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measures/measuresList.html',
  'viewMeasure'
], 
function($, _, Backbone, measuresListTemplate, measureView){
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
      var collections = this.options.collections,
          measures = collections.measures,
          container = $(this.el).find('.measuresListContent');

      debug('measures.length: ' + measures.length);
      
      measures.each(function(measure) {
        debug('measure: ' + JSON.stringify(measure));
        var view = new measureView({model: measure, collection: measures, collections: collections});
        container.append(view.render().el);

        window.measureView = measureView;

      })      

    }
  });

  return measuresListView;
});