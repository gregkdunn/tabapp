//measureEdit

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/measure/measureEdit.html', 
  'text!templates/measure_components/bar.html',
  'text!templates/measure_components/note.html',
  'text!templates/measure_components/finger.html',
  'viewInputOverlay',
  'viewList',
  'viewTimeSignatureList'
], 
function($, _, Backbone, measureEditTemplate, barTemplate, noteTemplate, fingerTemplate, inputOverlayView, listView, timeSignatureListView){
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
         'mousewheel': 'checkMouseScroll',
         //enter
         'focus input': 'addOverlay'
        },
        initialize: function(){
          debug('measureEditView.init');	

          window.measureEdit = this;



          OverlayView = new inputOverlayView({model: this.model, collections: this.options.collections});
          
          console.log('instruments:', this.options.collections.instruments);  
          InstrumentList = new listView({collection: this.options.collections.instruments});

          console.log('time_signatures:', this.options.collections.time_signatures);  
          TimeSignatureList = new timeSignatureListView({collection: this.options.collections.time_signatures});
          
          console.log('granularity:', this.options.collections.granularities);            
          GranularityList = new listView({collection: this.options.collections.granularities});
        

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
          this.renderLists();

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
          this.renderOverlay();
        },
        renderStrings: function() {
          debug('measureEditView.renderStrings');      
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
              strng = _.extend(strng, {bar_no: i + 1});
              debug('strng:');
              debugObject(strng);
              var compiled_note = _.template(noteTemplate, strng),
                  compiled_finger = _.template(fingerTemplate, strng);
              note_container.append(compiled_note);
              fingers_container.append(compiled_finger);
            });
          });           
        },

        renderLists: function() {
          debug('measureEditView.renderLists'); 

          $(this.el).find(this.containers.instrument_list)
            .empty()
            .append(InstrumentList.render().el);
          
          $(this.el).find(this.containers.time_signature_list)
            .empty()
            .append(TimeSignatureList.render().el);

          $(this.el).find(this.containers.granularity_list)
            .empty()
            .append(GranularityList.render().el);            

        },

        renderOverlay: function() {
          debug('measureEditView.renderOverlay'); 
          $(this.el).find(this.containers.overlay)
            .empty()
            .append(OverlayView.render().el);
        },

        checkMouseScroll: function(event) {
          debug('measureEditView.checkMouseScroll');
          //console.log(event);
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
          debug('measureEditView.checkKeyPressInput');
          console.log('event', event);
          if(this.checkSpecialCharacters(event.keyCode)) {
            event.stopPropagation();
            event.preventDefault();     
          } else {
          }
          
        },

        checkSpecialCharacters: function(key) {
          debug('measureEditView.checkSpecialCharacters');
          //debug('key', key);

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
          debug('measureEditView.clearField');
          var current_field = all_fields.filter(':focus');
          current_field.val('');  
        },
        moveField: function(direction) {
          debug('measureEditView.moveField: ' + direction);
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

          console.log('has_eighth', has_eighth);
          console.log('has_chord', has_chord);
          //console.log('all_fields', all_fields.length);   
          console.log('current_field', current_field.attr('name'));    
          console.log('x', current_x_position); 
          console.log('y', current_y_position); 

          if(has_eighth && (has_chord || has_finger)) {
            travel = 2;
          }

          switch(direction) {
            case 'up':
              //up arrow 
              console.log('up');
              new_field = current_bar_inputs.eq(current_y_position-1);
              break;
            case 'down':
              //down arrow 
              console.log('down');
              new_field = current_bar_inputs.eq(current_y_position+1);
              if(!new_field.attr('name')){
                new_field = current_bar_inputs.eq(0);
                console.log('@bottom:', new_field);
              }
              break;
            case 'left':
              //left arrow 
              console.log('left');
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
              console.log('right');
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
          console.log('new_field',  new_field.attr('name')); 
          console.log(new_field);
          $(new_field).focus();
        },
        moveBar: function(delta){
          debug('measureEditView.moveBar: ' + delta);
          if(delta > 0) {
            this.moveField('right');
          } else {
            this.moveField('left');
          }   
              
        },

        addOverlay:function(event) {
          debug('measureEditView.addOverlay');

        }

      });

  window.OverlayView = OverlayView;

  return measureEditView;
});