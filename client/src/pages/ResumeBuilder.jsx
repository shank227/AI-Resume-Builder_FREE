import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  Folder,
  GraduationCap,
  Sparkles,
  User,
} from 'lucide-react'

/* --------- PersonalInfoForm (inlined, decorative UI) --------- */
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
    <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Personal Information</h3>
          <p className="text-sm text-slate-500 mt-1">Make your profile stand out — add details and links.</p>
        </div>
        <div className="text-sm text-indigo-600 font-medium">Step 1</div>
      </div>

      <div className="flex gap-6">
        <label className="relative group">
          <div className={`w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 ${imageSrc ? 'border-transparent' : 'border-dashed border-gray-300'} bg-gradient-to-br from-gray-50 to-white transition`}>
            {imageSrc ? (
              <img src={imageSrc} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <User className="w-9 h-9" />
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

          {imageSrc && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); handleChange('image', null) }}
              className="absolute -right-2 -top-2 bg-white text-slate-500 border rounded-full p-0.5 shadow hover:bg-red-50 hover:text-red-600 transition"
              title="Remove image"
            >
              ✕
            </button>
          )}
        </label>

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-xs text-slate-500">Full name</label>
              <input
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Jane Doe"
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Email</label>
              <input
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="you@company.com"
                type="email"
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 555-5555"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="City, Country"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-1">
              <label className="text-xs text-slate-500">LinkedIn</label>
              <input
                value={form.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourname"
                type="url"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />

              <label className="text-xs text-slate-500">GitHub</label>
              <input
                value={form.github}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="https://github.com/yourname"
                type="url"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />

              <label className="text-xs text-slate-500">Website</label>
              <input
                value={form.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                type="url"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <label className="inline-flex items-center gap-3">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={() => setRemoveBackground(prev => !prev)}
            checked={!!removeBackground}
          />
          <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition" />
          <span className="text-sm text-slate-600">Remove image background</span>
        </label>

        <div className="text-sm text-slate-500">Saved locally • <span className="text-indigo-600">Auto</span></div>
      </div>
    </div>
  )
}

/* ---------------------- ResumeBuilder page ---------------------- */
const ResumeBuilder = () => {
  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      image: null,
      linkedin: '',
      github: '',
      website: '',
    },
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(prev => ({ ...prev, ...resume }))
      document.title = resume.title
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: Folder },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume()
    // ensure personal_info keys exist
    setResumeData(prev => ({
      ...prev,
      personal_info: { linkedin: '', github: '', website: '', ...(prev.personal_info || {}) },
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const progressPct = Math.round((activeSectionIndex / (sections.length - 1)) * 100)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={'/app'} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left - form */}
          <div className="lg:col-span-5">
            <div className="sticky top-20">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* header with progress */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">Build your CV</h2>
                      <p className="text-sm opacity-90 mt-0.5">Fill in the sections — preview updates live</p>
                    </div>
                    <div className="text-sm font-medium">{progressPct}%</div>
                  </div>
                  <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-slate-700">{activeSection.name}</h3>
                    <div className="flex items-center gap-2">
                      {activeSectionIndex !== 0 && (
                        <button
                          onClick={() => setActiveSectionIndex(i => Math.max(i - 1, 0))}
                          className="text-sm text-slate-600 px-3 py-1.5 rounded-md hover:bg-slate-50 transition"
                        >
                          <ChevronLeft className="inline-block mr-1 size-4" /> Previous
                        </button>
                      )}
                      <button
                        onClick={() => setActiveSectionIndex(i => Math.min(i + 1, sections.length - 1))}
                        className="text-sm text-white bg-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                        disabled={activeSectionIndex === sections.length - 1}
                      >
                        Next <ChevronRight className="inline-block ml-1 size-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    {activeSection.id === 'personal' ? (
                      <PersonalInfoForm
                        data={resumeData.personal_info}
                        onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                      />
                    ) : (
                      <div className="py-8 text-center text-sm text-slate-500 rounded-md border border-dashed border-gray-100">
                        {activeSection.name} form goes here — continue to next steps.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - live preview */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl p-6 shadow-lg border border-gray-100">
              <div
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: 'rgba(15,23,42,0.06)' }}
              >
                <div className="p-6 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
                      {resumeData.personal_info.image ? (
                        <img
                          src={typeof resumeData.personal_info.image === 'string' ? resumeData.personal_info.image : URL.createObjectURL(resumeData.personal_info.image)}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-indigo-600 text-3xl font-bold">{(resumeData.personal_info.fullName || 'JD').slice(0,1)}</div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-2xl font-bold text-slate-900">{resumeData.personal_info.fullName || 'Your Name'}</h1>
                          <p className="text-sm text-slate-500 mt-1">Professional Title • Location: {resumeData.personal_info.location || '—'}</p>
                        </div>
                        <div className="text-sm text-indigo-600 font-medium">Preview</div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="font-medium text-slate-800">Email:</span>
                          <span>{resumeData.personal_info.email || 'you@company.com'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="font-medium text-slate-800">Phone:</span>
                          <span>{resumeData.personal_info.phone || '—'}</span>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                          {resumeData.personal_info.linkedin ? (
                            <a href={resumeData.personal_info.linkedin} className="text-indigo-600 underline text-sm" target="_blank" rel="noreferrer">LinkedIn</a>
                          ) : null}
                          {resumeData.personal_info.github ? (
                            <a href={resumeData.personal_info.github} className="text-indigo-600 underline text-sm" target="_blank" rel="noreferrer">GitHub</a>
                          ) : null}
                          {resumeData.personal_info.website ? (
                            <a href={resumeData.personal_info.website} className="text-indigo-600 underline text-sm" target="_blank" rel="noreferrer">Website</a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4 text-sm text-slate-600">
                    <p className="italic">Tip: use a professional photo and add LinkedIn/GitHub links to boost your profile.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">Save</button>
                <button className="border border-gray-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition">Export PDF</button>
                <button className="ml-auto text-sm text-slate-500">Preview full resume →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
