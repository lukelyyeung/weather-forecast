const GETTING_WEATHER = 'LOADING_WEATHER';
const GET_WEATHER_SUCCESS = 'GET_WEATHER_SUCCESS';
const GET_WEATHER_FAIL = 'GET_WEATHER_FAIL';

export const getWeather = (cityName, countryCode) => async (dispatch, state, { weatherService }) => {
  dispatch({
    type: GETTING_WEATHER,
  });

  try {
    const data = await weatherService.query5DaysWeather(cityName, countryCode);
    dispatch({
      data,
      type: GET_WEATHER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: GET_WEATHER_FAIL,
      error,
    });
  }
}

export default function weatherReducer(state = {}, action) {
  switch (action.type) {
    case GETTING_WEATHER: {
      return { ...state, isLoading: true }
    }
    case GET_WEATHER_SUCCESS: {
      return { ...state, isLoading: false, error: null, data: action.data };
    }
    case GET_WEATHER_FAIL: {
      return { ...state, isLoading: false, error: action.error }
    }

    default:
      return state;
  }
}