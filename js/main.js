//hero-menu
$(function() {
  const menuHam = $('.hamburger-menu');
  const buttonHam = $('.hamburger-menu-link');
  const closeHam = $('.hamburger-menu__close');
  const itemHam = $('.hamburger-menu__link');

  let inProcess = false;

  buttonHam.on('click touchstart', e => {
   menuHam.addClass('hamburger-menu_visible');

   if (inProcess) return

   inProcess = true

   setTimeout(() => {
     inProcess = false
  }, 1000);

  });

  closeHam.on('click touchstart', e => {
   if (inProcess) return

   inProcess = true

   setTimeout(() => {
     inProcess = false
  }, 1000);

  menuHam.removeClass('hamburger-menu_visible');
  });

  itemHam.on('click touchstart', e => {
    e.preventDefault();
    menuHam.removeClass('hamburger-menu_visible');
    window.location.href = e.currentTarget.href;

  })
});

// team-acco
$(function() {
  $(".team-acco__trigger").on('click touchstart', e => {

     e.preventDefault();
     let trigger = $(e.currentTarget);
     let container = trigger.closest('.team-acco');
     let item = trigger.closest('.team-acco__item');
     let content = item.find('.team-acco__content');
     let otherContent = container.find('.team-acco__content');
     let items = container.find('.team-acco__item');

     if (!item.hasClass('team-acco__item_active')) {
       items.removeClass('team-acco__item_active')
       item.addClass('team-acco__item_active')

       otherContent.stop(true, true).animate({
         'height': 0 }, 0
       )

       content.stop(true, true).animate({
         'height': "100%"
        }, 600, () => { content.fadeIn()
      })

     } else {
       item.removeClass('team-acco__item_active');
       content.stop(true, true).animate({
         'height': 0
        }, 350
       )};
   });
});

//menu-acco
const calcWidth = () => {
const wWidth = $(window).width();
  let reqWidth;
  if (window.matchMedia("(max-width: 480px)").matches) {
      reqWidth = wWidth - $('.menu-acco__trigger').outerWidth()*3;
  } else if (window.matchMedia("(max-width: 768px)").matches) {
      reqWidth = wWidth - $('.menu-acco__trigger').outerWidth()*3;
  } else {
      reqWidth = 510;
  };
  return reqWidth;
};

$(function() {

  $('.menu-acco__trigger').on('click', e => {
    const triggerMenu = $(e.currentTarget);
    const containerMenu = triggerMenu.closest('.menu-acco');
    const itemMenu = triggerMenu.closest('.menu-acco__item');
    let content = $('.menu-acco__content', itemMenu);
    let otherContent = $('.menu-acco__content', containerMenu);
    let items = $('.menu-acco__item', containerMenu);
    let textBlock = $('.menu-acco__text', itemMenu);

    e.preventDefault();

    if (itemMenu.hasClass('menu-acco__item_active')) {
        itemMenu.removeClass('menu-acco__item_active');
        content.stop(true).animate({
          'width': 0 }, 750)
    } else {
        items.removeClass('menu-acco__item_active');
        itemMenu.addClass('menu-acco__item_active');
        otherContent.animate({
            'width': 0
    });
        textBlock.width(calcWidth() - 48 + 'px');
        content.animate({
          'width': calcWidth() + 'px'
    });
  }
  });

  $(window).resize( e => {
    $('.menu-acco__item_active').find('.menu-acco__content').css({
      'width': calcWidth() + 'px'
    });
    $('.menu-acco__item_active').find('.menu-acco__text').css({
      'width': calcWidth() + 'px'
    });
  });

  $(document).on('click', e => {
    let item = $('.menu-acco__item');
    if (!item.is(e.target) && item.has(e.target).length === 0) {
      item.removeClass('menu-acco__item_active');
      $('.menu-acco__content').stop(true).animate({
        'width' : 0
      }, 750);
    }
  })
});

// slider
$(function() {
  const sliderWrapper = $('.burger-slider');
  let objects = sliderWrapper.children();
  let buttonPrev = $(".burger__scroll-prev");
  let buttonNext = $(".burger__scroll-next");

  let currentSlide = 0;

  for(object of objects){
    $(object).css({display:"none"});
 }
 $(objects[0]).css({display:"flex"});
 buttonNext.on("click touchstart", e => {
   $(objects[currentSlide]).css({display:"none"});
   currentSlide = getNumber(currentSlide + 1);
   $(objects[currentSlide]).css({display:"flex"});
 });

 buttonPrev.on("click touchstart", e => {
   $(objects[currentSlide]).css({display:"none"});
   currentSlide = getNumber(currentSlide - 1);
     $(objects[currentSlide]).css({display:"flex"});
 });


  function getNumber(num){
    if (num === -1) {
      num = objects.length - 1;
    }
    if (num === objects.length) {
      num = 0;
    }
    return num;
  };
  });

