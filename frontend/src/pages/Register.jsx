import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [education, setEducation] = useState('')
    const [photo, setPhoto] = useState('')
    const [photoPreview, setPhotoPreview] = useState('')

    const changePhotoHandler = (e) => {
        const file = e.target.files[0]
        setPhoto(file)

        // Preview the selected photo
        const reader = new FileReader()
        reader.onloadend = () => {
            setPhotoPreview(reader.result)
        }
        reader.readAsDataURL(file)

        console.log('File selected:', file)
    }

    return (
        <>
            <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
                    <form action=''>
                        <div className='font-semibold text-xl items-center text-center'>My Blog</div>
                        <h1 className='text-xl font-semibold mb-6'>Register</h1>
                        <select value={role} className='w-full p-2 mb-4 border rounded-md'>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <div className='mb-4'>
                            <input type="text" placeholder='Your Name' value={name} className='w-full p-2 border rounded-md' />
                        </div>
                        <div className='mb-4'>
                            <input type="text" placeholder='Email' value={email} className='w-full p-2 border rounded-md' />
                        </div>
                        <div className='mb-4'>
                            <input type="text" placeholder='Phone' value={phone} className='w-full p-2 border rounded-md' />
                        </div>
                        <div className='mb-4'>
                            <input type="password" placeholder='Password' value={password} className='w-full p-2 border rounded-md' />
                        </div>
                        <select value={education} className='w-full p-2 mb-4 border rounded-md'>
                            <option value="">Education</option>
                            <option value="msc">MSC</option>
                            <option value="bsc">BSC</option>
                            <option value="mba">MBA</option>
                        </select>
                        <div className='flex items-center mb-4'>
                            <div className='photo w-20 mr-4'>
                                {/* Display photo preview */}
                                {photoPreview && <img src={photoPreview} alt="Preview" />}
                            </div>
                            <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
                        </div>
                        <button className='w-full p-2 bg-blue-500 hover:bg-blue-800 rounded-md text-white'>Register</button>
                        <p className='text-center'>Already Registered? <Link to='/login' className='text-blue-600'>Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register