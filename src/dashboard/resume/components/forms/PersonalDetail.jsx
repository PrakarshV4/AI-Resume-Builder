import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from "sonner"


function PersonalDetail({enabledNext}) {
  
    const params = useParams();
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState();
    useEffect(()=>{
        console.log(params);
    },[])

    const handleInputChange = (e)=>{
        enabledNext(false);
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }

    const onSave = (e)=>{
        e.preventDefault(); //to make sure on Submit screen does not refresh
        setLoading(true);
        const data = {
            data: formData
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Detail Updated")
        },(err)=>{
            setLoading(false)
        })
        enabledNext(true);
    }

    return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Details</h2>
        <p>Get started with the basic information</p>

        <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name </label>
                    <Input name='firstName' required onChange={handleInputChange} defaultValue={resumeInfo?.firstName}/>
                </div>
                <div >
                    <label className='text-sm'>Last Name </label>
                    <Input name='lastName' required onChange={handleInputChange} defaultValue={resumeInfo?.lastName}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title </label>
                    <Input name='jobTitle' required onChange={handleInputChange} defaultValue={resumeInfo?.jobTitle}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address </label>
                    <Input name='address' required onChange={handleInputChange} defaultValue={resumeInfo?.address} />
                </div>
                <div>
                    <label className='text-sm'>Phone </label>
                    <Input name='phone' required onChange={handleInputChange} defaultValue={resumeInfo?.phone}/>
                </div>
                <div>
                    <label className='text-sm'>Email </label>
                    <Input name='email' required onChange={handleInputChange} defaultValue={resumeInfo?.email}/>
                </div>
            </div>
            <div className='mt-2 flex justify-end'>
                <Button disabled={loading} type='submit'>
                    {loading?<LoaderCircle className='animate-spin'/>: 'Save'}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail