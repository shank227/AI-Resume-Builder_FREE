// ...existing code...
import React, { useEffect, useState } from 'react'
import { User } from 'lucide-react'

const PersonalInfoForm = ({ data = {}, onChange = () => {}, removeBackground = false, setRemoveBackground = () => {} }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    image: null,
    linkedin: '',
    github: '',
    website: '',
    ...data,
  })

  // keep local state synced with parent-provided data
  useEffect(() => {
    setForm(prev => ({ ...prev, ...data }))
  }, [data])

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value }
    setForm(next)
    onChange(next)
  }

  const handleFile = (file) => {
    if (!file) return
    handleChange('image', file)
  }

  const imageSrc = form.image ? (typeof form.image === 'string' ? form.image : URL.createObjectURL(form.image)) : null

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <p className="text-sm text-gray-500">Add your details so employers can reach you.</p>
        </div>
        <div className="text-sm text-indigo-600 font-medium">Step 1</div>
      </div>

      <div className="flex gap-6 items-start">
        {/* avatar upload */}
        <label className="relative">
          <div className={`w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border-2 ${imageSrc ? 'border-transparent' : 'border-dashed border-gray-300'} bg-gradient-to-br from-gray-50 to-white`}>
            {imageSrc ? (
              <img src={imageSrc} alt="user" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <User className="w-8 h-8" />
                <span className="text-xs mt-1">Upload</span>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          {/* remove / edit badge */}
          {imageSrc && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); handleChange('image', null); }}
              className="absolute -right-2 -top-2 bg-white text-gray-500 border rounded-full p-0.5 shadow-sm hover:bg-red-50 hover:text-red-600 transition"
              title="Remove image"
            >
              ✕
            </button>
          )}
        </label>

        {/* inputs */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-3">
            <label className="text-xs text-gray-500">Full name</label>
            <input
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 outline-none"
            />

            <label className="text-xs text-gray-500">Email</label>
            <input
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@company.com"
              type="email"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 555-5555"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="City, Country"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
              </div>
            </div>

            {/* social / links */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <label className="text-xs text-gray-500">LinkedIn</label>
              <input
                value={form.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourname"
                type="url"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 outline-none"
              />

              <label className="text-xs text-gray-500">GitHub</label>
              <input
                value={form.github}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="https://github.com/yourname"
                type="url"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 outline-none"
              />

              <label className="text-xs text-gray-500">Website</label>
              <input
                value={form.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                type="url"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={() => setRemoveBackground(prev => !prev)}
              checked={!!removeBackground}
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition" />
            <span className="text-sm text-gray-600">Remove image background</span>
          </label>
        </div>

        <div className="text-sm text-gray-500">Changes saved locally</div>
      </div>
    </div>
  )
}

export default PersonalInfoForm
// ...existing code...