//accountPageView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/account/account.html'
], 
function($, _, Backbone, accountTemplate){
  "use strict";

  var accountView = Backbone.View.extend({
    initialize: function(){
      debug('accountView.init');	
    },
    render: function(){
      debug('accountView.render');	
      var data = {};
      var compiledTemplate = _.template( accountTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );
      
      return this;  
    }
  });

  return accountView;
});