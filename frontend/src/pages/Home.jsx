import React from 'react'
import Hero from '../home-page-component/Hero'
import Trending from '../home-page-component/Trending'
import { useAuth } from '../context/AuthProvider'
import Devotional from '../home-page-component/Devotional'

const Home = () => {

    return (
        <div className='container mx-auto'>
            <Hero />
            <Trending />
            <Devotional />
        </div>
    )
}

export default Home