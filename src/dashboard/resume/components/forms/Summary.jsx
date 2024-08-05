import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from '../../../../../service/AIModel';


const prompt = "Job title: {jobTitle}, Depends on job title give summary within 4 to 5 lines in JSON format with fields: experience Level and summary with experience level for Fresher, Mid-level, Experienced.";


function Summary({enabledNext}) {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList,setAiGeneratedSummaryList] = useState();
    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    },[summary])
    
    const GenerateSummaryFromAI = async()=>{
        setLoading(true);
       
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
        console.log(PROMPT);
        
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse('['+result.response.text() + ']'));
     
        setAiGeneratedSummaryList(JSON.parse('['+result.response.text() + ']'));
        setLoading(false);
    }

    const onSave = (e)=>{
        e.preventDefault();
        setLoading(true);
        const data = {
            data:{
                summary: summary
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId , data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Summary Updated")
        },(err)=>{
            setLoading(false);
        })
    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Add Summary for your Job Title</p>

            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summary</label>
                    <Button onClick={()=>GenerateSummaryFromAI()} type='button' variant="outline" size="sm" className="border-primary text-primary flex gap-2"><Brain className='h-4 w-4'/> Generate from AI</Button>
                </div>
                <Textarea required className="mt-5" onChange={(e)=>{setSummary(e.target.value)}}/>

                <div className='mt-2 flex justify-end'>
                <Button disabled={loading} type='submit'>
                    {loading?<LoaderCircle className='animate-spin'/>: 'Save'}
                </Button>
                </div>
            </form>
        </div>

        {aiGeneratedSummaryList&& <div className='mt-7'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummaryList.map((item,index)=>(
                <div key={index}>
                    <h2 className='font-bold my-1'>Level: {item?.experienceLevel}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
    </div>
  )
}

export default Summary