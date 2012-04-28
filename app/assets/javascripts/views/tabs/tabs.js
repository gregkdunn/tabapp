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
      debug('tabsView.init');	
    },
    render: function(){
      debug('tabsView.render');	
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