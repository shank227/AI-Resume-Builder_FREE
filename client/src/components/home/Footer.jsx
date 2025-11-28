import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800 mt-10">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
            <h1
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
            }}
          >
            CVAIchemy
            <span style={{ color: "indigo" }}>.io</span>
          </h1>
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Making every customer feel valued <br />no matter the size of our audience.
                </p>
            </div>
            <div className="border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="#">CVAIchemy.io</a> ©2025. All rights reserved.
                </div>
            </div>
        </footer>
  )
}

export default Footer
