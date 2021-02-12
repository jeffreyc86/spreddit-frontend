import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'



function Navbar ({channels, currentUser, setCurrentUser}) {

    const history = useHistory()

    const channelLinks = channels.map(channel => {
        return(
            <NavLink
                to={`/channels/${channel.id}`}
                exact
                key={channel.id}
            >
                <img className="dropdown-img" src={process.env.PUBLIC_URL + channel.image_url} alt={channel.name} />
                <div className="dropdown-channel">{channel.name}</div>
            </NavLink>
        )
    })

    function handleLogoClick() {
        history.push("/")
    }

    function handleLogOut() {
        localStorage.removeItem("token")
        setCurrentUser(null)
    }

    
    return (
        <div className="navbar">
            <img className="navbar-logo" src={process.env.PUBLIC_URL + "/images/logo.jpg"} alt="spreddit" onClick={handleLogoClick}/>
            {currentUser ? 
            <>
                <div className="dropdown">
                    <button className="dropbtn">Select a Channel</button>
                    <div className="dropdown-content">
                        {channelLinks}
                    </div>
                </div>
            </> : null}
            <div className="navbar-right">
                   {currentUser ? 
                   <>
                       <NavLink to="/newpost" exact>Create New Post</NavLink>
                       <NavLink to="/profile" exact>Profile</NavLink>
                       <NavLink to="/" exact onClick={handleLogOut}>Logout</NavLink>
                    </>
                    : 
                    <>
                        <NavLink to="/signup" exact>Sign Up</NavLink>
                        <NavLink to="/login" exact>Login</NavLink>
                    </>
                    }
            </div>
        </div>
    )
}

export default Navbar