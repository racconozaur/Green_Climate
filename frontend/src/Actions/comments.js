import createAxiosInstance from '../Handlers/axiosHandler'


export const getAllComments = async(token, postId) => {
    const axiosInstance = createAxiosInstance(token)
    try {
        const response = await axiosInstance.get(`/post/${postId}/comment`)
        return response.data
        
    } catch (error) {
        console.log(error.message)
    }
}

export const createComment = async (token, postId, comment) => {
    const axiosInstance = createAxiosInstance(token)
	try {
		const response = await axiosInstance.post(`/post/${postId}/comment`, {comment})
		return response.data
	} catch (error) {
		console.log(error.message)
	}
}

export const deleteComment = async (token, postId, commentId) => {
    const axiosInstance = createAxiosInstance(token)
	try {
		await axiosInstance.delete(`/post/${postId}/comment/${commentId}`)
	} catch (error) {
		console.log(error.message)
	}
}
