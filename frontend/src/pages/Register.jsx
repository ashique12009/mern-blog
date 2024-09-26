import React, { useState } from 'react'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [education, setEducation] = useState('')
    const [photo, setPhoto] = useState('')
    const [photoPreview, setPhotoPreview] = useState('')

    return (
        <>
        <form action=''>
            <div className='font-semibold text-xl items-center text-center'>Blog</div>
            <h1 className='text-xl font-semibold mb-6'>Register</h1>
            <select>
                <option value="">Select Role</option>
                <option value="">Admin</option>
                <option value="">User</option>
            </select>
        </form>
        </>
    )
}

export default Register