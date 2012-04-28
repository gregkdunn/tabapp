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
        debug('navView.init');	

      },
      render: function(){
        debug('navView.render');	
        var data = {},
            compiledTemplate = _.template( navTemplate, data );

        $(this.el).append( compiledTemplate );

        return this;
      },
      showAccount: function() {
        debug('navView.showAccount');
        this.show('account');
      },      
      showMeasures: function() {
        debug('navView.showMeasures');
        this.show('measures');
      },
      showTabs:function() {
        debug('navView.showTabs');
        this.show('tabs');
      },
      show: function(page) {
        debug('navView.show');
        this.options.router.trigger('show', page);
      }

    });

  return navView;
});