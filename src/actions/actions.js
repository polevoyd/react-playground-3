const LOCATION_SET_CITY_COORDINATES = 'LOCATION_SET_CITY_COORDINATES';
const LOCATION_SET_CITY = 'LOCATION_SET_CITY';
const SET_TWEETS = 'SET_TWEETS';

/**
 * actions
 */

export function setLocationAndCoordinates(location, locationLngLat) {
    return { type: LOCATION_SET_CITY_COORDINATES, location, locationLngLat }
} 

export function setLocationCity(city) {
    return { type: LOCATION_SET_CITY, city}
}

export function setTweets(tweetsArray) {
    return { type: SET_TWEETS, tweetsArray }
}

