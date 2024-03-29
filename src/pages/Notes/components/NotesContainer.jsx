import React, { useEffect } from 'react'
import NoteCard from '../../../components/NoteCard'
import Swal from 'sweetalert2'


const NotesContainer = ({ data, setData, token, load, setLoad, setIsUpdate, setForm, isUpdate, updateNote, updateId, setUpdateId }) => {


    const deleteNote = async (id) => {
        if (id === updateId) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Note is currently updating!",
            });
            return
        }
        setLoad(true)
        const response = await fetch(`http://localhost:4000/note/delete-note/${id}`, {
            method: "delete",
            headers: {
                authorization: `bearer ${token}`
            }
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Note has been Deleted",
            showConfirmButton: false,
            timer: 1500
        });
        setLoad(false)
    }

    const updateInit = async (id) => {
        if (id === updateId)
            return
        if (isUpdate) {
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    updateNote(updateId)
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    setForm({ title: "", text: "" })
                    Swal.fire("Changes are not saved");
                    setIsUpdate(false)
                    setUpdateId(null)
                    return
                }
            });
        }
        else {
            setIsUpdate(true)
            setUpdateId(id)
            const item = data.find((item) => item._id === id)
            setForm({ title: item.title, text: item.text })
        }
    }



    return (
        <div className='flex w-100 flex-wrap justify-center'>
            {
                data?.map(item => {
                    return (
                        <NoteCard
                            title={item.title}
                            text={item.text}
                            id={item._id}
                            deleteNote={deleteNote}
                            updateInit={updateInit}
                        />
                    )
                })
            }
        </div>
    )
}

export default NotesContainer