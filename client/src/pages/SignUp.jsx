// ...existing code...
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields.')
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.")
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      // TODO: replace with real signup API call
      await new Promise((r) => setTimeout(r, 900))
      navigate('/login')
    } catch (err) {
      setError('Signup failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignup = (provider) => {
    // placeholder - wire to your OAuth endpoints
    // e.g. window.location.href = `/auth/${provider}`
    console.log('social signup:', provider)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white text-gray-500 w-full max-w-md mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create new account</h2>

        {error && <p className="text-sm text-red-600 mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            required
          />

          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            required
          />

          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent border my-3 
            border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            required
          />

          <div className="text-right py-4">
            <Link to="/forgot" className="text-sm text-gray-500 hover:text-indigo-600">Forgot Password</Link>
          </div>

          <button type="submit" className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-indigo-600 underline">Log in</Link></p>

        <button type="button" onClick={() => handleSocialSignup('apple')} className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white">
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" />
          Sign up with Apple
        </button>
        <button type="button" onClick={() => handleSocialSignup('google')} className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
          Sign up with Google
        </button>
      </div>
    </div>
  )
}

export default SignUp
// ...existing code...