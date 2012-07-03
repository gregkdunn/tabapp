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
      //console.log('accountView.init');	
    },
    render: function(){
      //console.log('accountView.render');	
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