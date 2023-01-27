import axios from 'axios'

import { CityByIds, CityWeatherResponse } from '../../types/types'

const getWeather = async (city: string | undefined) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en,sp&exclude=hourly,minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  const response = await axios.get<CityWeatherResponse>(weatherUrl)
  return response.data
}

const getWeatherByIds = async (ids: number[] | undefined) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/group?id=${ids}&lang=en,sp&exclude=hourly,minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  const response = await axios.get<CityByIds>(weatherUrl)
  return response.data
}

export const WeatherApi = { getWeather, getWeatherByIds }
