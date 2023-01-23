import { useMutation } from 'react-query'

import { loginApi } from './api'

const useLogin = () => {
  const { mutate, isLoading } = useMutation(loginApi.login)
  return {
    login: mutate,
    isLoggingIn: isLoading
  }
}

export { useLogin }
