import React from 'react'
import PostCard from "../PostCard"

function TrendingPosts ({trendingPosts, currentUser, addLikeToPost, deleteLikeFromPost, deletePostFromArray}){

    const postsArr = trendingPosts.map((post) => {
            return <PostCard key={post.id} post={post} currentUser={currentUser} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost} deletePostFromArray={deletePostFromArray}/>
    })


    return(
        <div className="trending-posts">
            <div className="tp-banner">
                <h2>Trending Posts</h2>
                <img src={process.env.PUBLIC_URL + "/images/trending.jpg"} alt="trending" />
            </div>
            {postsArr}
        </div>
    )
}

export default TrendingPosts