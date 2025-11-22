import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";



function MemberRegistration() {
    const [formData, setFormData] = useState({
        name: "",
        phoneNo: "",
        relationship:"",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log("Mother Registration Data:", formData);
            const reqres = await axios.post("http://localhost:8000/member/register", formData)
            console.log(reqres);
            alert(reqres.data.message || "Registration Succesfull")
            navigate('/')
            setFormData({
                name: "",
        phoneNo: "",
        relationship: "",
        email: "",
        password: ""}
            )
            
        }
        catch (error) {
            console.log("Registration error:", error);
        }
    }

    return (
        <div className="container">
            <form className='text-center mt-5' onSubmit={handleSubmit}>
                {/* Personal Information */}
                <h3>Personal Information</h3>
                
                <label htmlFor="name">Full Name: </label>
                <input 
                    type="text" 
                    id='name' 
                    name='name'
                    className='mb-3' 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                /><br />

                

                <label htmlFor="phoneNo">Phone Number: </label>
                <input 
                    type="tel" 
                    id='phoneNo' 
                    name='phoneNo'
                    className='mb-3' 
                    value={formData.phoneNo} 
                    onChange={handleChange} 
                    required 
                /><br />

                <label htmlFor="name">Relationship: </label>
                <input 
                    type="text" 
                    id='relationship' 
                    name='relationship'
                    className='mb-3' 
                    value={formData.relationship} 
                    onChange={handleChange} 
                    required 
                /><br />

                

               

                {/* Account Information */}
                <h3>Account Information</h3>

                <label htmlFor="email">Email: </label>
                <input 
                    type="email" 
                    id='email' 
                    name='email'
                    className='mb-3' 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                /><br />
                
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id='password' 
                    name='password'
                    className='mb-3' 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                /><br />

                <button type='submit' className='btn btn-primary'>Register</button>
            </form>
        </div>
    )
}

export default MemberRegistration