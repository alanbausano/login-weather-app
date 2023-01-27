/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useWeathers } from '../hooks/useWeatherInfo'
import { CityWeatherResponse } from '../types/types'

type ContextState = {
  city: CityWeatherResponse[] | undefined
  setCity: Dispatch<SetStateAction<CityWeatherResponse[]>>
  addCities: (newCity: CityWeatherResponse) => void
  deleteCities: (id: number) => void
  deleteAllCities: () => void
}

const initialState = {
  city: undefined,
  setCity: () => {},
  addCities: (newCity: CityWeatherResponse) => {},
  deleteCities: (id: number) => {},
  deleteAllCities: () => {}
}

const CitiesContext = createContext<ContextState>(initialState)

export const CitiesContextProvider = (props: { children: React.ReactNode }) => {
  const { getByCitiesById } = useWeathers()
  const storageCities = localStorage.getItem('city')
  const parsedCities = JSON.parse(storageCities!)
  const [city, setCity] = useState<CityWeatherResponse[] | []>(parsedCities || [])

  const addCities = (newCity: CityWeatherResponse) => {
    setCity(prevCities => [...prevCities, newCity])
  }
  const deleteCities = useCallback(
    (id: number) => {
      setCity(prevCities => prevCities.filter(cityFiltered => cityFiltered.id !== id))
      const storageDeletion = parsedCities.filter(
        (cityFiltered: CityWeatherResponse) => cityFiltered.id !== id
      )
      localStorage.setItem('city', JSON.stringify(storageDeletion))
    },
    [parsedCities]
  )

  const deleteAllCities = () => {
    setCity([])
  }

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      const citiesById = city?.map(cityMapped => cityMapped.id)
      if (citiesById) {
        getByCitiesById(citiesById, {
          onSuccess: res => {
            setCity(res.list)
            localStorage.setItem('city', JSON.stringify(res.list))
          }
        })
      }
    }, 300000) // 5 minutes (in milliseconds)
    return () => clearInterval(fetchInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city])

  useEffect(() => {
    localStorage.setItem('city', JSON.stringify(city))
  }, [city])

  useEffect(() => {
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
      deleteAllCities,
      deleteCities
    }
  }, [city, deleteCities])
  return <CitiesContext.Provider value={contextValue}>{props.children}</CitiesContext.Provider>
}

export default CitiesContext
