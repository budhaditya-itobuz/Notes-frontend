import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiStickyNote } from "react-icons/ci";
import { Input } from './Input';


const Navbar = ({ setUser, setToken ,token,setData}) => {
    // const [search, setSearch] = useState("")
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
    }

    const searchNote = async (e) => {
        const search = e.target.value
        const response = await fetch(`http://localhost:4000/note/search-note?search=${search}`, {
            headers: {
                authorization: `bearer ${token}`
            }
        })
        const notes = await response.json()
        setData(notes.data)
    }

    return (
        <div className='flex justify-between items-center bg-[#008DDA] px-5'>
            <Link className='text-[#fff] text-2xl'>Notes App</Link>
            <Input
                // value={search}
                onChange={searchNote}
                type="text"
                placeholder="Search by title"
            />
            <div className='flex'>
                <Link onClick={logout} className='text-[#fff] text-2xl hover:bg-[#41C9E2] p-3' >Logout</Link>
            </div>

        </div>
    )
}

export default Navbar