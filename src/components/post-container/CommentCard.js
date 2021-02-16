import React, {useState} from 'react'

function CommentCard({comment, currentUser, updateComment, removeComment}){

    const [showForm, setShowForm] = useState(false)

    const API = "http://localhost:3001/"
    
    function UpdateCommentForm() {
        const [newComment, setNewComment] = useState("")
        const [anonymous, setAnonymous] = useState(comment.anonymous)
        
        function handleSubmit(e) {
            e.preventDefault()

            fetch(`${API}comments/${comment.id}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"comment": newComment, anonymous})
            })
                .then(res=>res.json())
                .then(updatedCom => {
                    updateComment(updatedCom)
                })
            setShowForm(false)
        }

        return(
            <div className="update-comment-form">
                <form onSubmit={handleSubmit}> 
                    <label htmlFor="new-comment">Comment</label>
                    <input type="textarea" name="comment" value={newComment} onChange={(e)=>setNewComment(e.target.value)} placeholder={comment.comment} required/>
                    <label htmlFor="anonymous">Post Anonymously?</label>
                    <input type="checkbox" name="anonymous" value={anonymous} onChange={(e)=>setAnonymous(e.target.checked)} />
                    <button type="submit">Update Comment</button>
                </form>
            </div>
        )
    }

    function handleDelete(){
        
        fetch(`${API}comments/${comment.id}`, {
            method: "DELETE"
        })
        removeComment(comment.id)
    }

    return (
        <div className="comment-card">
            <p>Posted by {comment.anonymous ? "Anonymous" : comment.author}</p>
            <p>{comment.comment}</p>
            {comment.user_id === currentUser.id ? 
                <div>
                    <button onClick={()=>setShowForm(state=>!state)}>{showForm ? "Nevermind" : "Update Comment"}</button> 
                    {showForm ? <UpdateCommentForm />: null}
                    <button onClick={handleDelete}>Delete Comment</button> 
                </div> : null}
        </div>
    )
}

export default CommentCard