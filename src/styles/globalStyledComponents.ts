import { Button, Card, Col, Row } from 'antd'
import styled from 'styled-components'

const StyledCenteredContainer = styled.div`
  height: 100vh;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLogin = styled.div`
  width: 30%;
  min-height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0.5px solid lightgray;
  flex-direction: column;
`
const StyledHeader = styled.div`
  display: flex;
  height: 80px;
  background-color: ${props => props.theme.darkBlue};
  width: 100%;
  justify-content: space-around;
  align-items: center;
`

const StyledCard = styled(Card)`
  padding: ${props => props.theme.sm};
  width: 1300px;
  background-color: ${props => props.theme.cardBg};
`

const StyledTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-size: ${props => props.theme.md};
  color: ${props => props.theme.grayFonts};
`
const StyledInfo = styled.span`
  font-size: ${props => props.theme.sm};
  color: ${props => props.theme.grayFonts};
  text-align: left;
`
const StyledInfoTitle = styled.span`
  font-size: ${props => props.theme.sm};
  color: ${props => props.theme.grayFonts};
  margin-right: 2px;
`
const StyledLargeInfo = styled.h2`
  font-size: ${props => props.theme.lg};
`
const StyledMediumInfo = styled.span`
  font-size: ${props => props.theme.md};
  margin-bottom: ${props => props.theme.sm};
  color: ${props => props.theme.grayFonts};
`

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${props => props.theme.sm};
`
const StyledDayCard = styled(Card)`
  text-align: center;
  width: ${props => props.theme.xxl};
  background-color: ${props => props.theme.cardBg};
  height: ${props => props.theme.xxl};
`

const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px 10px;
`
const StyledCenteredCardDaysCol = styled(Col)`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${props => props.theme.sm};
`

const StyledCardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export {
  StyledButton,
  StyledCard,
  StyledCardsContainer,
  StyledCenteredCardDaysCol,
  StyledCenteredContainer,
  StyledDayCard,
  StyledHeader,
  StyledInfo,
  StyledInfoTitle,
  StyledLargeInfo,
  StyledLogin,
  StyledMediumInfo,
  StyledRow,
  StyledTitle
}
