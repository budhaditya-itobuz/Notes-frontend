import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";



const NoteCard = ({title,text,id,deleteNote,updateInit}) => {
  return (
    <div className='bg-[#41C9E2] m-3 p-4 w-[300px] rounded overflow-x-scroll'>
        <h3 className='text-[#fff] text-4xl mb-4'>{title}</h3>
        <h5 className='text-[#fff] text-xl max-w-[90px]'>{text}</h5>
        <div className='flex my-3'>
            <CiEdit
                onClick={()=>{updateInit(id)}}
                className='bg-[#F7EEDD] w-[30px] h-[30px] p-1 rounded-full mr-2 hover:scale-[1.1]'
            />
            <MdDelete
                onClick={()=>{deleteNote(id)}}
                className='bg-[#F7EEDD] w-[30px] h-[30px] p-1 rounded-full mx-2 hover:scale-[1.1]'
            />
        </div>
    </div>
  )
}

export default NoteCard