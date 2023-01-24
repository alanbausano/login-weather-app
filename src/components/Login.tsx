import { Form, Input, notification, Spin } from 'antd'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../context/authContext'
import { useLogin } from '../hooks/useLogin'
import { useSignUp } from '../hooks/useSignUp'
import {
  StyledButton,
  StyledCenteredContainer,
  StyledLogin,
  StyledTitle
} from '../styles/globalStyledComponents'

export const Login: React.FC = () => {
  const history = useHistory()
  const [isLogin, setIsLogin] = useState(true)
  const { signUp, isSigningUp } = useSignUp()
  const { login, isLoggingIn } = useLogin()
  const AuthCtx = useContext(AuthContext)
  const onFinish = (data: { username: string; password: string; returnSecureToken: boolean }) => {
    if (isLogin) {
      login(data, {
        onSuccess: res => {
          const expirationTime = new Date(new Date().getTime() + +res.expiresIn * 1000)
          AuthCtx.login(res.idToken, +expirationTime)
          history.replace('/')
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          notification.error({
            message: `${err.response.data.error.message.replace('_', ' ').toLowerCase()}`
          })
        }
      })
    } else {
      signUp(data, {
        onSuccess: () => {
          setIsLogin(!isLogin)
          notification.success({
            message: `You've successfully signed up with username: ${data.username}`
          })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          notification.error({
            message: `${err.response.data.error.message.replace('_', ' ').toLowerCase()}`
          })
        }
      })
    }
  }
  const handleSignUp = () => {
    setIsLogin(!isLogin)
  }
  return (
    <StyledCenteredContainer>
      <StyledLogin>
        <Spin spinning={isSigningUp || isLoggingIn}>
          <StyledTitle>{isLogin ? 'Sign in' : 'Sign up'}</StyledTitle>
          <Form
            name="loginForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <StyledButton type="link" htmlType="button" onClick={handleSignUp}>
              {isLogin ? 'Create account' : 'Sign in'}
            </StyledButton>
            <StyledButton type="primary" htmlType="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </StyledButton>
          </Form>
        </Spin>
      </StyledLogin>
    </StyledCenteredContainer>
  )
}
