import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Trending = () => {

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const { blogs } = useAuth()

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div>
            <h1 className='text-3xl font-bold pb-2'>Trending</h1>
            <Carousel responsive={responsive}>
            {
                blogs && blogs.length > 0 ? (
                    blogs.slice(0, 6).map((element) => {
                        return (
                            <Link to={`/blog/${element._id}`} key={element._id} className='group bg-white rounded-lg m-4'>
                                <div className='relative'>
                                    <img src={`${backendBaseUrl}/${element.blogImage}`} alt={element.title} />
                                    <div></div>
                                    <h1 className='text-xs font-bold group-hover:text-blue-500 mt-2'>{element.title}</h1>
                                </div>
                                <div className='p-6 pl-0 flex items-center'>
                                    <img src={`${backendBaseUrl}/${element.adminPhoto}`} alt={element.author} className='w-10 h-10 rounded-full border-2 border-yellow-500' />
                                    <div className='ml-4'>
                                        <p>{element.adminName}</p>
                                        <p className='text-xs'>Category: {element.category}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                )
                :
                <div>No blogs</div>
            }
            </Carousel>
        </div>
    )
}

export default Trending