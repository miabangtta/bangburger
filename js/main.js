//hero-menu
$(function() {
  let menu = $('#menu')
  let button = $('#button')
  let close = $('#close')

  button.on('click', e => {
   menu.addClass('hamburger-menu_visible')
  });

  close.on('click', e => {
   menu.removeClass('hamburger-menu_visible')
  });
});

// team-acco
$(function() {
  $(".team-acco__trigger").on('click', e => {

     e.preventDefault()
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
       )
     };
   });
});

//menu-acco
$(function() {

  let item = $('.menu-acco__item')
  let content = $('.menu-acco')
  let closeMenu = $('#menu-close')


  $('.menu-acco__trigger').on('click', e => {

  e.preventDefault()

  let trigger = $(e.currentTarget)
  let container = trigger.closest('.menu-acco');
  let item = trigger.closest('.menu-acco__item');
  let content = item.find('.menu-acco__content');
  let otherContent = container.find('.menu-acco__content');
  let items = container.find('.menu-acco__item');
  let textBlock = $('.menu-acco__text', item);
  let wWidth = $(window).width();
  let reqWidthTablets = wWidth - $('.menu-acco__trigger').outerWidth*3;
  let reqWidthMobiles = wWidth - $('.menu-acco__trigger').outerWidth;
  let reqWidthDesktop = textBlock.outerWidth();


  if (!item.hasClass('menu-acco__item_active')) {
    items.removeClass('menu-acco__item_active')
    item.addClass('menu-acco__item_active')

    otherContent.animate({
      'width': 0
    })

    if (window.matchMedia("(max-width: 768px)").matches) {
      content.animate({
        'width': reqWidthTablets + 'px'})
    } else if (window.matchMedia("(max-width: 480px)").matches) {
       content.animate({
         'width': reqWidthMobiles + 'px'
       })
       item.siblings().css({
         'width' : 0
       });
    } else {
      content.stop(true).animate({
        'width': reqWidthDesktop + 'px'}, 750, () => { textBlock.fadeIn()
        });
    };

  } else {
    item.removeClass('menu-acco__item_active');
    content.stop(true).animate({
      'width': 0 }, 750, () => { textBlock.fadeOut()
    })

    // if (window.matchMedia("(max-width: 480px)").matches) {
    //     item.siblings().css({ 'width' : '100%'});
    //   }
  };
});
});

// slider
$(function() {
  let sliderWrapper = $('.burger-slider');
  let objects = sliderWrapper.children();
  let buttonPrev = $(".burger__scroll-prev");
  let buttonNext = $(".burger__scroll-next");

  let currentSlide = 0;

  for(object of objects){
    $(object).css({display:"none"});
 }
 $(objects[0]).css({display:"flex"});
 buttonNext.on("click", e => {
   $(objects[currentSlide]).css({display:"none"});
   currentSlide = getNumber(currentSlide + 1);
   $(objects[currentSlide]).css({display:"flex"});
 });

 buttonPrev.on("click", e => {
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
  let popup = $('.review-popup')
  let authorText = $('.reviews__author')
  let contentText = $('.reviews__content')
  let authorPopup = $('.review-popup__author')
  let contentPopup = $('.review-popup__content')
  let button = $('.reviews__button')
  let close = $('.review-popup__close')

  $('.reviews__button').on('click', e => {
    let target = $(e.target).closest('.reviews__item')
    let title = $(target).children().find('.reviews__author').text()
    let content = $(target).children().find('.reviews__content').text()

    $('.review-popup__author').text(title)
    $('.review-popup__text').text(content);
	  popup.addClass('review-popup_visible');
  });

  close.on('click', e => {
    e.preventDefault()
    popup.removeClass('review-popup_visible');
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
