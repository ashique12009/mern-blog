import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const Devotional = () => {

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const { blogs } = useAuth()

    const devotionalBlogs = blogs?.filter((blog)=> blog.category === 'devotional')

    return (
        <div>
            <h1 className='text-3xl font-bold pb-2'>Devotional</h1>
            <p className='text-center mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className='grid grid-cols-1 sn:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
            {
                devotionalBlogs && devotionalBlogs.length > 0 ? (
                    devotionalBlogs.slice(0, 6).map((element) => {
                        return (
                            <Link to={`/blog/${element._id}`} key={element._id} className='group bg-white rounded-lg m-4'>
                                <div className='relative'>
                                    <img src={`${backendBaseUrl}/${element.blogImage}`} alt={element.title} />
                                    <div></div>
                                    <h1 className='text-xs font-bold group-hover:text-blue-500 mt-2'>{element.title}</h1>
                                </div>
                                <div className='p-6 pl-0 pt-1 flex items-center'>
                                    <p>{element.category.charAt(0).toUpperCase() + element.category.slice(1)}</p>
                                </div>
                            </Link>
                        )
                    })
                )
                :
                <div>No blogs</div>
            }
            </div>
        </div>
    )
}

export default Devotional