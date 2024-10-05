import React, { useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import MyProfile from '../dashboard/MyProfile'
import CreateBlog from '../dashboard/CreateBlog'
import UpdateBlog from '../dashboard/UpdateBlog'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import MyBlogs from '../dashboard/MyBlogs'

const Dashboard = () => {
    const [component, setComponent] = useState('My Blogs')

    return (
        <div className='container mx-auto'>
            <div>
                <Sidebar component={component} setComponent={setComponent} />

                {
                    (component === 'My Blogs') ? <MyBlogs /> : null
                }

                {
                    (component === 'Create Blog') ? <CreateBlog /> : null
                }

                {
                    (component === 'My Profile') ? <MyProfile /> : null
                }

            </div>
        </div>
    )
}

export default Dashboard