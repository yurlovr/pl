import { OUT_LINKS_EXCURSIONS } from '~/const/const';

/**
 * Map Event entity
 */
export function mapEvent(item) {
  return {
    id: item.ID,
    title: item.NAME,
    tempWater: item.BEACH && item.BEACH.WEATHER && item.BEACH.WEATHER.TEMP ? item.BEACH.WEATHER.TEMP.WATER : null,
    date: item.ACTIVE_FROM,
    showFavorite: true,
    beach: item.BEACH ? item.BEACH.NAME : null,
    paid: item.PAID,
    location: item.BEACH && item.BEACH.CITY ? item.BEACH.CITY.NAME : null,
    pic: item.PHOTOS ? item.PHOTOS.medium[0].path : null,
    mainLink: `/event/${item.ID}`,
    humanLink: item.CODE ? `/event/${item.CODE}` : null,
    beachLink: item.BEACH && item.BEACH.CODE ? `beach/${item.BEACH.CODE}` : null,
    locationId: item.BEACH && item.BEACH.CITY ? item.BEACH.CITY.ID : null,
    eventId: item.ID,
    beachId: item.BEACH ? item.BEACH.ID : null,
  };
}

export function mapEventBeach(item) {
  return {
    id: item.ID,
    title: item.NAME,
    date: item.ACTIVE_FROM,
    showFavorite: true,
    beachId: item.BEACH,
    paid: item.PAID,
    mainLink: `/event/${item.ID}`,
    eventId: item.ID,
    pic: item.PHOTOS ? item.PHOTOS.medium[0].path : null,
  };
}

export function mapEventList(list = []) {
  return list.map(mapEvent);
}

/**
 * Map entity
 * TODO Just entity?? Что это за сущность?
 */
