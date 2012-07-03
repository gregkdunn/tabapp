//tabsPageView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tabs/tabs.html'
], 
function($, _, Backbone, tabsTemplate){
  var tabsView = Backbone.View.extend({
    initialize: function(){
      //console.log('tabsView.init');	
    },
    render: function(){
      //console.log('tabsView.render');	
      var data = {};
      var compiledTemplate = _.template( tabsTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );

      return this;  
    }
  });

  return tabsView;
});