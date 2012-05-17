//measureEdit

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measure/measureEdit.html', 
  'text!templates/measure_components/bar.html',
  'text!templates/measure_components/note.html',
  'text!templates/measure_components/finger.html',
], 
function($, _, Backbone, measureEditTemplate, barTemplate, noteTemplate, fingerTemplate){
  "use strict";

  var measureEditView = Backbone.View.extend({
    className: "measure",
    events: {

    },
    initialize: function(){
      debug('measureEditView.init');	
    },
    render: function(){
      debug('measureEditView.render');	
      var data = this.model.toJSON(),
          compiledTemplate;

      debug('data:', data);
      debugObject(data);

      compiledTemplate = _.template( measureEditTemplate, data );

      $(this.el)
        .empty()
        .append( compiledTemplate );

      this.renderBars();

      return this;
    },
    renderBars: function() {
      debug('measureEditView.renderEdit');
      var data = this.model.toJSON().positions.bar,
          container = $(this.el).find('.bars');

      debug('data: ', data);

      _.each(data, function(beat) {
        var compiled_bar = _.template( barTemplate, beat );
        container.append(compiled_bar);
      })    

      this.renderStrings();
    },
    renderStrings: function() {
      var data = this.model.toJSON().positions.bar,
          note_containers =  $(this.el).find('.notes'),
          finger_containers =  $(this.el).find('.fingers');

      _.each(data, function(beat, i) {
        debug('beat:');
        debugObject(beat);
        var compiled_bar = _.template( barTemplate, beat ),
            note_container = note_containers.eq(i),
            fingers_container = finger_containers.eq(i);

        _.each(beat.pos, function(strng) {
          debug('strng:');
          debugObject(strng);
          var compiled_note = _.template( noteTemplate, strng),
              compiled_finger = _.template(fingerTemplate, strng);
          note_container.append(compiled_note);
          fingers_container.append(compiled_finger);
        });
      });           
    }

  });

  return measureEditView;
});