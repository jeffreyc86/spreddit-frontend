import React, {useEffect, useState} from 'react'
import UserPosts from "./UserPosts"
import TrendingPosts from "./TrendingPosts"
import UpdateUserForm from "./UpdateUserForm"


function ProfileContainer({currentUser, setCurrentUser}) {

    const [trendingPosts, setTrendingPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [showHidden, setShowHidden] = useState(false)
    
    const API = "https://spreddit-app.herokuapp.com/"

    useEffect(() => {
        fetch(`${API}posts/`)
        .then(res => res.json())
        .then(postsObjs => {
            setTrendingPosts([...postsObjs].splice(-3).reverse())
            const currentUsersPosts = postsObjs.filter(post=>{return post.user_id === currentUser.id}).reverse()
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


    function editPost(updatedPost){
        const newTrendingPostsArray = trendingPosts.map(post=> {
            if (post.id === updatedPost.id) {
                return updatedPost
            } else {
                return post
            }
        })
        setTrendingPosts(newTrendingPostsArray)

        const newUserPostArray = userPosts.map(post=> {
            if (post.id === updatedPost.id) {
                return updatedPost
            } else {
                return post
            }
        })
        setUserPosts(newUserPostArray)
    }

    return (
      <div className="profile-container">
        <div className="pc-banner">
          <div className="pc-banner-welcome">
            <img
              src={process.env.PUBLIC_URL + "/images/welcome.gif"}
              alt="welcome"
            />
            <h1>Welcome, {currentUser.username}!</h1>
          </div>
          <div className="settings">
            <img
              onClick={() => {
                setShowHidden((showHidden) => !showHidden);
              }}
              style={{ cursor: "pointer" }}
              src={process.env.PUBLIC_URL + "/images/settings.jpg"}
              alt="settings"
            />
          </div>
        </div>
        {showHidden ? (
          <UpdateUserForm
            currentUser={currentUser}
            setShowHidden={setShowHidden}
            setCurrentUser={setCurrentUser}
          />
        ) : null}
        <TrendingPosts
          trendingPosts={trendingPosts}
          currentUser={currentUser}
          addLikeToPost={addLikeToPost}
          deleteLikeFromPost={deleteLikeFromPost}
          deletePostFromArray={deletePostFromArray}
          editPost={editPost}
        />
        <UserPosts
          userPosts={userPosts}
          currentUser={currentUser}
          addLikeToPost={addLikeToPost}
          deleteLikeFromPost={deleteLikeFromPost}
          deletePostFromArray={deletePostFromArray}
          editPost={editPost}
        />
      </div>
    );
}

export default ProfileContainer;