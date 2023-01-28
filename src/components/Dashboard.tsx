import { DeleteOutlined } from '@ant-design/icons'
import { Col, Spin, Tooltip } from 'antd'
import { useContext } from 'react'

import CitiesContext from '../context/citiesContext'
import { useWeathers } from '../hooks/useWeatherInfo'
import {
  StyledCardsContainer,
  StyledCenteredCardDaysCol,
  StyledCenteredRow,
  StyledDayCard,
  StyledDeleteButton,
  StyledInfo,
  StyledInfoTitle,
  StyledLargeInfo,
  StyledMediumInfo,
  StyledRow
} from '../styles/globalStyledComponents'
import { CityWeatherResponse } from '../types/types'

export const Dashboard = () => {
  const { city: cities, deleteCities } = useContext(CitiesContext)
  const { isLoading } = useWeathers()
  const handleDelete = (id: number) => {
    deleteCities(id)
  }

  return !cities?.length ? (
    <StyledCenteredRow>
      <Col>
        <StyledLargeInfo>No cities added yet</StyledLargeInfo>
      </Col>
    </StyledCenteredRow>
  ) : (
    <StyledCardsContainer>
      <StyledRow>
        {cities?.map((city: CityWeatherResponse) => (
          <StyledDayCard key={city.id}>
            <StyledRow>
              <StyledCenteredCardDaysCol>
                <StyledMediumInfo>{city.name}</StyledMediumInfo>
                <StyledLargeInfo>
                  {city.main.temp && `${Math.round(city?.main.temp)}°C`}
                </StyledLargeInfo>
                <StyledInfoTitle>
                  {city.weather.map(cityMapped => cityMapped.description)}
                </StyledInfoTitle>
                <Spin spinning={isLoading}>
                  <img
                    src={`http://openweathermap.org/img/wn/${city?.weather[0].icon}.png`}
                    alt="icon"
                    width="60px"
                  />
                </Spin>
              </StyledCenteredCardDaysCol>
            </StyledRow>
            <StyledRow>
              <Col>
                <StyledInfoTitle>Today: </StyledInfoTitle>
                <StyledInfoTitle>Min:</StyledInfoTitle>
                <StyledInfo>{Math.round(city.main.temp_min)}°C</StyledInfo>
                <StyledInfoTitle> Max:</StyledInfoTitle>
                <StyledInfo>{Math.round(city.main.temp_max)}°C</StyledInfo>
              </Col>
            </StyledRow>
            <StyledRow>
              <Col>
                <StyledInfoTitle>Humidity: </StyledInfoTitle>
                <StyledInfo>{city.main.humidity}%</StyledInfo>
              </Col>
              <Col>
                <StyledInfoTitle>Wind: </StyledInfoTitle>
                <StyledInfo>{city.wind.speed} km/h</StyledInfo>
              </Col>
            </StyledRow>
            <StyledRow>
              <Tooltip title="Delete">
                <StyledDeleteButton danger onClick={() => handleDelete(city.id)}>
                  <DeleteOutlined />
                </StyledDeleteButton>
              </Tooltip>
            </StyledRow>
          </StyledDayCard>
        ))}
      </StyledRow>
    </StyledCardsContainer>
  )
}
