import { Button } from '@material-tailwind/react';
import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ id, title, image, description, user }) => {

	return (
		<div className={' max-w-xl rounded overflow-hidden shadow-lg bg-white my-8 mx-auto ' + (user.is_admin ? ' shadow-green-glow' : '')}>
			<div className='p-4'>
				{image && (
					<img
						className='w-full'
						src={image}
						alt='Sunset in the mountains'
					/>
				)}
			</div>
			<div className='px-6 py-4'>
				<div className='font-bold text-xl mb-2 text-green-500'>
					{title}
				</div>
				<p className='text-gray-700 text-base'>{description}</p>

				<Button className='bg-green-500 hover:bg-green-700 text-white my-4'>
				<Link
					to={`/post/${id}`}
				>
					See more
				</Link>
			</Button>
			</div>
					
			
		</div>
	)
}

export default Card
