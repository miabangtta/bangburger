


//accordion
$(function() {
  $(".team-acco__item").on('click', e => {

     e.preventDefault()
     const accoItem = $(e.currentTarget);
     accoItem.toggleClass('team-acco__item_active').siblings().removeClass('team-acco__item_active');
   });
});



// hamburger-menu
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

//menu
$(function() {
  let triggerMenu = $('#menu-trigger')
  let itemMenu = $('#menu-item')
  let accoMenu = $('#menu-acco')
  let closeMenu = $('#menu-close')

  triggerMenu.on('click', e => {
    event.preventDefault()
    itemMenu.addClass('menu__item_active')
    accoMenu.addClass('menu__acco_active')
  });

  closeMenu.on('click', e => {
    event.preventDefault()
    itemMenu.removeClass('menu__item_active')
    accoMenu.removeClass('menu__acco_active')
  });

  $("itemMenu").on('click', e => {
    e.preventDefault()
    $('itemMenu').toggleClass('menu-acco__item_active').siblings()

  })
});

// slider

$(function() {
  let sliderWrapper = $('.burger-slider');
  let objects = sliderWrapper.children();
  let buttonPrev = $(".burger__scroll-prev");
  let buttonNext = $(".burger__scroll-next");

  let currentSlide = 0;

  for(object of objects){
    object.style.display = "none";
  }
  objects[0].style.display = "flex";
  buttonNext.on("click", e => {
    objects[currentSlide].style.display = "none";
    currentSlide = getNumber(currentSlide + 1);
    objects[currentSlide].style.display = "flex";
  });


  buttonPrev.on("click", e => {
    objects[currentSlide].style.display = "none";
    currentSlide = getNumber(currentSlide - 1);
    objects[currentSlide].style.display = "flex";
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

  let authorText = $('.reviews__author')
  let contentText = $('.reviews__content')
  let authorPopup = $('.review-popup__author')
  let contentPopup = $('.review-popup__content')
  let button = $('.reviews__button')
  let close = $('.review-popup__close')

$.on('click', e =>  {
  let target = e.target,
  		index = null,
      content = null

      if (target.dataset.index) {
   index = target.dataset.index;
   [...list].forEach(item => {
     if (item.dataset.index == index) {
       let text = item.innerText
       authorPopup.value = text
     }
   })
 }
});

  button.on('click', e => {
    e.preventDefault()
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
