import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import { CopyToClipboard } from "react-copy-to-clipboard";

function ViewResume2() {
    
    const [resumeInfo , setResumeInfo] = useState();
    const params = useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(params.documentId).then(resp=>{
            // console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = ()=>{
        window.print();
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div id='no-print'>
            <Header/>

            <div className='my-10 mx-10 md:mx-20 lg:mx-36 bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col justify-center items-center gap-3'>
                <h2 className='text-center mt-10 mb-2.5 text-2xl font-medium text-white'>Your Resume is ready!</h2>
                <p className='text-center text-white'>Now you are ready to download your resume and also you can share your resume url. </p>
                <div className='flex justify-between gap-4 px-44 my-8'>
                    <Button className='text-white bg-purple-500' onClick={HandleDownload}>Download</Button>
                    
                    <RWebShare
                        data={{
                        text: "Like humans, flamingos make friends for life",
                        url: "https://on.natgeo.com/2zHaNup",
                        title: "Flamingos",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Button className='bg-white text-purple-700'>Share</Button>
                    </RWebShare>
                    
                    
                    
                    {/* <RWebShare
                        data={{
                        text: "Hi There, this is my Resume! Please click the link below to my resume",
                        url: "https://on.natgeo.com/2zHaNup",
                        title: "Share this article on Flamingos"
                        }}
                        onClick={() => console.info("share successful!")}
                    >
                        <button>Share</button>
                    </RWebShare> */}
                    {/* <RWebShare data={{
                        text: "Hi there, this is my resum. Please click the link below to see resume",
                        url: import.meta.env.VITE_BASE_URL+'/my-resume/'+params.documentId+'/'+params.resumeId+'/view',
                        title: resumeInfo?.firstName+' '+resumeInfo?.lastName+' resume',
                        }}
                        onClick={() => console.log("Shared successfully!")}
                    >
                        <Button>Share</Button>
                    </RWebShare> */}
                </div>  
            </div>
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <div id="print-area">
                <ResumePreview/>
            </div>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume2