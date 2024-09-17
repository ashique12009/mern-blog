import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const blogs = useAuth()

    return (
        <>
            <nav className='shadow-lg px-4 py-2'>
                <div className='flex justify-between container mx-auto'>
                    <div className='font-semibold text-xl'>My <span className='text-blue-500'>Blog</span></div>
                    <div>
                        <ul className='flex space-x-6'>
                            <Link to='/'><li>HOME</li></Link>
                            <Link to='/blogs'><li>BLOGS</li></Link>
                            <Link to='/creators'><li>CREATORS</li></Link>
                            <Link to='/about'><li>ABOUT</li></Link>
                            <Link to='/contact'><li>CONTACT</li></Link>
                        </ul>
                    </div>
                    <div className='flex space-x-4'>
                        <Link to='/dashboard'><button className='bg-blue-500 text-white px-4 py-1 rounded-md'>Dashboard</button></Link>
                        <Link to='/login'><button className='bg-red-500 text-white px-4 py-1 rounded-md'>Login</button></Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar