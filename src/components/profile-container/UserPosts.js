import React from 'react'
import {useHistory} from 'react-router-dom'
import PostCard from "../PostCard"

function UserPosts({userPosts, editPost, currentUser, addLikeToPost, deleteLikeFromPost, deletePostFromArray}){

    const history = useHistory()

    const postsArr = userPosts.map((post) => {
        const newLikes = post.likes.filter(like => {return like.created_today}).length
        const newComments = post.comments.filter(comment => {return comment.created_today}).length

        return (
            <div key={post.id} className="users-post-card">
                <div className="up-stats">
                    <p>{newLikes} New {newLikes === 1 ? "Like" : "Likes"} & {newComments} New {newComments === 1 ? "Comment" : "Comments"} in the past day</p>
                    <br/>
                </div>
                <PostCard key={post.id} post={post} editPost={editPost} currentUser={currentUser} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost} deletePostFromArray={deletePostFromArray}/>
            </div>
            )
    })

    function createPost(){
        history.push("/newpost")
    }

    return(
        <div className="user-posts">
            <div className="up-banner">
                <div style={{display: "flex"}}>
                    <h2>Your Posts</h2>
                    <img src={process.env.PUBLIC_URL + "/images/userpost.jpg"} alt="trending" />
                </div>
                <button onClick={createPost}>Create New Post</button>
            </div>
            {postsArr.length > 0 ? postsArr : 
                <div className="no-user-posts">
                    <h3>hmm...you haven't posted anything yet.</h3>
                </div>}
        </div>
    )
}

export default UserPosts;