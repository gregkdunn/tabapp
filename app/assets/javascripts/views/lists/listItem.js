
//listItemView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/lists/listItem.html'
], 
function($, _, Backbone, listItemTemplate){
  "use strict";

  var listItemView = Backbone.View.extend({
      tagName: 'li',
      className: 'list_item',
      template: listItemTemplate,
      events: {
          'click': 'onSelect'
      },

      initialize: function() {
        //console.log('ListItem.initialize');
        _.bindAll(this);
      },
  
      render: function() {
        //console.log('ListItem.render');
        var data = this.model.toJSON(),
            compiledTemplate = _.template( this.template, data );
        $(this.el)
          .html(compiledTemplate);
        return this;
      },
      
      onSelect :function() {
        //console.log('ListItem.onSelect');
        this.model.collection.trigger('item:select', this.model);
      }
    });

  return listItemView;
});