export function mapEntity(item) {
  return {
    coordinates: item.COORDINATES.length ? item.COORDINATES.split(',') : [],
    id: item.ID,
    name: item.NAME,
    preview: item.PREVIEW,
    url: item.URL,
    photos: item.PHOTOS,
    type: item.TYPE,
    description: item.DESCRIPTION,
  };
}
export function mapEntityList(list = []) {
  return list.map(mapEntity);
}
export function mapBeachFull(item) {
  return {
    access: item.ACCESS || null,
    cityId: null,
    tempWater: item.WEATHER && item.WEATHER.TEMP ? item.WEATHER.TEMP.WATER : null,
    showFavorite: true,
    paid: item.PAID,
    rating: parseFloat(item.AVERAGE_RATING),
    // title:        item.NAME,
    pic: item.PHOTOS ? item.PHOTOS.medium[0].path : null,
    mainLink: `beach/${item.ID}`,
    beachLink: `beach/${item.ID}`,
    humanLink: item.CODE ? `beach/${item.CODE}` : null,
    // beachId:      item.ID,
    tags: item.TAGS
      ? item.TAGS.map((v) => ({ id: v.ID, title: v.NAME }))
      : null,
    addTags: item.ADD_TAGS
      ? item.ADD_TAGS.map((v) => ({ id: v.ID, title: v.NAME }))
      : null,
    pos: mapCoords(item.COORDINATES),
    beachLength: item.PARAMETERS ? (item.PARAMETERS.P_LINE_LENGTH == '' ? null : item.PARAMETERS.P_LINE_LENGTH) : null,
    beachPrice: item.PARAMETERS ? (item.PARAMETERS.P_PRICE == '' ? null : item.PARAMETERS.P_PRICE) : null,
    beachType: item.PARAMETERS ? (item.PARAMETERS.P_BEACH_TYPE ? item.PARAMETERS.P_BEACH_TYPE.NAME : null) : null,
    beachWorktime: item.PARAMETERS ? (item.PARAMETERS.P_MODE ? item.PARAMETERS.P_MODE.NAME : null) : null,
    beachSeabedType: null,
    coordinates: mapCoords(item.COORDINATES),
    show_distance: true,

    // mapBeachMainData
    // title:           item.NAME,
    likes: item.COUNT_FAVORITES,
    beachId: item.ID,
    // beachLength:     item.PARAMETERS.P_LINE_LENGTH,
    price: item.PARAMETERS.P_PRICE,
    // beachType:       item.PARAMETERS.P_BEACH_TYPE.NAME,
    // beachSeabedType: item.PARAMETERS.P_BOTTOM
    //   ? item.PARAMETERS.P_BOTTOM.NAME
    //   : null,
    time: item.PARAMETERS.P_MODE
      ? item.PARAMETERS.P_MODE.NAME
      : null,
    sunrise: item.WEATHER.SUNRISE,
    sunset: item.WEATHER.SUNSET,

    // mapBeachHugeSliderData
    title: item.NAME,
    isBeachClosed: item.LABEL.TEXT != '',
    goldMedal: item.CERTIFICATION,
    blueMedal: item.WEBCAMERA,
    pics: item.VIDEO && !item.VIDEO.LINK
      ? item.PHOTOS.reference.map((e) => e.path)
      : [...item.PHOTOS.reference.map((e) => e.path), item.VIDEO.LINK],
    sizes: item.PHOTOS.reference.map((e) => e.size),
    medium_pics: item.VIDEO && !item.VIDEO.LINK
      ? item.PHOTOS.medium.map((e) => e.path)
      : [...item.PHOTOS.medium.map((e) => e.path), item.VIDEO.LINK],
    beachClosedText: item.LABEL ? item.LABEL.TEXT : '',
    beachClosedColor: item.LABEL ? item.LABEL.COLOR : '',
    beachClosedTooltip: item.LABEL ? item.LABEL.DESCRIPTION : '',
    beautySunrise: item.WEATHER.BEAUTIFUL_SUNRISE,
    beautySunset: item.WEATHER.BEAUTIFUL_SUNSET,
    panorama: item.PANORAMA || null,

    // mapBeachToSideMapWeatherData
    date: item.WEATHER.DATE,
    waterTemp: item.WEATHER.TEMP.WATER,
    airTemp: item.WEATHER.TEMP.AIR,
    email: item.CONTACT && item.CONTACT.EMAIL ? item.CONTACT.EMAIL : null,
    telegram: item.CONTACT && item.CONTACT.TELEGRAM ? item.CONTACT.TELEGRAM : null,
    sunriseTime: item.WEATHER.SUNRISE,
    sunsetTime: item.WEATHER.SUNSET,
    windSpeed: item.WEATHER.WIND,
    humidity: item.WEATHER.HUMIDITY,
    precipitation: item.WEATHER.PRECIPITATION,

    // mapBeachToAvgRating
    // rating: parseFloat(item.RATING.RATING),
    peopleCount: item.AVERAGE_COUNT_REVIEWS,
    ratings: [
      { title: 'Природа', rating: item.AVERAGE_RATING_NATURE },
      { title: 'Чистота воды', rating: item.AVERAGE_RATING_WATER_PURITY },
      { title: 'Чистота берега', rating: item.AVERAGE_RATING_SHORE_CLEANLINESS },
      { title: 'Инфраструктура', rating: item.AVERAGE_RATING_INFRASTRUCTURE },
      { title: 'Безопасность', rating: item.AVERAGE_RATING_SECURITY },
      { title: 'Доступность', rating: item.AVERAGE_RATING_AVAILABILITY },
    ],
  };
}

export function mapSimilar(item) {
  return {
    id: item.ID,
    tempWater: item.WEATHER && item.WEATHER.TEMP ? item.WEATHER.TEMP.WATER : null,
    showFavorite: true,
    paid: item.PAID,
    rating: parseFloat(item.AVERAGE_RATING),
    title: item.NAME,
    pic: item.PREVIEW,
    mainLink: item.ID,
  };
}

/**
 * Map beach entity
 */
