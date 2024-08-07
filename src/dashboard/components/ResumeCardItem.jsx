import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resume}) {
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
      <div className='p-14 bg-gradient-to-b from-pink-200 via-purple-300 to-blue-300 flex justify-center items-center h-[280px] border-t-4 border-red-400 rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary'>
        <Notebook/>
      </div>
      <h2 className='text-center my-1'>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCardItem