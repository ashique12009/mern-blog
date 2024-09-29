import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const Hero = () => {

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const { blogs } = useAuth()

    return (
        <div className='container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6'>
            {
                blogs && blogs.length > 0 ? (
                    blogs.slice(0, 4).map((element) => {
                        return (
                            <Link to={`/blog/${element._id}`} key={element._id} className='group bg-white rounded-lg hover:shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300'>
                                <div className='relative'>
                                    <img src={`${backendBaseUrl}/${element.blogImage}`} alt={element.title} />
                                    <div></div>
                                    <h1 className='absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-blue-500'>{element.title}</h1>
                                </div>
                                <div className='p-6 flex items-center'>
                                    <img src={`${backendBaseUrl}/${element.adminPhoto}`} alt={element.author} className='w-10 h-10 rounded-full border-2 border-yellow-500' />
                                    <div className='ml-4'>
                                        <p>{element.adminName}</p>
                                        <p>New</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                ) 
            : 
                <div>No blogs</div> 
            }
        </div>
    )
}

export default Hero