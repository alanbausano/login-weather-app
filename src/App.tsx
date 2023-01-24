import 'antd/dist/antd.min.css'

import { useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { Login } from './components/Login'
import { Main } from './components/Main'
import AuthContext from './context/authContext'

const App = () => {
  const { token } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          {token ? <Main /> : <Redirect to="/login" />}
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
