import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function SignUpForm ({setCurrentUser}){

    const API = "http://localhost:3001/"

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [errors, setErrors] = useState([])

    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        const newUser = {username, password}

        if(password !== confirmedPassword) {
            alert("Passwords do not match. Please enter and re-enter a password")
            setPassword("")
            setConfirmedPassword("")
        } else {
            fetch(`${API}signup`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newUser)
            })
                .then(res=>res.json())
                .then(data => {
                   if (data.errors) {
                       setErrors(data.errors)
                       setPassword("")
                       setConfirmedPassword("")
                   } else {
                       const {user, token} = data
                       setCurrentUser(user)
                       localStorage.setItem("token", token)
                       history.push("/profile")
                   }
                })
        }
    }

    return(
        <div>
            <h1>Sign Up Here</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Enter Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password">Re-Enter Password</label>
                <input type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                <button type="submit">Create Account</button>
            </form>
            {errors.map((error, index)=>{
                return <p key={index} className="errors">{error}</p>
            })}
        </div>
    )
}

export default SignUpForm