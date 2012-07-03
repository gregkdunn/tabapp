
//require file paths
require.config({
  paths: {
    backbone: 'libs/backbone',
    jquery: 'libs/jquery-1.7.1',
    knobify: 'libs/jquery.knob-1.1.1',
    seeder: 'seeder',
    text: 'libs/text',   
    underscore: 'libs/underscore',

    router: 'routers/router',

    modelAccent: 'models/accent',
    modelChord: 'models/chord',
    modelFinger: 'models/finger',
    modelGranularity: 'models/granularity',
    modelInstrument: 'models/instrument',
    modelMeasure: 'models/measure',
    modelNote: 'models/note',
    modelState: 'models/state',
    modelTimeSignature: 'models/timeSignature',

    collectionAccents: 'collections/accents',
    collectionChords: 'collections/chords',
    collectionFingers: 'collections/fingers',
    collectionGranularities: 'collections/granularities',
    collectionInstruments: 'collections/instruments',
    collectionMeasures: 'collections/measures',
    collectionNotes: 'collections/notes',
    collectionStates: 'collections/states',
    collectionTimeSignatures: 'collections/timeSignatures',
    searchableCollection: 'collections/searchable',

    viewAccount: 'views/account/account',
    viewInputOverlay: 'views/components/inputOverlay',
    viewList: 'views/lists/list',
    viewListItem: 'views/lists/listItem', 
    viewMeasure: 'views/measure/measure', 
    viewMeasureEdit: 'views/measure/measureEdit', 
    viewMeasureNew: 'views/measure/measureNew', 
    viewMeasureShow: 'views/measure/measureShow',  
    viewMeasures: 'views/measures/measures',
    viewMeasuresList: 'views/measures/measuresList',
    viewMeasuresEdit: 'views/measures/measuresEdit',
    viewNav: 'views/layouts/nav',
    viewTabs: 'views/tabs/tabs',
    viewTimeSignatureList: 'views/lists/timeSignatureList',
    viewTimeSignatureListItem: 'views/lists/timeSignatureListItem'

  }
});

define(['jquery', 'underscore', 'backbone', 'router'], function($, _, Backbone, Router) {
  Router.initialize();
});
