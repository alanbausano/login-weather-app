import { UserOutlined } from '@ant-design/icons'
import { AutoComplete, Avatar, Button, Input, notification } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import AuthContext from '../context/authContext'
import CitiesContext from '../context/citiesContext'
import { useWeathers } from '../hooks/useWeatherInfo'
import { StyledHeader, StyledUser } from '../styles/globalStyledComponents'
import { CityWeatherResponse } from '../types/types'

const { Search } = Input

export const Header = () => {
  const [cityValue, setCityValue] = useState<string | undefined>()
  const { logout, user } = useContext(AuthContext)
  const [valueDebounced] = useDebounce(cityValue, 450)
  const [options, setOptions] = useState<{ value: string; key: number }[] | undefined>()
  const { addCities, deleteAllCities, city: cities } = useContext(CitiesContext)
  const [citiesIds, setCitiesIds] = useState<number[] | undefined>(cities?.map(city => city.id))
  const { data, searchCityWeather } = useWeathers(valueDebounced, citiesIds)
  const onSearch = (value: string) => {
    setCityValue(value)
  }

  const setAlerts = () => {
    const hotTemperatureCities = cities?.filter(
      filteredCity => Math.floor(filteredCity.main.temp) >= 22
    )
    hotTemperatureCities?.map(city =>
      notification.warning({ message: `${city.name} is hotter than 22°C`, duration: 5 })
    )
  }

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setAlerts()
    }, 300000) // 5 minutes (in milliseconds)
    return () => clearInterval(notificationInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities])

  useEffect(() => {
    const citiesMappedIds = cities?.map(city => city.id)
    if (cities) {
      setCitiesIds(citiesMappedIds)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!cityValue) {
      setOptions(undefined)
    }
    if (cityValue) {
      searchCityWeather(valueDebounced, {
        onSuccess: (res: CityWeatherResponse) => {
          setOptions(Array({ value: res.name, key: res.id }))
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueDebounced])

  const onSelect = () => {
    const addedCities = cities?.find(city => city.id === data?.id)
    if (addedCities) {
      notification.info({ message: 'This city is already added, try adding a new one' })
    } else {
      addCities(data!)
      setCityValue(undefined)
    }
  }

  const handleLogout = () => {
    deleteAllCities()
    logout()
  }

  return (
    <StyledHeader>
      <AutoComplete
        onSearch={onSearch}
        style={{ width: 400 }}
        value={cityValue}
        options={options}
        onSelect={onSelect}
      >
        <Search placeholder="Search for cities" allowClear />
      </AutoComplete>
      <StyledUser>
        <Avatar icon={<UserOutlined />} />
        {user}
      </StyledUser>
      <Button onClick={handleLogout}>Logout</Button>
    </StyledHeader>
  )
}
