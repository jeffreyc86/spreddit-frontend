import React, {useEffect, useState} from 'react'
import UserPosts from "./UserPosts"
import TrendingPosts from "./TrendingPosts"
import UpdateUserForm from "./UpdateUserForm"


function ProfileContainer({currentUser, setCurrentUser}) {

    const [trendingPosts, setTrendingPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [showHidden, setShowHidden] = useState(false)
    
    const API = "http://localhost:3001/"

    useEffect(() => {
        fetch(`${API}posts/`)
        .then(res => res.json())
        .then(postsObjs => {
            setTrendingPosts([...postsObjs].splice(-3))
            const currentUsersPosts = postsObjs.filter(post=>{return post.user_id === currentUser.id})
            setUserPosts(currentUsersPosts)
        })
    },[currentUser.id])

    function addLikeToPost(postId, likeObj) {
        const newTrendingPostsArray = trendingPosts.map(post => {
            if (post.id === postId) {
                return {
                    ...post, 
                    likes: [...post.likes, likeObj]
                }
            } else {
                return post
            }
        })
        setTrendingPosts(newTrendingPostsArray)

        const newUserPostsArray = userPosts.map(post => {
            if (post.id === postId) {
                return {
                    ...post, 
                    likes: [...post.likes, likeObj]
                }
            } else {
                return post
            }
        })
        setUserPosts(newUserPostsArray)
    }

    function deleteLikeFromPost(postId, likeId){
        const newTrendingPostsArray = trendingPosts.map(post => {
            if (post.id === postId){
                const likes = post.likes.filter(like => {return like.id !== likeId})
                return {
                    ...post, 
                    likes: likes
                }
            } else {
                return post
            }
        })
        setTrendingPosts(newTrendingPostsArray)

        const newUserPostsArray = userPosts.map(post => {
            if (post.id === postId){
                const likes = post.likes.filter(like => {return like.id !== likeId})
                return {
                    ...post, 
                    likes: likes
                }
            } else {
                return post
            }
        })
        setUserPosts(newUserPostsArray)
    }

    function deletePostFromArray(postId) {
        const newTrendingPostsArray = trendingPosts.filter(post => {return post.id !== postId})
        setTrendingPosts(newTrendingPostsArray)

        const newUserPostsArray = userPosts.filter(post => {return post.id !== postId})
        setUserPosts(newUserPostsArray)
    }

    return (
        <div className="profile-container">
            <div className="pc-banner">
                <div style={{display: "flex"}}>
                    <img src={process.env.PUBLIC_URL + "/images/welcome.gif"} alt="welcome" />
                    <h1>Welcome, {currentUser.username}!</h1>
                </div>
                <div className="settings">
                    <img onClick={()=>{setShowHidden(showHidden=>!showHidden)}}src={process.env.PUBLIC_URL + "/images/settings.jpg"} alt="settings" />
                </div>
            </div>
            {showHidden ? <UpdateUserForm currentUser={currentUser} setShowHidden={setShowHidden} setCurrentUser={setCurrentUser}/> : null }
            <TrendingPosts trendingPosts={trendingPosts} currentUser={currentUser} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost} deletePostFromArray={deletePostFromArray}/>
            <UserPosts userPosts={userPosts} currentUser={currentUser} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost} deletePostFromArray={deletePostFromArray}/>
        </div>
    )
}

export default ProfileContainer;