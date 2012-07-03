
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
      ListItemView: ListItemView,
      template: listTemplate,
      events: {
        'click .field': 'displayList',
        'keyup': 'checkInput',
        'click .list li': 'setField' 
      },      
      
      initialize: function() {
        //console.log('listView.initialize');
        _.bindAll(this);
        this.collection.bind('change', this.renderList);
      },
      
      render: function() {
        //console.log('listView.render');
        var data = {},
            compiledTemplate;

        //console.log('data:', data);
        //console.log(data);

        compiledTemplate = _.template( this.template, data );

	      $(this.el)
	        .empty()
	        .append( compiledTemplate );

	      this.renderList();  

        return this;
      },
   
      renderList: function() {
        //console.log('listView.renderList');
        var scoped_this = this,
            $list = $(this.el).find('ul'),
            items = this.collection;

        $list.empty();

        if(items.length > 0) {         
          items.each(function(item) {
            //console.log('item:', item);
            var list_item = new scoped_this.ListItemView({
              model: item,
              collection: items
            });
            $list.append(list_item.render().el);
          });
        } else {
          $list.append('<li class="no_items">No Items available</li>');
        }    
      },

      displayList: function() {
        $(this.el).find('.list').show();
      },

      hideList: function() {
        $(this.el).find('.list').hide();
      },

      checkInput: function(event) {
        if(event.keyCode == 27) {
          this.hideList();
        };
      },

      setField: function(event) {
        console.log('setField event', event);
        $(this.el)
          .find('.field')
            .val(event.target.innerHTML)
          .css({
            'background':'#fff',
            'color':'#333'
          });
        this.hideList();  
      } 
       
    });


  return listView;
});