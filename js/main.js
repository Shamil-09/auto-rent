$(document).ready(function () {
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Smooth scrolling

  $('.go-to').click(function () { // ловим клик по ссылке с классом go_to
    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1000); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
  });

  // Youtube

  var player;
  $('.hero__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '465',
      width: '100%',
      videoId: 'BkGFhBypWrc',
      events: {
        'onReady': videoPlay,

      }
    });
  })

  function videoPlay(event) {
    event.target.playVideo();
  }

  // маска для телефона
  $('[type=tel]').mask('+7(000)00-00-000');

  // Validation

  $('.order__days').validate({

    errorClass: "invalid",
    errorElement: "div",
    rules: {
      order__input: {
        required: true,
        minlength: 1,
        maxlength: 3
      },
      order__phone: "required",
      order__input: "required",
    },

    // правило сообщения
    messages: {
      order__input: {
        required: "Введите количество дней",
        maxlength: "Число не должно превышать 2 цифр"
      },
      order__phone: "Телефон обязателен",
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          // modal.removeClass('modal--visible');
          // $('.modal-thanks').addClass('modal-thanks--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        }
      });
    }


  });
});