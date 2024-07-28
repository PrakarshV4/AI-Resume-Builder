import React, { useContext, useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Button } from '@/components/ui/button';
import { LayoutGrid, LucideArrowLeft, LucideArrowRight } from 'lucide-react';

function FormSection() {
 
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant='otline' size='sm' className='flex gap-2'><LayoutGrid/> Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex>1 && 
          <Button size='sm' onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <LucideArrowLeft/> </Button>  }
          <Button disabled={!enableNext} className='flex gap-2' size='sm'
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}> Next <LucideArrowRight/></Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex==1 ? <PersonalDetail enabledNext={(v)=>setEnableNext(v)}/> : null}
      {/* Summary */}
      {/* Experience */}
      {/* Education Detail */}
      {/* Skills */}
    </div>
  )
}

export default FormSection