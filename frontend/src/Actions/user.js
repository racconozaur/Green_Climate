import createAxiosInstance from '../Handlers/axiosHandler'
import { setRegistrationErr, setToken, setUser } from '../Reducers/userReducer'


export const registration = (username, password) => {

  return async (dispatch) => {
    const axiosInstance = createAxiosInstance(null)
    try {
      const response = await axiosInstance.post('/auth/register', {
        username,
        password,
      })
      console.log(`{User ${response.data.user.username} created}`)
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(setRegistrationErr(error.response.data.message ))
        console.log(error.response.data.message)
        return error.response.data.message
      } else {
        console.log(`Error in: ${error.message}`)
      }
    }
  }
}

export const auth = (token) => {
  return async (dispatch) => {
    const axiosInstance = createAxiosInstance(token)
    const response = await axiosInstance.get('/auth/is-auth')
    dispatch(setUser(response.data))
  }
}


export const login = (username, password) => {
  // save user data in state
  return async (dispatch) => {
    try {
      const axiosInstance = createAxiosInstance(null)
      const response = await axiosInstance.post(`/auth/login`, {
        username,
        password,
      })
      console.log(`{User ${response.data.user.username} logged in}`)
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))
    } catch (error) {
      console.log(`Error in: ${error}`)
    }
  }
}



