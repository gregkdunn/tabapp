  define(['jquery', 'underscore'], function($, _) {

    var pattern_open = '{ ',
        key_open = ':',
        key_close = ' =>'
        value_open = ' ',
        value_close = '',
        connector = ', ',
        pattern_close = ' }',

        config = {
          id_count : 1,
          ids : ['','',''],
          counts : [1,1,1],
          totals : [1,1,1]
        }

        seed_data = '',

        getSeedData = function() {
          var ids = ['first_id', 'second_id', 'third_id',],
              totals =['first_total','second_total','third_total'];

          _.each(ids, function(id, index){
            debug('getSeedData.elm: ' + id);
            getData('ids', index, id);
          });

          _.each(totals, function(total, index){
            debug('getSeedData.elm: ' + total);
            getData('totals', index, total);
          });

          return true;
        },

        getData = function(field, index, elm) {
          debug('getData');
          config[field][index] = $('.' + elm).val();
          debug('getData.elm:' + elm);
          debug('getData.config:' + config[field][index]);
        },

        createSeedData = function() {
          for(config.counts[0]; config.counts[0] <= config.totals[0]; config.counts[0]++) {
            debug('first_count:' + config.counts[0]);
            
            config.counts[1] = 1;
            for(config.counts[1]; config.counts[1] <= config.totals[1]; config.counts[1]++) {
              debug('second_count:' + config.counts[1]);

              config.counts[2] = 1;
              for(config.counts[2]; config.counts[2] <= config.totals[2]; config.counts[2]++) {
                debug('third_count:' + config.counts[2]);
                var seed_line = createSeedLine();
                debug('seed_line:' + seed_line);

                config.id_count++;
                seed_data += seed_line; 

              }
            }
          }
          resetCounts();
          debug('seed_data:' + seed_data);

          return true;
        },

        createSeedLine = function() {
          var seed_line = '';
          if (config.id_count > 1) {
            seed_line += ', <br/>';
          }
          seed_line += pattern_open; 
          seed_line += createKeyValue('id', config.id_count);
          seed_line += connector + createKeyValue(config.ids[0], config.counts[0]);
          seed_line += connector + createKeyValue(config.ids[1], config.counts[1]); 
          seed_line += connector + createKeyValue(config.ids[2], config.counts[2]);
          seed_line += pattern_close;  

          return seed_line;
        },
        
        createKeyValue = function(key, value) {
          return key_open + key + key_close + value_open + value + value_close;
        },

        displaySeedData = function() {
          $('.seed_data')
            .empty()
            .html(seed_data);
          debug('seed_data:' + seed_data);
        },

        resetCounts = function() {
          config.id_count = 1;
          _.each(config.counts, function(count, index){
            config.counts[index] = 1;
          })
        };
 
    return {
      getSeedData: getSeedData,
      createSeedData: createSeedData,
      displaySeedData: displaySeedData
    }
  });
  