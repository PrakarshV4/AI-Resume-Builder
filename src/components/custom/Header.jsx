import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const {user, isSignedIn} = useUser();

  return (
    <div className='p-3 px-5 flex justify-between shadow-md sticky'>
        <Link to={'/'}>
            <img src="/logo.svg" width={100} height={100} />
        </Link>
        {
            isSignedIn ? (
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button variant='outline'>Dashboard</Button>
                    </Link>
                    <UserButton/>
                </div>
            ):(
                <Link to={'/auth/sign-in'}>
                    <Button className="bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300">Get Started</Button>
                </Link>
            )
        }
        {/* Navbar */}
      {/* <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-3xl font-extrabold text-purple-700">AI Resume Builder</div>
          <div className="flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition duration-200">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition duration-200">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition duration-200">Testimonials</a>
            <a href="#newsletter" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">
              Login
            </a>
          </div>
        </nav>
      </header> */}
    </div>
  )
}

export default Header