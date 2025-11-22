import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";



function MotherRegistration() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        height: "",
        weight: "",
        deliveryType: "",
        deliveryDate: "",
        address: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        phoneNo: "",
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
            const reqres = await axios.post("http://localhost:8000/mother/register", formData)
            console.log(reqres);
            alert(reqres.data.message || "Registration Succesfull")

            navigate('/')
            setFormData({
                name: "",
        age: "",
        height: "",
        weight: "",
        deliveryType: "",
        deliveryDate: "",
        address: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        phoneNo: "",
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

                <label htmlFor="age">Age: </label>
                <input 
                    type="number" 
                    id='age' 
                    name='age'
                    className='mb-3' 
                    value={formData.age} 
                    onChange={handleChange} 
                    required 
                /><br />

                <label htmlFor="height">Height (cm): </label>
                <input 
                    type="number" 
                    id='height' 
                    name='height'
                    className='mb-3' 
                    value={formData.height} 
                    onChange={handleChange} 
                    required 
                /><br />

                <label htmlFor="weight">Weight (kg): </label>
                <input 
                    type="number" 
                    id='weight' 
                    name='weight'
                    className='mb-3' 
                    value={formData.weight} 
                    onChange={handleChange} 
                    required 
                /><br />

                {/* Pregnancy Information */}
                <h3>Pregnancy Information</h3>
                
                <label>Delivery Type: </label><br />
                <div className='mb-3'>
                    <input 
                        type="radio" 
                        id='normal' 
                        name='deliveryType'
                        value="Normal" 
                        onChange={handleChange} 
                        required 
                    />
                    <label htmlFor="normal" className='me-3'> Normal</label>

                    <input 
                        type="radio" 
                        id='cesarean' 
                        name='deliveryType'
                        value="Cesarean" 
                        onChange={handleChange} 
                    />
                    <label htmlFor="cesarean"> Cesarean</label>
                </div>

                <label htmlFor="deliveryDate">Expected Delivery Date: </label>
                <input 
                    type="date" 
                    id='deliveryDate' 
                    name='deliveryDate'
                    className='mb-3' 
                    value={formData.deliveryDate} 
                    onChange={handleChange} 
                    required 
                /><br />

                {/* Contact Information */}
                <h3>Contact Information</h3>
                
                <label htmlFor="address">Address: </label>
                <textarea 
                    id='address' 
                    name='address'
                    className='mb-3' 
                    value={formData.address} 
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

                {/* Emergency Contact */}
                <h3>Emergency Contact</h3>
                
                <label htmlFor="emergencyContactName">Emergency Contact Name: </label>
                <input 
                    type="text" 
                    id='emergencyContactName' 
                    name='emergencyContactName'
                    className='mb-3' 
                    value={formData.emergencyContactName} 
                    onChange={handleChange} 
                    required 
                /><br />

                <label htmlFor="emergencyContactPhone">Emergency Contact Phone: </label>
                <input 
                    type="tel" 
                    id='emergencyContactPhone' 
                    name='emergencyContactPhone'
                    className='mb-3' 
                    value={formData.emergencyContactPhone} 
                    onChange={handleChange} 
                    required 
                /><br />

                {/* Account Information */}
                <h3>Account Information</h3>
                
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

export default MotherRegistration