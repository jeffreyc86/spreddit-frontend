import React, {useState, useEffect} from "react"
import{Route, Switch} from 'react-router-dom'
import Navbar from "./Navbar"
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm"

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
      <Navbar channels={channels} setCurrentUser={setCurrentUser}/>
      {currentUser ? <h1>Current User</h1> : <h1>No Current User</h1>}
      <Switch>
        <Route path="/signup">
          <SignUpForm setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/login">
          <LoginForm setCurrentUser={setCurrentUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
