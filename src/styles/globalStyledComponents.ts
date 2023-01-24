import { Button, Card } from 'antd'
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
  background-color: ${props => props.theme.cardBg} !important;
  & .main {
    margin-top: ${props => props.theme.md} !important;
    margin-bottom: ${props => props.theme.md} !important;
  }
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

export {
  StyledButton,
  StyledCard,
  StyledCenteredContainer,
  StyledHeader,
  StyledInfo,
  StyledInfoTitle,
  StyledLargeInfo,
  StyledLogin,
  StyledMediumInfo,
  StyledTitle
}
