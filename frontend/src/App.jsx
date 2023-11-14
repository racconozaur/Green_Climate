import './App.css'
import React, { useEffect } from 'react'
import './index.css'
import CardsList from './Components/Card/CardsList'
import Login from './Components/Auth/LogIn'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Registration from './Components/Auth/Registration'
import Information from './Components/Information/Information'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './Actions/user'
import User from './Components/User/User'
import CardInfo from './Components/Card/CardInfo'

function App() {
	const isAuth = useSelector((state) => state.user.isAuth)
	const token = useSelector((state) => state.user.token)
	const dispatch = useDispatch()
	const nav = useNavigate()

	useEffect(() => {
		if (token) {
			dispatch(auth(token))
		} else {
			// nav('/login')
		}
	}, [dispatch, nav, token])

	return (
		<Routes>
			{!isAuth ? (
				<Route path='/' element={<Layout />}>
					<Route index element={<Information />} />
					<Route path='login' element={<Login />} />
					<Route path='registration' element={<Registration />} />
				</Route>
			) : (
				<Route path='/' element={<Layout />}>
					<Route index element={<CardsList />} />
					<Route path='info' element={<Information />} />
					<Route path='user' element={<User />} />
					<Route path='post/:id' element={<CardInfo />} />
					<Route path='registration' element={<Registration />} />
				</Route>
			)}
		</Routes>
	)
}

export default App
