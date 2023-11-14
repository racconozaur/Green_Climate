import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, getOnePost, updatePost } from '../../Actions/posts'
import { useSelector } from 'react-redux'
import CommentsList from './Comments/CommentsList'
import { Carousel, Button, Input, Textarea } from '@material-tailwind/react'

const CardInfo = () => {
	const token = useSelector((state) => state.user.token)
	const userInfo = useSelector((state) => state.user.user)

	const [postData, setPostData] = useState({})
	const [postImages, setPostImages] = useState([])
	const [postUser, setPostUser] = useState([])

	const [newTitle, setNewTitle] = useState('')
	const [newBody, setNewBody] = useState('')

	const [edit, setEdit] = useState(false)

	const params = useParams()
	const nav = useNavigate()
	const fetchPostData = useCallback(async () => {
		try {
			const res = await getOnePost(token, params.id)

			setPostData(res)
			setPostImages(res.images)
			setPostUser(res.user)
		} catch (error) {
			console.error('Failed to fetch posts:', error)
		}
	}, [params.id, token])

	useEffect(() => {
		fetchPostData()
	}, [fetchPostData, params.id, token])

	const displayPostImages = () => {
		return postImages.map((image) => (
			<div key={image.id} className='flex justify-center'>
				<img
					className=' w-96 object-contain'
					src={image.name}
					alt={`img from ${image.postId}`}
				/>
			</div>
		))
	}

	const editHandler = () => {
		setEdit(!edit)
	}
	const cancelEditHandler = () => {
		setEdit(false)
	}

	const saveHandler = async () => {
		if (newTitle.trim() === '' || newBody.trim() === '') {
			alert('form is invalid ')
			return
		}
		await updatePost(token, postData.id, newTitle, newBody)
		fetchPostData()
		setEdit(!edit)
	}

	const deleteHandler = async () => {
		await deletePost(token, postData.id)
		nav('/')
	}

	return (
		<>
			<div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4'>
				<div className=' p-8'>
					<div className='text-sm text-gray-500'>
						Created by {postUser.username} on{' '}
						{new Date(postData.created_at).toLocaleDateString()}
					</div>

					<Carousel className='rounded-xl bg-green-100 flex items-center'>
						{displayPostImages()}
					</Carousel>

					<div className='mt-8'>
						<h2 className='uppercase tracking-wide text-sm text-green-500 font-semibold mb-4'>
							{postData.title}
						</h2>
						{edit ? (
							<div className='mt-4'>
								<Input
									label='Your new title'
									value={newTitle}
									onChange={(e) =>
										setNewTitle(e.target.value)
									}
									type='text'
									required
								/>
							</div>
						) : null}

						<p className='mt-2 text-gray-500'>{postData.body}</p>
						{edit ? (
							<div className='mt-4'>
								<Textarea
									label='Your new text'
									value={newBody}
									onChange={(e) => setNewBody(e.target.value)}
									type='text'
									required
								/>
							</div>
						) : null}
						<div className='flex items-center mt-4'></div>
					</div>

					{userInfo.id === postData.user_id && (
						<>
							{edit === true ? (
								<div className='flex justify-between'>
									<div>
										<Button
											color='green'
											onClick={saveHandler}
										>
											Save
										</Button>
										<Button
											className='ml-2'
											color='blue'
											onClick={cancelEditHandler}
										>
											Cancel
										</Button>
									</div>

									<Button color='red' onClick={deleteHandler}>
										Delete
									</Button>
								</div>
							) : (
								<Button color='amber' onClick={editHandler}>
									Edit
								</Button>
							)}
						</>
					)}
					{userInfo.is_admin && (
						<div className='my-4'>
							<Button color='red' onClick={deleteHandler}>
								Delete
							</Button>
						</div>
					)}
				</div>
			</div>

			<div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4 p-8'>
				<CommentsList
					tokenu={token}
					postId={postData.id}
					userId={postData.user_id}
				/>
			</div>
		</>
	)
}

export default CardInfo
