import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function LoginForm ({setCurrentUser}) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState([]);
    const history = useHistory();
    
    const API = "http://localhost:3001/"

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${API}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.errors) {
              setErrors(data.errors);
            } else {
              const { user, token } = data;
              localStorage.setItem("token", token);
              setCurrentUser(user);
              history.push("/profile");
            }
          });
      }
    
      return (
        <div>
          <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
            <h1>Login</h1>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input type="submit" value="Login" />
          </form>
            {errors.map((error, index)=>{
                return <p key={index} className="errors">{error}</p>
            })}
        </div>
      );
    


}

export default LoginForm;