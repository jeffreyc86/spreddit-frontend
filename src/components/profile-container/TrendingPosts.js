import React from 'react'
import PostCard from "../PostCard"

function TrendingPosts ({trendingPosts, currentUser, addLikeToPost, deleteLikeFromPost, deletePostFromArray}){

    const postsArr = trendingPosts.map((post) => {
            return <PostCard key={post.id} post={post} currentUser={currentUser} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost} deletePostFromArray={deletePostFromArray}/>
    })


    return(
        <div className="trending-posts">
            <h3>Trending Posts</h3>
            {postsArr}
        </div>
    )
}

export default TrendingPosts