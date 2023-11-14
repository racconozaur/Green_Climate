const SET_USER = 'SET_USER'
const SET_TOKEN = 'SET_TOKEN'
const LOGOUT = 'LOGOUT'
const REGISTRATION_ERROR = 'REGISTRATION_ERROR'

const defaultState = {
	user: {},
	token: null,
	isAuth: false,
	registrationError: null,
}

export default function userReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload,
				isAuth: true,
				registrationError: null,
			}

		case REGISTRATION_ERROR:
			return {
				...state,
				registrationError: action.payload,
			}

		case SET_TOKEN:
			return {
				...state,
				token: action.payload,
			}

		case LOGOUT:
			return {
				...state,
				user: {},
				token: null,
				isAuth: false,
				registrationError: null,
			}

		default:
			return state
	}
}

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRegistrationErr = (err) => ({type: REGISTRATION_ERROR, payload: err})
export const setToken = (token) => ({ type: SET_TOKEN, payload: token })
export const logout = () => ({ type: LOGOUT })
