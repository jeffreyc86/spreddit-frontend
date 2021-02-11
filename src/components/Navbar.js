import React from 'react'
import {NavLink} from 'react-router-dom'



function Navbar ({channels}) {

    const channelLinks = channels.map(channel => {
        return(
            <NavLink
                to={`/channel/${channel.id}`}
                exact
            >
                <img className="dropdown-img" src={process.env.PUBLIC_URL + channel.image_url} alt={channel.name} />
                <div className="dropdown-channel">{channel.name}</div>
            </NavLink>
        )
    })

    console.log(channelLinks)

    
    return (
        <div className="navbar">
            <img className="navbar-logo" src={process.env.PUBLIC_URL + "/images/logo.jpg"} alt="spreddit" onClick={null}/>
            <div className="dropdown">
                <button className="dropbtn">Select a Channel</button>
                <div className="dropdown-content">
                    {channelLinks}
                </div>
            </div>
            <div className="navbar-right">
                <NavLink to="/signup" exact>Sign Up</NavLink>
                <NavLink to="/login" exact>Login</NavLink>
            </div>
        </div>
    )
}

export default Navbar