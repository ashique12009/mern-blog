import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import MyProfile from '../dashboard/MyProfile'
import CreateBlog from '../dashboard/CreateBlog'
import UpdateBlog from '../dashboard/UpdateBlog'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Dashboard = () => {

    return (
        <div className='container mx-auto'>
            <div>
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard