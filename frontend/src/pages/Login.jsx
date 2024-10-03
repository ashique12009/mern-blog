import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const navigateTo = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password || !role) {
            toast.error('Please enter all fields')
            return
        }

        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        formData.append('role', role)
        try {
            const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
            const response = await axios.post(`${apiBaseUrl}/users/login`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            
            setEmail('')
            setPassword('')
            setRole('')

            if (response.data.success) {
                toast.success(response.data.message)
                // Redirect to dashboard
                navigateTo('/dashboard')
            }
            else {
                toast.error(response.data.message)
            }
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
                    <form>
                        <div className='font-semibold text-xl items-center text-center'>My <span className='text-blue-500'>Blog</span></div>
                        <h1 className='text-xl font-semibold mb-6'>Login</h1>
                        <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <div className='mb-4'>
                            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2 border rounded-md' />
                        </div>
                        <div className='mb-4'>
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-2 border rounded-md' />
                        </div>
                        <button type='button' onClick={handleLogin} className='w-full p-2 bg-blue-500 hover:bg-blue-800 rounded-md text-white'>Login</button>
                        <p className='text-center'>Need Registration? <Link to='/register' className='text-blue-600'>Register</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login