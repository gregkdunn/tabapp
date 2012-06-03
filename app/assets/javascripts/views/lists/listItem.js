
//listItemView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/lists/listitem.html'
], 
function($, _, Backbone, listItemTemplate){
  "use strict";

    ListItemView = Backbone.View.extend({
      tagName: 'li',
      className: 'list_item',
      events: {
          'click': 'onSelect'
      },

      initialize: function() {
        debug('ListItem.initialize');
        _.bindAll(this);
      },
  
      render: function() {
        debug('ListItem.render');
        $(this.el)
          .html(this.template(this.model.toJSON()));
        return this;
      },
      
      onDelete :function() {
        debug('ListItem.onSelect');
        this.model.collection.trigger('item:select', this.model);
      }
    });

  return listView;
});