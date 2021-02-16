import React, {useState} from 'react'

function CommentForm({currentUser, post, addComment}){

    const [comment, setComment] = useState("")
    const [anonymous, setAnonymous] = useState(false)

    const API = "http://localhost:3001/"

    function handleSubmit(e){
        e.preventDefault()

        const newComment = {
            user_id: currentUser.id,
            post_id: post.id,
            comment,
            anonymous
        }
        
        fetch(`${API}/comments`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newComment)
        })
            .then(res=>res.json())
            .then(commentObj=>{
                addComment(commentObj)
            })
        
        setComment("")
        setAnonymous(false)
    }

    return (
        <div>
            <form className="comment-form" onSubmit={handleSubmit}>
                <label htmlFor="new-comment">Leave a Comment</label>
                <br/>
                <textarea className="comment-area" type="text" name="comment" row="7" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="What are your thoughts?"required/>
                <div className="comment-form-bottom">
                    <label htmlFor="anonymous">Post Anonymously?</label>
                    <input type="checkbox" name="anonymous" value={anonymous} onChange={(e)=>setAnonymous(e.target.checked)} />
                    <button type="submit">Create Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm