//measureView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measure/measure.html',
  'viewMeasureEdit',
  'viewMeasureShow'
], 
function($, _, Backbone, measureTemplate, measureEdit, measureShow){
  "use strict";

  var MeasureEditView, 
      MeasureShowView, 

      measuresView = Backbone.View.extend({
      containers: {
        viewstack: '.measureContent' 
      },  
      events: {
        'click .edit._measure': 'showEdit',
        'click .list_measure': 'showShow'
      },
      initialize: function(){
        debug('measureView.init');	

        MeasureEditView = new measureEdit({model: this.model, collection: this.collection, collections: this.collections});
        MeasureShowView = new measureShow({model: this.model, collection: this.collection, collections: this.collections});

        window.MeasureShowView = MeasureShowView;
      },
      render: function(){
        debug('measureView.render');	
        var data = {},
            compiledTemplate = _.template( measureTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.showShow();

        return this;
      },
      renderEdit: function() {
        debug('measureView.renderEdit');
        this.renderState(MeasureEditView.render().el);
      },      
      renderShow: function() {
        debug('measureView.renderShow');
        this.renderState(MeasureShowView.render().el);
      },
      renderState:function(state){
        debug('measureView.renderState');
        $(this.el).find(this.containers.viewstack)
          .empty()
          .append(state);
        this.delegateEvents(this.events);    
      },
      showEdit: function() {
        debug('measuresView.showEdit');
        this.renderEdit();
      },
      showShow:function() {
        debug('measureView.showShow');
        this.renderShow();      
      }
    });

  return measuresView;
});