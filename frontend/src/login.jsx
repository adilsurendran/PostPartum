import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate();

    // const handlesubmit = async (e)=>{
    //     e.preventDefault()
    //     try{
    //         const reqres = await axios.post("http://localhost:8000/login",{username,password})
            
    //     }
    //     catch(e){
    //         console.log(e);
            
    //     }
    // }

      const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      console.log(res); 

      

      if (res.data.success) {

        if (res.data.role === "admin") {
          navigate("/adminhome");
        } else if(res.data.role === "mother") {
          navigate("/motherhome");
        }
        else if (res.data.role === "member"){
localStorage.setItem("member", JSON.stringify(res.data.fulldetails));

           navigate("/memberhome");
        }
        else{
          alert("Your account not verifiend by cordinator!!")
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
        console.log(err);
        
      alert(err.response.data.message || "Server error");
    }
  };



  return (
    <div>
        <form className='text-center mt-5' onSubmit={handlesubmit}>
        <label htmlFor="username">Username : </label>
        <input type="text" id='username' className='mb-3' value={username} onChange={(e)=>setUsername(e.target.value) } required /><br />

        <label htmlFor="password">password : </label>
        <input type="password" id='password' className='mb-3' value={password} onChange={(e)=>setPassword(e.target.value)} required /><br />

        <button type='submit'>Login</button> <br />
        <Link to={"/motherreg"}>
        <a>Mother Registration?</a>
        </Link><br />
        <Link to={"/memberreg"}>
        <a>Member Registration?</a>
        </Link>
</form>

    </div>
  )
}

export default Login