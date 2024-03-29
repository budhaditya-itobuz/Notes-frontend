import React, { useState } from 'react'
import { Input } from '../../components/Input.jsx'
import { Link } from 'react-router-dom'

export const Register = () => {
    const [form, setForm] = useState({})

    const formHandle = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log(form)
        const response = await fetch("http://localhost:4000/user/register-user", {
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            method: "post",
            body: JSON.stringify(form)
        })
        const data = await response.json()
        console.log(data)
        alert(data.message)
    }

    return (
        <div className='m-auto max-w-[400px] my-5'>
            <h4 className='text-xl text-[#342843] text-center'>Register</h4>
            <form className="flex flex-col p-4 " >
                <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    onChange={formHandle}
                />
                <Input
                    placeholder="email"
                    type="text"
                    name="email"
                    onChange={formHandle}
                />
                <Input
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={formHandle}
                />
                <button onClick={handleRegister} type='submit' className='bg-blue text-[#fff] text-lg py-3 my-3 hover:bg-[#4a61a7] rounded'>Register</button>
            </form>
            <h6 className='text-bl'>Already Registered? <Link to="/login" className='text-blue hover:underline' href="">click here</Link> </h6>
        </div>
    )
}
