import React from 'react'

function PostCard({post}){



    return (
        <div className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <h6>{post.anonymous ? "Anonymous" : post.author}</h6>
            <p className="post-content">{post.content}</p>
            <img className="post-image" src={post.image_url} alt={post.title} />
            <p className="post-likes-count">Likes: {post.likes.length}</p>
            <p className="post-comments-count">{post.comments.length} Comments</p>
        </div>
    )
}


export default PostCard;