/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useMemo, useState } from 'react'

type ContextState = {
  token: string | null | undefined
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
}

const initialState = {
  token: '',
  isLoggedIn: false,
  login: (token: string | null) => {},
  logout: () => {}
}

const AuthContext = createContext<ContextState>(initialState)

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null | undefined>()

  const isUserLoggedIn = !!token

  const loginHandler = (tokenAsProp: string) => {
    setToken(tokenAsProp)
  }

  const logoutHandler = () => {
    setToken(null)
  }

  const contextValue = useMemo(() => {
    return {
      token,
      isLoggedIn: isUserLoggedIn,
      login: loginHandler,
      logout: logoutHandler
    }
  }, [isUserLoggedIn, token])

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext
