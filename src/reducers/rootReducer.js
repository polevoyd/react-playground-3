
const initialState = {
    location: 'Los Angeles, California, United States',
    locationLngLat: [-118.2439, 34.0544],
    tweets: []
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOCATION_SET_CITY_COORDINATES':
            return({
                location: action.location,
                locationLngLat: action.locationLngLat,
                tweets: state.tweets
            })
    
        case 'LOCATION_SET_CITY':
            return({
                location: action.city,
                locationLngLat: state.locationLngLat,
                tweets: state.tweets
            })

        case 'SET_TWEETS':
            return({
            location: state.location,
            locationLngLat: state.locationLngLat,
            tweets: action.tweetsArray
        })

        default:
            return state;
    }
}

export default rootReducer;