import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function NewPostForm({currentUser}) {

    const API = "http://localhost:3001/"

    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [channel_id, setChannelId] = useState("")
    const [anonymous, setAnonymous] = useState(false)
    
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()

        const newPost = { 
            title,
            content,
            channel_id,
            user_id: currentUser.id,
            image: image,
            anonymous
        }

        fetch(`${API}posts`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost)
        })
            .then(res=>res.json())
            .then(newPostObj => {
                history.push(`/posts/${newPostObj.id}`)
            })
    }

    return (
        <div className="new-post">
            <form className="post-form" onSubmit={handleSubmit}>
                <label htmlFor="channel">Channel</label>
                <select value={channel_id} onChange={(e)=>setChannelId(parseInt(e.target.value))}>
                    <option value="" disabled selected>Select a Channel</option>
                    <option value="1">Quarantine Memes</option>
                    <option value="2">Pandemic 15++</option>
                    <option value="3">Covid ProTips</option>
                    <option value="4">Vent & De-Stress</option>
                    <option value="5">Expose Anti-Maskers</option>
                </select>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                <label htmlFor="content">Content</label>
                <input type="textarea" name="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
                <label htmlFor="image">Image</label>
                {/* // cant figure out why this isn't workkinggggg!!!!! // */}
                <input type="file" name="image" value={image} onChange={(e)=>{setImage(e.target.files[0])}} />
                <label htmlFor="anonymous">Post Anonymously?</label>
                <input type="checkbox" name="anonymous" value={anonymous} onChange={(e)=>setAnonymous(e.target.checked)} />
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
    
}

export default NewPostForm;