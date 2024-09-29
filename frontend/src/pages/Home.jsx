import React from 'react'
import Hero from '../home-page-component/Hero'
import { useAuth } from '../context/AuthProvider'

const Home = () => {

    return (
        <div>
            <Hero />
        </div>
    )
}

export default Home