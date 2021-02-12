import React from 'react'

function ChannelDetails({channel}) {

    return (
        <div className="channel-details">
            <div className="channel-banner">
                <div className="channel-info">
                    <img className="channel-banner-img" src={process.env.PUBLIC_URL + channel.image_url} alt={channel.name} />
                    <h1>{channel.name}</h1>
                </div>
                <p>{channel.description}</p>
            </div>


        </div>
    )
}

export default ChannelDetails;