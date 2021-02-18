import React, {useState} from 'react'

function CommentCard({comment, currentUser, updateComment, removeComment}){

    const [showForm, setShowForm] = useState(false)

    const API = "https://spreddit-app.herokuapp.com/"
    
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
                <form className="comment-form" onSubmit={handleSubmit}> 
                    <label htmlFor="new-comment">Update Your Comment</label>
                    <br/>
                    <textarea className="comment-area" type="text" name="comment" value={newComment} onChange={(e)=>setNewComment(e.target.value)} placeholder={comment.comment} required/>
                    <div className="comment-form-bottom">
                        <label htmlFor="anonymous">Post Anonymously?</label>
                        <input type="checkbox" name="anonymous" value={anonymous} onChange={(e)=>setAnonymous(e.target.checked)} />
                        <button type="submit">Update</button>
                    </div>
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
            <div className="cc-border">
            <p className="cc-author">Posted by {comment.anonymous ? "Anonymous" : comment.author}</p>
            <p className="cc-comment">{comment.comment}</p>
            {comment.user_id === currentUser.id ? 
                <div className="cc-buttons">
                    {showForm ? <UpdateCommentForm />: null}
                    <button onClick={()=>setShowForm(state=>!state)}>{showForm ? "Nevermind" : "Update Comment"}</button> 
                    <button onClick={handleDelete}>Delete Comment</button> 
                </div> : null}
            </div>
        </div>
    )
}

export default CommentCard