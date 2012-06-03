
//listView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/lists/list.html',
  'viewListItem'
], 
function($, _, Backbone, listTemplate, listViewItem){
  "use strict";

   listView = Backbone.View.extend({
      className: 'item_list',
      events: {

      },      
      
      initialize: function() {
        debug('listView.initialize');
        _.bindAll(this);
        this.collection.bind('change', this.renderList);
      },
      
      render: function() {
        debug('listView.render');
        var data = this.model.toJSON(),
            compiledTemplate;

        debug('data:', data);
        debugObject(data);

        compiledTemplate = _.template( measureEditTemplate, data );

	      $(this.el)
	        .empty()
	        .append( compiledTemplate );

	      this.rednerList();  
      },
   
      renderList: function() {
        debug('listView.renderList');
        var $list = $(this.el).find('.item_list'),
            items = this.collection;

        $list.empty();

        if(items.length > 0) {         
          items.each(function(item) {
            if(item.get('name').match(/\S/g)) {
              var list_item = new listItemView({
                model: item,
                collection: items
              });
              $list.append(list_item.render().el);
            }
          });
        } else {
          $list.append('<li class="no_items">No Items available</li>');
        }    
    
      }
       
    });


  return listView;
});