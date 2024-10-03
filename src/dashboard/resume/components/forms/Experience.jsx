import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

// const formField = {
//     title:'',
//     companyName:'',
//     city:'',
//     state:'',
//     startDate:'',
//     endDate:'',
//     workSummary:''
// } 
function Experience() {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    
    const [experienceList, setExperienceList] = useState([{
        title:'',
        companyName:'',
        city:'',
        state:'',
        startDate:'',
        endDate:'',
        workSummary:''
    }])

    useEffect(()=>{
        console.log("resume")
        console.log(resumeInfo)
        resumeInfo&&setExperienceList(resumeInfo?.experience)
        console.log(experienceList)
    },[])

    const handleChange = (index, event)=>{
        const newEntries = experienceList.slice();  //made a copy[formfield]
        const {name, value} = event.target;
        newEntries[index] [name] = value;
        setExperienceList(newEntries);
    }

    const handleRichTextEditor = (e,name,index)=>{
        let newEntries = experienceList.slice(); 
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }

    const AddNewExperience = ()=>{
        setExperienceList([...experienceList,{
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummary:''
        }]);
    }

    const RemoveExperience = ()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

    const onSave =() => {
        setLoading(true);
        const data={
            data:{
                experience:experienceList.map(({id,...rest})=>rest)
            }
        }
        GlobalApi.UpdateResumeDetail(params?.documentId, data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated!')
        },(err)=>{
            setLoading(false);
            toast('Server error, please try again')
        })
    }

    //to make sure that onChange the text is rendered on the preview
    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo, 
            experience:experienceList
        })  
    
    },[experienceList])
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
            {experienceList.map((item, index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input defaultValue={item.title} name='title' onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input defaultValue={item.companyName} name='companyName' onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div>
                            <label className='text-xs'>City</label>
                            <Input defaultValue={item.city} name='city' onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div>
                            <label className='text-xs'>State</label>
                            <Input defaultValue={item.state} name='state' onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input defaultValue={item.startDate} type='date' name='startDate' onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input defaultValue={item.endDate} type='date' name='endDate' onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        
                        <div className='col-span-2'>
                            {/* Work Summary */}
                            <RichTextEditor defaultValue={item?.workSummary} index={index} onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummary',index)}/>
                        </div>

                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button onClick={AddNewExperience} variant='outline' className='text-primary'>+ Add More Education</Button>
                    <Button onClick={RemoveExperience} variant='outline' className='text-primary disabled:invisible '>Remove</Button>
                </div>
                
                <Button disabled={loading} onClick={()=>onSave()}>{loading?<LoaderCircle className='animate-spin'/> : "Save"}</Button>
            </div>
    </div>
    </div>
  )
}

export default Experience