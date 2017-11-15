ymaps.ready(init);
var myMap;

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

// hamburger-menu

var menu = document.getElementById('menu')
var button = document.getElementById('button')
var close = document.getElementById('close')

button.addEventListener('click', function() {
 menu.classList.add('hamburger-menu_visible')
})

close.addEventListener('click', function() {
 menu.classList.remove('hamburger-menu_visible')
});

//menu
var triggerMenu = document.getElementById('menu-trigger')
var itemMenu = document.getElementById('menu-item')
var accoMenu = document.getElementById('menu-acco')
var closeMenu = document.getElementById('menu-close')

triggerMenu.addEventListener('click', function() {
  event.preventDefault()
  itemMenu.classList.add('menu__item_active')
  accoMenu.classList.add('menu__acco_active')
})

closeMenu.addEventListener('click', function() {
  event.preventDefault()
  itemMenu.classList.remove('menu__item_active')
  accoMenu.classList.remove('menu__acco_active')
});
