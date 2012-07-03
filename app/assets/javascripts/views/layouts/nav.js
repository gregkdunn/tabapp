//navView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/layouts/nav.html'
], 
function($, _, Backbone, navTemplate){
  "use strict";

  var navView = Backbone.View.extend({ 
      events: {
        'click .account_page': 'showAccount',
        'click .measures_page': 'showMeasures',
        'click .tabs_page': 'showTabs'
      },
      initialize: function(){
        //console.log('navView.init');	

      },
      render: function(){
        //console.log('navView.render');	
        var data = {},
            compiledTemplate = _.template( navTemplate, data );

        $(this.el).append( compiledTemplate );

        return this;
      },
      showAccount: function() {
        //console.log('navView.showAccount');
        this.show('account');
      },      
      showMeasures: function() {
        //console.log('navView.showMeasures');
        this.show('measures');
      },
      showTabs:function() {
        //console.log('navView.showTabs');
        this.show('tabs');
      },
      show: function(page) {
        //console.log('navView.show');
        this.options.router.trigger('show', page);
      }

    });

  return navView;
});