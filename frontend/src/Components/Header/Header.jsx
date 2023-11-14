import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../Reducers/userReducer'

const Header = () => {
	const isAuth = useSelector((state) => state.user.isAuth)
	const data = useSelector((state) => state.user.user)
	const dispatch = useDispatch()
	const navigateTo = useNavigate()

	const exitHandler = () => {
		dispatch(logout())
		navigateTo('/login')
	}

	return (
		<header className='bg-green-400 text-white'>
			<div className='container mx-auto flex justify-between p-5'>
				<Link className='font-bold text-lg' to={'/'}>
					Green Climate
				</Link>
				<nav className='flex space-x-4 font-semibold'>
					{isAuth ? (
						<>
							<Link className='hover:underline' to={'/Info'}>
								Info
							</Link>
							<Link className='hover:underline' to={'/user'}>
								{data.username}
							</Link>
							<div
								className='hover:underline hover:cursor-pointer text-red-500'
								onClick={exitHandler}
							>
								Exit
							</div>
						</>
					) : (
						<>
							<Link className='hover:underline' to={'/login'}>
								Log-In
							</Link>
							<Link
								className='hover:underline'
								to={'/registration'}
							>
								Registration
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}

export default Header
