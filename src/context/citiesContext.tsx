/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { CityWeatherResponse } from '../types/types'

type ContextState = {
  city: CityWeatherResponse[] | undefined
  setCity: Dispatch<SetStateAction<CityWeatherResponse[]>>
  addCities: (newCity: CityWeatherResponse) => void
  deleteCities: (id: number) => void
}

const initialState = {
  city: undefined,
  setCity: () => {},
  addCities: (newCity: CityWeatherResponse) => {},
  deleteCities: (id: number) => {}
}

const CitiesContext = createContext<ContextState>(initialState)

export const CitiesContextProvider = (props: { children: React.ReactNode }) => {
  const storageCities = localStorage.getItem('city')
  const parsedCities = JSON.parse(storageCities!)
  const [city, setCity] = useState<CityWeatherResponse[] | []>(parsedCities || [])

  const addCities = (newCity: CityWeatherResponse) => {
    setCity(prevCities => [...prevCities, newCity])
  }
  const deleteCities = (id: number) => {
    setCity(prevCities => prevCities.filter(cityFiltered => cityFiltered.id !== id))
  }
  useEffect(() => {
    localStorage.setItem('city', JSON.stringify(city))
  }, [city])

  useEffect(() => {
    // Load data from local storage when component first renders
    const dataString = localStorage.getItem('city')
    if (dataString) {
      setCity(JSON.parse(dataString))
    }
  }, [])

  const contextValue = useMemo(() => {
    return {
      city,
      setCity,
      addCities,
      deleteCities
    }
  }, [city])
  return <CitiesContext.Provider value={contextValue}>{props.children}</CitiesContext.Provider>
}

export default CitiesContext
