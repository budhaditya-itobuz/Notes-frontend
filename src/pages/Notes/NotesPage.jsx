import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
import NotesInput from './components/NotesInput'
import NotesContainer from './components/NotesContainer'
import Swal from 'sweetalert2'

export const NotesPage = () => {
	const [user, setUser] = useState(null)
	const [isUpdate, setIsUpdate] = useState(false)
	const [updateId,setUpdateId] =useState(null)
	const [data, setData] = useState(null)
	const [token, setToken] = useState(localStorage.getItem('token'))
	const [load,setLoad]=useState(false)
	const navigate = useNavigate()
	const [form, setForm] = useState({ title: "", text: "" })


	const verifyUser = async () => {
		const myToken = localStorage.getItem('token')
		if (!!myToken) {
			const response = await fetch("http://localhost:4000/user/verify-user", {
				headers: {
					"Content-Type": "application/json"
				},
				mode: 'cors',
				method: "post",
				body: JSON.stringify({ token: myToken })
			})
			const data = await response.json()
			if (!data.data.success) {
				navigate("/login")
			}
			else {
				setUser(data.data.user)
			}
		}
		else {
			navigate("/login")
		}
	}

	const getNotes = async () => {
        const response = await fetch("http://localhost:4000/note/get-all-notes", {
            headers: {
                authorization: `bearer ${token}`
            }
        })
        const notes = await response.json()
        setData(notes.data)
    }

	const updateNote = async (id) =>{
        setLoad(true)
        const response = await fetch(`http://localhost:4000/note/update-note/${id}`, {
            method:"put",
            headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${token}`
			},
			body:JSON.stringify(form)
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Note has been Updated",
            showConfirmButton: false,
            timer: 1500
        });
        setLoad(false)
		setIsUpdate(false)
		setUpdateId(null)
		setForm({title:"",text:""})
    }

	useEffect(() => {
		verifyUser()
	}, [token])

	useEffect(() => {
		getNotes()
	}, [load])

	return (
		<>
			<Navbar
				setUser={setUser}
				setToken={setToken}
				setLoad={setLoad}
				setData={setData}
				token={token}
			/>

			<NotesInput
				updateNote={updateNote}
				isUpdate={isUpdate}
				token={token}
				setLoad={setLoad}
				form={form}
				setForm={setForm}
				updateId={updateId}
				setUpdateId={setUpdateId}
				setIsUpdate={setIsUpdate}
			/>
			
			<NotesContainer
				updateNote={updateNote}
				isUpdate={isUpdate}
				setForm={setForm}
				data={data}
				token={token}
				setData={setData}
				setLoad={setLoad}
				setIsUpdate={setIsUpdate}
				setUpdateId={setUpdateId}
				updateId={updateId}
			/>
		</>
	)
}
