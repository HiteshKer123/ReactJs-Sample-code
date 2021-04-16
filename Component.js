import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Layout from '../../shared/components/GuestUser/Layout'
import { toastDuration } from '../../shared/config/globalConfig'
import { userSignIn } from '../../redux/actions/user/user.actions'
import '../SignUp/signUp.scss'
import { userInformation } from '../../redux/selectors/user/user.selector'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  // User selector
  const userInfo = useSelector(userInformation)

  // Submit 
  const onFinish = (data) => {

    dispatch(userSignIn(data)).then((res) => {
      // redirect to home page if no error
      if (!!!res.hasError) {
        history.push({
          pathname: '/home',
          // show welcome guide if loggedin flag passed
          state: location.search ? { showWelcomeGuide: true } : null,
        })
      } else {
        // show error messege to user
        message.error(res.message, toastDuration)
      }
    })
  }

  return (
    <Layout>
      <div className="form-cover">
        <div className="userformmbox">
          <div className="form-feildbox">
            <h1> Sign In to your account </h1>

            <Form name="sign-in" onFinish={(data) => onFinish(data)}>
              <div className="form-feildbox-row">
                <Form.Item
                  name={['emailAddress']}
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input placeholder="E-mail address" />
                </Form.Item>
              </div>

              <div className="form-feildbox-row">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="form-input"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

            <div className="getin-touchtext">
              <p>
                Cannot sign in?
                <a href="mailto:info@affirmit.co">Get in touch with us</a>
              </p>
              <p>
                Not registered yet, <Link to="/sign-up">Sign Up</Link>
              </p>
              <p>
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Login
