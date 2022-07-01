import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom'


export default function Login() {
    const [userDetails, setUserDetails] =useState({name: "", email: "", password: ""})
    const navigate = useNavigate()

    const handleLogin = async () => {
        const res = await fetch('https://obscure-ocean-04594.herokuapp.com/api/login', {
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
            <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>
            <Input label="E-mail" type={'email'} required value={userDetails.email} onChange={e => setUserDetails({...userDetails, email: e.target.value})} />
            <Input label="Password" type="password" required value={userDetails.password} onChange={e => setUserDetails({...userDetails, password: e.target.value})} />
            <Button className='mt-4' onClick={handleLogin}>Login</Button>
            <p className='text-xs text-gray-700 mt-2'>Dont have an account? <Link className='text-sm font-bold underline' to={'/register'}>Register</Link></p>
        </div>
    </div>
  )
}