export function mapBeach(item) {
  return {
    id: item.ID,
    desc: item.DESCRIPTION,
    excursions: item.EXCURSIONS,
    access: item.ACCESS || null,
    tempWater: item.WEATHER && item.WEATHER.TEMP ? item.WEATHER.TEMP.WATER : null,
    showFavorite: true,
    paid: item.PAID,
    rating: parseFloat(item.AVERAGE_RATING),
    title: item.NAME,
    pic: item.PREVIEW,
    photos: item.PHOTOS ? item.PHOTOS.medium : [],
    mainLink: `beach/${item.ID}`,
    beachLink: `beach/${item.ID}`,
    humanLink: item.CODE ? `beach/${item.CODE}` : null,
    cityId: item.CITY,
    beachId: item.ID,
    tags: item.TAGS
      ? item.TAGS.map((v) => ({ id: v.ID, title: v.NAME }))
      : null,
    addTags: item.ADD_TAGS
      ? item.ADD_TAGS.map((v) => ({ id: v.ID, title: v.NAME }))
      : null,
    pos: mapCoords(item.COORDINATES),
    beachLength: item.PARAMETERS ? (item.PARAMETERS.P_LINE_LENGTH == '' ? null : item.PARAMETERS.P_LINE_LENGTH) : null,
    beachPrice: item.PARAMETERS ? (item.PARAMETERS.P_PRICE == '' ? null : item.PARAMETERS.P_PRICE) : null,
    beachType: item.PARAMETERS ? (item.PARAMETERS.P_BEACH_TYPE ? item.PARAMETERS.P_BEACH_TYPE.NAME : null) : null,
    beachWorktime: item.PARAMETERS ? (item.PARAMETERS.P_MODE ? item.PARAMETERS.P_MODE.NAME : null) : null,
    beachSeabedType: null,
    coordinates: mapCoords(item.COORDINATES),
    show_distance: true,
  };
}
export function mapBeachList(list = []) {
  return list.map(mapBeach);
}
export function mapBeachServices(beach) {
  return {
    infrastructures: beach.INFRASTRUCTURES
      .map(mapService),
      // .filter((i) => ![
      //   'ostanovki-obshchestvennogo-transporta',
      //   'parkovka',
      // ].includes(i.code)),
    services: beach.SERVICES.map(mapService),
  };
}
export function mapCoords(coords) {
  return coords && coords.length > 0
    ? [parseFloat(coords.split(',')[0]), parseFloat(coords.split(',')[1])]
    : [];
}
export function mapService(item) {
  return {
    id: item.ID,
    title: item.NAME,
    pic: item.ICON ? item.ICON : item.ICON,
    pos: mapCoords(item.COORDINATES),
    description: item.DESCRIPTION,
    pictures: item.PICTURES,
    map_pic: item.ICON_ON_MAP ? item.ICON_ON_MAP : item.ICON,
    code: item.CODE,
  };
}

/**
 * Use in beach module for mainData prop
 * @param item
 */
export function mapBeachMainData(item) {
  return {
    title: item.NAME,
    likes: item.COUNT_FAVORITES,
    beachId: item.ID,
    beachLength: item.PARAMETERS.P_LINE_LENGTH,
    price: item.PARAMETERS.P_PRICE,
    beachType: item.PARAMETERS.P_BEACH_TYPE.NAME,
    beachSeabedType: item.PARAMETERS.P_BOTTOM
      ? item.PARAMETERS.P_BOTTOM.NAME
      : null,
    time: item.PARAMETERS.P_MODE
      ? item.PARAMETERS.P_MODE.NAME
      : null,
    sunrise: item.WEATHER.SUNRISE,
    sunset: item.WEATHER.SUNSET,
  };
}

/**
 * Use in beach module for hugeSliderProperty
 * @param item
 * @returns {{beautySunset: *, beachClosedTooltip: *, goldMedal: *, medium_pics: (*|*[]), title: *, blueMedal: *, beautySunrise: *, panorama: *, sizes: *, beachClosedText: *, isBeachClosed: boolean, beachClosedColor: GLenum, pics: (*|*[])}}
 */

export function mapBeachHugeSliderData(item) {
  return {
    title: item.NAME,
    isBeachClosed: item.LABEL && !!item.LABEL.TEXT,
    goldMedal: item.CERTIFICATION,
    blueMedal: item.WEBCAMERA,
    pics: !item.VIDEO
      ? item.PHOTOS.reference.map((e) => e.path)
      : [...item.PHOTOS.reference.map((e) => e.path), item.VIDEO.LINK],
    sizes: item.PHOTOS.reference.map((e) => e.size),
    medium_pics: !item.VIDEO
      ? item.PHOTOS.medium.map((e) => e.path)
      : [...item.PHOTOS.medium.map((e) => e.path), item.VIDEO.LINK],
    beachClosedText: item.LABEL ? item.LABEL.TEXT : '',
    beachClosedColor: item.LABEL ? item.LABEL.COLOR : '',
    beachClosedTooltip: item.LABEL ? item.LABEL.DESCRIPTION : '',
    beautySunrise: item.WEATHER.BEAUTIFUL_SUNRISE,
    beautySunset: item.WEATHER.BEAUTIFUL_SUNSET,
    panorama: item.PANORAMA || null,
  };
}

/**
 * use in beach event
 * @param item
 * @returns {{date: (string|string), precipitation: *, pos: (number[]|*[]), sunsetTime: *, waterTemp: *, airTemp: *, telegram: (*|null), humidity: *, title: *, windSpeed: *, email: (*|null), sunriseTime: *}}
 */
