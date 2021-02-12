import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'



function Navbar ({channels, setCurrentUser}) {

    const history = useHistory()

    const channelLinks = channels.map(channel => {
        return(
            <NavLink
                to={`/channel/${channel.id}`}
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
            {/* only shows when currentuser is set */}
            <div className="dropdown">
                <button className="dropbtn">Select a Channel</button>
                <div className="dropdown-content">
                    {channelLinks}
                </div>
            </div>
            <div className="navbar-right">
                   {/* only shows when currentuser is null */}
                <NavLink to="/signup" exact>Sign Up</NavLink>
                <NavLink to="/login" exact>Login</NavLink>
                   {/* only shows when currentuser is set */}
                <NavLink to="/profile" exact>Profile</NavLink>
                <NavLink to="/" exact onClick={handleLogOut}>Logout</NavLink>
            </div>
        </div>
    )
}

export default Navbar