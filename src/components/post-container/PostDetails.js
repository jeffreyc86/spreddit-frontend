import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import EditPostForm from '../EditPostForm'

function PostDetails({post, currentUser, addLikeToPost, deleteLikeFromPost, comments, editPost}){

    const API = "http://localhost:3001/"

    const [liked, setLiked] = useState(true)
    const [showForm, setShowForm] = useState(false)

    const history = useHistory()

    useEffect(()=> {
        if (post.likes.filter(like => like.user_id === currentUser.id).length > 0){
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [post, currentUser.id])

    function handleLike(){
        setLiked(liked=>!liked)
        if (!liked) {
            fetch(`${API}likes`, {
                method: 'POST', 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: currentUser.id,
                    post_id: post.id
                })
            })
                .then(res=>res.json())
                .then(likeObj => {
                    addLikeToPost(likeObj)
                })
        } else {
            const currentUsersLikeId = post.likes.find(like => like.user_id === currentUser.id).id
            fetch(`${API}likes/${currentUsersLikeId}`, {
                method: 'DELETE'
            })
            deleteLikeFromPost(currentUsersLikeId)
        }
    }

    function deletePost(){
        fetch(`${API}posts/${post.id}`, {
            method: 'DELETE'
        })
        history.push("/profile")
    }

    return(
        <div className="post-details">
            <div className="pd-channel-info">
                <img src={process.env.PUBLIC_URL + post.channel_info.channel_img} alt={post.channel_info.channel_name}/>
                <h4>{post.channel_info.channel_name} ・ </h4>
                <p>Posted by {post.anonymous ? "Anonymous" : post.author}</p>
            </div>
            <div className="pd-info">
                <h2>{post.title}</h2>
                {post.content.length > 0 ? <p>{post.content}</p> : null}
                {post.image_url.length > 0 ? <img src={post.image_url} alt={post.title}/> : null}
            </div>
            <div className="bottom-post-card">
                <span onClick={handleLike} className="post-likes-count">{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"} 
                    {liked ? <span style={{color: "#0079D3", fontWeight: "800"}}> ⇧</span> : <span> ⇧</span> }
                </span>
                <span className="post-comments-count">{comments.length} {comments.length === 1 ? "Comment" : "Comments"}</span>

                {post.user_id === currentUser.id ? 
                // <button className="pc-delete-button" onClick={deletePost}>Delete Post</button> : null }
                <div className="pc-buttons">
                    <button className="pc-edit-button" 
                        onClick={()=>setShowForm(showForm=>!showForm)}>
                        {!showForm ? "Edit Post" : "Nevermind"}</button> 
                    <button className="pc-delete-button" 
                        onClick={deletePost}>Delete Post</button>
                </div> : null }
            </div>
            {!showForm ? null : <EditPostForm editPost={editPost} setShowForm={setShowForm} post={post}/>}
        </div>
    )
}

export default PostDetails;