export function mapBeachToSideMapWeatherData(item) {
  return {
    title: item.NAME,
    date: item.WEATHER.DATE,
    pos: mapCoords(item.COORDINATES),
    waterTemp: item.WEATHER.TEMP.WATER,
    airTemp: item.WEATHER.TEMP.AIR,
    email: item.CONTACT && item.CONTACT.EMAIL ? item.CONTACT.EMAIL : null,
    telegram: item.CONTACT && item.CONTACT.TELEGRAM ? item.CONTACT.TELEGRAM : null,
    sunriseTime: item.WEATHER.SUNRISE,
    sunsetTime: item.WEATHER.SUNSET,
    windSpeed: item.WEATHER.WIND,
    humidity: item.WEATHER.HUMIDITY,
    precipitation: item.WEATHER.PRECIPITATION,
  };
}

/**
 * use in beach module
 * @param item
 */
export function mapBeachToAvgRating(item) {
  return {
    rating: parseFloat(item.AVERAGE_RATING),
    peopleCount: item.AVERAGE_COUNT_REVIEWS,
    ratings: [
      { title: 'Природа', rating: item.AVERAGE_RATING_NATURE },
      { title: 'Чистота воды', rating: item.AVERAGE_RATING_WATER_PURITY },
      { title: 'Чистота берега', rating: item.AVERAGE_RATING_SHORE_CLEANLINESS },
      { title: 'Инфраструктура', rating: item.AVERAGE_RATING_INFRASTRUCTURE },
      { title: 'Безопасность', rating: item.AVERAGE_RATING_SECURITY },
      { title: 'Доступность', rating: item.AVERAGE_RATING_AVAILABILITY },
    ],
  };
}

export function mapAnnounce(item) {
  return {
    id: item.ID,
    title: item.NAME,
    link: item.LINK,
    pic: item.PREVIEW_PICTURE ? item.PREVIEW_PICTURE : null,
    date: item.DATE,
    description: item.DESCRIPTION,
    color: item.COLOR,
  };
}

export function mapReview(item) {
  return {
    pic: item.PICTURE ? item.PICTURE : null,
    name: item.FIO,
    date: item.CREATED_DATE,
    rating: item.AVERAGE_RATING,
    comment: item.DESCRIPTION,
    photos: item.PHOTOS,
  };
}

/**
 * Map Rest entity
 */
export function mapRest(item) {
  return {
    temperature: item.WEATHER ? item.WEATHER.TEMP.WATER : null,
    showFavorite: true,
    paid: item.PAID,
    rating: parseFloat(item.AVERAGE_RATING),
    title: item.NAME,
    location: item.CITY ? item.CITY.NAME : null,
    locationId: item.CITY ? item.CITY.ID : -1,
    pic: item.PHOTOS.medium && item.PHOTOS.medium.length ? item.PHOTOS.medium[0].path : null,
    mainLink: `beach/${item.ID}`,
    beachLink: `beach/${item.ID}`,
    humanLink: item.CODE ? `beach/${item.CODE}` : null,
    beachId: item.ID,
    coordinates: item.COORDINATES.length ? item.COORDINATES.split(',') : [],
    show_distance: true,
  };
}

export function mapBar(item) {
  return {
    title: item.NAME,
    description: item.DESCRIPTION,
    pics: item.PHOTOS.medium.map((v) => (v ? v.path : null)),
    coordinates: mapCoords(item.COORDINATES),
    contact: item.CONTACT || null,
    contact_telegram: item.CONTACT_TELEGRAM || null,
  };
}

/**
 * Map Mobile settings
 */
export function mapSettings(item) {
  return {
    active: item.ACTIVE,
    id: item.ID,
    code: item.CODE,
    value: item.VALUE,
  };
}

// MapIds
export function mapIDs(list = []) {
  return list.map((i) => i.ID);
}

export function mapCollectionList(list = []) {
  return list.map(mapCollection);
}

/**
 * Map Beach Group
 * @param item = {
 *   ID:              "16"
 *   NAME:            "Городские"
 *   DESCRIPTION:     "Оборудованные пляжи, со всей необходимой инфраструктурой для комфортного отдыха"
 *   BEACHES:         Array(0) of beaches
 *   CODE:            "urban"
 *   COUNT_BEACHES:   235
 *   PREVIEW_PICTURE: "https://plyazhi.ru/resize_cache/822/833dc8f498cd13b58123a28dcec9cd22/iblock/aab/aab6d64b7e075cf634dcc967d8125d8e/08c4565ae8f2cd4f4e751e91ce336745.jpg"
 *   SEARCH_FILTER:   Object
 *   TAGS:            Array(1) of tags IDs
 * }
 */
