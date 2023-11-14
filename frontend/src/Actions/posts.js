import createAxiosInstance from '../Handlers/axiosHandler'

// async thunk

export const getAllPosts = async(token, limit, page) => {
    const axiosInstance = createAxiosInstance(token)
    try {
        const response = await axiosInstance.get(`/post?limit=${limit}&page=${page}`)
        return response.data
        
    } catch (error) {
        console.log(error.message)
    }
}

export const getOnePost = async(token, postId) => {
    const axiosInstance = createAxiosInstance(token)
    try {
        const response = await axiosInstance.get(`/post/${postId}`)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = async (token, title, body) => {
    const axiosInstance = createAxiosInstance(token)
	try {
		const response = await axiosInstance.post(`/post`, {title, body})
		return response
	} catch (error) {
		console.log(error.message)
	}
}


export const createImages = async (token, postId, formData) => {
    const axiosInstance = createAxiosInstance(token)
	try {
		const response = await axiosInstance.post(`/post/${postId}/image`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
          })
        console.log(response);
		return response
	} catch (error) {
		console.log(error.message)
	}
}

export const updatePost = async (token, postId, title, body) => {
    const axiosInstance = createAxiosInstance(token)
    try {
        await axiosInstance.patch(`/post/${postId}`, {title, body})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = async (token, postId) => {
    const axiosInstance = createAxiosInstance(token)
    try {
        await axiosInstance.delete(`/post/${postId}`)
    } catch (error) {
        console.log(error.message)
    }
}
