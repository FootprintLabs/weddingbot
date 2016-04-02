const $ = require('jquery'),
      d3 = require('d3'),
      Dimmer = require('semantic-ui-dimmer'),
      Dropdown = require('semantic-ui-dropdown'),
      Transition = require('semantic-ui-transition'),
      Timeseries = require('../charts/timeseries'),
      BotBuilder = require('../ui/botbuilder');

$.fn.dimmer = Dimmer;
$.fn.dropdown = Dropdown;
$.fn.transition = Transition;

module.exports = () => {
  const $elem = $('#wb-dashboard');

  $.getJSON('/data/points.json', data => {

    const parse = d3.time.format('%Y-%m-%d');
    data.forEach(item => {
      item.date = parse.parse(item.date);
      item.price = +item.price;
    });

    const chart = new Timeseries('.wb-chart', {
      popupType: 'series',
      series: [{
        x: 'date',
        y: 'responses',
        data: data
      }]
    });
  });

  $('#wb-user-bots .stats.none').dimmer('show');
  $('#wb-header .dropdown').dropdown();

  $('#wb-template-bar .template:eq(0)').click(e => {
    const builder = BotBuilder();
    builder.show();
  });
};
