const $ = require('jquery'),
      d3 = require('d3'),
      utils = require('../utils'),
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
  $('#wb-modal-user .dropdown').dropdown();

  $('#wb-user-bots .stats .more').click(e => {
    const $grid = $(e.currentTarget)
                      .parents('.stats')
                      .find('.ui.two.column.grid');

    if ($grid.find('.column.hidden').length) {
      $grid.find('.column.hidden')
        .removeClass('hidden')
        .addClass('showing');

      $(e.currentTarget).html(
        '<span>Less</span>' +
        '<i class="caret up icon"></i>'
      );

    } else {
      $grid.find('.column.showing')
        .addClass('hidden')
        .removeClass('showing');

      $(e.currentTarget).html(
        '<span>More</span>' +
        '<i class="dropdown icon"></i>'
      );
    }
  });

  let guestCount = 1;
  $('#add-guest').click(e => {
    guestCount++;
    const content = '<div class="fields">' +
        '<div class="eleven wide field">' +
        ' <input type="text" placeholder="Guest ' + guestCount + '" />' +
        '</div>' +
      '</div>';

    $(e.currentTarget).parents('.fields').parent().append(content);
  });

  if (utils.isMobile()) {
    $('#wb-template-bar').scroll(e => {
      const elem = e.currentTarget;
      console.log(elem.scrollLeft);
    });
  }

  var builderShown = false;
  var botFormShown = false;
  var hash = window.location.hash;
  setInterval(function(){
    if (window.location.hash !== hash && hash === '#form') {
      if (builderShown) {
        builder.hide();
        builderShown = false;
      }

      if (botFormShown) {
        botFormShown = false;
        $('#wb-bot-form-container').html('');
        $('body').css('overflow', 'auto');
      }
    }

    hash = window.location.hash;
  }, 100);

  $('#wb-template-bar .template').click(e => {
    $('body').scrollTop(0);

    window.location.hash = "#form";

    if ($(e.currentTarget).hasClass('about-you')) {
      builderShown = true;
      builder.show();
    } else if ($(e.currentTarget).hasClass('wedding-invite')) {
      botFormShown = true;
      ReactDom.render(
        <BotForm form={formWeddingInvite} />,
        document.getElementById('wb-bot-form-container')
      );
    }
  });
};
