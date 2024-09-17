import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:4001/api/blogs/all-blogs')
                setBlogs(response.data)
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