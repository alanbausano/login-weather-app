import axios from 'axios'

const createAccount = async (userData: {
  username: string
  password: string
  returnSecureToken: boolean
}) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    {
      email: userData.username,
      password: userData.password,
      returnSecureToken: true
    }
  )

  return response.data
}

export const signUpApi = { createAccount }
