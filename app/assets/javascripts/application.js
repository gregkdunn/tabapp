
//require file paths
require.config({
  paths: {
    jquery: 'libs/jquery-1.7.1',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text',
    searchableCollection: 'collections/searchable',
    seeder: 'seeder',

    router: 'routers/router',

    viewNav: 'views/layouts/nav',

    modelAccent: 'models/accent',
    modelChord: 'models/chord',
    modelFinger: 'models/finger',
    modelInstrument: 'models/instrument',
    modelMeasure: 'models/measure',
    modelNote: 'models/note',
    modelState: 'models/state',
    modelTimeSignature: 'models/timeSignature',

    collectionAccents: 'collections/accents',
    collectionChords: 'collections/chords',
    collectionFingers: 'collections/fingers',
    collectionInstruments: 'collections/instruments',
    collectionMeasures: 'collections/measures',
    collectionNotes: 'collections/notes',
    collectionStates: 'collections/states',
    collectionTimeSignatures: 'collections/timeSignatures',

    viewAccount: 'views/account/account',
    viewList: 'views/lists/list',
    viewListItem: 'views/lists/listItem', 
    viewMeasure: 'views/measure/measure', 
    viewMeasureEdit: 'views/measure/measureEdit', 
    viewMeasureNew: 'views/measure/measureNew', 
    viewMeasureShow: 'views/measure/measureShow',  
    viewMeasures: 'views/measures/measures',
    viewMeasuresList: 'views/measures/measuresList',
    viewMeasuresEdit: 'views/measures/measuresEdit',
    viewTabs: 'views/tabs/tabs'
  }
});

//debugging function
var debug = function(what){
      var isDebug = (isDebug)? isDebug : true;
      var whatString ="";
      if(isDebug){
        for (var i = 0; i < arguments.length; i++){
          whatString += arguments[i] + " ";
        }
        if (window.console && window.console.log){
          return window.console.log('app: ' + whatString);
        } else if(ieAlert){
          return alert(whatString);
        }  
      }
    },
    
    debugObject = function(obj){
      var isDebug = isDebug | true,
          ieAlert = ieAlert | false,
          output = '',
          property;
          
      if(isDebug){
        if (window.console && window.console.dir){
          return window.console.dir(obj);
        } else if(window.console && window.console.log) {
          for (property in obj) {
            if (obj.hasOwnProperty(property)) {
                output += '[' + property + ' : ' + obj[property]+'] \n';
            }
          }
          return window.console.log(output);   
        } else if(ieAlert){
          for (property in obj) {
            if (obj.hasOwnProperty(property)) {
                output += '[' + property + ' : ' + obj[property]+'] \n';
            }
          }
          return alert(output);
        }   
      } 
    };