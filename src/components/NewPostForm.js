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

        const userId = currentUser.id

        const form = new FormData()
            form.append("title", title)
            form.append("content", content)
            form.append("channel_id", parseInt(channel_id))
            form.append("user_id", userId)
            form.append("image", image)
            form.append("anonymous", anonymous)

        fetch(`${API}posts`, {
            method: 'POST',
            body: form
        })
            .then(res=>res.json())
            .then(newPostObj => {
                history.push(`/posts/${newPostObj.id}`)
            })
    }

    return (
        <div className="new-post">
            <img className="np-image" src={process.env.PUBLIC_URL + "/images/newpost.gif"} alt="show me what you got" />
            <form className="post-form" onSubmit={handleSubmit}>
                <div className="pf-input">
                    <label htmlFor="channel">Channel</label>
                    <select value={channel_id} onChange={(e)=>setChannelId(parseInt(e.target.value))}>
                        <option value="" disabled selected>Select a Channel</option>
                        <option value="1">Quarantine Memes</option>
                        <option value="2">Pandemic 15++</option>
                        <option value="3">Covid ProTips</option>
                        <option value="4">Vent & De-Stress</option>
                        <option value="5">Expose Anti-Maskers</option>
                    </select>
                </div>
                <br/>
                <div className="pf-input">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                </div>
                <br/>
                <div className="pf-input">
                    <label htmlFor="content">Content</label>
                    <br/>
                    <textarea type="text" name="content" rows="5" value={content} onChange={(e)=>setContent(e.target.value)}/>
                </div>
                <br/>
                <div className="pf-input">
                    <label htmlFor="image">Image</label>
                    <br/>
                    <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} accept="image/*" />
                </div>
                <br/>
                <div className="pf-input">
                    <label htmlFor="anonymous">Post Anonymously?</label>
                    <input type="checkbox" name="anonymous" value={anonymous} onChange={(e)=>setAnonymous(e.target.checked)} />
                </div>
                <br/>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
    
}

export default NewPostForm;