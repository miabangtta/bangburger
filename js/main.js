//hero-menu
$(function() {
  const menuHam = $('.hamburger-menu');
  const buttonHam = $('.hamburger-menu-link');
  const closeHam = $('.hamburger-menu__close');
  const linkHam = $('hamburger-menu__link');

  buttonHam.on('click touchstart', e => {
   menuHam.addClass('hamburger-menu_visible')
  });

  closeHam.on('click touchstart', e => {
   menuHam.removeClass('hamburger-menu_visible')
  });
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
         'height': "100%" }, 600, () => { content.fadeIn()
         })

     } else {
       item.removeClass('team-acco__item_active');
       content.stop(true, true).animate({
         'height': 0}, 350
       )};
   });
});

//menu-acco
$(function() {
  const wWidth = $(window).width();
  const reqWidth = calcWidth => {

    if ($(window).matchMedia("(max-width: 480px)").matches) {
      calcWidth = wWidth - $('.menu-acco__trigger').outerWidth;
    } else if ($(window).matchMedia("(max-width: 768px)").matches) {
      calcWidth = wWidth - $('.menu-acco__trigger').outerWidth*3;
    } else {
      calcWidth = 510;
    };
  };

  $('.menu-acco__trigger').on('click touchstart', e => {

    e.preventDefault();

    const triggerMenu = $(e.currentTarget)
    const containerMenu = triggerMenu.closest('.menu-acco');
    let item = triggerMenu.closest('.menu-acco__item');
    let content = $('.menu-acco__content', item);
    let otherContent = $('.menu-acco__content', containerMenu);
    let items = $('.menu-acco__item', containerMenu);
    let textBlock = $('.menu-acco__text', item);

    if (!item.hasClass('menu-acco__item_active')) {

      items.removeClass('menu-acco__item_active');
      item.addClass('menu-acco__item_active');

      reqWidth(calcWidth);

      otherContent.animate({
        'width': 0
      });

       content.stop(true).animate({
         'width': reqWidth + 'px';
       });

    } else {
      item.removeClass('menu-acco__item_active');
      content.stop(true).animate({
        'width': 0 }, 750, () => { textBlock.fadeOut()
      })
    };
  });


  $(window).resize( e => {
    if ('.menu-acco__item_active') {
      reqWidth(calcWidth);
      $('.menu-acco__item_active').find('.menu-acco__content') {
        'width': reqWidth + 'px';
      }
    }
  });
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
      performTransition(section.nextSection.index());
      break;

      case 38 : //вниз
      if (!section.prevSection.length) return;
      performTransition(section.prevSection.index());
      break;
    }
  });


  if (isMobile) {
    $(window).swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        preventDefault();
      }
    })
  };

  $('[data-scroll-to]').on('click touchstart', e => {
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
    const formData = form.serialize(),
          url = formData.attr('action');

    return $.ajax({
           type: 'POST',
           url: url,
           dataType: 'JSON',
           data: data
    })
  };

  const submitForm = function (e) {
    e.preventDefault();
    const targetForm = $(e.target);

    ajaxForm(form)
    .done(function(msg)  {
      var mes = msg.mes,
          status = msg.status;

      if (status === 'OK') {
          form.append('<p class="success">' + mes + '</p>');
      } else {
          form.append('<p class="error">' + mes + '</p>');
      }
    })
    .fail(function(jqHR, textStatus) {
      alert("Request failed: " + textStatus);
    });

  $('#form-order').on('submit', submitForm);
  };