//popup
$(function() {
  const popup = $('.review-popup');
  const authorText = $('.reviews__author');
  const contentText = $('.reviews__content');
  const authorPopup = $('.review-popup__author');
  const contentPopup = $('.review-popup__content');
  let button = $('.reviews__button');
  let close = $('.review-popup__close');

  $('.reviews__button').on('click touchstart', e => {
    let target = $(e.target).closest('.reviews__item')
    let title = $(target).children().find('.reviews__author').text();
    let content = $(target).children().find('.reviews__content').text();

    $('.review-popup__author').text(title);
    $('.review-popup__text').text(content);
	  popup.addClass('review-popup_visible');

  });

  close.on('click touchstart', e => {
    e.preventDefault();
    popup.removeClass('review-popup_visible');
  });
});

//OPS
$(function() {
  const display = $('.maincontent');
  const sections = $('.section');

  let inScroll = false;

  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();

  const switchMenuActiveClass = sectionEq => {
    $('.pagination__item').eq(sectionEq).addClass('pagination__item_active')
    .siblings().removeClass('pagination__item_active')
  };

  const performTransition = sectionEq => {
    if (window.matchMedia("(max-height: 450px)").matches) return;

    if (inScroll) return

    inScroll = true

    const position = (sectionEq * (-100)) + '%';

    display.css({
      'transform' : `translate(0, ${position})`,
      '-webkit-transform' : `translate(0, ${position})`
    })

    sections.eq(sectionEq).addClass('section_active')
      .siblings().removeClass('section_active');

      setTimeout(() => {
        inScroll = false;
        switchMenuActiveClass(sectionEq);
      }, 1300);
};

  const defineSections = sections => {
    const activeSection = sections.filter('.section_active');
    return {
      activeSection: activeSection,
      nextSection: activeSection.next(),
      prevSection: activeSection.prev()
    }
  };

  const scrollToSection = direction => {
    if (window.matchMedia("(max-height: 450px)").matches) return;
    if ( $('.review-popup').hasClass('review-popup_visible') ) return;
    if ( $('.order-popup').hasClass('order-popup_visible') ) return;

    const section = defineSections(sections)
    if (inScroll) return;

    if (direction === 'up' && section.nextSection.length) { //вниз
      performTransition(section.nextSection.index())
    }

    if (direction === 'down' && section.prevSection.length) { //вверх
      performTransition(section.prevSection.index())
    }
  };

  $('.wrapper').on({
    wheel : e => {
      const deltaY = e.originalEvent.deltaY;
      let direction = (deltaY > 0)
      ? 'up'
      : 'down'

      scrollToSection(direction);
    },
    touchmove: e => (e.preventDefault())
  });

  $(document).on('keydown', e => {
    const section = defineSections(sections);
    if (inScroll) return

    switch (e.keyCode) {
      case 40 : //вверх
      if (!section.nextSection.length) return;
      if ( $('.review-popup').hasClass('review-popup_visible') ) return;
      if ( $('.order-popup').hasClass('order-popup_visible') ) return;
      performTransition(section.nextSection.index());
      break;

      case 38 : //вниз
      if (!section.prevSection.length) return;
      if ( $('.review-popup').hasClass('review-popup_visible') ) return;
      if ( $('.order-popup').hasClass('order-popup_visible') ) return;
      performTransition(section.prevSection.index());
      break;
    }
  });

  if (isMobile) {
    $(window).swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        performTransition(direction);
      }
    })
  };

  $('[data-scroll-to]').on('click touchstart', e => {

    if (window.matchMedia("(max-height: 450px)").matches) return;
    e.preventDefault();

    const scrollItem = $(e.currentTarget);
    const sectionIndex = parseInt(scrollItem.attr('data-scroll-to'));
    performTransition(sectionIndex);
  });
});


//карта
$(function() {
  ymaps.ready(init);
  let myMap;

  function init(){
        myMap = new ymaps.Map("map", {
          center: [59.91817154482064,30.30557799999997],
          zoom: 11,
          controls: []

      });

      myMap.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom']);

      coords = [
      [59.94554327989287,30.38935262114668],
      [59.91142323563909,30.50024587065841],
      [59.88693161784606,30.319658102103713],
      [59.97033574821672,30.315194906302924]
      ],
      myCollection = new ymaps.GeoObjectCollection({}, {
        iconLayout: 'default#image',
        iconImageHref: './img/icons/map-marker.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-26, -52],
        draggable: false
      });

  for (var i = 0; i < coords.length; i++) {
      myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  };
});

// форма заказа
$(function() {
  const ajaxForm = function (form) {
  const formData = form.serialize();
  const url = formData.attr('action');

  const submitForm = function (e) {
    e.preventDefault();

    var color = $('input').css('border-color');

    $.ajax('main.php', {
      type: "POST",
      data: formData,
      success: e => {
        $('.order-popup__text').text(data);
        $('.order-popup').addClass('order-popup_visible');
      }
    });
  }

  $('#form-order').on('submit', submitForm);
  };

  $('.order-popup__btn').on('click', e => {
    $('.order-popup').removeClass('order-popup_visible');
  })
});
