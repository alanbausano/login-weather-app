import { useWeathers } from '../hooks/useWeatherInfo'

export const Dashboard = () => {
  const { data } = useWeathers()
  return <div>{data?.name}</div>
}
