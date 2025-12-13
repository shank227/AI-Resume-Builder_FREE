import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
    const user = {name: 'User'}
    const navigate = useNavigate()

    const LogoutUser = () => {
        navigate('/');
    }

  return (
    <div>
      <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <a href="/">
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
            <div className='flex items-center gap-4'>
                <p>Hi, {user?.name}</p>
                <button onClick={LogoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
// ...existing code...