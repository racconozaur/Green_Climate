import React from 'react'
import { useSelector } from 'react-redux'
import PostSendForm from '../../Utils/PostSendForm'

const User = () => {
	const userInfo = useSelector((state) => state.user.user)


	return (
		<div className=' max-w-xl flex flex-col mx-auto'>
			<div className='bg-white rounded-lg shadow-md p-6'>
				<h1 className='mt-4 text-xl font-semibold text-green-700 pb-4'>
					{userInfo.username}
				</h1>
				<p className=''>
					<strong>Joined:</strong> {new Date(userInfo.created_at).toLocaleDateString()}
				</p>
				<p>
					<strong>Role:</strong> {userInfo.is_admin ? "Admin" : "User"}
				</p>
			</div>
			<div  className='bg-white rounded-lg shadow-md p-6 my-4'>
				<h2 className=' font-semibold text-green-700 mb-4'>Create Post</h2>
				<PostSendForm/>
			</div>
		</div>
	)
}

export default User
