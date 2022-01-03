import { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Login = ({ setLoginUser }) => {
  
  const navigate = useNavigate ();


    const loginUser = () => {
        axios.post("/api/login", user)
        .then(res => {        
            alert(res.data.message)
            setLoginUser(res.data.user)
            navigate('/about')
        });
    };


    const user = {
        email: "",
        password: "",
       
      };


  return (
    <form className="add-form">
    <div className="form-control">
     <h2>Login</h2>
    </div>
    <div className="form-control">
      <label>Email</label>
      <input className="form-control"  placeholder="Enter Email" onChange={(e) => (user.email = e.target.value)}/>
    </div>

    <div className="form-control">
      <label>Password</label>
      <input className="form-control"  placeholder="Enter Password" onChange={(e) => (user.password = e.target.value)}/>
    </div>

    <input type="submit" onClick={loginUser} value="Login" className="btn btn-block "  />
    <div align="center">or</div>
    <input type="submit" onClick={() => navigate('/register')} value="Register" className="btn btn-block "  />
    </form>
  );
};

export default Login;
