import React, { useState, useEffect, useCallback } from 'react'
import { createComment, getAllComments } from '../../../Actions/comments'
import { useSelector } from 'react-redux'
import { Textarea, Button } from '@material-tailwind/react'

import Comment from './Comment'
import { useParams } from 'react-router-dom'

const CommentsList = ({ tokenu, postId, useerId }) => {
	const isAuth = useSelector((state) => state.user.isAuth)
	const [commentsList, setCommentsList] = useState([])
	const [comment, setComment] = useState('')
    const params = useParams()
    

	const fetchComments = useCallback(async () => {
		try {
			const res = await getAllComments(tokenu, params.id)
			if (!res || !res.items) {
				console.error('Unexpected response format:', res)
				return
			}
			setCommentsList(res.items)
		} catch (error) {
			console.error('Failed to fetch comments:', error)
		}
	}, [tokenu, params.id])

	const sendCommentHandler = async () => {
		if (comment.trim() === '') {
			alert('Your comment is empty')
		} else {
			try {
				await createComment(tokenu, postId, comment)
				setComment('')
				fetchComments()
			} catch (error) {
				console.error('Failed to post comment:', error)
			}
		}
	}

	useEffect(() => {
		fetchComments()
	}, [fetchComments])

	const renderComments = () => {
		return commentsList.map((comment) => (
			<Comment
				key={comment.id}
				id={comment.id}
				comment={comment.comment}
				user={comment.user}
				createdDate={comment.created_at}
				postId={params.id}
				updateComments={fetchComments}
			/>
		))
	}

	return (
		<>
			{isAuth ? (
				<div className=''>
					<Textarea
						label='New Comment'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						required
					/>

					<div className='flex mt-2'>
						<Button
							onClick={sendCommentHandler}
							className='bg-green-200 hover:bg-green-300'
						>
							Send
						</Button>
					</div>
				</div>
			) : (
				<div>Not registered users are not allowed to post comments</div>
			)}

			<div className=''>{renderComments()}</div>
		</>
	)
}

export default CommentsList
