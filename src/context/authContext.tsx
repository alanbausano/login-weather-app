/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'

type ContextState = {
  token: string | null | undefined
  isLoggedIn: boolean
  login: (token: string, expirationTime: number) => void
  logout: () => void
}

const initialState = {
  token: '',
  isLoggedIn: false,
  login: (token: string | null, expirationTime: number) => {},
  logout: () => {}
}

const AuthContext = createContext<ContextState>(initialState)

const calculateRemainingTime = (expirationTime: number) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()
  const remainingDuration = adjExpirationTime - currentTime
  return remainingDuration
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpirationTime = localStorage.getItem('expTime')
  const remainingTime = storedExpirationTime && calculateRemainingTime(+storedExpirationTime)
  if (remainingTime && remainingTime <= 6000) {
    localStorage.removeItem('token')
    localStorage.removeItem('expTime')
    return null
  }
  return { storedToken, remainingTime }
}

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const tokenData = retrieveStoredToken()
  const initialToken = tokenData?.storedToken
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [token, setToken] = useState<string | null | undefined>(initialToken)

  const isUserLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expTime')
    if (timer) {
      clearTimeout(timer)
    }
  }, [timer])

  const loginHandler = useCallback((tokenAsProp: string, expirationTime: number) => {
    setToken(tokenAsProp)
    localStorage.setItem('token', tokenAsProp)
    localStorage.setItem('expTime', expirationTime.toString())
    const remainingTime = calculateRemainingTime(expirationTime)
    const logoutTimer = setTimeout(logoutHandler, remainingTime)
    setTimer(logoutTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tokenData) {
      setTimeout(logoutHandler, tokenData.remainingTime as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData])

  const contextValue = useMemo(() => {
    return {
      token,
      isLoggedIn: isUserLoggedIn,
      login: loginHandler,
      logout: logoutHandler
    }
  }, [isUserLoggedIn, loginHandler, logoutHandler, token])

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext
