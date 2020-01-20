<template>
  <div class="main-page">
    <img src="~/static/pics/main/bg.png" class="main-page__welcome__background" alt="Добро пожаловать">
    <div class="main-page__welcome__gradient"></div>
    <Welcome />
    <Search class="main-page__welcome__search" />
    <BeachSliderArea :data="mostPopularBeaches" :areaData="mostPopularBeachesAreaData" />
    <Cities :data="cityBeaches" />
    <Map :data="mapData" />
    <BeachEntranceFree />
    <BeachSliderArea :data="familyData" :areaData="familyAreaData" class="main-page__family-rest" />
    <BeachEvents :data="eventData" :areaData="beachEventsData" />
    <ChooseBeach />
    <!-- Dynamic slider -->
    <!-- Weather slider -->
    <OnCarNoProblem />
    <BeachType :data="beachTypeData" />
    <YouNeedThis />
    <BeachSliderArea :data="hotelData" :areaData="hotelAreaData" />
  </div>
</template>

<script>
  import Search from '~/components/global/Search';
  import Welcome from '~/components/pages/main-page/Welcome';
  import BeachSliderArea from '~/components/pages/main-page/BeachSliderArea';
  import Cities from '~/components/pages/main-page/Cities';
  import Map from '~/components/pages/main-page/Map';
  import BeachEntranceFree from '~/components/pages/main-page/BeachEntranceFree';
  import BeachEvents from '~/components/pages/main-page/BeachEvents';
  import ChooseBeach from '~/components/pages/main-page/ChooseBeach';
  import OnCarNoProblem from '~/components/pages/main-page/OnCarNoProblem';
  import BeachType from '~/components/pages/main-page/BeachType';
  import YouNeedThis from '~/components/pages/main-page/YouNeedThis';

  export default {
    components: {
      Search,
      Welcome,
      BeachSliderArea,
      Cities,
      Map,
      BeachEntranceFree,
      BeachEvents,
      ChooseBeach,
      OnCarNoProblem,
      BeachType,
      YouNeedThis
    },

    mounted() {
      this.$bus.$emit('dontShowSearch');
      this.$bus.$emit("dontShowBg");

      window.addEventListener('scroll', () => { onScroll() });

      let scrollTop;
      let onScroll = () => {
        scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;

        if (scrollTop >= 0.4863 * window.innerHeight) {
          this.$bus.$emit("showBg");
        } else {
          this.$bus.$emit("dontShowBg");
        }
      }
    },

    data() {
      return {
        mostPopularBeaches: {
          showArrows: true, // whether to ever show arrows
          slideNumber: 4,
          slideData: [
            {
              temperature: 21,
              favorite: false,
              expensive: false, // ruble sign
              rating: 4.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section1_beach1.png'
            },
            {
              temperature: 20,
              favorite: true,
              expensive: false,
              rating: 5.0,
              title: 'Пляж «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section1_beach2.png'
            },
            {
              temperature: 22,
              favorite: false,
              expensive: true,
              rating: 5.0,
              title: 'Пляж «Лазурный берег»',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section1_beach3.png'
            },
            {
              temperature: 20,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section1_beach4.png'
            },
            {
              temperature: 21,
              favorite: false,
              expensive: false, // ruble sign
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section1_beach1.png'
            },
            {
              temperature: 20,
              favorite: true,
              expensive: false,
              rating: 5.0,
              title: 'Пляж «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section1_beach2.png'
            },
            {
              temperature: 22,
              favorite: false,
              expensive: true,
              rating: 5.0,
              title: 'Пляж «Лазурный берег»',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section1_beach3.png'
            },
            {
              temperature: 20,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section1_beach4.png'
            }
          ]
        },
        mostPopularBeachesAreaData: {
          title: 'Самые популярные пляжи',
          subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
          beachNumber: 45
        },
        cityBeaches: {
          slideNumber: 4,
          slideData: [
            {
              city: 'Ялта',
              beachNumber: 8,
              pic: '/pics/main/section2_pic1.png'
            },
            {
              city: 'Новый свет',
              beachNumber: 6,
              pic: '/pics/main/section2_pic2.png'
            },
            {
              city: 'Алупка',
              beachNumber: 11,
              pic: '/pics/main/section2_pic3.png'
            },
            {
              city: 'Партенит',
              beachNumber: 5,
              pic: '/pics/main/section2_pic4.png'
            },
            {
              city: 'Судак',
              beachNumber: 9,
              pic: '/pics/main/section2_pic5.png'
            },
            {
              city: 'Форос',
              beachNumber: 12,
              pic: '/pics/main/section2_pic6.png'
            },
            {
              city: 'Ялта',
              beachNumber: 8,
              pic: '/pics/main/section2_pic1.png'
            },
            {
              city: 'Новый свет',
              beachNumber: 6,
              pic: '/pics/main/section2_pic2.png'
            },
            {
              city: 'Алупка',
              beachNumber: 11,
              pic: '/pics/main/section2_pic3.png'
            },
            {
              city: 'Партенит',
              beachNumber: 5,
              pic: '/pics/main/section2_pic4.png'
            },
            {
              city: 'Судак',
              beachNumber: 9,
              pic: '/pics/main/section2_pic5.png'
            },
            {
              city: 'Форос',
              beachNumber: 12,
              pic: '/pics/main/section2_pic6.png'
            }
          ]
        },
        mapData: {
          center: { lat: 45.1291821, lng: 33.6680399 },
          options: {
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false,
            styles:[
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "saturation": 36
                  },
                  {
                    "color": "#333333"
                  },
                  {
                    "lightness": 40
                  }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "visibility": "on"
                  },
                  {
                    "color": "#ffffff"
                  },
                  {
                    "lightness": 16
                  }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#fefefe"
                  },
                  {
                    "lightness": 20
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#fefefe"
                  },
                  {
                    "lightness": 17
                  },
                  {
                    "weight": 1.2
                  }
                ]
              },
              {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "on"
                  }
                ]
              },
              {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#f5f5f5"
                  },
                  {
                    "lightness": 20
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#f5f5f5"
                  },
                  {
                    "lightness": 21
                  }
                ]
              },
              {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#dedede"
                  },
                  {
                    "lightness": 21
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#ffffff"
                  },
                  {
                    "lightness": 17
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#ffffff"
                  },
                  {
                    "lightness": 29
                  },
                  {
                    "weight": 0.2
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#ffffff"
                  },
                  {
                    "lightness": 18
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#ffffff"
                  },
                  {
                    "lightness": 16
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#f2f2f2"
                  },
                  {
                    "lightness": 19
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#e9e9e9"
                  },
                  {
                    "lightness": 17
                  }
                ]
              }
            ]
          },
          markers: [
            {
                lat: 45.1291821,
                lng: 33.6680399
            },
            {
                lat: 45.5291821,
                lng: 33.6680399
            },
            {
                lat: 44.5291821,
                lng: 33.6680399
            }
          ]
        },
        familyData: {
          showArrows: true, // whether to ever show arrows
          slideNumber: 6,
          slideData: [
            {
              temperature: 24,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic1.png'
            },
            {
              temperature: 22,
              favorite: false,
              expensive: true,
              rating: 5.0,
              title: 'Пляж Ялта – Интурист',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic2.png'
            },
            {
              temperature: 21,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Пляж «Лазурный берег»',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section4_pic3.png'
            },
            {
              temperature: 20,
              favorite: false,
              expensive: true,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic4.png'
            },
            {
              temperature: 26,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic1.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Песчаный пляж Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic5.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic1.png'
            },
            {
              temperature: 22,
              favorite: false,
              expensive: true,
              rating: 5.0,
              title: 'Пляж Ялта – Интурист',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic2.png'
            },
            {
              temperature: 21,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Пляж «Лазурный берег»',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section4_pic3.png'
            },
            {
              temperature: 20,
              favorite: false,
              expensive: true,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic4.png'
            },
            {
              temperature: 26,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic1.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: false,
              rating: 5.0,
              title: 'Песчаный пляж Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic5.png'
            }
          ]
        },
        familyAreaData: {
          title: 'Отдых для всей семьи',
          subtitle: 'Пологий берег, плавный вход в воду, безопасность и инфраструктура',
          beachNumber: 45
        },
        eventData: {
          showArrows: true,
          slideNumber: 4,
          slideData: [
            {
              temperature: 24,
              favorite: false,
              expensive: false,
              date: '12-15.06',
              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
              beach: 'Пляж «Ялта – Интурист»',
              beachLink: '/adsa',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section5_event1.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: true,
              date: '24.05-15.06',
              title: 'Конкурс надувных матрасов',
              beach: 'Массандровский пляж',
              beachLink: '/',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section5_event2.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: true,
              date: '12-15.06',
              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
              beach: 'Пляж «Лазурный берег»',
              beachLink: '/',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section5_event3.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: false,
              date: '19.06',
              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
              beach: 'Массандровский пляж',
              beachLink: '/',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section5_event4.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: false,
              date: '12-15.06',
              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
              beach: 'Пляж «Ялта – Интурист»',
              beachLink: '/',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section5_event1.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: true,
              date: '24.05-15.06',
              title: 'Конкурс надувных матрасов',
              beach: 'Массандровский пляж',
              beachLink: '/',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section5_event2.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: true,
              date: '12-15.06',
              title: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
              beach: 'Пляж «Лазурный берег»',
              beachLink: '/',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section5_event3.png'
            },
            {
              temperature: 24,
              favorite: false,
              expensive: false,
              date: '19.06',
              title: 'Коктейльная вечеринка: весёлый отдых для дружной компании',
              beach: 'Массандровский пляж',
              beachLink: '/',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section5_event4.png'
            }
          ]
        },
        beachEventsData: {
          beachNumber: 45 
        },
        beachTypeData: {
          beachNumber1: 26,
          beachNumber2: 18,
          beachLink1: '/',
          beachLink2: '/'
        },
        hotelAreaData: {
          title: 'Где остановиться в Крыму',
          subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
          beachNumber: 45
        },
        hotelData: {
          showArrows: true, // whether to ever show arrows
          slideNumber: 6,
          slideData: [
            {
              rating: 5.0,
              title: 'Отель Мрия Резорт & СПА',
              location: 'Ялта, КРЫМ',
              price: 6800,
              priceLink: '/',
              pic: '/pics/main/section11_pic1.png'
            },
            {
              rating: 5.0,
              title: 'Гостиница «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              price: 2500,
              priceLink: '/',
              pic: '/pics/main/section11_pic2.png'
            },
            {
              rating: 5.0,
              title: 'Отель "Вилла Голубой Залив"',
              location: 'Евпатория, КРЫМ',
              price: 1400,
              priceLink: '/',
              pic: '/pics/main/section11_pic3.png'
            },
            {
              rating: 5.0,
              title: 'Гостиница «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              price: 3000,
              priceLink: '/',
              pic: '/pics/main/section11_pic4.png'
            },
            {
              rating: 5.0,
              title: 'Гостиница «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              price: 2500,
              priceLink: '/',
              pic: '/pics/main/section11_pic5.png'
            },
            {
              rating: 5.0,
              title: 'Гостиница «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              price: 2900,
              priceLink: '/',
              pic: '/pics/main/section11_pic6.png'
            },
            {
              rating: 5.0,
              title: 'Отель Мрия Резорт & СПА',
              location: 'Ялта, КРЫМ',
              price: 6800,
              priceLink: '/',
              pic: '/pics/main/section11_pic1.png'
            },
            {
              rating: 5.0,
              title: 'Гостиница «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              price: 2500,
              priceLink: '/',
              pic: '/pics/main/section11_pic2.png'
            },
            {
              rating: 5.0,
              title: 'Отель "Вилла Голубой Залив"',
              location: 'Евпатория, КРЫМ',
              price: 1400,
              priceLink: '/',
              pic: '/pics/main/section11_pic3.png'
            },
            {
              rating: 5.0,
              title: 'Гостиница «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              price: 3000,
              priceLink: '/',
              pic: '/pics/main/section11_pic4.png'
            },
            {
              rating: 5.0,
              title: 'Гостиница «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              price: 2500,
              priceLink: '/',
              pic: '/pics/main/section11_pic5.png'
            },
            {
              rating: 5.0,
              title: 'Гостиница «Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              price: 2900,
              priceLink: '/',
              pic: '/pics/main/section11_pic6.png'
            }
          ]
        }
      }
    }
  }

  // all slide data will be here
</script>
