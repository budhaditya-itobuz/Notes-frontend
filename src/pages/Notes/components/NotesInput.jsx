import React, { useState } from 'react'
import { Input } from '../../../components/Input'
import Swal from 'sweetalert2'


const NotesInput = ({ isUpdate, token, setLoad ,form,setForm,updateNote,updateId,setUpdateId,setIsUpdate}) => {

    const formHandle = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const addNote = async (e) => {
        setLoad(true)
        e.preventDefault()
        if (form.title.trim() === "" || form.text.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please add both fields!",
            });
        }
        else {
            const response = await fetch("http://localhost:4000/note/add-note", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`
                },
                mode: 'cors',
                method: "post",
                body: JSON.stringify({
                    title: form.title.trim(),
                    text: form.text.trim()
                })
            })
            const data = await response.json()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Note has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            setForm({ title: "", text: "" })
        }
        setLoad(false)
    }

    const cancelUpdate = async () => {
        setIsUpdate(false)
        setUpdateId(null)
        setForm({title:"",text:""})
    }

    if (!isUpdate)
        return (
            <div className=' border mx-auto max-w-[400px] rounded my-5'>
                <form className='flex flex-col p-5' action="">
                    <input onChange={formHandle} value={form.title} name="title" className='focus:outline-none m-4' type="text" placeholder='Title' />
                    <textarea onChange={formHandle} value={form.text} name="text" className='focus:outline-none m-4 max-h-[100px]' placeholder='Text' id="" cols="2" rows="10"></textarea>
                </form>
                <button onClick={addNote} className='bg-[#54B847] px-4 py-2 m-3 rounded hover:scale-[1.1] duration-500 '>Add</button>
            </div>
        )
    else
        return (
            <div className=' border mx-auto max-w-[400px] rounded my-5 '>
                <form className='flex flex-col p-5' action="">
                    <input onChange={formHandle} name="title" value={form.title} className='focus:outline-none m-4' type="text" placeholder='Title' />
                    <textarea onChange={formHandle} name="text" value={form.text} className='focus:outline-none m-4 max-h-[100px] ' placeholder='Text' id="" cols="2" rows="10"></textarea>
                </form>
                <button onClick={()=>{updateNote(updateId)}} className='bg-[#54B847] px-4 py-2 m-3 rounded hover:scale-[1.1] duration-500'>Update</button>
                <button onClick={cancelUpdate} className='bg-[#cf3530] text-[#fff] px-4 py-2 m-3 rounded hover:scale-[1.1] duration-500'>Cancel</button>
            </div>
        )
}

export default NotesInput