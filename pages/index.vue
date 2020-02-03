<template>
  <div class="main-page">
    <img src="~/static/pics/main/bg.png" class="main-page__welcome__background" alt="Добро пожаловать">
    <div class="main-page__welcome__gradient"></div>
    <Welcome />
    <Search class="main-page__welcome__search" labelId="1" />
    <BeachSliderArea class="main-page__popular-beaches" :data="$store.state.beachSliderData" :areaData="mostPopularBeachesAreaData" />
    <Cities :data="cityBeaches" />
    <Map :data="mapData" />
    <BeachEntranceFree />
    <div class="main-page__white-wrapper"><BeachSliderArea :data="familyData" :areaData="familyAreaData" class="main-page__family-rest" /></div>
    <BeachEvents :data="eventData" :areaData="beachEventsData" />
    <ChooseBeach />
    <DynamicSliderArea :data="dynamicSliderData" />
    <div class="main-page__white-wrapper"><WeatherSliderArea :data="weatherData" /></div>
    <OnCarNoProblem />
    <BeachType :data="beachTypeData" />
    <YouNeedThis />
    <BeachSliderArea class="main-page__hotels" :data="$store.state.hotelData" :areaData="$store.state.hotelAreaData" />
  </div>
</template>

<script>
  import Search from '~/components/global/Search';
  import Welcome from '~/components/pages/main/Welcome';
  import BeachSliderArea from '~/components/global/BeachSliderArea';
  import Cities from '~/components/pages/main/Cities';
  import BeachEntranceFree from '~/components/pages/main/BeachEntranceFree';
  import BeachEvents from '~/components/pages/main/BeachEvents';
  import ChooseBeach from '~/components/pages/main/ChooseBeach';
  import OnCarNoProblem from '~/components/pages/main/OnCarNoProblem';
  import BeachType from '~/components/pages/main/BeachType';
  import YouNeedThis from '~/components/pages/main/YouNeedThis';
  import WeatherSliderArea from '~/components/pages/main/WeatherSliderArea';
  import DynamicSliderArea from '~/components/pages/main/DynamicSliderArea';
  import Map from '~/components/pages/main/Map';

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
      YouNeedThis,
      WeatherSliderArea,
      DynamicSliderArea
    },

    mounted() {
      this.$bus.$emit('dontShowSearch');

      let scrollTop;
      let onScroll = () => {
        if (document.querySelector('.main-page')) {
          scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;

          // show or hide the search background and the bar depending on the scroll
          if (window.innerWidth > 900 && scrollTop >= 346 || window.innerWidth <= 900 && window.innerWidth > 800 && scrollTop >= 230 || window.innerWidth <= 800 && window.innerWidth > 500 && scrollTop >= 75 || window.innerWidth <= 500 && scrollTop >= 20) {
            this.$bus.$emit("showHeaderBgAndBar");
          } else {
            this.$bus.$emit("hideHeaderBgAndBar");
          }
        } else {
          window.removeEventListener('scroll', onScroll, false);
        }
      };

      let onResize = () => {
        if (document.querySelector('.main-page')) {
          // correct the text for the mobile
          if (window.innerWidth <= 650) {
            this.$bus.$emit('showCorrectSelectText');
          } else {
            this.$bus.$emit('dontShowCorrectSelectText');
          }
        } else {
          window.removeEventListener('scroll', onScroll, false);
        }
      };

      window.addEventListener('scroll', onScroll, false);
      window.addEventListener('resize', onResize, false);
      onScroll();
      onResize();
    },

    data() {
      return {
        // data here
        mostPopularBeachesAreaData: {
          title: 'Самые популярные пляжи',
          subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
          beachNumber: 45
        },
        cityBeaches: {
          slideNumber: 4,
          cardData: [
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
          tall: true,
          cardData: [
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
          cardData: [
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
        weatherData: [
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ],
          [
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алушта',
              airTemperature: 26,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Севастополь',
              airTemperature: 27,
              waterTemperature: 24,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Инкерман',
              airTemperature: 28,
              waterTemperature: 25,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Феодосия',
              airTemperature: 24,
              waterTemperature: 22,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Ялта',
              airTemperature: 27,
              waterTemperature: 23,
              pic: '/pics/main/section8_pic.png'
            },
            {
              city: 'Алупка',
              airTemperature: 25,
              waterTemperature: 21,
              pic: '/pics/main/section8_pic.png'
            }
          ]
        ],
        dynamicSliderData: [
          {
            title: 'Серфинг',
            beachNumber: 21,
            pic: '/pics/main/section7_pic2.png',
            link: '/'
          },
          {
            title: 'Яхты и катера',
            beachNumber: 16,
            pic: '/pics/main/section7_pic2.png',
            link: '/'
          },
          {
            title: 'Дайвинг',
            beachNumber: 24,
            pic: '/pics/main/section7_pic2.png',
            link: '/'
          },
          {
            title: 'Серфинг',
            beachNumber: 21,
            pic: '/pics/main/section7_pic2.png',
            link: '/'
          },
          {
            title: 'Яхты и катера',
            beachNumber: 16,
            pic: '/pics/main/section7_pic2.png',
            link: '/'
          },
          {
            title: 'Дайвинг',
            beachNumber: 24,
            pic: '/pics/main/section7_pic2.png',
            link: '/'
          }
        ]
      }
    }
  }

  // all slide data will be here
</script>
