import React, {useState, useEffect} from "react"
import{Route, Switch} from 'react-router-dom'
import Navbar from "./Navbar"
import Footer from "./Footer"
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm"
import ChannelContainer from "./channel-container/ChannelContainer"
import NewPostForm from "./NewPostForm"
import Home from "./Home"
import PostContainer from "./post-container/PostContainer"
import ProfileContainer from "./profile-container/ProfileContainer"


function App() {

  const API = "https://spreddit-app.herokuapp.com/"

  const [currentUser, setCurrentUser] = useState(null)
  const [channels, setChannels] = useState([])
  

  useEffect(()=>{
    fetch(`${API}channels`)
      .then(res=>res.json())
      .then(channelArray => {
        setChannels(channelArray)
      })
  },[])


  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token) {
      fetch(`${API}show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          setCurrentUser(user);
        });
    }
  },[])

  return (
    <div className="App">
      <Navbar channels={channels} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Switch>
        <Route path="/signup">
          <SignUpForm setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/login">
          <LoginForm setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/channels/:id">
          {currentUser ? <ChannelContainer currentUser={currentUser}/> : null}
        </Route>
        <Route path="/newpost">
          {currentUser ? <NewPostForm currentUser={currentUser}/> : null}
        </Route>
        <Route exact path="/">
          <Home currentUser={currentUser}/>
        </Route>
        <Route path="/posts/:id">
          {currentUser ? <PostContainer currentUser={currentUser}/> : null}
        </Route>
        <Route path="/profile">
          {currentUser ? <ProfileContainer currentUser={currentUser} setCurrentUser={setCurrentUser}/> : null}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
