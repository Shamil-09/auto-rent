$(document).ready(function () {

  // BURGER



  $('.header__burger').click(function (event) {
    $('.header__burger, .nav').toggleClass('active');
    $('body').toggleClass('lock');
  });



  // SLIDER PLACES

  var mySwiperShowPlace = new Swiper('.showplace__swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    loop: true,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 570px
      580: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 768px
      850: {
        slidesPerView: 3,
        spaceBetween: 25
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 2,
        spaceBetween: 85
      },
      // when window width is >= 1100px
      // 1100: {
      // 	slidesPerView: 3,
      // 	spaceBetween: 30
      // }
    },

    // Navigation arrows
    navigation: {
      nextEl: '.showplace__swiper-button-next',
      prevEl: '.showplace__swiper-button-prev',
    }
  });


  var mySwiperAboutAuto = new Swiper('.about-auto__swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 3,
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.about-auto__swiper-button-next',
      prevEl: '.about-auto__swiper-button-prev',
    },
  });

  var mySwiperContacts = new Swiper('.contacts__swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.contacts__swiper-button-next',
      prevEl: '.contacts__swiper-button-prev',
    },

    breakpoints: {
      // when window width is >= 570px
      320: {
        slidesPerView: 1,
        // spaceBetween: 30
      }
    },
  });

  function addZero(n) {
    return n > 10 ? n : (+n > 0) ? "0" + n : n;
  }


  var aboutAutoCurrent = $('.about-auto__current');
  var aboutAutoTotal = $('.about-auto__total');


  mySwiperAboutAuto.on('slideChange', function () {
    aboutAutoCurrent.text(addZero(mySwiperAboutAuto.realIndex + 1));
    aboutAutoTotal.text(addZero(mySwiperAboutAuto.slides.length - 2));
  })

  aboutAutoCurrent.text(addZero(mySwiperAboutAuto.realIndex + 1));
  aboutAutoTotal.text(addZero(mySwiperAboutAuto.slides.length - 2));

  var contactsCurrent = $('.contacts__current');
  var contactsTotal = $('.contacts__total');

  mySwiperContacts.on('slideChange', function () {
    contactsCurrent.text(addZero(mySwiperContacts.realIndex + 1));
    contactsTotal.text(addZero(mySwiperContacts.slides.length - 2));
  })

  contactsCurrent.text(addZero(mySwiperContacts.realIndex + 1));
  contactsTotal.text(addZero(mySwiperContacts.slides.length - 2));


  // Smooth scrolling

  $('.go-to').click(function () { // ловим клик по ссылке с классом go_to
    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1000); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
  });


  // MODAL RESPONSE

  var modal = $('.modal'),
    closelBtn = $('.modal__close');

  closelBtn.on('click', function () {
    modal.removeClass('modal--visible');
  });


  $(document).click(function (e) {
    if ($(e.target).is('.modal')) {
      modal.removeClass('modal--visible');

    }
  });
  $(document).on('keydown', function (e) {
    if (e.keyCode === 27 && ((modal.hasClass('modal--visible')))) {
      modal.removeClass('modal--visible');

    }
  });

  // маска для телефона
  $('[type=tel]').mask('+7(000)00-00-000');

  // Validation

  $('.order__days').validate({

    errorClass: "invalid",
    errorElement: "div",
    rules: {
      //   order__phone: "required",
      //   order__input: "required",
      // },
      order__phone: {
        required: true,
        minlength: 16,
      },
    },


    messages: {
      order__phone: {
        required: "Телефон обязателен",
        minlength: "Введите все цифры",
      },

    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          $('.modal').addClass('modal--visible');
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