import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Title from '../components/home/Title'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'
import About from '../components/home/About'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Title />
      <Testimonial />
      <About />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
