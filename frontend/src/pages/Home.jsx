import React from 'react'
import Hero from '../home-page-component/Hero'
import Trending from '../home-page-component/Trending'
import Devotional from '../home-page-component/Devotional'
import Creator from '../home-page-component/Creator'

const Home = () => {

    return (
        <div className='container mx-auto'>
            <Hero />
            <Trending />
            <Devotional />
            <Creator />
        </div>
    )
}

export default Home