const $ = require('jquery'),
      d3 = require('d3'),
      Dimmer = require('semantic-ui-dimmer'),
      Dropdown = require('semantic-ui-dropdown'),
      Transition = require('semantic-ui-transition'),
      Modal = require('semantic-ui-modal'),
      Timeseries = require('../charts/timeseries'),
      BotBuilder = require('../ui/botbuilder'),
      BotForm = require('../ui/bot-form'),
      React = require('react'),
      ReactDom = require('react-dom'),
      formWeddingInvite = require('../forms/wedding-invite');

$.fn.dimmer = Dimmer;
$.fn.dropdown = Dropdown;
$.fn.transition = Transition;
$.fn.modal = Modal;

module.exports = () => {
  const $elem = $('#wb-dashboard'),
        builder = BotBuilder();

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

  $('#add-user').click(e => {
    $('#wb-modal-user').modal('show');
  });

  $('#wb-template-bar .template').click(e => {
    $('body').scrollTop(0);

    if ($(e.currentTarget).hasClass('about-you')) {
      builder.show();
    } else if ($(e.currentTarget).hasClass('wedding-invite')) {
      ReactDom.render(
        <BotForm form={formWeddingInvite} />,
        document.getElementById('wb-bot-form-container')
      );
    }
  });
};
