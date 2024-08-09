import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'
import { toast } from 'sonner'
  

function ThemeColor() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    const [selectedColor, setSelectedColor] = useState()

    const params = useParams();
    const colors=[
        "#FF5733", "#3357FF","#EB51D1","#A51BF5","#1B22F5","#1B79F5","#1BC2F5","#1BF5B3","#1BF531","#22CB0F","#F3EC1E","#F3C11E","#F3811E","#F3651E",'#F33A1E'
    ]

    const OnSelect = (color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })
        const data={
            data:{
                themeColor: color
            }
        }
        GlobalApi.UpdateResumeDetail(params.documentId , data).then(resp=>{
            console.log(resp);
            toast('Theme Color updated')
        })
    }
  return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='flex gap-2'><LayoutGrid/> Theme</Button>
            </PopoverTrigger>

            <PopoverContent>
                <h2 className='mb-3 text-sm font-bold'>Select Theme</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item,index)=>(
                        <div key={index} onClick={()=>OnSelect(item)}
                        className={`h-5 w-5 rounded-full cursor-pointer  hover:border-black border ${selectedColor==item?'border-black':''}`}
                        style={{
                            background:item
                        }}>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>

    </div>
  )
}

export default ThemeColor