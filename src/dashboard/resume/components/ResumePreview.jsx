import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import Experience from './preview/Experience'
import EducationPreview from './preview/EducationPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
        borderColor: resumeInfo?.themeColor
    }}>
        {/* Personal Details */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* Summary  */}
        <SummaryPreview resumeInfo={resumeInfo}/>
        {/* Profesional Experience  */}
        <Experience resumeInfo={resumeInfo}/>
        {/* Education  */}
        <EducationPreview resumeInfo={resumeInfo} />
        {/* Skills  */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview