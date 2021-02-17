import React, {useState} from 'react'
import {useHistory} from "react-router-dom"


function UpdateUserForm({setShowHidden, currentUser, setCurrentUser}){
    // const [formData, setFormData] = useState({
    //     username: currentUser.username,
    //     password: "",
    // });

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [errors, setErrors] = useState([])
    
    const history = useHistory();
    

    const API = "http://localhost:3001/"

    // function handleChange(e) {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }
    
    function handleUpdate(e) {
        e.preventDefault();

        let updatedUser

        if (username.length === 0) {
          updatedUser = {username: currentUser.username, password}
        } else {
          updatedUser = {username, password}
        }

        if (password !== confirmedPassword) {
          alert("Passwords do not match. Please enter and re-enter a password")
          setPassword("")
          setConfirmedPassword("")
      } else {
        fetch(`${API}users/${currentUser.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.errors) {
              setErrors(data.errors);
            } else {
              setCurrentUser(data);
              setShowHidden(false)
            }
          });
        }
    }

    function handleDelete(){
      fetch(`${API}users/${currentUser.id}`, {
        method: "DELETE"
      })
      localStorage.removeItem("token")
      setCurrentUser(null)
      history.push("/")
    }
    
    return(
        <div className="account-settings">
        <h1>Account Settings</h1>
        <button onClick={()=>setShowHidden(showHidden=>!showHidden)}>Close</button>
        {/* <img src={process.env.PUBLIC_URL + "/images/login.gif"} alt="login" /> */}
            <form className="update-form" onSubmit={handleUpdate} autoComplete="off">
              <h3>Update User Info</h3>
              <div>
                  <label htmlFor="username">Username</label>
                  <input
                  type="text"
                  name="username"
                  value={username}
                  placeholder={currentUser.username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                  />
              </div>
              <br/>
              <div>
                  <label htmlFor="password">Password</label>
                  <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  />
              </div>
              <br/>
              <div>
                    <label htmlFor="confirmed password">Re-Enter Password</label>
                    <input type="password"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)} />
                </div>
                <br/>
              <button type="submit">Update</button>
            </form>
              {errors.map((error, index)=>{return <p key={index} className="errors">{error}</p>})}
            <div className="uuf-delete">
              <h3>Delete Account</h3>
              <button onClick={handleDelete}>Delete Forever</button>
              <p className="blink">ARE YOU SURE?!? 💔</p>
            </div>
        </div>
    )
}

export default UpdateUserForm;