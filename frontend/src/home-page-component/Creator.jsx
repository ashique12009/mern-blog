import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Creator = () => {

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    const [admins, setAdmin] = useState([])

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
                const response = await axios.get(`${apiBaseUrl}/users/admins-guest`)
                setAdmin(response.data.admins)

                console.log('response.data.admins', response.data.admins)
            }
            catch (error) {
                console.log(error, 'Error fetching admins');
            }
        }

        fetchAdmins()
    }, [])

    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl font-bold pb-2'>Creator</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
                admins && admins.length > 0 ? (
                    admins.slice(0, 4).map((element) => {
                        return (
                            <div className='p-4 bg-white border-gray-200 rounded-lg shadow border mx-2' key={element._id}>
                                <Link to={`/blog/${element._id}`} className='group bg-white rounded-lg m-4'>
                                    <div className='relative flex flex-col items-center'>
                                        <img src={`${backendBaseUrl}/${element.photo}`} alt={element.title} className='w-56 rounded-full border-2 border-yellow-500' />
                                        <p>{element.name}</p>
                                        <p>{element.role}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                )
                :
                <div>No authors</div>
            }
            </div>
        </div>
    )
}

export default Creator