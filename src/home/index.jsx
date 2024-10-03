import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Header/>
      <div className="bg-gray-50 min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-1 flex-col justify-center items-center text-center px-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Build Stunning Resumes with AI
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Harness the power of AI to create professional, personalized resumes in just a few clicks.
        </p>
        <div className='flex'>
          <Link to={'/dashboard'}>
            <div className="px-10 py-4 mr-9 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition duration-300">
              Get Started Now
            </div>
          </Link>
          <Link to={'/dashboard'}>
            <div className="px-10 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition duration-300">
              Dashboard
            </div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-purple-50 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">AI-Powered</h3>
              <p className="text-gray-700">Leverage cutting-edge AI to create resumes tailored to your job application.</p>
            </div>
            <div className="p-8 bg-purple-50 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Easy Customization</h3>
              <p className="text-gray-700">Edit templates with an intuitive UI to match your style and preferences.</p>
            </div>
            <div className="p-8 bg-purple-50 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Multiple Formats</h3>
              <p className="text-gray-700">Download resumes in PDF, DOCX, and more, ready for any platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-900">
              <p className="text-lg italic">"This tool made resume creation so easy! Landed my dream job thanks to AI Resume Builder."</p>
              <h3 className="mt-4 text-xl font-semibold text-purple-700">- Alex Johnson</h3>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-900">
              <p className="text-lg italic">"The AI recommendations were spot on. My resume looks stunning!"</p>
              <h3 className="mt-4 text-xl font-semibold text-purple-700">- Maria Williams</h3>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-900">
              <p className="text-lg italic">"I’ve never made a resume so quickly! Highly recommend this app."</p>
              <h3 className="mt-4 text-xl font-semibold text-purple-700">- John Doe</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-purple-700 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-purple-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">1. Sign Up</h3>
              <p className="text-gray-700">Create an account in seconds and get started with our simple onboarding process.</p>
            </div>
            <div className="p-8 bg-purple-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">2. Enter Details</h3>
              <p className="text-gray-700">Fill out your professional details or upload your existing resume for customization.</p>
            </div>
            <div className="p-8 bg-purple-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">3. Get Your Resume</h3>
              <p className="text-gray-700">Generate and download your AI-powered, professionally formatted resume instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 AI Resume Builder. All rights reserved.</p>
          <p>Created by Prakarsh Verma</p>

          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
   
    </div>
  )
}

export default Home