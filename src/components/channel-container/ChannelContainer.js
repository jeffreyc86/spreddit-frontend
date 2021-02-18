import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ChannelDetails from "./ChannelDetails"
import Search from "./Search"
import PostCard from "../PostCard"

function ChannelContainer({currentUser}){

    const {id} = useParams()
    const API = "https://spreddit-app.herokuapp.com/"

    const [channel, setChannel] = useState(null)
    const [search, setSearch] = useState("")
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        fetch(`${API}channels/${id}`)
            .then(res=>res.json())
            .then(channelObj => {
                setChannel(channelObj)
                setPosts(channelObj.posts)
            })
    },[id])


    function addLikeToPost(postId, likeObj) {
        const newArray = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post, 
                    likes: [...post.likes, likeObj]
                }
            } else {
                return post
            }
        })
        setPosts(newArray)
    }

    function deleteLikeFromPost(postId, likeId){
        const newArray = posts.map(post => {
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
        setPosts(newArray)
    }

    function deletePostFromArray(postId) {
        const newArray = posts.filter(post => {return post.id !== postId})
        setPosts(newArray)
    }

    function editPost(updatedPost) {
        const newArray = posts.map(post=> {
            if (post.id === updatedPost.id) {
                return updatedPost
            } else {
                return post
            }
        })
        setPosts(newArray)
    }

    const filteredPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(search.toLowerCase())
    })
    .map(post => {
        return <PostCard editPost={editPost} key={post.id} post={post} currentUser={currentUser} addLikeToPost={addLikeToPost} deleteLikeFromPost={deleteLikeFromPost} deletePostFromArray={deletePostFromArray}/>
    })


    return(
        <div className="channel-container">
            {channel ?
            <>
                <ChannelDetails channel={channel}/>
                <Search search={search} setSearch={setSearch} />
            </>
            : <h1>Loading...</h1>}
            {filteredPosts.length > 0 ? filteredPosts : <h1 style={{textAlign: "center"}}>Sorry...no posts to this channel yet</h1>}
        </div>
    )
}

export default ChannelContainer;