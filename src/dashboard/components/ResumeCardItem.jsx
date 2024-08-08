import { Edit, LoaderCircle, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '../../../service/GlobalApi'
import { toast } from 'sonner'


function ResumeCardItem({resume ,refreshData}) {

  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete=()=>{
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume deleted successfully!');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    },(err)=>{
      toast("")
      setLoading(false)
    })
  }
  return (
  <div >
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
      <div className='p-14 rounded-t-lg bg-gradient-to-b from-pink-200 via-purple-300 to-blue-300 flex justify-center items-center hover:bg-gradient-to-l hover:transition-all h-[280px] border-t-4 border-red-400 hover:scale-100 transition-all hover:shadow-md shadow-primary mb-0'>
        <Notebook/>
      </div>
    </Link>
    <div className='border p-3 flex justify-between text-white bg-red-400 rounded-b-lg' style={{
      background:resume?.themeColor
    }}>
      <h2 className='text-sm'>{resume.title}</h2>
      <div className='cursor-pointer'>
      <DropdownMenu className='cursor-pointer'>
        <DropdownMenuTrigger>
          <MoreVertical className='h-4 w-4 cursor-pointer'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className='hover:cursor-pointer' onClick={()=>navigate('/dashboard/resume/'+resume.documentId+'/edit')}>Edit</DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer' onClick={()=>navigate('/my-resume/'+resume.documentId+'/view')}>View</DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer' onClick={()=>navigate('/my-resume/'+resume.documentId+'/view')}>Download</DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer' onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading? <LoaderCircle className='animate-spin'/> : 'Delete'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      </div>
    </div>
  </div>
  )
}

export default ResumeCardItem