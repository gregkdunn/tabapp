
//listView

define([
  'jquery',
  'underscore',
  'backbone',
  'viewList',
  'text!templates/lists/list.html',
  'viewTimeSignatureListItem'
], 
function($, _, Backbone, listView, listTemplate, timeSignatureListItemView){
  "use strict";

  var ListView = listView,
      ListItemView = timeSignatureListItemView,
      TimeSignatureListView = ListView.extend({
      
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


  return TimeSignatureListView;
});