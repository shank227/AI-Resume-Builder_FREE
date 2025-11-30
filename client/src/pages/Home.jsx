import React from 'react'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Title from '../components/home/Title'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'
import About from '../components/home/About'
import Issue from '../components/home/Issue'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Title />
      <Testimonial />
      <About />
      <Issue />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
