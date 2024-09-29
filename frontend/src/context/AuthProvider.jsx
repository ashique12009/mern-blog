import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
                const response = await axios.get(`${apiBaseUrl}/blogs/all-blogs`)
                setBlogs(response.data.blogs)
            }
            catch (error) {
                console.log(error, 'Error fetching blogs');
            }
        }

        fetchBlogs()
    }, [])

    return (
        <AuthContext.Provider value={{blogs}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}