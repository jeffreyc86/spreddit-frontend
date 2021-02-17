import React from 'react'
import PostCard from "../PostCard"

function UserPosts({userPosts, currentUser, addLikeToPost, deleteLikeFromPost, deletePostFromArray}){

    const postsArr = userPosts.map((post) => {
        const newLikes = post.likes.filter(like => {return like.created_today}).length
        const newComments = post.comments.filter(comment => {return comment.created_today}).length

        return (
            <div className="users-post-card">
                <div className="up-stats">
                    <p>{newLikes} New {newLikes === 1 ? "Like" : "Likes"} in the past day</p>
                    <p>{newComments} New {newComments === 1 ? "Comment" : "Comments"} in the past day</p>
                </div>
                <PostCard key={post.id} post={post} currentUser={currentUser} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost} deletePostFromArray={deletePostFromArray}/>
            </div>
            )
    })

    return(
        <div className="user-posts">
            <h3>User Posts</h3>
            {postsArr}
        </div>
    )
}

export default UserPosts;