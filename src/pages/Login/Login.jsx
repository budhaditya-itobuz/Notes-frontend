import React, { useEffect, useState } from 'react'
import { Input } from '../../components/Input.jsx'
import { Link, Navigate, useNavigate} from 'react-router-dom'

export const Login = () => {
	const [form, setForm] = useState({})
	const navigate = useNavigate()

	const verifyUser = async () => {
		const myToken = localStorage.getItem('token')
		if (!!myToken) {
			const response = await fetch("http://localhost:4000/user/verify-user", {
				headers: {
					"Content-Type": "application/json"
				},
				mode: 'cors',
				method: "post",
				body: JSON.stringify({token:myToken})
			})
			const data = await response.json()
			if(data.data.success)
			{
				navigate("")
			}
		}
	}

	useEffect(() => {
		verifyUser()
	}, [])

	const formHandle = (e) => {
		const { name, value } = e.target
		setForm({ ...form, [name]: value })
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		const response = await fetch("http://localhost:4000/user/login-user", {
			headers: {
				"Content-Type": "application/json"
			},
			mode: 'cors',
			method: "post",
			body: JSON.stringify(form)
		})
		const data = await response.json()
		alert(data.message)
		if (!!data.token) {
			localStorage.setItem("token", data.token)
			navigate("/")
		}
	}

	return (
		<>
			<div className='max-w-[400px] m-5 mx-auto'>
				<h4 className='text-xl text-[#342843] text-center'>LOGIN</h4>
				<form className="flex flex-col p-4 " >
					<Input
						name="email"
						placeholder="username"
						type="text"
						onChange={formHandle}
					/>
					<Input
						name="password"
						placeholder="password"
						type="password"
						onChange={formHandle}
					/>
					<button type='submit' className='bg-blue text-[#fff] text-lg py-3 my-3 hover:bg-[#4a61a7] rounded' onClick={handleLogin}>LOGIN</button>
				</form>
				<h6 className='text-bl'>Not Registered? <Link to="/register" className='text-blue hover:underline' href="">click here</Link> </h6>
			</div>
		</>
	)
}
