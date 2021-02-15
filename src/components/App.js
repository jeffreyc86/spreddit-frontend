import React, {useState, useEffect} from "react"
import{Route, Switch} from 'react-router-dom'
import Navbar from "./Navbar"
import Footer from "./Footer"
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm"
import ChannelContainer from "./channel-container/ChannelContainer"
import NewPostForm from "./NewPostForm"


function App() {

  const API = "http://localhost:3001/"

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
          <ChannelContainer currentUser={currentUser}/>
        </Route>
        <Route path="/newpost">
          <NewPostForm currentUser={currentUser}/>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
