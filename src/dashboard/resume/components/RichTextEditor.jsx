import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from '../../../../service/AIModel';
import { toast } from 'sonner';

const PROMPT = 'position title:{positionTitle} ,Depending upon the position title give me 5 points for my experience in resume. give me result inside a experience_bullets in JSON.';

function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {

    const [value, setValue] = useState(defaultValue);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [loading,setLoading] = useState(false);

    const GenerateSummaryFromAI = async()=>{
        setLoading(true);
        if(!resumeInfo.experience[index].title){
            toast('Please enter position title')
            return
        }
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
        const result = await AIChatSession.sendMessage(prompt);
        console.log(JSON.parse(result.response.text()).experience_bullets);
        const temp = JSON.parse(result.response.text()).experience_bullets;
        const resp = JSON.stringify(temp);
        console.log("response: " + resp);
        console.log(resp.replace('/[/g', '').replace('/]/g', ''));
        setValue(resp.replace('[', '').replace(']', '').replace(/","/g, ' '.replace(/"/g, ' ')));
        setLoading(false);
    }
    
  return (
    <div>
        <div className='flex justify-between my-2'>
            <label className='text-xs'>Summary</label>
            <Button 
            onClick={GenerateSummaryFromAI} className='flex gap-2 border-primary text-primary' size='sm' variant='outline'>
                { loading ? <LoaderCircle className='animate-spin'/>  :  <><Brain className='h-4 w-4'/>Generate from AI </>}
            </Button>
                
        </div>
        <EditorProvider>
            <Editor value={value} onChange={(e)=>{
                setValue(e.target.value);
                onRichTextEditorChange(e);
            }}>
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                </Toolbar>
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor