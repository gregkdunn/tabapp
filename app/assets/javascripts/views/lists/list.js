
//listView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/lists/list.html',
  'viewListItem'
], 
function($, _, Backbone, listTemplate, listItemView){
  "use strict";

  var ListItemView = listItemView,
      listView = Backbone.View.extend({
      className: 'item_list',
      template: listTemplate,
      events: {

      },      
      
      initialize: function() {
        debug('listView.initialize');
        _.bindAll(this);
        this.collection.bind('change', this.renderList);
      },
      
      render: function() {
        debug('listView.render');
        var data = {},
            compiledTemplate;

        debug('data:', data);
        debugObject(data);

        compiledTemplate = _.template( this.template, data );

	      $(this.el)
	        .empty()
	        .append( compiledTemplate );

	      this.renderList();  

        return this;
      },
   
      renderList: function() {
        debug('listView.renderList');
        var $list = $(this.el),
            items = this.collection;

        $list.empty();

        if(items.length > 0) {         
          items.each(function(item) {
            console.log('item:', item);
            var list_item = new ListItemView({
              model: item,
              collection: items
            });
            $list.append(list_item.render().el);
          });
        } else {
          $list.append('<li class="no_items">No Items available</li>');
        }    
    
      }
       
    });


  return listView;
});