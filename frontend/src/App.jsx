import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Creators from './pages/Creators'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'

const App = () => {

    const location = useLocation()
    const hideNavbarFooter = ['/dashboard', '/login', '/register'].includes(location.pathname)

    return (
        <div>
            {/* Conditional rendering */}
            { !hideNavbarFooter && <Navbar /> }
            
            {/* Define routes */}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/blogs" element={<Blogs />} />
                <Route exact path="/creators" element={<Creators />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>

            <Toaster position='top-right' />
            
            {/* Conditional rendering */}
            { !hideNavbarFooter && <Footer /> }
        </div>
    )
}

export default App