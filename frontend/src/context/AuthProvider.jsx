import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [blogs, setBlogs] = useState([])
    const [profile, setProfile] = useState();

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

        const fetchProfile = async () => {
            try {
                // token should be let type variable because its value will change in every login. (in backend also)
                // Retrieve the token directly from the localStorage (Go to login.jsx)
                let token = localStorage.getItem("jwt"); 

                if (token) {
                    const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
                    const { data } = await axios.get(`${apiBaseUrl}/users/my-profile`,
                        {
                            withCredentials: true,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    
                    setProfile(data.user);
                }
            } 
            catch (error) {
                console.log(error);
            }
        };

        fetchBlogs()
        fetchProfile()
        getProfile()
    }, [])

    // Fetch profile data (this function can be used after login and on page load)
    const getProfile = async () => {
        try {
            const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
            const response = await axios.get(`${apiBaseUrl}/users/my-profile`, {
                withCredentials: true,
            })
            
            if (response.data.success) {
                setProfile(response.data.user)  // Store profile in state
            }
        } 
        catch (error) {
            console.error("Error fetching profile:", error)
        }
    }

    return (
        <AuthContext.Provider value={{ blogs, profile, getProfile }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}