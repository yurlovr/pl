<template>
  <div class="main-page">
    <img src="~/static/pics/main/bg.png" class="main-page__welcome__background" alt="Добро пожаловать">
    <div class="main-page__welcome__gradient"></div>
    <Welcome />
    <Search class="main-page__welcome__search" labelId="1" />
    <BeachSliderArea class="main-page__popular-beaches" :data="$store.state.beachSliderData" :areaData="mostPopularBeachesAreaData" />
    <Cities :data="cityBeaches" />
    <MapArea :data="mapData" />
    <BeachEntranceFree />
    <div class="main-page__white-wrapper">
      <BeachSliderArea :data="familyData" :areaData="familyAreaData" class="main-page__family-rest" />
    </div>
    <BeachEvents :data="$store.state.beachEventsSliderData" :areaData="beachEventsData" />
    <ChooseBeach />
    <DynamicSliderArea :data="dynamicSliderData" />
    <div class="main-page__white-wrapper">
      <WeatherSliderArea :data="weatherData" />
    </div>
    <OnCarNoProblem />
    <BeachType :data="beachTypeData" />
    <YouNeedThis />
    <BeachSliderArea class="main-page__hotels" :data="$store.state.hotelData" :areaData="$store.state.hotelAreaData" />
    <!--     <div>Популярные пляжи</div>
    {{ this.popular_beaches}}
    <div> Города </div>
    {{ this.cities}} -->
  </div>
</template>
<script>
import Search from '~/components/global/Search';
import Welcome from '~/components/pages/main/Welcome';
import BeachSliderArea from '~/components/global/BeachSliderArea';
import Cities from '~/components/pages/main/Cities';
import BeachEntranceFree from '~/components/pages/main/BeachEntranceFree';
import BeachEvents from '~/components/pages/beach-event/BeachEvents';
import ChooseBeach from '~/components/pages/main/ChooseBeach';
import OnCarNoProblem from '~/components/pages/main/OnCarNoProblem';
import BeachType from '~/components/pages/main/BeachType';
import YouNeedThis from '~/components/pages/main/YouNeedThis';
import WeatherSliderArea from '~/components/pages/main/WeatherSliderArea';
import DynamicSliderArea from '~/components/pages/main/DynamicSliderArea';
import MapArea from '~/components/pages/main/MapArea';
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    Search,
    Welcome,
    BeachSliderArea,
    Cities,
    MapArea,
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
        cardData: [{
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
        center: [44.50465522867475, 34.21493291965433],
        addressBeaches: [{
          chunkCenter: [44.521199755999035, 34.15580509752773],
          beaches: [{
              pos: [44.51942103736535, 34.258601507843714],
              pics: [
                '/pics/main/section1_beach1.png',
                '/pics/main/section1_beach2.png'
              ],
              rating: 5.0,
              favorite: false,
              title: 'Массандровский пляж',
              location: 'алушта, КРЫМ'
            },
            {
              pos: [44.55842103736535, 34.258601507843714],
              pics: [
                '/pics/main/section1_beach3.png',
                '/pics/main/section1_beach4.png'
              ],
              rating: 5.0,
              favorite: false,
              title: 'Пляж «Лазурный берег»',
              location: 'алушта, КРЫМ'
            },
            {
              pos: [44.5449734958915, 34.265251523169956],
              pics: [
                '/pics/main/section1_beach2.png',
                '/pics/main/section1_beach3.png'
              ],
              rating: 4.0,
              favorite: false,
              title: 'Массандровский пляж',
              location: 'алушта, КРЫМ'
            }
          ]
        }]
      },
      familyData: {
        showArrows: true, // whether to ever show arrows
        slideNumber: 6,
        tall: true,
        cardData: [{
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
        [{
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
        [{
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
        [{
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
        [{
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
        [{
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
        [{
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
        [{
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
        [{
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
        [{
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
        [{
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
        [{
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
        [{
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
      dynamicSliderData: [{
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
    };
  },
  created() {
    this.getPopularBeach();
    this.getCities();
  },
  methods: {
    ...mapActions('beach', ['getPopularBeach']),
    ...mapActions('beach', ['getCities']),
  },
  computed: {
    ...mapState('beach', ['popular_beaches']),
    ...mapState('beach', ['cities']),
  },
};

// all slide data will be here

</script>
