import React from 'react'
import CommentCard from './CommentCard'

function CommentList ({currentUser, updateComment, removeComment, comments}) {

    const commentCards = comments.map(comment => {
        return <CommentCard key={comment.id} currentUser={currentUser} updateComment={updateComment} removeComment={removeComment} comment={comment} />
    })

    return ( 
        <div className="comment-list">
            <h1>comment list</h1>
            {commentCards}
        </div>

    )
}


export default CommentList;