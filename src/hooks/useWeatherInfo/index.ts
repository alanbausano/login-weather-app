import { notification } from 'antd'
import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEYS } from '../../enums/queryKeys'
import { ApiError } from '../../types/types'
import { WeatherApi } from './api'

const useWeathers = (filter?: string) => {
  const queryClient = useQueryClient()
  const onError = (error: ApiError) => {
    notification.warning({
      message: error.response.data.message
    })
  }

  const { mutate, data, isLoading } = useMutation(
    [QUERY_KEYS.WEATHER_INFO, { filter }],
    WeatherApi.getWeather,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.WEATHER_INFO)
      },
      onError
    }
  )

  const { mutate: getByCitiesById, data: notifications } = useMutation(
    [QUERY_KEYS.NOTIFICATION_QUERY],
    WeatherApi.getWeatherByIds
  )

  const citiesByIds = notifications?.list

  return {
    data,
    isLoading,
    citiesByIds,
    searchCityWeather: mutate,
    getByCitiesById
  }
}

export { useWeathers }
