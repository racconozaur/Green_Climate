import React from 'react';
import { deleteComment } from '../../../Actions/comments';
import { useSelector } from 'react-redux';
import { Button } from "@material-tailwind/react";

const Comment = ({id, comment, user, createdDate, postId, updateComments}) => {

    const token = useSelector((state) => state.user.token)
    const userInfo = useSelector((state) => state.user.user)
	

    const deleteCommentHandler = async () => {
        await deleteComment(token, postId, id)
        updateComments()
    }


    return (
        <div className={('max-w-md my-4 p-4 bg-white border-2 rounded-xl overflow-hidden md:max-w-2xl flex justify-between items-center'+ (user.is_admin ? ' border-green-200' : ''))}>
            <div>
            <h2 className=' font-bold'>Author: {user.username}</h2>
            <p className='font-thin text-xs mb-2'>Posted on: {new Date(createdDate).toLocaleDateString()}</p>
            <p>{comment}</p>
            </div>

            {userInfo.id === user.id || userInfo.is_admin ?
                <Button color="red" onClick={deleteCommentHandler}>
                    Delete
                </Button> : null
            }

        </div>
    );
};

export default Comment;