export function mapBeachGroup(item) {
  return {
    title: item.NAME,
    pic: item.PREVIEW_PICTURE ? (item.PREVIEW_PICTURE) : null,
    beachNumber: item.COUNT_BEACHES ? item.COUNT_BEACHES : 0,
    description: item.DESCRIPTION,
    id: item.ID,
    filter: mapSearchFilter(item.SEARCH_FILTER),
  };
}
export function mapBeachGroupList(list = []) {
  return list.map(mapBeachGroup);
}

/**
 * Map Collections of groups
 * TODO Тут явно чтото не то..
 */
export function mapCollection(item) {
  // TODO Костыль!?
  return {
    title: item.NAME,
    description: item.PREVIEW_DESCRIPTION || '',
    id: item.ID,
    cards: mapBeachGroupList(item.COLLECTIONS),
  };
}

/**
 * Filter mapping
 * TODO Зачем это нужно??
 *
 * @param item
 * filter = {
 *   FILTER_ONE: ['val_1', 'val_2'],
 *   FILTER_TWO: ['val_3']
 * }
 *
 * @returns {*[]}
 * result = [
 *    { type: filterOne, id: 'val_1, value: true }
 *    { type: filterOne, id: 'val_2, value: true }
 *    { type: filterTwo, id: 'val_3, value: true }
 * ]
 */
export function mapSearchFilter(item) {
  const keys = Object.keys(item);
  return keys
    .reduce((res, key) => {
      const snakeKey = snakeToCamel(key);
      const arr = item[key].map((id) => ({
        type: snakeKey,
        id,
        value: true,
      }));
      return [...res, ...arr];
    }, []);
}

/**
 * Map Place entity
 */
export function mapPlace(item) {
  return {
    rating: item.RATING,
    title: item.NAME,
    pic: item.PICTURE,
    mainLink: item.URL,
    beachLink: item.URL,
    beachId: item.ID,
    show_distance: true,
    geo_string: `${item.COUNTRY}, ${item.CITY}`,
    internal_url: item.URL,
    another_place: true,
    price: item.PRICE,
    coordinates: item.COORDINATES ? item.COORDINATES.split(',').map(Number) : [],
    custom_photo: true,
  };
}
export function mapPlaceList(list = []) {
  return list.map(mapPlace);
}
export function mapOpinion(item) {
  return {
    pic: item.PICTURE,
    name: item.NAME,
    opinion: item.DESCRIPTION,
    social: item.SOCIAL_LINK,
    icon: item.SOCIAL,
  };
}
export function mapVisitors(item) {
  return {
    avatar: item.USER.PICTURE,
    pic: item.PICTURE,
    name: item.USER.FIO,
    comment: item.DESCRIPTION,
  };
}
/**
 * Map banner entity
 */
export function mapBanner(item) {
  return {
    title: item.NAME,
    description: item.DESCRIPTION,
    link: item.LINK,
    pic: item.PREVIEW_PICTURE,
    buttonText: item.BUTTON_NAME,
    // by default pic is on the left
    rightToLeft: item.PICTURE_POSITION === 'right',
  };
}

/**
 * Map city entity
 */
export function mapCity(item) {
  return {
    city: item.NAME,
    cityId: item.ID,
    beachNumber: item.COUNT_BEACHES,
    pic: item.PREVIEW_PICTURE ? item.PREVIEW_PICTURE : null,
  };
}

/**
 * Shared helper snakeToCamel
 *
 * TODO Use _.toSnakeCase() method instead
 *
 * @param str 'SNAKE_TO_CAMEL_CASE_TRANSFORMER'
 * @returns {string} 'snakeToCamelCaseTransformer'
 */
export const snakeToCamel = (str) => str.toLowerCase().replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase()
    .replace('-', '')
    .replace('_', ''),
);

export const mapSearchCityResult = (item) => (
  {
    access: {
      paid: item.ACCESS.PAID,
      description: item.ACCESS.DESCRIPTION,
    },
  });

export const mapExcursion = (item) => ({
  id: item.ID,
  title: item.NAME,
  pic: item.PREVIEW_PICTURE,
  type: 'excursion',
  duration: item.DURATION,
  price: item.PRICE,
  mainLink: item.LINK,
  rating: item.RATING,
  internal_url: OUT_LINKS_EXCURSIONS,
  another_place: true,
  metaHeader: item.ELEMENT_META_DESCRIPTION,
});
