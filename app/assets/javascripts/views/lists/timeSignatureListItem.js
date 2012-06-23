
//listItemView

define([
  'jquery',
  'underscore',
  'backbone',
  'viewListItem',
  'text!templates/lists/timeSignatureListItem.html'
], 
function($, _, Backbone, listItemView, listItemTemplate){
  "use strict";

  var ListItemView = listItemView,
      timeSignatureListItemView = ListItemView.extend({
      template: listItemTemplate
    });

  return timeSignatureListItemView;
});