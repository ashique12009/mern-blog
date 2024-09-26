import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5'

const Navbar = () => {

    const {users, blogs} = useAuth()
    const [show, setShow] = useState(false)

    return (
        <>
            <nav className='shadow-lg px-4 py-2'>
                <div className='flex items-center justify-between container mx-auto'>
                    <div className='font-semibold text-xl'>My <span className='text-blue-500'>Blog</span></div>
                    <div className='mx-6'>
                        {/* Desktop */}
                        <ul className='space-x-6 hidden md:flex'>
                            <Link to='/'><li>HOME</li></Link>
                            <Link to='/blogs'><li>BLOGS</li></Link>
                            <Link to='/creators'><li>CREATORS</li></Link>
                            <Link to='/about'><li>ABOUT</li></Link>
                            <Link to='/contact'><li>CONTACT</li></Link>
                        </ul>

                        {/* Mobile */}
                        <div className='md:hidden' onClick={() => setShow(!show)}>
                            {
                                show ? <IoCloseSharp size={24} /> : <IoMenuSharp size={24} />
                            }
                        </div>
                    </div>
                    <div className='space-x-4 hidden md:flex'>
                        <Link to='/dashboard'><button className='bg-blue-500 text-white px-4 py-1 rounded-md'>Dashboard</button></Link>
                        <Link to='/login'><button className='bg-red-500 text-white px-4 py-1 rounded-md'>Login</button></Link>
                    </div>
                </div>
                {/* Mobile navbar */}
                {
                    show && (
                        <div className='bg-white'>
                            <ul className='flex md:hidden text-xl flex-col h-screen items-center justify-center space-y-3'>
                                <Link to='/' onClick={() => setShow(!show)}><li>HOME</li></Link>
                                <Link to='/blogs' onClick={() => setShow(!show)}><li>BLOGS</li></Link>
                                <Link to='/creators' onClick={() => setShow(!show)}><li>CREATORS</li></Link>
                                <Link to='/about' onClick={() => setShow(!show)}><li>ABOUT</li></Link>
                                <Link to='/contact' onClick={() => setShow(!show)}><li>CONTACT</li></Link>
                            </ul>
                        </div>
                    )
                }
            </nav>
        </>
    )
}

export default Navbar