import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {
    const [skillsList, setSkillsList] = useState([{
        name:'',
        rating:0,
    }])

    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();

    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills);
    },[])

    const handleChange=(index, name, value)=>{
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkill = ()=>{
        setSkillsList([...skillsList, {
            name:'',
            rating:0 
        }])
    }

    const RemoveSkill = ()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1));
    }

    const onSave = ()=>{
        setLoading(true);
        const data = {
            data:{
                skills: skillsList.map(({id,...rest})=> rest)
            }
        }
        GlobalApi.UpdateResumeDetail(params.documentId, data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated!')
        },(err)=>{
            toast("Server Error, please try again")
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    },[skillsList])

  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add your Professional Skills</p>
        

        <div>
            {skillsList.map((item, index)=>(
                <div className='flex justify-between items-center border rounded-lg p-3 my-2 gap-2' key={index}>
                    <div>
                        <label className='text-xs'>Name</label>
                        <Input defaultValue={item?.name} onChange={(e)=>handleChange(index,'name',e.target.value)}/>
                    </div>
                    <div >
                        <Rating style={{ maxWidth: 120 }} value={item?.rating} onChange={(v)=>handleChange(index,'rating',v)} />
                    </div>
                </div>
            ))}
        </div>

        <div className='flex justify-between  gap-2'>
                <div className='flex gap-2'>
                    <Button onClick={AddNewSkill} variant='outline' className='text-primary'>+ Add More Skills</Button>
                    <Button onClick={RemoveSkill} variant='outline' className='text-primary disabled:invisible '>Remove</Button>
                </div>
                
                <Button disabled={loading} onClick={()=>onSave()}>{loading?<LoaderCircle className='animate-spin'/> : "Save"}</Button>
            </div>
        </div>

    </div>
  )
}

export default Skills