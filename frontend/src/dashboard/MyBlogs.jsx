import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const MyBlogs = () => {
    const [myBlogs, setMyBlogs] = useState([]);

    const { profile } = useAuth();
    const userID = profile?._id;

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
                const { data } = await axios.get(
                    `${apiBaseUrl}/blogs/myblogs/${userID}`,
                    { withCredentials: true }
                );

                setMyBlogs(data.blogs);
            } 
            catch (error) {
                console.log(error);
            }
        };
        fetchMyBlogs();
    }, []);

    const handleDelete = async (blogId) => {
        try {
            Swal.fire({
                title: "Are you sure you want to delete?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
                denyButtonText: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
                    const response = await axios.delete(
                        `${apiBaseUrl}/blogs/delete/${blogId}`,
                        { 
                            withCredentials: true 
                        }
                    );

                    if (response.data.success) {
                        // For now reload the page concept will be added later
                        // Now re-arranging the blog array
                        // Update the blogs state based on filtering out the deleted one
                        setMyBlogs((prevBlogs) => {
                            const updatedBlogs = prevBlogs.filter((blog) => blog._id !== blogId);
                            return updatedBlogs; // Correct return of new filtered blogs
                        });

                        Swal.fire("Blog deleted successfully!", "", "success");
                    }
                } 
                // else if (result.isDenied) {
                //     Swal.fire("Changes are not saved", "", "info");
                // }
            });
        } 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="container mx-auto my-12 p-4 ml-[50px]">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
                    {myBlogs && myBlogs.length > 0 ? (
                        myBlogs.map((element) => (
                            <div
                                className="bg-white shadow-lg rounded-lg overflow-hidden"
                                key={element._id}
                            >
                                {element?.blogImage && (
                                    <img
                                        src={`${backendBaseUrl}/${element.blogImage}`}
                                        alt="blogImg"
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <span className="text-sm text-gray-600">
                                        {element.category}
                                    </span>
                                    <h4 className="text-xl font-semibold my-2">
                                        {element.title}
                                    </h4>
                                    <div className="flex justify-between mt-4">
                                        <Link
                                            to={`/blog/update/${element._id}`}
                                            className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                                        >
                                            UPDATE
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(element._id)}
                                            className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            You have not posted any blog!
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyBlogs