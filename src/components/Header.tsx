import { ApiOutlined, UserOutlined } from '@ant-design/icons'
import { AutoComplete, Avatar, Button, Col, Input, notification } from 'antd'
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
  const { data, searchCityWeather, isLoading } = useWeathers(valueDebounced)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine)
  }

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])
  useEffect(() => {
    if (!isOnline) {
      notification.warning({
        message: 'You are currently offline. Some features may not be available.'
      })
    }
  }, [isOnline])

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
    }, 180000) // 3 minutes (in milliseconds)
    return () => clearInterval(notificationInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities])

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
        <Search placeholder="Search for cities" allowClear loading={isLoading} />
      </AutoComplete>
      {!isOnline && (
        <Col>
          <ApiOutlined
            style={{
              backgroundColor: '#ff4d4f',
              fontSize: '24px',
              borderRadius: '50px',
              padding: '9px'
            }}
          />
        </Col>
      )}
      <StyledUser>
        <Avatar icon={<UserOutlined />} />
        {user}
      </StyledUser>
      <Button onClick={handleLogout}>Logout</Button>
    </StyledHeader>
  )
}
