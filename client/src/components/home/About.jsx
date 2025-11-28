import React from 'react'

const About = () => {
  return (
    <div>
      <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <section id='About' className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
                <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
                    <img className="max-w-md w-full object-cover rounded-2xl"
                        src="my_web_photo.jpeg"
                        alt="" />
                    </div>
                <div className="text-sm text-slate-600 max-w-lg">
                    <h1 className="text-xl font-semibold text-slate-700">About CVAIchemy & The Developer?</h1>
                    <div className="w-40 h-[5px] rounded-full bg-gradient-to-r from-indigo-800 to-[#DDD9FF]"></div>
                    <p className="mt-5">Building a CV should feel like opening doors, not smashing into a paywall.
                    But again and again, I'd spend hours crafting resumes on “free” websites—only for them to pull the same cheap trick at the end:</p>
                    <p className='mt-2'><b>Download? Oh… pay ₹999 or $14.99... & so on</b></p>
                    <p className="mt-2">I got tired of that nonsense.
                    Tired of watching students—especially beginners, especially people who are just trying to get started—being forced to pay just to download their own hard work. So I decided to build something different.</p>
                    <p className='mt-2'><b>CVAlchemy is my small rebellion.</b></p>
                    <p className="mt-2">A simple space where anyone can create a clean, professional CV without getting slapped by a surprise subscription screen. A space built out of frustration, stubbornness, curiosity, and a little bit of madness..</p>
                    <p className='mt-2'>I'm <b>Shashank</b>—a CS student who loves building things that actually help.
                    I built this project because I needed it.
                    And if it helps someone else skip the pain I went through, that's already a win.</p>
                    <p className='mt-3'>And who knows—if people find value in it, maybe this small project becomes something bigger.</p>
                    <p className='mt-4'>👉 Wanna know more about me?Click below</p>
                    <p className=''></p>
                    <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white">
                        <a href="https://shashankbakshi.netlify.app/" target='_blank'><span>Read more</span></a>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                fill="#fff" />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    </div>
  )
}

export default About
