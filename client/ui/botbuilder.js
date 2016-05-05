const $ = require('jquery'),
      _ = require('lodash'),
      utils = require('../utils'),
      moment = require('moment'),
      Transition = require('semantic-ui-transition'),
      Checkbox = require('semantic-ui-checkbox'),
      Dropdown = require('semantic-ui-dropdown'),
      Progress = require('semantic-ui-progress'),
      Pikaday = require('pikaday');

$.fn.transition = Transition;
$.fn.checkbox = Checkbox;
$.fn.dropdown = Dropdown;
$.fn.progress = Progress;

module.exports = function() {
  const $elem = $('#wb-bot-builder'),
        $body = $elem.children('.body'),
        $header = $elem.children('.header'),
        $progress = $header.children('.progress');

  let bodyLoaded = false;

  function show() {
    $('body').css('overflow', 'hidden');
    $elem.transition({
      animation: 'fade up',
      onComplete : () => {
        resize();
        if (!bodyLoaded) {
          loadBody();
        }
      }
    });
  }

  function loadBody() {
    $.get('/forms/aboutyou', html => {
      bodyLoaded = true;
      $body.find('.container').html(html);
      $body.transition({
        animation: 'fade up',
        onComplete: () => bindEvents()
      });
    });
  }

  function resize() {
    $body.css('margin-top', $header.outerHeight(true) + 'px');
    $body.height($elem.height() - $header.outerHeight(true));
  }

  function hide() {
    $('body').css('overflow', 'auto');
    $elem.transition('fade down');
  }

  function bindEvents() {
    $elem.find('.save-form, .cancel-form').click(hide);

    bindFormEvents($body);
    initProgress();
  }

  function bindFormEvents($form) {
    $form.find('.datepicker').each((i, elem) => {
      new Pikaday({
        field:      elem,
        format:     'MMMM Do YYYY',
        container:  $body.children('.ui.container')[0],
        onOpen: function() {
          $(this.el).css({
            position: 'absolute',
            top:  $body.scrollTop() + $(elem).offset().top -
                  ($body.outerHeight(true) - $body.height()),
            left: $(elem).offset().left -
                  $body.children('.ui.container').offset().left
          });
        }
      });
    });

    $form.find('.ui.checkbox').checkbox({
      onChecked: function() {
        checkAction(this, true);
      },
      onUnchecked: function() {
        checkAction(this, false);
      }
    });

    $form.find('.ui.dropdown.time').each((i, elem) => {
      _.each(_.range(1, 24), item => {
        let time = item - 12 < 1 ? item + ':00 AM' : (item - 12) + ':00 PM';
        const content = '<div class="item" data-value="' + time + '">' + time + '</div>';

        $(elem).find('.menu').append(content);
      });
    });

    $form.find('.ui.dropdown').dropdown();

    $form.find('input').focusin(e => highlightModule(e.currentTarget));

    $form.find('.wb-link').click(e => {
      const data = $(e.currentTarget).data();

      let $target;
      if (data.action === 'show') {
        $target = $body.find('.wb-module[data-module="' + data.target + '"]');
        $target.removeClass('hidden');
      }

      _.delay(() => $target.find('input[type="text"]:eq(0)').focus(), 100);
    });

    uploadImage($form);
  }

  function initProgress() {
    const selectors = '.wb-field input[type="text"],' +
                      '.wb-field input[type="number"]',
          $inputs = $body.find(selectors);

    let completed = 0;
    const count = $inputs.length;

    $progress.find('.progress')
      .css({ right: '-4em', color: '#333'})
      .html('0 of ' + count);

    $progress.progress({
      total: count,
      label: 'ratio',
      text: {
        ratio: '{value} of {total}'
      },
      onChange: (percent, value) => {
        if ($progress.find('.bar').width() < 80) {
          $progress.find('.progress')
            .css({ right: '-4em', color: '#333'});
        } else {
          $progress.find('.progress').removeAttr('style');
        }
      }
    });

    $inputs.focusout(e => {
      const $input = $(e.currentTarget),
            sameValue = $input.data('lastValue') === $input.val();

      if ($input.val().length && !sameValue) {
        $progress.progress('increment');
      } else if (!sameValue) {
        $progress.progress('decrement');
      }

      $input.data('lastValue', $input.val());
    });
  }

  function uploadImage($form) {
    let $currentField,
        lastPercent = 0;

    const updateProgress = e => {
      if (e.lengthComputable && $currentField) {
        const percent = _.toInteger((e.loaded / e.total) * 100),
              increment = percent - lastPercent;
        lastPercent = percent;
        console.log(percent);
        $currentField.find('.ui.progress').progress('increment', increment);
      }
    };

    $form.find('.upload-image').click(e => {
      $(e.currentTarget).next('input[type="file"]').trigger('click');
    });

    $form.find('input[type="file"]').change(e => {
      const formData = new FormData();
      formData.append('file', e.currentTarget.files[0]);

      $currentField = $(e.currentTarget).parents('.wb-field');
      $currentField.find('.ui.progress').remove();
      $currentField.prepend(
        '<div class="ui indicating progress">' +
        '  <div class="bar"><div class="progress"></div></div>' +
        '  <div class="label">Uploading...</div>' +
        '</div>');

      $currentField.find('.ui.progress').progress({
        total: 100,
      });
      lastPercent = 0;

      $.ajax({
        url: "/upload-image",
        mimeType:"multipart/form-data",
        type: "POST",
        dataType: "json",
        data: formData,
        contentType: false,
        processData:false,
        cache: false,
        xhr: function() {  // Custom XMLHttpRequest
          const myXhr = $.ajaxSettings.xhr();
          if(myXhr.upload){ // Check if upload property exists
              myXhr.upload.addEventListener('progress', updateProgress, false); // For handling the progress of the upload
          }
          return myXhr;
        },
        success: response => {
          if ($currentField) {
            $currentField.find('.ui.progress').remove();
            $currentField.find('img').remove();
            $currentField.prepend(
                '<img src="' + response.url + '" ' +
                'style="height: 150px; display: block; margin-bottom: 1em;"' +
                '/>');
          }
        }
      });
    });
  }

  function highlightModule(elem) {
    $('.wb-module').removeClass('highlight');
    $(elem).parents('.wb-module').addClass('highlight');

    if (utils.isMobile()) {
      _.delay(() => {
        let to = $(elem).offset().top;
        const $form = $(elem).parents('.ui.form'),
              $field = $(elem).parents('.wb-field');

        $body.scrollTop($form.position().top + $field.position().top);
      }, 200);
    }
  }

  function checkAction(elem, isChecked) {
    highlightModule(elem);
    const data = $(elem).data();

    if (data.action === 'disable') {
      const $input = $body.find('input[name="' + data.input + '"]');
      if (isChecked) {
        $input.hide();
        $progress.progress('increment');
      } else {
        $input.show();
        _.delay(() => $input.focus(), 100);
        $progress.progress('decrement');
      }
    } else if (data.action === 'enable') {
      const $input = $body.find('input[name="' + data.input + '"]');
      if (isChecked) {
        $input.show();
        _.delay(() => $input.focus(), 100);
      } else {
        $input.hide();
      }
    } else if (data.action === 'same') {
      const $input = $body.find('input[name="' + data.input + '"]'),
            $target = $body.find('input[name="' + data.target + '"]');

      if (isChecked) {
        $input.val($target.val());
        $progress.progress('increment');
      } else {
        $input.val("");
        _.delay(() => $input.focus(), 100);
        $progress.progress('decrement');
      }
    } else if (data.action === 'dont-know') {
      if (isChecked) {
        $progress.progress('increment');
      } else {
        $progress.progress('decrement');
      }
    } else if (data.action === 'hide-input') {
      if (isChecked) {
        $(elem)
          .parents('.ten.wide.field')
          .find('.field.checkInput')
          .hide();
      }
    } else if (data.action === 'show-input') {
      if (isChecked) {
        const $input = $(elem)
          .parents('.ten.wide.field')
          .find('.field.checkInput');
        $input.show();
        $input.find('input').val('');
        _.delay(() => $input.find('input').focus(), 100);
      }
    } else if (data.action === 'toggle') {
      const val = _.toInteger($(elem).val());

      let $target;
      if (data.target.search(/\./g) > 0) {
        $target = $body.find('.wb-field[data-name="' + data.target + '"]');
      } else {
        $target = $body.find('.wb-module[data-module="' + data.target + '"]');
      }

      if (val && isChecked) {
        $target.removeClass('hidden');
        _.delay(() => $target.find('input:eq(0)').focus(), 100);
      } else {
        $target.addClass('hidden');
      }
    }
  }

  return {
    show: show,
    hide: hide
  }
};
