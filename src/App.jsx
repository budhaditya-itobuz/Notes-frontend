import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Login } from './pages/Login/Login.jsx'
import { Register } from './pages/Register/Register.jsx'
import { NotesPage } from './pages/Notes/NotesPage.jsx'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<NotesPage/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/register' element={<Register/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
