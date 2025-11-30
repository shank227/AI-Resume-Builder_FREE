// ...existing code...
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] text-sm text-gray-500">
      {/* Navbar (fixed) */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 font-medium z-50 bg-white/80 backdrop-blur-md">
        {/* Logo */}
        <a href="#">
          <h1
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "Black",
            }}
          >
            CVAIchemy
            <span style={{ color: "indigo" }}>.io</span>
          </h1>
        </a>

        {/* Hamburger (Mobile) */}
        <button id="menu-toggle" className="md:hidden text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav Links */}
        <ul id="nav-menu" className="hidden max-md:absolute top-full left-0 max-md:w-full md:flex md:items-center gap-8 max-md:bg-white max-md:shadow-md max-md:px-6 max-md:py-4 flex-col md:flex-row z-50">
          <li><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#">Home</a></li>
          <li><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#features">Features</a></li>
          <li><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#testimonial">Testimonials</a></li>
          <li><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#About">About</a></li>
          <li><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#Issue">Contact</a></li>

          {/* Login button for mobile */}
          <li className="block md:hidden mt-4">
            <Link to="/login" className="group flex items-center gap-2">
              Log In
              <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
        </ul>

        {/* Login button for desktop */}
        <Link to="/login" className="group hidden md:flex items-center gap-2">
          Log In
          <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </nav>

      {/* spacer to prevent fixed navbar overlapping content */}
      <div className="h-16 md:h-20" />

      {/* Hero Section */}
      <div className="h-[580px] flex flex-col items-center justify-center px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-sm text-gray-800 max-w-full">
          <p>Explore how we help you craft your perfect CVs.</p>
          <div className="flex items-center cursor-pointer gap-2 bg-white border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap">
            <p><a href="#features">Explore</a></p>
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">Land your Dream Job with AI-Powered CVs</h1>
        <p className="max-w-xl text-center mt-6 px-4">Create, edit, and download professional CVs with AI-Powered Assistance & Enhancements.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button className="px-7 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium"> <Link to="/login" className="group hidden md:flex items-center gap-2">Get Started Now </Link></button>
          <button className="group px-7 py-2.5 flex items-center gap-2 font-medium">
            <a href="#testimonial">What users say about us?</a>
            <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
// ...existing code...