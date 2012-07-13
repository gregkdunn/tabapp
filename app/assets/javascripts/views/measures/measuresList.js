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
      //console.log('measuresListView.init');	

      this.options.collections.measures.on('add', this.render, this);
      this.options.collections.measures.on('remove', this.render, this);
    },
    render: function(){
      //console.log('measuresListView.render');	
      var data = {},
          compiledTemplate = _.template( measuresListTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );

      this.renderList();

      return this;
    },
    renderList: function() {
      //console.log('measuresListView.renderList');
      var collections = this.options.collections,
          measures = collections.measures,
          container = $(this.el).find('.measuresListContent');

      //console.log('measures.length: ' + measures.length);
      
      measures.each(function(measure) {
        //console.log('measure: ' + JSON.stringify(measure));
        var view = new measureView({model: measure, collection: measures, collections: collections});
        container.append(view.render().el);
      });      

    }
  });

  return measuresListView;
});