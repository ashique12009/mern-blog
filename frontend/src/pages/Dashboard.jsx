import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import MyProfile from '../dashboard/MyProfile'
import CreateBlog from '../dashboard/CreateBlog'
import UpdateBlog from '../dashboard/UpdateBlog'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigateTo = useNavigate()

    const logout = async () => {
        const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
        const response = await axios.post(`${apiBaseUrl}/users/logout`, {}, {
            withCredentials: true
        })

        if (response.data.success) {
            navigateTo('/')
        }
    }

    const checkAuth = async () => {
        try {
            const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
            const response = await axios.get(`${apiBaseUrl}/users/check-auth`, {
                withCredentials: true
            })

            if (!response.data.success) {
                navigateTo('/')
            }
        } 
        catch (error) {
            console.log('Error authenticating user', error);
            if (error.response && error.response.status === 401) {
                navigateTo('/')
            }
        }
    }

    checkAuth()

    return (
        <div className='container mx-auto'>
            <div>
                {/* <Sidebar component={component} setComponent={setComponent} />
                {component === "My Profile" ? (
                    <MyProfile />
                ) : component === "Create Blog" ? (
                    <CreateBlog />
                ) : component === "Update Blog" ? (
                    <UpdateBlog />
                ) : (
                    <MyBlogs />
                )} */}
                <h1>Dashboard</h1>
                <Link to='#' onClick={logout}>Logout</Link>
            </div>
        </div>
    )
}

export default Dashboard