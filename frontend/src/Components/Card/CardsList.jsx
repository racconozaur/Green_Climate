import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getAllPosts } from '../../Actions/posts'
import { useSelector } from 'react-redux'
import { Button } from '@material-tailwind/react'

const CardsList = () => {
	const postsPerPage = 10
	const [postsData, setPostsData] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)

	const token = useSelector((state) => state.user.token)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getAllPosts(token, postsPerPage, currentPage)
				const totalPagesCalc = Math.max(
					Math.ceil(res.count / postsPerPage),
					1
				)

				setPostsData(res.items)
				setTotalPages(totalPagesCalc)
			} catch (error) {
				console.error('Failed to fetch posts:', error)
			}
		}
		fetchData()
	}, [currentPage, token])

	const renderPosts = () => {
		return postsData.map((post) => (
			<Card
				key={post.id}
				id={post.id}
				title={post.title}
				image={post.images[0]?.name}
				description={post.body}
				user={post.user}
			/>
		))
	}

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage)
	}

	const renderPaginationButtons = () => {
		const pageNumbers = []

		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i)
		}

		return pageNumbers.map((page) => (
			<Button
				key={page}
				disabled={currentPage === page}
				variant='outlined'
				className='mx-2'
				onClick={() => handlePageChange(page)}
			>
				{page}
			</Button>
		))
	}

	return (
		<div className=' '>
			<div className='p-1'>{renderPosts()}</div>

			{totalPages === 1 ? null :<div className='container flex justify-center items-center m-8'>
				Page: {renderPaginationButtons()}
			</div>}
		</div>
	)
}

export default CardsList
