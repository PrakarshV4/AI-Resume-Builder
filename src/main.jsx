import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
import EditResume2 from './dashboard/resume/[documentId]/[resumeId]/edit/index.jsx'
import ViewResume2 from './my-resume/[documentId]/[resumeId]/view/index.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY //for clerk
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([{
    element:<App/>,
    children:[{
      path: '/dashboard',
      element:<Dashboard/>
    },
    {
      path: '/dashboard/resume/:resumeId/edit',
      element: <EditResume/>
    },
    {
      path: '/dashboard/resume/:documentId/:resumeId/edit',
      element: <EditResume2/>
    },
  ]
  },
  {
    path: '/',
    element:<Home/>
  },
  {
    path:'/auth/sign-in',
    element: <SignInPage/>
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume/>
  },
  {
    path: '/my-resume/:documentId/:resumeId/view',
    element: <ViewResume2/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
