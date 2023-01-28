export type Daily = {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: number
  pop: number
  rain: number
  uvi: number
}[]

export type WeatherResponseType = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
  }
  daily: Daily
}

export type CityWeatherResponse = {
  base: string
  clouds: {
    all: number
  }
  cod: number
  coord: {
    lon: number
    lat: number
  }
  dt: number
  id: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  name: string
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  visibility: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  wind: {
    speed: number
    deg: number
  }
}

export type CityByIds = {
  count: number
  list: CityWeatherResponse[]
}

export interface ApiError {
  response: {
    data: {
      message: string
    }
  }
}
