//measuresView

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measures/measures.html',
  'viewMeasuresEdit',
  'viewMeasuresList'
], 
function($, _, Backbone, measuresTemplate, measuresEdit, measuresList){
  "use strict";

  var MeasuresEditView, 
      MeasuresListView, 

      measuresView = Backbone.View.extend({
      containers: {
        viewstack: '.measuresContent' 
      },  
      events: {
        'click .create_measure': 'showCreate',
        'click .list_measures': 'showList'
      },
      initialize: function(){
        debug('measuresView.init');	

        this.setCollections();

        MeasuresEditView = new measuresEdit({collections: this.options.collections});
        MeasuresListView = new measuresList({collections: this.options.collections});

        window.MeasuresEditView = MeasuresEditView;
        window.MeasuresListView = MeasuresListView;
      },
      render: function(){
        debug('measuresView.render');	
        var data = {},
            compiledTemplate = _.template( measuresTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.showList();

        return this;
      },
      renderEdit: function() {
        debug('measuresView.renderEdit');
        this.renderState(MeasuresEditView.render().el);
      },      
      renderList: function() {
        debug('measuresView.renderList');
        this.renderState(MeasuresListView.render().el);
      },
      renderState:function(state){
        debug('measuresView.renderState');
        $(this.el).find(this.containers.viewstack)
          .empty()
          .append(state);
        this.delegateEvents(this.events);    
      },
      showCreate: function() {
        debug('measuresView.createMeasure');
        this.renderEdit();
      },
      showList:function() {
        debug('measuresView.listMeasures');
        this.renderList();      
      },
      setCollections:function(){
        //set all collections in "collections" object to the view options object
        var that = this,
            collections = this.options.collections, 
            keys = _.keys( collections );
        _.each(keys, function(key){
          that.options[key] = collections[key];
        });
        //delete this.options.collections;
      }
    });

  return measuresView;
});