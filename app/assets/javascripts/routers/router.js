define([
  'jquery',
  'underscore',
  'backbone',
  'collectionAccents',
  'collectionChords',
  'collectionFingers',
  'collectionGranularities',
  'collectionInstruments',
  'collectionMeasures',
  'collectionNotes',
  'collectionStates',
  'collectionTimeSignatures',
  'viewNav',
  'viewAccount',
  'viewMeasures',
  'viewTabs'
], function($, _, Backbone, Accents, Chords, Fingers, Granularities, Instruments, Measures, Notes, States, TimeSignatures, NavView, AccountView, MeasuresView, TabsView){
  "use strict";

  var accountView, 
      measuresView, 
      navView,
      tabsView;

  var AppRouter = Backbone.Router.extend({
    containers: {
      header: $('header'),
      nav: $('nav'),
      body:$('.content'),
      footer: $('footer')
    },
    routes: {
      // Define some URL routes
      '': 'showMeasures',//homepage
      'tabs': 'showTabs',
      'measures': 'showMeasures',
      'account': 'showAccount',

      // Default
      '*actions': 'defaultAction'
    },
    initialize: function() {
      //console.log('AppRouter.initialize');  

      //initModels
      var collections = {
            accents : new Accents(config.accents),
            chords : new Chords(config.chords),
            fingers : new Fingers(config.fingers),
            granularities: new Granularities(config.granularities),
            instruments : new Instruments(config.instruments),
            measures : new Measures(config.measures),
            notes : new Notes(config.notes),
            states : new States(config.states),
            time_signatures : new TimeSignatures(config.time_signatures)
          };

      //init header

      //init nav
      navView = new NavView({router:this});
      this.containers.nav.empty().append(navView.render().el);

      this.bind('show', this.show);

      //init footer 

      accountView = new AccountView();
      measuresView = new MeasuresView( { 'collections':collections } );
      tabsView = new TabsView( { 'collections':collections } );

      window.Collections = collections;
      window.MeasuresView = measuresView;

      this.show('measures');
    },
    showAccount: function() {
      //console.log('AppRouter.showAccount'); 
      this.showPage(accountView);
    },   
    showMeasures: function() {
      //console.log('AppRouter.showMeasures'); 
      this.showPage(measuresView);
    },
    showTabs: function() {
      //console.log('AppRouter.showTabs'); 
      this.showPage(tabsView);
    },
    showPage: function(page) {
      //console.log('AppRouter.showPage'); 
      this.containers.body
        .empty()
        .append(page.render().el); 
    },
    show: function(page) {
      //console.log('AppRouter.show:' + page); 
      this.navigate(page, true);
    },
     defaultAction: function(actions) {
      // We have no matching route, lets just log what the URL was
      //console.log('AppRouter.defaultAction'); 
      //console.log('No route:', actions);
    }
  });

  var initialize = function() {
        //console.log('initialize');
        var app_router = new AppRouter;
        Backbone.history.start();
      },
      configData = function() {
        //console.log('config_data');
        var $config = $('.config'),
            bootstrap = {},
            models = ['accents', 'chords', 'fingers', 'instruments', 'measures', 'notes', 'states', 'timesignatures'];
        _.each(models, function(model){
          bootstrap[model] = JSON.parse( $config.attr( 'data-' + model ) );
        });
        return bootstrap;    
      };
  return {
    initialize: initialize,
    configData: configData
  };
});