import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PostDetails from "./PostDetails"
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

    function addComment(commentObj){
        const newArray = [...comments, commentObj]
        setComments(newArray)
    }

    function updateComment(updateComObj){
        const newArray = comments.map(comment => {
            if (comment.id === updateComObj.id) {
                return updateComObj
            } else {
                return comment
            }
        })
        setComments(newArray)
    }

    function removeComment(id){
        const newArray = comments.filter(comment=>{return comment.id !== id})
        setComments(newArray)
    }

    function editPost(updatedPost){
        setPost(updatedPost)
    }

 
    
    return(
        <div className="post-container">
            {post ?
            <>
                <PostDetails currentUser={currentUser} post={post} comments={comments} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost} editPost={editPost}/>
                {post ? <CommentForm currentUser={currentUser} post={post} addComment={addComment} /> : null}
                <CommentList comments={comments} updateComment={updateComment} removeComment={removeComment} currentUser={currentUser}/>
            </>
            : <h1>Loading...</h1>}
        </div>
    )
}

export default PostContainer;