import React from 'react'
import CommentCard from './CommentCard'

function CommentList ({currentUser, updateComment, removeComment, comments}) {

    const commentCards = comments.map(comment => {
        return <CommentCard key={comment.id} currentUser={currentUser} updateComment={updateComment} removeComment={removeComment} comment={comment} />
    })

    return ( 
        <div className="comment-list">
            <div className="cl-banner">
                <img className="comment-logo" src={process.env.PUBLIC_URL + "/images/comments.jpg"} alt="comments" />
                <h2>Comments</h2>
            </div>
            {comments.length > 0 ? commentCards : <p>No comments yet. Be the first to share what you think!</p>}
        </div>

    )
}


export default CommentList;