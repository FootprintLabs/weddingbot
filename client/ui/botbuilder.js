const $ = require('jquery'),
      _ = require('lodash'),
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
        $header = $elem.children('.header');

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

    $elem.find('.datepicker').each((i, elem) => {
      new Pikaday({
        field: elem,
        format: 'MMMM Do YYYY',
        container: $body.children('.ui.container')[0],
        onOpen: function() {

          var top = $body.scrollTop() + $(elem).offset().top -
            ($body.outerHeight(true) - $body.height());

          var left = $(elem).offset().left -
            $body.children('.ui.container').offset().left;

          $(this.el).css({
            position: 'absolute',
            top: top,
            left: left
          });

        }
      });
    });

    $elem.find('.ui.checkbox').checkbox({
      onChecked: function() {
        checkAction(this, true);
      },
      onUnchecked: function() {
        checkAction(this, false);
      }
    });

    $elem.find('.ui.dropdown.time').each((i, elem) => {
      _.each(_.range(1, 24), item => {
        let time = item - 12 < 1 ? item + ':00 AM' : (item - 12) + ':00 PM';
        const content = '<div class="item" data-value="' + time + '">' + time + '</div>';

        $(elem).find('.menu').append(content);
      });
    });

    $elem.find('.ui.dropdown.time').dropdown();

    $elem.find('.wb-module-show-link').click(e => {
      $(e.currentTarget)
        .nextAll('.wb-field.hidden')
        .removeClass('hidden');

      const $firstInput = $(e.currentTarget)
        .next('.wb-field')
        .find('input[type="text"]:eq(0)');

      _.delay(() => $firstInput.focus(), 100);

      $(e.currentTarget).remove();
    });

    uploadImage();
  }

  function uploadImage() {
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

    $elem.find('.upload-image').click(e => {
      $(e.currentTarget).next('input[type="file"]').trigger('click');
    });

    $elem.find('input[type="file"]').change(e => {
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


  function checkAction(elem, isChecked) {
    const data = $(elem).data();

    if (data.action === 'disable') {
      const $input = $body.find('input[name="' + data.input + '"]');
      if (isChecked) {
        $input.hide();
      } else {
        $input.show();
        _.delay(() => $input.focus(), 100);
      }
    } else if (data.action === 'same') {
      const $input = $body.find('input[name="' + data.input + '"]'),
            $target = $body.find('input[name="' + data.target + '"]');

      if (isChecked) {
        $input.val($target.val());
      } else {
        $input.val("");
        _.delay(() => $input.focus(), 100);
      }
    } else if (data.action === 'toggle') {
      const val = _.toInteger($(elem).val()),
            $field = $body.find('.wb-field[data-name="' + data.target + '"]');

      if (val) {
        $field.removeClass('hidden');
        _.delay(() => $field.find('input:eq(0)').focus(), 100);
      } else {
        $field.addClass('hidden');
      }
    }
  }

  return {
    show: show
  }
};
