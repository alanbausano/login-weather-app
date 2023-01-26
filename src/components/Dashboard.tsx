import { DeleteOutlined } from '@ant-design/icons'
import { useContext } from 'react'

import CitiesContext from '../context/citiesContext'
import {
  StyledCardsContainer,
  StyledCenteredCardDaysCol,
  StyledDayCard,
  StyledInfo,
  StyledInfoTitle,
  StyledMediumInfo,
  StyledRow
} from '../styles/globalStyledComponents'
import { CityWeatherResponse } from '../types/types'

export const Dashboard = () => {
  const { city: cities } = useContext(CitiesContext)
  return (
    <StyledCardsContainer>
      <StyledRow>
        {cities?.map((city: CityWeatherResponse) => (
          <StyledDayCard
            key={city.id}
            actions={[
              <DeleteOutlined
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            ]}
          >
            <StyledRow>
              <StyledCenteredCardDaysCol>
                <StyledMediumInfo>{city.name}</StyledMediumInfo>
                <StyledInfoTitle>
                  {city.weather.map(cityMapped => cityMapped.description)}
                </StyledInfoTitle>
                <img
                  src={`http://openweathermap.org/img/wn/${city?.weather?.map(
                    cityMapped => cityMapped.icon
                  )}.png`}
                  alt="icon"
                  width="60px"
                />
              </StyledCenteredCardDaysCol>
            </StyledRow>
            <StyledRow>
              <StyledInfo>Min:</StyledInfo>
              <StyledMediumInfo>{Math.round(city.main.temp_min)}°C</StyledMediumInfo>
              <StyledInfo>- Max:</StyledInfo>
              <StyledMediumInfo>{Math.round(city.main.temp_max)}°C</StyledMediumInfo>
            </StyledRow>
          </StyledDayCard>
        ))}
      </StyledRow>
    </StyledCardsContainer>
  )
}
