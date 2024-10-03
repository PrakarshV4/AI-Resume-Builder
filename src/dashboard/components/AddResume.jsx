import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from '../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume() {
    const [openDialog ,setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState();
    const navigation = useNavigate();
    const {user} = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    // console.log(user)
    const [loading, setLoading] = useState(false);
    
    const onCreate = async ()=>{
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            data:{
                title: resumeTitle,
                resumeId: uuid,
                userEmail:userEmail,
                userName:user?.fullName
            }
        }
        console.log(data)
        GlobalApi.CreateNewResume(data).then(resp=>{
            if(resp){
                console.log(resp)
                setLoading(false);
                let documentId = resp.data.data.documentId;
                navigation('/dashboard/resume/'+documentId+'/'+resp.data.data.resumeId+'/edit');//reumeiD is passed
            }
        },(error)=>{
            setLoading(false);
        })
    }
  return (
    <div>
        <div className='p-14 py-24 border bg-secondary flex justify-center items-center rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed '
        onClick={()=>setOpenDialog(true)}>
            <PlusSquare/>
        </div>

        <Dialog open={openDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
                Add title for your new resume
                <Input className='my-2' placeholder='Eg. Full Stack resume'
                onChange={(e)=> setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className='flex justify-end gap-5'>
                <Button onClick={()=>setOpenDialog(false)} variant="ghost">Cancel</Button>
                <Button disabled={!resumeTitle || loading} onClick={()=>onCreate()}>
                    {loading? 
                    <Loader2 className='animate-spin'/> : 'Create'}
                </Button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>

        
    </div>
  )
}

export default AddResume