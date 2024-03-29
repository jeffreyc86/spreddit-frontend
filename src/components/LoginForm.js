import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function LoginForm ({setCurrentUser}) {

    const [demoClicked, setDemoClicked] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState([]);
    const history = useHistory();
    
    const API = "https://spreddit-app.herokuapp.com/"

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

      function demoLogin() {
        setDemoClicked(true)
        fetch(`${API}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "test123", password: "test1234" }),
        })
          .then((r) => r.json())
          .then((data) => {
              const { user, token } = data;
              localStorage.setItem("token", token);
              setCurrentUser(user);
              history.push("/profile");
          });
      }
    
      return (
        <div className="login-div">
          <h1>Loggin'</h1>
          <img src={process.env.PUBLIC_URL + "/images/login.gif"} alt="login" />
          <form
            className="login-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <br />
            <button type="submit">Login</button>
          </form>
          {errors.map((error, index) => {
            return (
              <p key={index} className="errors">
                {error}
              </p>
            );
          })}
          <div className="demo-login" onClick={demoLogin}>
            Demo Login
            {demoClicked && (
              <>
                <br />
                <span className="demo-message">It may take a few seconds for the back end to fire up</span>
              </>
            )}
          </div>
        </div>
      );
    


}

export default LoginForm;