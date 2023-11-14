import React, { useState } from 'react'
import { registration } from '../../Actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import { Alert, Button } from '@material-tailwind/react'
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext'

const Registration = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const registrationError = useSelector(
    (state) => state.user.registrationError,
  )

  const [registrationSuccess, setRegistrationSuccess] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault()
    if (username.trim() === '' || password.trim() === '') {
      setShowAlert(true)
    } else {
      const error = await dispatch(registration(username, password))

      if (error) {
        setShowAlert(true)
        setRegistrationSuccess(false)
        return
      }

      setRegistrationSuccess(true)
      navigate('/')
    }
  }

  return (
    <div className='min-h-screen flex justify-center '>
      <div className='bg-white p-8 rounded-lg shadow-md w-96 h-min mt-10'>
        <h1 className='text-2xl font-bold text-green-500 mb-4'>
          Registration
        </h1>
        <form onSubmit={handleRegister}>
          <div className='mb-4'>
            <label className='block text-green-600 mb-2'>
              Username
            </label>
            <input
              className='w-full p-2 border rounded'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-green-600 mb-2'>
              Password
            </label>
            <input
              type='password'
              className='w-full p-2 border rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {showAlert && (
            <Alert color='red' className='ease-linear my-4'>
              Your data is incorrect
            </Alert>
          )}

          {registrationError && (
            <Alert color='red' className='ease-linear my-4'>
              {registrationError}
            </Alert>
          )}

          <Button
            type='submit'
            className='w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded'
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Registration
