//measureEdit

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measure/measureEdit.html',
  'text!templates/measure_components/card.html', 
  'text!templates/measure_components/bar.html',
  'text!templates/measure_components/note.html',
  'text!templates/measure_components/finger.html',
  'viewInputOverlay',
  'viewList',
  'viewTimeSignatureList'
], 
function($, _, Backbone, measureEditTemplate, cardTemplate, barTemplate, noteTemplate, fingerTemplate, inputOverlayView, listView, timeSignatureListView){
  "use strict";


  var OverlayView,
      InstrumentList,
      TimeSignatureList,
      GranularityList, 
      measureEditView = Backbone.View.extend({
        className: "measure",
        containers: {
          instrument_list: '.instrument_container',
          time_signature_list: '.time_signature_container',
          granularity_list: '.granularity_container',
          overlay: '.input_overlay' 
        },  
        events:{
         //nav
         'keyup': 'checkKeyPressInput',
         //'mousewheel': 'checkMouseScroll',
         //overlay
         'focus input': 'addOverlay',
         //validations
         'keyup .accent': 'validateAccent',
         'keyup .chord': 'validateChord',
         'keyup .finger': 'validateFinger',
         'keyup .fret': 'validateFret',
        },
        initialize: function(){
          //console.log('measureEditView.init');	
          _.bindAll(this);
          
          window.measureEdit = this;

          this.initComponents();

        },

        initComponents: function() {
          var instruments = this.options.collections.instruments,
              time_signatures = this.options.collections.time_signatures;//,
              //granularities = this.options.collections.granularities;


          OverlayView = new inputOverlayView({model: this.model, collections: this.options.collections});
            
          //console.log('instruments:', instruments);  
          InstrumentList = new listView({collection: instruments});

          //console.log('time_signatures:', time_signatures);  
          TimeSignatureList = new timeSignatureListView({collection: time_signatures});
          
          ////console.log('granularity:', granularities);            
          //GranularityList = new listView({collection: granularities});
        
          instruments.on('item:select', this.updateInstrument);
          time_signatures.on('item:select', this.updateTimeSignature);
          //granularities.on('item:select', this.updateGranularity);

          this.model.on('change', this.renderCards);

        },
        render: function(){
          //console.log('measureEditView.render');	
          var data = this.model.toJSON(),
              compiledTemplate;

          compiledTemplate = _.template( measureEditTemplate, data );

          $(this.el)
            .empty()
            .append( compiledTemplate );
          
          this.renderLists();
          this.renderCards();
          //this.renderOverlay();
          return this;
        },

        renderCards:function() {
          //console.log('measureEditView.renderCards');
          var data = this.model.toJSON(),
              container = $(this.el).find('.card_edit_container'),
              compiled_card;

          //console.log('data:', data);
          //console.log(data);

          compiled_card = _.template( cardTemplate, data );

          container
            .empty()
            .append(compiled_card);

          this.renderBars();
        },

        renderBars: function() {
          //console.log('measureEditView.renderBars');
          var data = this.model.toJSON().positions.bar,
              container = $(this.el).find('.bars'),
              bars_length = this.model.get('bars'),
              data_length = data.length;

          //console.log('bar.length: ', data.length);

          container.empty();

          if(data_length > bars_length) {
              data.splice(bars_length);
            } else if(data_length < bars_length) {
              ////console.log('beat.pos.length:', beat.pos.length);
              ////console.log('strings_length:', strings_length);
              var add_bars = bars_length - data_length,
                  i,
                  default_bar;
              for(i = 0; i < add_bars; i++){
                default_bar = {no: i+data_length+1, chord: '', pos: []};;
                data.push(default_bar);
              }
            } 

          _.each(data, function(beat) {
            var compiled_bar = _.template( barTemplate, beat );
            container.append(compiled_bar);
          })    

          this.renderStrings();
 
        },
        renderStrings: function() {
          //console.log('measureEditView.renderStrings');      
          var data = this.model.toJSON().positions.bar,
              note_containers =  $(this.el).find('.notes'),
              finger_containers =  $(this.el).find('.fingers'),
              model = this.model;

          note_containers.empty();
          finger_containers.empty();

          _.each(data, function(beat, i) {
            //console.log('beat:');
            //console.log(beat);
            var compiled_bar = _.template( barTemplate, beat ),
                note_container = note_containers.eq(i),
                fingers_container = finger_containers.eq(i),
                strings_length = model.get('strings'),
                beat_pos_length = beat.pos.length;

            //reconcile strings arrays with new string count    
            if(beat_pos_length > strings_length) {
              beat.pos.splice(strings_length);
            } else if(beat_pos_length < strings_length) {
              ////console.log('beat.pos.length:', beat.pos.length);
              ////console.log('strings_length:', strings_length);
              var add_strings = strings_length - beat.pos.length,
                  i,
                  default_string;
              for(i = 0; i < add_strings; i++){
                default_string = {no: i+beat_pos_length+1, accent: '', finger:'', fret: ''};
                beat.pos.push(default_string);
              }
            } 

            _.each(beat.pos, function(strng) {
              strng = _.extend(strng, {bar_no: i + 1});
              //console.log('strng:');
              //console.log(strng);
              var compiled_note = _.template(noteTemplate, strng),
                  compiled_finger = _.template(fingerTemplate, strng);
              note_container.append(compiled_note);
              fingers_container.append(compiled_finger);
            });
          });           
        },

        renderLists: function() {
          //console.log('measureEditView.renderLists'); 

          $(this.el).find(this.containers.instrument_list)
            .empty()
            .append(InstrumentList.render().el);
          
          $(this.el).find(this.containers.time_signature_list)
            .empty()
            .append(TimeSignatureList.render().el);

          //$(this.el).find(this.containers.granularity_list)
          //  .empty()
          //  .append(GranularityList.render().el);            

        },

        renderOverlay: function() {
          //console.log('measureEditView.renderOverlay'); 
          $(this.el).find(this.containers.overlay)
            .empty()
            .append(OverlayView.render().el);
        },

        checkMouseScroll: function(event) {
          //console.log('measureEditView.checkMouseScroll');
          ////console.log(event);
          var delta = 0,
              $event = event,
              event = event.originalEvent;

            if (!event) {/* For IE. */
              event = window.event;
            }        
            if (event.wheelDelta) { /* IE/Opera. */
              delta = event.wheelDelta/120;
            } else if (event.detail) { /** Mozilla case. */
              /** In Mozilla, sign of delta is different than in IE.
               * Also, delta is multiple of 3.
               */
              delta = -event.detail/3;
            }
            /** If delta is nonzero, handle it.
             * Basically, delta is now positive if wheel was scrolled up,
             * and negative, if wheel was scrolled down.
             */
            if (delta) {
              this.moveBar(delta);
            }  
            /** Prevent default actions caused by mouse wheel.
             * That might be ugly, but we handle scrolls somehow
             * anyway, so don't bother here..
             */
            if (event.preventDefault) {
              event.preventDefault();
            } 
            event.returnValue = false;
        },

        checkKeyPressInput: function(event) {
          //console.log('measureEditView.checkKeyPressInput');
          //console.log('event', event);
          if(this.checkSpecialCharacters(event.keyCode)) {
            event.stopPropagation();
            event.preventDefault();     
          } else {
          }
          
        },

        checkSpecialCharacters: function(key) {
          //console.log('measureEditView.checkSpecialCharacters');
          ////console.log('key', key);

          var current_input = $(this.el).find('input:focus');

          switch(key) {
            case 38:
              //up arrow 
              this.moveField('up');
              break;
            case 40:
              //down arrow 
              this.moveField('down');
              break;
            case 37:
              //left arrow 
              this.moveField('left');
              break;
            case 39:
              //right arrow 
              this.moveField('right');
              break; 
            case 27:
              //esc arrow 
              this.clearInput();
              break;                                         
            default:
              return false;
          }
          return true;
        },
        clearInput: function() {
          //console.log('measureEditView.clearField');
          var current_field = all_fields.filter(':focus');
          current_field.val('');  
        },
        moveField: function(direction) {
          //console.log('measureEditView.moveField: ' + direction);
          var $el = $(this.el),
              has_eighth = $el.find('.card_edit').hasClass('eighth'),
              all_fields = $el.find('.card_edit input'),
              current_field = all_fields.filter(':focus'),
              has_chord = current_field.parent().hasClass('chord'),
              has_accent = current_field.parent().hasClass('accent'),
              has_fret = current_field.parent().hasClass('fret'),
              has_finger = current_field.parent().hasClass('finger'),
              field_type,
              new_field,
              travel = 1,
              current_bar_container = current_field.parents('.bar'),
              current_bar_inputs = current_bar_container.find('input').filter(':visible'),
              current_y_position = current_bar_inputs.index(current_field),

              current_bars_container = current_field.parents('.bars'),
              current_bars = current_bars_container.find('.bar').filter(':visible'),
              current_x_position = current_bars.index(current_bar_container);

          //console.log('has_eighth', has_eighth);
          //console.log('has_chord', has_chord);
          ////console.log('all_fields', all_fields.length);   
          //console.log('current_field', current_field.attr('name'));    
          //console.log('x', current_x_position); 
          //console.log('y', current_y_position); 

          if(has_eighth && (has_chord || has_finger)) {
            travel = 2;
          }

          switch(direction) {
            case 'up':
              //up arrow 
              //console.log('up');
              new_field = current_bar_inputs.eq(current_y_position-1);
              break;
            case 'down':
              //down arrow 
              //console.log('down');
              new_field = current_bar_inputs.eq(current_y_position+1);
              if(!new_field.attr('name')){
                new_field = current_bar_inputs.eq(0);
                //console.log('@bottom:', new_field);
              }
              break;
            case 'left':
              //left arrow 
              //console.log('left');
              if(has_eighth) {
                if (has_chord || has_finger) {
                  new_field = current_bars.eq(current_x_position-travel).find('input:visible').eq(current_y_position);
                } else {
                  if(current_x_position%2 == 0) {
                    new_field = current_bars.eq(current_x_position-1).find('input:visible').eq(current_y_position-1);
                  } else {
                    new_field = current_bars.eq(current_x_position-1).find('input:visible').eq(current_y_position+1);
                  }
                }
              } else {

              }
              break;
            case 'right':
              //right arrow 
              //console.log('right');
              if(has_eighth) {
                if (has_chord || has_finger) {
                  new_field = current_bars.eq(current_x_position+travel).find('input:visible').eq(current_y_position);
                  if(!new_field.attr('name')) {
                    new_field = current_bars.eq(0).find('input:visible').eq(current_y_position);
                  }
                } else {
                  if(current_x_position%2 == 0) {
                    new_field = current_bars.eq(current_x_position+1).find('input:visible').eq(current_y_position-1);
                  } else {
                    new_field = current_bars.eq(current_x_position+1).find('input:visible').eq(current_y_position+1);
                  }
                  if(!new_field.attr('name')) {
                    new_field = current_bars.eq(0).find('input:visible').eq(current_y_position+1);
                  }
                }
              } else {

              }
              break;                                     
            default:
              return false;
          }
          //console.log('new_field',  new_field.attr('name')); 
          //console.log(new_field);
          $(new_field).focus();
        },
        moveBar: function(delta){
          //console.log('measureEditView.moveBar: ' + delta);
          if(delta > 0) {
            this.moveField('right');
          } else {
            this.moveField('left');
          }   
              
        },
        addOverlay:function(event) {
          //console.log('measureEditView.addOverlay');

        },
        validateAccent: function(event) {
          //console.log('measureEditView.validateAccent');
          //console.log('event:', event);
          var testArray = this.options.collections.accents.pluck('symbol');
          this.validateAgainstArray(event, testArray);
        },
        validateChord: function(event) {
          //console.log('measureEditView.validateChord');
          var testArray = ['Ab', 'A', 'A#','Bb', 'B', 'B#', 'Cb', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#'];
          this.validateAgainstArray(event, testArray);
        },
        validateFinger: function(event) {
          //console.log('measureEditView.validateFinger');
          var testArray = this.options.collections.fingers.pluck('symbol');
          this.validateAgainstArray(event, testArray);          
        },
        validateFret: function(event) {
          //console.log('measureEditView.validateFret');
          var instrument_id = this.model.get('instrument').id,
              instrument_model = this.options.collections.instruments.find(function(instrument){ return instrument.get('id') ==  instrument_id}),
              string_length = instrument_model.get('strings')[0]['length'],//TODO get string # and test against actual string instead of first string
              testArray = [];

          for(var i = 0; i <= string_length; i++) {
            testArray.push(i);
          }    
          this.validateAgainstArray(event, testArray);
        },  
        validateAgainstArray:function(event, testArray) {
          //console.log('measureEditView.validate');
          //console.log('event:', event);
          //console.log('testArray:', testArray);

          var input = event.target.value,
              match = false;

          _.each(testArray, function(item) {
            if (input == item) {
              match = true;
            }
          });
          
          if(match) {
            this.displayValidEntry(event.target);
          } else {
            this.displayInvalidEntry(event.target);
          }
        },
        displayValidEntry: function(field) {
          //console.log('measureEditView.displayValidEntry');
          $(field)
            .removeClass('invalid')
            .addClass('valid');
        },    
        displayInvalidEntry: function(field) {
          //console.log('measureEditView.displayInvalidEntry');
          $(field)
            .removeClass('valid')
            .addClass('invalid');
        },

        //update template         
        updateInstrument: function(instrument) {
          //console.log('measureEditView.updateInstrument');
          //console.log('instrument', instrument);

          this.model.set('instrument', instrument.toJSON());
          this.model.set('strings', instrument.get('strings').length);

          //console.log('this.model', this.model);



        },
        updateTimeSignature: function(time_signature) {
          //console.log('measureEditView.updateTimeSignature');
          //console.log('time_signature', time_signature);

          this.model.set('time_signature', time_signature.toJSON());
          this.model.set('bars', time_signature.get('upper') * time_signature.get('lower') );

          //console.log('this.model', this.model);
        }, 
        updateGranularity: function(model) {
          //console.log('measureEditView.updateGranularity');
          //console.log('model', model);
        },                      
      });

  window.OverlayView = OverlayView;

  return measureEditView;
});