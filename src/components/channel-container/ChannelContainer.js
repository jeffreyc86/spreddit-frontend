import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ChannelDetails from "./ChannelDetails"
import Search from "./Search"

function ChannelContainer({currentUser}){

    const {id} = useParams()
    const API = "http://localhost:3001/"

    const [channel, setChannel] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(()=>{
        fetch(`${API}channels/${id}`)
            .then(res=>res.json())
            .then(channelObj => {
                setChannel(channelObj)
            })
    },[id])


    return(
        <div className="channel-container">
            {channel ?
            <>
                <ChannelDetails channel={channel}/>
                <Search search={search} setSearch={setSearch} />
            </>
            : <h1>Loading...</h1>}
           
        </div>
    )
}

export default ChannelContainer;