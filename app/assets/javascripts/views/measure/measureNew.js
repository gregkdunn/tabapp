//measureEdit

define([
  'jquery',
  'underscore',
  'backbone',
  'modelMeasure',
  'viewMeasureEdit'
], 
function($, _, Backbone, measure, measureEdit){
  "use strict";

  var measureNewView = measureEdit.extend({
    initialize: function(){
      debug('measureNewView.init');
      var new_measure = new measure();

      debug('new_measure: ' + JSON.stringify(new_measure));

      this.model = new_measure;
    }
  });

  return measureNewView;
});