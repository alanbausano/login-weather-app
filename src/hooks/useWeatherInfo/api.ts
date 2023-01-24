import axios from 'axios'

import { CityWeatherResponse } from '../../types/types'

const getWeather = async (city: string | undefined) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en,sp&exclude=hourly,minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  const response = await axios.get<CityWeatherResponse>(weatherUrl)
  return response.data
}

export const WeatherApi = { getWeather }
