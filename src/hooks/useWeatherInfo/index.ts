import { notification } from 'antd'
import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEYS } from '../../enums/queryKeys'
import { WeatherApi } from './api'

const useWeathers = (filter?: string, ids?: number[]) => {
  const queryClient = useQueryClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
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
