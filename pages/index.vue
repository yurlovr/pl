<template>
  <div class="main-page">
    <img src="~/static/pics/main/bg.png" class="main-page__welcome__background" alt="Добро пожаловать">
    <div class="main-page__welcome__gradient"></div>
    <Welcome />
    <Search class="main-page__welcome__search" labelId="1" />
    <BeachSliderArea class="main-page__popular-beaches" :data="popularBeachesData" v-if="popularBeachesData" />
    <Cities :data="citiesData" />
    <MapArea :data="mapData" />
    <BeachEntranceFree />
    <div class="main-page__white-wrapper">
      <BeachSliderArea :data="familyData" class="main-page__family-rest" v-if="familyData" />
    </div>
    <BeachEvents :data="eventsData" v-if="eventsData" />
    <ChooseBeach />
    <DynamicSliderArea :data="dynamicSliderDatax" />
    <div class="main-page__white-wrapper">
      <WeatherSliderArea :data="weatherDatax" />
    </div>
    <OnCarNoProblem />
    <BeachType :data="beachTypeData" />
    <YouNeedThis />
    <!-- <BeachSliderArea class="main-page__hotels" :data="$store.state.hotelData" v-if="false" /> -->
  </div>
</template>
<script>
import Search from '~/components/global/Search';
import Welcome from '~/components/pages/main/Welcome';
import BeachSliderArea from '~/components/global/BeachSliderArea';
import Cities from '~/components/pages/main/Cities';
import BeachEntranceFree from '~/components/pages/main/BeachEntranceFree';
import BeachEvents from '~/components/global/BeachEvents';
import ChooseBeach from '~/components/pages/main/ChooseBeach';
import OnCarNoProblem from '~/components/pages/main/OnCarNoProblem';
import BeachType from '~/components/pages/main/BeachType';
import YouNeedThis from '~/components/pages/main/YouNeedThis';
import WeatherSliderArea from '~/components/pages/main/WeatherSliderArea';
import DynamicSliderArea from '~/components/pages/main/DynamicSliderArea';
import MapArea from '~/components/pages/main/MapArea';

import { mapGetters } from 'vuex';

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

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);
    this.onScroll();
    this.onResize();
  },

  data() {
    return {
      mapData: {
        center: [44.50465522867475, 34.21493291965433],
        addressBeaches: [{ // cluster 1
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
        title: 'Отдых для всей семьи',
        subtitle: 'Пологий берег, плавный вход в воду, безопасность и современная инфраструктура',
        beachNumber: 45,
        beachSliderData: {
          slideNumber: 6,
          cardData: [
            {
              temperature: 24,
              favorite: false,
              paid: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic1.png'
            },
            {
              temperature: 22,
              favorite: false,
              paid: true,
              rating: 5.0,
              title: 'Пляж Ялта – Интурист',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic2.png'
            },
            {
              temperature: 21,
              favorite: false,
              paid: false,
              rating: 5.0,
              title: 'Пляж «Лазурный берег»',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section4_pic3.png'
            },
            {
              temperature: 20,
              favorite: false,
              paid: true,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic4.png'
            },
            {
              temperature: 26,
              favorite: false,
              paid: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic1.png'
            },
            {
              temperature: 24,
              favorite: false,
              paid: false,
              rating: 5.0,
              title: 'Песчаный пляж Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic5.png'
            },
            {
              temperature: 24,
              favorite: false,
              paid: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic1.png'
            },
            {
              temperature: 22,
              favorite: false,
              paid: true,
              rating: 5.0,
              title: 'Пляж Ялта – Интурист',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic2.png'
            },
            {
              temperature: 21,
              favorite: false,
              paid: false,
              rating: 5.0,
              title: 'Пляж «Лазурный берег»',
              location: 'Евпатория, КРЫМ',
              pic: '/pics/main/section4_pic3.png'
            },
            {
              temperature: 20,
              favorite: false,
              paid: true,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic4.png'
            },
            {
              temperature: 26,
              favorite: false,
              paid: false,
              rating: 5.0,
              title: 'Массандровский пляж',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic1.png'
            },
            {
              temperature: 24,
              favorite: false,
              paid: false,
              rating: 5.0,
              title: 'Песчаный пляж Ялта – Интурист»',
              location: 'Ялта, КРЫМ',
              pic: '/pics/main/section4_pic5.png'
            }
          ]

        }
      },
      weatherDatax: [
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
      dynamicSliderDatax: [
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
  },

  async fetch({ store }) {
    await store.dispatch('main/getPopularBeaches');
    await store.dispatch('main/getCities');
    await store.dispatch('main/getEvents');
    await store.dispatch('main/getDynamicSlider');
    await store.dispatch('main/getWeather');
    await store.dispatch('main/getBeachTypes');
  },

  methods: {
    onScroll() {
      let scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;

      // show or hide the search background and the bar depending on the scroll
      if (window.innerWidth > 900 && scrollTop >= 346 || window.innerWidth <= 900 && window.innerWidth > 800 && scrollTop >= 230 || window.innerWidth <= 800 && window.innerWidth > 500 && scrollTop >= 75 || window.innerWidth <= 500 && scrollTop >= 20) {
        this.$bus.$emit("showHeaderBgAndBar");
      } else {
        this.$bus.$emit("hideHeaderBgAndBar");
      }
    },

    onResize() {
      // correct the text for the mobile
      if (window.innerWidth <= 650) {
        this.$bus.$emit('showCorrectSelectText');
      } else {
        this.$bus.$emit('dontShowCorrectSelectText');
      }
    }
  },

  computed: {
    ...mapGetters('main', ['popularBeachesData']),
    ...mapGetters('main', ['citiesData']),
    ...mapGetters('main', ['eventsData']),
    ...mapGetters('main', ['dynamicSliderData']),
    ...mapGetters('main', ['weatherData']),
    ...mapGetters('main', ['beachTypeData'])
  },

  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.onScroll, false);
    window.removeEventListener('resize', this.onResize, false);
    this.$bus.$emit("showHeaderBgAndBar");
    next();
  }
}
</script>
