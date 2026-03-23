window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.nav__local');
  const addressBlock = e.target.closest('.nav__address');

  // Закрыть все списки, если клик вне
  if (!addressBlock) {
    document.querySelectorAll('.nav__address-list.active')
      .forEach(list => list.classList.remove('active'));
    return;
  }

  // Клик по заголовку
  if (toggle) {
    const list = addressBlock.querySelector('.nav__address-list');

    // закрываем все остальные
    document.querySelectorAll('.nav__address-list.active')
      .forEach(l => {
        if (l !== list) l.classList.remove('active');
      });

    list.classList.toggle('active');
  }

  // Клик по адресу
  if (e.target.tagName === 'LI') {
    const current = addressBlock.querySelector('.nav__address-current');
    current.textContent = e.target.textContent;

    addressBlock
      .querySelector('.nav__address-list')
      .classList.remove('active');
  }
});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('a.btn').click(function (e) {
    e.preventDefault();
    $('#popup-call').arcticmodal({
    });
  });
   $('.local__info_1').click(function (e) {
    e.preventDefault();
    $('#popup-local1').arcticmodal({
    });
  });
   $('.local__info_2').click(function (e) {
    e.preventDefault();
    $('#popup-local2').arcticmodal({
    });
  });
  $('.local__info_3').click(function (e) {
    e.preventDefault();
    $('#popup-local3').arcticmodal({
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs');
});
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs2');
});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 5,
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 5,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 5,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 5,
        slidesPerView: 1
      },
      1200: {
        spaceBetween: 5,
        slidesPerView: 1
      }
    }
  });
   const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      }
    },
    on: {
    slideChangeTransitionEnd() {
      AOS.refreshHard();
    }
  }
  });
   const swiper22 = new Swiper('.swiper22', {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next22',
      prevEl: '.swiper-button-prev22',
    },
     breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      }
    }
  });
  const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 2,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2, 
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
   const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 10,
        slidesPerView: 4, 
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
  const swiper44 = new Swiper('.swiper44', {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next44',
      prevEl: '.swiper-button-prev44',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2, 
      }
    }
  });
   const swiper6 = new Swiper('.swiper6', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next6',
      prevEl: '.swiper-button-prev6',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 4, 
      }
    }
  });
   const swiper7 = new Swiper('.swiper7', {
    slidesPerView: 2,
    spaceBetween: 12,
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 12,
        slidesPerView: 2
      }
    }
  });
   const swiper8 = new Swiper('.swiper8', {
    slidesPerView: 3,
    spaceBetween: 20,
     navigation: {
      nextEl: '.swiper-button-next8',
      prevEl: '.swiper-button-prev8',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3
      }
    }
  });
   const swiper9 = new Swiper('.swiper9', {
    slidesPerView: 3,
    spaceBetween: 20,
     navigation: {
      nextEl: '.swiper-button-next9',
      prevEl: '.swiper-button-prev9',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1300: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1302: {
        spaceBetween: 20,
        slidesPerView: 3
      },
    }
  });

  const swiper10 = new Swiper('.swiper10', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next10',
      prevEl: '.swiper-button-prev10',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 4, 
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
  const swiper11 = new Swiper('.swiper11', {
    slidesPerView: 3,
    spaceBetween: 20,
     navigation: {
      nextEl: '.swiper-button-next11',
      prevEl: '.swiper-button-prev11',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1300: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1302: {
        spaceBetween: 20,
        slidesPerView: 3
      },
    }
  });
  const swiper12 = new Swiper('.swiper12', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next12',
      prevEl: '.swiper-button-prev12',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3, 
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
  const swiper13 = new Swiper('.swiper13', {
    slidesPerView: 2,
    spaceBetween: 20,
     navigation: {
      nextEl: '.swiper-button-next13',
      prevEl: '.swiper-button-prev13',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1300: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1302: {
        spaceBetween: 20,
        slidesPerView: 2
      },
    }
  });
  const swiper14 = new Swiper('.swiper14', {
    slidesPerView: 4,
    spaceBetween: 20,
     navigation: {
      nextEl: '.swiper-button-next14',
      prevEl: '.swiper-button-prev14',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1300: {
        spaceBetween: 20,
        slidesPerView: 3
      },
      1302: {
        spaceBetween: 20,
        slidesPerView: 4
      },
    }
  });
  const swiper15 = new Swiper('.swiper15', {
    slidesPerView: 3,
    spaceBetween: 20,
     navigation: {
      nextEl: '.swiper-button-next15',
      prevEl: '.swiper-button-prev15',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1300: {
        spaceBetween: 20,
        slidesPerView: 3
      },
      1302: {
        spaceBetween: 20,
        slidesPerView: 3
      },
    }
  });
  const swiper16 = new Swiper('.swiper16', {
    slidesPerView: 2,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next16',
      prevEl: '.swiper-button-prev16',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 2, 
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
  const swiper17 = new Swiper('.swiper17', {
    slidesPerView: 4,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next17',
      prevEl: '.swiper-button-prev17',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 4, 
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
  const swiper18 = new Swiper('.swiper18', {
    slidesPerView: 3,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next18',
      prevEl: '.swiper-button-prev18',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2, 
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 3, 
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const parent = document.querySelector('.vr');
  if (!parent) return;

  const elements = parent.querySelectorAll('*');

  elements.forEach(el => {
    const style = window.getComputedStyle(el);

    // Проверяем разные свойства
    if (style.color === 'rgb(168, 72, 241)') {
      el.style.color = '#3573f9';
    }

    if (style.backgroundColor === 'rgb(168, 72, 241)') {
      el.style.backgroundColor = '#3573f9';
    }

    if (style.borderColor === 'rgb(168, 72, 241)') {
      el.style.borderColor = '#3573f9';
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $(".youtube-link").grtyoutube({
      autoPlay: true
    });
  });

  (function ($) {

    $.fn.grtyoutube = function (options) {

      return this.each(function () {

        // Get video ID
        var getvideoid = $(this).attr("youtubeid");

        // Default options
        var settings = $.extend({
          videoID: getvideoid,
          autoPlay: true
        }, options);

        // Convert some values
        if (settings.autoPlay === true) { settings.autoPlay = 1 } else { settings.autoPlay = 0 }

        // Initialize on click
        if (getvideoid) {
          $(this).on("click", function () {
            $("body").append('<div class="grtvideo-popup">' +
              '<div class="grtvideo-popup-content">' +
              '<span class="grtvideo-popup-close"></span>' +
              '<iframe class="grtyoutube-iframe" src="https://www.youtube.com/embed/' + settings.videoID + '?rel=0&wmode=transparent&autoplay=' + settings.autoPlay + '&iv_load_policy=3" allowfullscreen frameborder="0"></iframe>' +
              '</div>' +
              '</div>');
          });
        }

        // Close the box on click or escape
        $(this).on('click', function (event) {
          event.preventDefault();
          $(".grtvideo-popup-close, .grtvideo-popup").click(function () {
            $(".grtvideo-popup").remove();
          });
        });

        $(document).keyup(function (event) {
          if (event.keyCode == 27) {
            $(".grtvideo-popup").remove();
          }
        });
      });
    };
  }(jQuery));
});
document.addEventListener('DOMContentLoaded', () => {

  let swiper5 = null;
  let currentMode = null; // 'desktop' | 'mobile'

  const isDesktop = () => window.innerWidth >= 1200;

  /* =========================
     INIT / DESTROY
  ========================== */

  function initSwiper(force = false) {
    const mode = isDesktop() ? 'desktop' : 'mobile';
    if (!force && currentMode === mode) return;

    destroySwiper();
    currentMode = mode;

    if (mode === 'desktop') {
      swiper5 = new Swiper('.swiper5', {
        direction: 'vertical',
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        speed: 6000,
        allowTouchMove: false,

        navigation: {
          nextEl: '.swiper-button-next5',
          prevEl: '.swiper-button-prev5',
        },

        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },

        freeMode: {
          enabled: true,
          momentum: false,
        },
      });
    } else {
      swiper5 = new Swiper('.swiper5', {
        direction: 'horizontal', // 🔥 ВАЖНО
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        speed: 400,
        allowTouchMove: true,

        navigation: {
          nextEl: '.swiper-button-next5',
          prevEl: '.swiper-button-prev5',
        },
      });
    }
  }

  function destroySwiper() {
    if (!swiper5) return;
    swiper5.destroy(true, true);
    swiper5 = null;
  }

  initSwiper();
  window.addEventListener('resize', initSwiper);

  /* =========================
     YOUTUBE POPUP
  ========================== */

  $(document).on("click", ".youtube-link", function (e) {
    e.preventDefault();

    const videoID = $(this).attr("youtubeid");
    if (!videoID) return;

    destroySwiper();

    $("body").append(`
      <div class="grtvideo-popup">
        <div class="grtvideo-popup-content">
          <span class="grtvideo-popup-close"></span>
          <iframe
            src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0"
            allow="autoplay; fullscreen"
            allowfullscreen
            frameborder="0">
          </iframe>
        </div>
      </div>
    `);
  });

  function closeVideo() {
    $(".grtvideo-popup").remove();

    // 🔥 форсированная реинициализация
    setTimeout(() => {
      initSwiper(true);
    }, 50);
  }

  $(document).on("click", ".grtvideo-popup, .grtvideo-popup-close", closeVideo);

  $(document).on("keyup", function (e) {
    if (e.key === "Escape") closeVideo();
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav-main');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add('fix');
    } else {
      nav.classList.remove('fix');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn5 = document.querySelector('.menu-btn');
  const menu5 = document.querySelector('.menu');
  const menuClose = document.querySelector('.menu__close');
  const header = document.querySelector('.pages header');

  function updateBodyState() {
    if (menu5.classList.contains('active')) {
      document.body.classList.add('menu-active');
      document.body.style.overflow = 'hidden'; // 👈 убрали скролл

      if (header) header.style.zIndex = 'initial';

    } else {
      document.body.classList.remove('menu-active');
      document.body.style.overflow = ''; // 👈 вернули скролл

      if (header) header.style.zIndex = '';
    }
  }

  // Открытие меню
  menuBtn5.addEventListener('click', () => {
    menuBtn5.classList.toggle('active');
    menu5.classList.toggle('active');
    updateBodyState();
  });

  // Закрытие по кнопке
  menuClose.addEventListener('click', (e) => {
    e.stopPropagation();
    menu5.classList.remove('active');
    menuBtn5.classList.remove('active');
    updateBodyState();
  });

  // Закрытие по фону
  menu5.addEventListener('click', (e) => {
    if (e.target === menu5) {
      menu5.classList.remove('active');
      menuBtn5.classList.remove('active');
      updateBodyState();
    }
  });

  // Закрытие при клике по ссылкам меню
  document.querySelectorAll('.menu li a.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      menuBtn5.classList.remove('active');
      menu5.classList.remove('active');
      updateBodyState();
    });
  });

  // Скролл по якорям
  document.querySelectorAll('.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetSelector = link.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

