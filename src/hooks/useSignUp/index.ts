import { useMutation } from 'react-query'

import { signUpApi } from './api'

const useSignUp = () => {
  const { mutate, isLoading } = useMutation(signUpApi.createAccount)
  return {
    signUp: mutate,
    isSigningUp: isLoading
  }
}

export { useSignUp }
