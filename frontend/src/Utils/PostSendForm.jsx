import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-tailwind/react'
import { createImages, createPost } from '../Actions/posts'

const PostSendForm = () => {
	const token = useSelector((state) => state.user.token)

	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [selectedImages, setSelectedImages] = useState([])
	const [alert, setAlert] = useState({ show: false, message: '', type: '' })

	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}

	const handleTextChange = (e) => {
		setText(e.target.value)
	}

	const handleImagesChange = (e) => {
		setSelectedImages([...e.target.files])
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (title.trim() === '' || text.trim() === '') {
			setAlert({
				show: true,
				message: 'Title and text are required.',
				type: 'red',
			})
			return
		}

		try {
			const postResponse = await createPost(token, title, text)

			if (postResponse.status === 201) {
				const postId = postResponse.data.id
				const formData = new FormData()
				selectedImages.forEach((file, index) => {
					formData.append('images', selectedImages[index])
				})
				console.log(formData)
				const imagesResponse = await createImages(
					token,
					postId,
					formData
				)

				if (imagesResponse.status === 201) {
					setAlert({
						show: true,
						message: 'Your post was successfully sent.',
						type: 'green',
					})
				} else {
					setAlert({
						show: true,
						message: 'Failed to upload images.',
						type: 'red',
					})
				}
			} else {
				setAlert({
					show: true,
					message: 'Failed to create post.',
					type: 'red',
				})
			}
		} catch (error) {
			console.error('Error in handleSubmit:', error)
			setAlert({
				show: true,
				message: 'An error occurred. Please try again.',
				type: 'red',
			})
		}

		setTitle('')
		setText('')
		setSelectedImages([])
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{/* Title Input */}
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-green-600 text-sm font-bold mb-2'
					>
						Title
					</label>
					<input
						type='text'
						id='title'
						name='title'
						value={title}
						onChange={handleTitleChange}
						placeholder='Enter title'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>

				{/* Text Input */}
				<div className='mb-4'>
					<label
						htmlFor='text'
						className='block text-green-600 text-sm font-bold mb-2'
					>
						Text
					</label>
					<textarea
						id='text'
						name='text'
						rows='4'
						value={text}
						onChange={handleTextChange}
						placeholder='Enter text'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>

				{/* Image Upload */}
				<div className='mb-4'>
					<label
						htmlFor='images'
						className='block text-green-600 text-sm font-bold mb-2'
					>
						Select Images
					</label>
					<input
						type='file'
						id='images'
						name='images'
						multiple
						onChange={handleImagesChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>

				{/* Alerts */}
				{alert.show && (
					<Alert color={alert.type} className='ease-linear my-4'>
						{alert.message}
					</Alert>
				)}

				{/* Submit Button */}
				<div className='flex items-center justify-between'>
					<button
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default PostSendForm
