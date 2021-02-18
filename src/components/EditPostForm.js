import React, {useState} from 'react'

function EditPostForm({post, setShowForm, editPost}){

    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [channel_id, setChannelId] = useState("")
    const [anonymous, setAnonymous] = useState(post.anonymous)
    
    const API = "http://localhost:3001/"


    function handleSubmit(e){
        e.preventDefault()

        let updatedTitle
        let updatedContent
        let updatedChannelId

        if (title.length === 0) {
            updatedTitle = post.title
        } else {
            updatedTitle = title
        }

        if (content.length === 0) {
            updatedContent = post.content
        } else {
            updatedContent = content
        }

        if (channel_id.length === 0) {
            updatedChannelId = post.channel_id
        } else {
            updatedChannelId = parseInt(channel_id)
        }

        const form = new FormData()
            form.append("title", updatedTitle)
            form.append("content", updatedContent)
            form.append("channel_id", updatedChannelId)
            form.append("anonymous", anonymous)

        if (image) {
            form.append("image", image)
        } 

        fetch(`${API}posts/${post.id}`, {
            method: "PATCH",
            body: form
        })
            .then(res=>res.json())
            .then(updatedPost=>{
                editPost(updatedPost)
            })

        setShowForm(false)
    }



    return(
        <div className="edit-post">
            <form className="post-form" onSubmit={handleSubmit}>
                <div className="pf-input">
                    <label htmlFor="channel">Channel</label>
                    <select value={channel_id} onChange={(e)=>setChannelId(e.target.value)}>
                        <option value="" disabled defaultValue>Select a Channel</option>
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
                    <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder={post.title}/>
                </div>
                <br/>
                <div className="pf-input">
                    <label htmlFor="content">Content</label>
                    <br/>
                    <textarea type="text" name="content" rows="5" value={content} onChange={(e)=>setContent(e.target.value)} placeholder={post.content}/>
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
                <button type="submit">Edit Post</button>
            </form>
        </div>        
    )

}

export default EditPostForm;