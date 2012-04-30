//measuresView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measures/measuresEdit.html',
  'viewMeasureNew'
], 
function($, _, Backbone, measuresEditTemplate, measureNew){
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
      var collections = this.options.collections,
          measures = collections.measures,
          container = $(this.el).find('.measuresEditContent'),
          view = new measureNew({collection: measures, collections: collections});

      container.append(view.render().el);
    }
  });

  return measuresEditView;
});