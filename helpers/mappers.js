/**
 * Map Event entity
 */
export function mapEvent(item) {
  return {
    tempWater:  item.BEACH && item.BEACH.WEATHER && item.BEACH.WEATHER.TEMP ? item.BEACH.WEATHER.TEMP.WATER : null,
    date:       item.ACTIVE_FROM,
    showFavorite: true,
    beach:      item.BEACH ? item.BEACH.NAME : null,
    paid:       item.PAID,
    title:      item.NAME,
    location:   item.BEACH && item.BEACH.CITY ? item.BEACH.CITY.NAME : null,
    pic:        item.PHOTOS ? item.PHOTOS.medium[0].path : null,
    mainLink:   `event/${item.ID}`,
    humanLink:  item.CODE ? `event/${item.CODE}`: null,
    beachLink:  item.BEACH ? `beach/${item.BEACH.CODE}` : null,
    locationId: item.BEACH && item.BEACH.CITY ? item.BEACH.CITY.ID : null,
    eventId:    item.ID,
    beachId:    item.BEACH ? item.BEACH.ID : null
  }
}
export function mapEventList(list = []) {
  return list.map(mapEvent)
}

/**
 * Map entity
 * TODO Just entity?? Что это за сущность?
 */
export function mapEntity(item) {
    return {
      coordinates: item.COORDINATES.length ? item.COORDINATES.split(',') : [],
      id:          item.ID,
      name:        item.NAME,
      preview:     item.PREVIEW,
      url:         item.URL,
      photos:      item.PHOTOS,
      type:        item.TYPE,
      description: item.DESCRIPTION,
    }
}
export function mapEntityList(list = []) {
  return list.map(mapEntity)
}

/**
 * Map beach entity
 */
export function mapBeach(item) {
    return {
      access:       item.ACCESS || null,
      tempWater:    item.WEATHER && item.WEATHER.TEMP ? item.WEATHER.TEMP.WATER : null,
      showFavorite: true,
      paid:         item.PAID,
      rating:       parseFloat(item.AVERAGE_RATING),
      title:        item.NAME,
      location:     item.CITY ? item.CITY.NAME : null,
      pic:          item.PHOTOS ? item.PHOTOS.medium[0].path : null,
      mainLink:     `beach/${item.ID}`,
      beachLink:    `beach/${item.ID}`,
      humanLink:    item.CODE ? `beach/${item.CODE}` : null,
      locationId:   item.CITY ? item.CITY.ID : null,
      beachId:      item.ID,
      tags: item.TAGS
        ? item.TAGS.map(v => ({ id: v.ID, title: v.NAME }))
        : null,
      addTags: item.ADD_TAGS
        ? item.ADD_TAGS.map(v => ({ id: v.ID, title: v.NAME }))
        : null,
      pos:             item.COORDINATES && item.COORDINATES.length > 0 ? [parseFloat(item.COORDINATES.split(',')[0]), parseFloat(item.COORDINATES.split(',')[1])] : [],
      beachLength:     item.PARAMETERS ? (item.PARAMETERS.P_LINE_LENGTH == '' ? null : item.PARAMETERS.P_LINE_LENGTH) : null,
      beachPrice:      item.PARAMETERS ? (item.PARAMETERS.P_PRICE == '' ? null : item.PARAMETERS.P_PRICE) : null,
      beachType:       item.PARAMETERS ? (item.PARAMETERS.P_BEACH_TYPE ? item.PARAMETERS.P_BEACH_TYPE.NAME : null) : null,
      beachWorktime:   item.PARAMETERS ? (item.PARAMETERS.P_MODE ? item.PARAMETERS.P_MODE.NAME : null) : null,
      beachSeabedType: null,
      coordinates:     item.COORDINATES && item.COORDINATES.length > 0 ? [parseFloat(item.COORDINATES.split(',')[0]), parseFloat(item.COORDINATES.split(',')[1])] : [],
      show_distance:   true,
    }
}
export function mapBeachList(list = []) {
  return list.map(mapBeach);
}

/**
 * Map Rest entity
 */
export function mapRest(item) {
  return {
    temperature:  item.WEATHER ? item.WEATHER.TEMP.WATER : null,
    showFavorite: true,
    paid:         item.PAID,
    rating:       parseFloat(item.AVERAGE_RATING),
    title:        item.NAME,
    location:     item.CITY ? item.CITY.NAME : null,
    locationId:   item.CITY ? item.CITY.ID : -1,
    pic:          item.PHOTOS.medium && item.PHOTOS.medium.length ? item.PHOTOS.medium[0].path : null,
    mainLink:     `beach/${item.ID}`,
    beachLink:    `beach/${item.ID}`,
    humanLink:    item.CODE ? `beach/${item.CODE}` : null,
    beachId:      item.ID,
    coordinates:  item.COORDINATES.length ? item.COORDINATES.split(',') : [],
    show_distance: true
  }
}

/**
 * Map Mobile settings
 */
export function mapSettings(item) {
  return {
    active: item.ACTIVE,
    id:     item.ID,
    code:   item.CODE,
    value:  item.VALUE,
  }
}

// MapIds
export function mapIDs(list = []) {
  return list.map(i => i.ID)
}

/**
 * Map Collections of groups
 * TODO Тут явно чтото не то..
 */
export function mapCollection(item) {
  // TODO Костыль!?
  return {
    title: item.NAME,
    cards: mapBeachGroupList(item.COLLECTIONS)
  }
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
    pic:   item.PREVIEW_PICTURE ? (item.PREVIEW_PICTURE) : null,
    beachNumber: item.COUNT_BEACHES ? item.COUNT_BEACHES : 0,
    description: item.DESCRIPTION,
    filter: mapSearchFilter(item.SEARCH_FILTER)
  }
}
export function mapBeachGroupList(list = []) {
  return list.map(mapBeachGroup)
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
      const arr = item[key].map(id => ({
        type: snakeKey,
        id,
        value: true
      }))
      return [...res, ...arr]
    }, [])
}

/**
 * Map Place entity
 */
export function mapPlace(item) {
  return {
    rating:    item.RATING,
    title:     item.NAME,
    pic:       item.PICTURE,
    mainLink:  item.URL,
    beachLink: item.URL,
    beachId:   item.ID,
    show_distance: true,
    geo_string:    item.COUNTRY + ', ' + item.CITY,
    internal_url:  item.URL,
    another_place: true,
    price:         item.PRICE,
    coordinates:   item.COORDINATES ? item.COORDINATES.split(',').map(Number) : [],
  }
}
export function mapPlaceList(list = []) {
  return list.map(mapPlace)
}

/**
 * Map banner entity
 */
export function mapBanner(item) {
  return {
    title:       item.NAME,
    description: item.DESCRIPTION,
    link:        item.LINK,
    pic:         item.PREVIEW_PICTURE,
    buttonText:  item.BUTTON_NAME,
    // by default pic is on the left
    rightToLeft: item.PICTURE_POSITION == 'right'
  }
}

/**
 * Map city entity
 */
export function mapCity(item) {
  return  {
    city:   item.NAME,
    cityId: item.ID,
    beachNumber: item.COUNT_BEACHES,
    pic:         item.PREVIEW_PICTURE ? item.PREVIEW_PICTURE : null
  }
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
    .replace('_', '')
);

