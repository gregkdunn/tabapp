
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
        ListItemView: ListItemView       
      });


  return TimeSignatureListView;
});