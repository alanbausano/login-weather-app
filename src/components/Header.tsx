import { AutoComplete, Button, Input } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import AuthContext from '../context/authContext'
import CitiesContext from '../context/citiesContext'
import { useWeathers } from '../hooks/useWeatherInfo'
import { StyledHeader } from '../styles/globalStyledComponents'
import { CityWeatherResponse } from '../types/types'

const { Search } = Input

export const Header = () => {
  const [cityValue, setCityValue] = useState<string | undefined>()
  const { logout } = useContext(AuthContext)
  const [valueDebounced] = useDebounce(cityValue, 450)
  const { data, searchCityWeather } = useWeathers(valueDebounced)
  const [options, setOptions] = useState<{ value: string; key: number }[] | undefined>()
  const { addCities } = useContext(CitiesContext)
  const onSearch = (value: string) => {
    setCityValue(value)
  }
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
    addCities(data!)
    localStorage.setItem('city', JSON.stringify(data))
    setCityValue(undefined)
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
      <Button onClick={logout}>Logout</Button>
    </StyledHeader>
  )
}
