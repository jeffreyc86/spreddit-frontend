import React, {useState, useEffect} from "react"
import{Route, Switch} from 'react-router-dom'
import Navbar from "./Navbar"

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [channels, setChannels] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/channels")
      .then(res=>res.json())
      .then(channelArray => {
        setChannels(channelArray)
      })
  },[])

  return (
    <div className="App">
      <Navbar channels={channels} />
    </div>
  );
}

export default App;
