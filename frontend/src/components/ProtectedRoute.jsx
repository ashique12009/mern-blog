import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoute = ({ component: Component }) => {
    const navigateTo = useNavigate()
    const [isAutheticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const apiBaseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
            const response = await axios.get(`${apiBaseUrl}/users/check-auth`, {
                withCredentials: true
            })

            if (response.data.success) {
                setIsAuthenticated(true)
            } else {
                navigateTo('/')
            }
        } 
        catch (error) {
            console.log('Error authenticating user', error)
            navigateTo('/')
        } 
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return isAutheticated ? <Component /> : null
}

export default ProtectedRoute