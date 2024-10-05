import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CiMenuBurger } from 'react-icons/ci'

const Sidebar = ({setComponent}) => {
    console.log('setComponent', setComponent)
    const {blogs, profile} = useAuth()

    const navigateTo = useNavigate()

    const [showSidebar, setShowSidebar] = useState(false)

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    const logout = async () => {
        const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
        const response = await axios.post(`${apiBaseUrl}/users/logout`, {}, {
            withCredentials: true
        })

        if (response.data.success) {
            localStorage.removeItem('jwt')
            navigateTo('/')
        }
    }

    const handleComponent = (value) => {
        setComponent(value)
    }

    return (
        <>
            <div className='sm:hidden fixed top-4 left-4 z-50' onClick={ () => setShowSidebar(!showSidebar)}>
                <CiMenuBurger className='text-2xl' />
            </div>

            <div className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}>
                <div>
                    { profile?.photo && <img src={`${backendBaseUrl}/${profile?.photo}`} alt="profile image" className='w-16 h-16 rounded-full mx-auto mb-2' /> }
                    <p className='text-lg font-semibold text-center'>{profile?.name}</p>
                </div>
                <ul className='mx-4'>
                    <button className='w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 text-white mb-2' onClick={() => handleComponent('My Blogs')}>My Blogs</button>
                    <button className='w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 text-white mb-2' onClick={() => handleComponent('Create Blog')}>Create Blogs</button>
                    <button className='w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 text-white mb-2'>My Profile</button>
                    <button className='w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 text-white' onClick={logout}>Logout</button>
                </ul>
            </div>
        </>
    )
}

export default Sidebar