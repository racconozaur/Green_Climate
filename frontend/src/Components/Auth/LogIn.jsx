import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../Actions/user'
import { useNavigate } from 'react-router-dom'
import { Alert, Button } from '@material-tailwind/react'

function LoginComponent() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showAlert, setShowAlert] = useState(false)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleLogin = (e) => {
		e.preventDefault()
		if (username.trim() === '' || password.trim() === '') {
			setShowAlert(true)
		} else {
			dispatch(login(username, password))
			navigate('/')
		}
	}

	return (
		<div className='min-h-screen flex justify-center '>
			<div className='bg-white p-8 rounded-lg shadow-md w-96 h-min mt-10'>
				<h1 className='text-2xl font-bold text-green-500 mb-4'>
					Login
				</h1>
				<form onSubmit={handleLogin}>
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

					<Button
						type='submit'
						className='w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded'
					>
						Login
					</Button>
				</form>
			</div>
		</div>
	)
}

export default LoginComponent
