import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import toast from 'react-hot-toast'

const UpdateBlog = () => {
    const { id } = useParams()
    const navigateTo = useNavigate()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [about, setAbout] = useState('')
    const [blogImage, setBlogImage] = useState('')
    const [blogImagePreview, setBlogImagePreview] = useState('')

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const defaultBlogImage = `${backendBaseUrl}/assets/blog-default.jpg`

    const changeBlogImageHandler = (e) => {
        const file = e.target.files[0]
        setBlogImage(file)

        // Preview the selected photo
        const reader = new FileReader()
        reader.onloadend = () => {
            setBlogImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
                const response = await axios.get(`${apiBaseUrl}/blogs/blog/${id}`,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "multipart/form-data" }
                    }
                )

                console.log(response.data.blog)

                setTitle(response.data.blog?.title)
                setCategory(response.data.blog?.category)
                setAbout(response.data.blog?.about)
                setBlogImage(response.data.blog?.photo)
            }
            catch (error) {
                console.log(error, 'Error fetching blog from update component');
            }
        }

        fetchBlog()
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('title', title)
        formData.append('category', category)
        formData.append('about', about)
        formData.append('photo', blogImage)
        try {
            const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
            const response = await axios.put(`${apiBaseUrl}/blogs/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                toast.success(response.data.message)
                navigateTo('/dashboard')
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                // Show toast for validation errors
                toast.error(error.response.data.message || 'Validation failed!');
            }
            else {
                // Show toast for other server errors
                toast.error(error.message || 'Something went wrong!');
            }
        }
    }

    return (
        <div>
            <Sidebar />
            <div className="container mx-auto my-12 p-4">
                <section className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
                    <form>
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">Category</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="devotional">Devotion</option>
                                <option value="sports">Sports</option>
                                <option value="coding">Coding</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="business">Business</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="BLOG MAIN TITLE"
                            className="w-full p-2 mb-4 border rounded-md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">BLOG IMAGE</label>
                            <img
                                src={
                                    blogImagePreview
                                        ? blogImagePreview
                                        : blogImage
                                            ? blogImage
                                            : defaultBlogImage
                                }
                                alt="Blog Main"
                                className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <input
                                type="file"
                                className="w-full p-2 border rounded-md"
                                onChange={changeBlogImageHandler}
                            />
                        </div>
                        <textarea
                            rows="6"
                            className="w-full p-2 mb-4 border rounded-md"
                            placeholder="Something about your blog atleast 200 characters!"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />

                        <button
                            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleUpdate}
                        >
                            UPDATE
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default UpdateBlog