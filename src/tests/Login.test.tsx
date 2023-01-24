import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Login } from '../components/Login'

describe('Login tests', () => {
  beforeAll(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: true,
          refetchOnReconnect: true,
          refetchOnWindowFocus: true
        }
      }
    })
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    )
  })
  test('Should not login with invalid credentials', async () => {
    const userInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })
    userEvent.type(userInput, 'invalidUser@mail.com')
    userEvent.type(passwordInput, 'invalidPassword123')
    userEvent.click(loginButton)
    await waitFor(() => {
      expect(screen.findByText('invalid email')).toBeTruthy()
    })
  })
})
