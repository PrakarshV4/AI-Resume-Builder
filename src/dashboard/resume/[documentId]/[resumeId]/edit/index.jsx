import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../../components/FormSection';
import ResumePreview from '../../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../../../../../service/GlobalApi';

function EditResume2() {

    const params = useParams(); //to get resumeId from params
    const [resumeInfo, setResumeInfo] = useState();
    useEffect(()=>{
        setResumeInfo(dummy);
        GetResumeInfo()
    },[])

    const GetResumeInfo = ()=>{
      GlobalApi.GetResumeById(params.documentId).then(resp=>{
        // console.log(resp.data.data);
        setResumeInfo(resp.data.data.attributes)
      })
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div className='grid grid-cols-2 md:grid-cols-2 p-10 gap-10'>
            {/* FormSection */}
            <FormSection/>

            {/* Preview Resume Section */}
            <ResumePreview/>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume2