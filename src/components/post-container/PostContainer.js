import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PostDetail from "./PostDetails"
import CommentList from "./CommentList"
import CommentForm from "./CommentForm"

function PostContainer({currentUser}){

    const {id} = useParams()
    const API = "http://localhost:3001/"

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(()=>{
        fetch(`${API}posts/${id}`)
            .then(res=>res.json())
            .then(postObj=>{
                setPost(postObj)
                setComments(postObj.comments)
            })
    }, [id])

    function addLikeToPost(likeObj){
        const newPost = {
            ...post,
            likes: [...post.likes, likeObj]
        }
        setPost(newPost)
    } 
    
    function deleteLikeFromPost(likeId) {
        const newPost = {
            ...post,
            likes: (post.likes.filter(like => {return like.id !== likeId}))
        }
        setPost(newPost)
    }

    
    return(
        <div className="post-container">
            {post ?
            <>
                <PostDetail currentUser={currentUser} post={post} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost}/>
                <CommentForm currentUser={currentUser}/>
                <CommentList />
            </>
            : <h1>Loading...</h1>}
        </div>
    )
}

export default PostContainer;