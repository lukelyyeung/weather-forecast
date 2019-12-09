import dayjs from 'dayjs';

const WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';

export default class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async query5DaysWeather(cityName, countryCode) {
    const queryParameters = {
      q: `${cityName},${countryCode}`,
      appid: this.apiKey,
    }
    const response = await this._get(WEATHER_API_ENDPOINT, queryParameters);

    if (response.ok) {
      const data = await response.json();
      return this._formatWeatherData(data);
    }

    let reason = '';

    try {
      const errorData = await response.json();
      reason = errorData.message;
    } catch (_) {
      console.debug('No error message from server side');
    }

    throw new Error(`Fail to query weather data due to ${reason || response.statusText}`);
  }

  _get(path, queryParameters = {}) {
    const url = new URL(path);
    Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));
    return fetch(url);
  }

  _formatWeatherData(data) {
    const sortedData = data.list.reduce((result, current) => {
      const day = current.dt_txt.split(' ')[0];
      result[day] = result[day]
        || {
          city: data.city.name,
          country: data.city.country,
          day,
          weekday: dayjs(day).day(),
          threeHoursForecasts: [],
          maxTemp: 0,
          minTemp: null,
          weathers: [],
          maxWindSpeed: 0,
          minWindSpeed: null,
          minHumidity: null,
          maxHumidity: 0,
        };

      const summary = result[day];
      const { wind, main } = current;
      summary.threeHoursForecasts.push(current);

      current.weather.forEach(weather => {
        if (summary.weathers.find((savedWeather) => savedWeather.icon.substring(0, 2) === weather.icon.substring(0, 2))) {
          return;
        }

        summary.weathers.push(weather);
      });
      summary.minTemp = (summary.minTemp === null || main.temp_min < summary.minTemp) ? main.temp_min : summary.minTemp;
      summary.maxTemp = main.temp_max > summary.maxTemp ? main.temp_max : summary.maxTemp;
      summary.minWindSpeed = (summary.minWindSpeed === null || wind.speed < summary.minWindSpeed) ? wind.speed : summary.minWindSpeed;
      summary.maxWindSpeed = (wind.speed > summary.maxWindSpeed) ? wind.speed : summary.maxWindSpeed;
      summary.minHumidity = (summary.minHumidity === null || main.humidity < summary.minHumidity) ? main.humidity : summary.minHumidity;
      summary.maxHumidity = (main.humidity > summary.maxHumidity) ? main.humidity : summary.maxHumidity;
      return result;
    }, {});

    return sortedData;
  }
}