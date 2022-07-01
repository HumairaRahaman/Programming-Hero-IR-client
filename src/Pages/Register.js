import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom'

export default function Register() {
    const [userDetails, setUserDetails] =useState({name: "", email: "", password: "", phone: ""})
    const navigate = useNavigate()

    const handleRegister = async () => {
        const res = await fetch('https://obscure-ocean-04594.herokuapp.com/api/registration', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        const data =await res.json()
        if(res.ok) {
            localStorage.setItem('token', data.token)
            window.location.href = '/'
        } else {
            toast.error(JSON.stringify(data))
        }
    }

  return (
    <div className="min-h-screen grid place-items-center">
        <div className='flex flex-col min-w-[500px] border-2 border-gray-400 rounded shadow p-8'>
            <h1 className='text-2xl font-bold text-center mb-4'>Register</h1>
            <Input label="Full Name" type={'text'} required value={userDetails.name} onChange={e => setUserDetails({...userDetails, name: e.target.value})} />
            <Input label="E-mail" type={'email'} required value={userDetails.email} onChange={e => setUserDetails({...userDetails, email: e.target.value})} />
            <Input label="Password" type="password" required value={userDetails.password} onChange={e => setUserDetails({...userDetails, password: e.target.value})} />
            <Input label="Phone Number" type="phone" min={11} max={11} required value={userDetails.phone} onChange={e => setUserDetails({...userDetails, phone: e.target.value})} />
            <Button className='mt-4' onClick={handleRegister}>Register</Button>
            <p className='text-xs text-gray-700 mt-2'>Already have an account? <Link className='text-sm font-bold underline' to={'/login'} >Login</Link></p>
        </div>
    </div>
  )
}
