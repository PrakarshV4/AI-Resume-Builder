import React, { useContext, useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Button } from '@/components/ui/button';
import { Home, LayoutGrid, LucideArrowLeft, LucideArrowRight } from 'lucide-react';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
 
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const params = useParams()
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
            <Button size='sm'><Home/></Button>
          </Link>

          <ThemeColor/>
          
        </div>
        <div className='flex gap-2'>
          {activeFormIndex>1 && 
          <Button size='sm' onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <LucideArrowLeft/> </Button>  }
          <Button disabled={!enableNext} className='flex gap-2' size='sm'
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}> Next <LucideArrowRight/></Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex==1 ? 
      <PersonalDetail enabledNext={(v)=>setEnableNext(v)}/> :
       activeFormIndex==2 ? 
      <Summary enabledNext={(v)=>setEnableNext(v)}/>: 
      activeFormIndex==3 ? 
      <Experience enabledNext={(v)=>setEnableNext(v)}/> : 
      activeFormIndex == 4 ? 
      <Education enabledNext={(v)=>setEnableNext(v)}/> : 
      activeFormIndex==5 ? 
      <Skills/>:
      activeFormIndex==6? 
      <Navigate to={'/my-resume/'+params.documentId+'/'+params.resumeId+'/view'}/>:
      null}
      
    </div>
  )
}

export default FormSection