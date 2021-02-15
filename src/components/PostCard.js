import React, {useState} from 'react'

function PostCard({post, currentUser, addLikeToPost, deleteLikeFromPost}){

    const API = "http://localhost:3001/"

    const [liked, setLiked] = useState(false)

    // dont understand why it can't get currentUser.id
    // if (post.likes.filter(like => like.user_id === currentUser.id).length > 0){
    //     setLiked(true)
    // } else {
    //     setLiked(false)
    // }

    

    function handleLike(){
        console.log("clicked")
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
                    addLikeToPost(post.id, likeObj)
                })
        } else {
            const currentUsersLikeId = post.likes.find(like => like.user_id === currentUser.id).id
            fetch(`${API}likes/${currentUsersLikeId}`, {
                method: 'DELETE'
            })
            deleteLikeFromPost(post.id, currentUsersLikeId)
        }
    }


    return (
        <div className="post-card">
            <p className="post-author">Posted by {post.anonymous ? "Anonymous" : post.author}</p>
            <h2 className="post-title">{post.title}</h2>
            {post.content.length > 0 ? <p className="post-content">{post.content}</p> : null}
            {post.image_url.length > 0 ? <img className="post-image" src={post.image_url} alt={post.title} /> : null}
            <div className="bottom-post-card">
                <span onClick={handleLike} className="post-likes-count">{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"} 
                    {liked ? <span style={{color: "#0079D3", fontWeight: "800"}}> ⇧</span> : <span> ⇧</span> }
                </span>
                <span className="post-comments-count">{post.comments.length} {post.comments.length === 1 ? "Comment" : "Comments"}</span>
            </div>
        </div>
    )
}


export default PostCard;