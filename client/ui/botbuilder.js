const $ = require('jquery'),
      Transition = require('semantic-ui-transition');

$.fn.transition = Transition;

module.exports = function() {
  const $elem = $('#wb-bot-builder');

  function show() {
    $('body').css('overflow', 'hidden');
    $elem.transition({
      animation: 'fade up',
      onComplete : function() {
        resize();
        $elem.children('.body').transition('fade up');
      }
    });

    uploadImage();
  }

  function resize() {
    const $body = $elem.children('.body'),
          $header = $elem.children('.header'),
          $footer = $elem.children('.footer');

    $body.css('margin-top', $header.outerHeight(true) + 'px');
    $body.height($elem.height() - $footer.outerHeight() - 2);
  }

  function hide() {
    $elem.transition('fade down');
  }

  function uploadImage() {
    $elem.find('.upload-image').click(e => {
      $(e.currentTarget).next('input').trigger('click');
    });

    $elem.find('input[type="file"]').change(e => {
      const formData = new FormData();
      formData.append('file', e.currentTarget.files[0]);

      $.ajax({
        url: "/upload-image",
        mimeType:"multipart/form-data",
        type: "POST",
        dataType: "json",
        data: formData,
        contentType: false,
        processData:false,
        cache: false,
        success: function(response) {
          $(e.currentTarget).parents('.field').prepend('<img src="' + response.url + '" style="height: 150px; display: block; margin-bottom: 1em;" />');
        }
      });
    });
  }

  return {
    show: show
  }
};
