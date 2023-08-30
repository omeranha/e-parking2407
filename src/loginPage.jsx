import React from 'react'
import logo from "./assets/logoapp.svg"
import "./Page1.css"
import db from "./firebase"
import { onValue, ref } from "firebase/database"
import root from './root.jsx'
import { useState, useEffect } from 'react'
import RegisterPage from './registerPage.jsx'
import MainPage from './MainPage.jsx'

function loginPage() {
	const [email, setEmail] = useState("")

	const toRegisterPage = (e) => {
		e.preventDefault()
		root.render(<React.StrictMode> <RegisterPage/> </React.StrictMode>)
	}
	
	const handlePassword = (email, password) => {
		onValue(ref(db, "users"), (snapshot) => {
			const users = snapshot.val()
			for (const key in users) {
				if (users[key].email == email && users[key].password == password) {
					root.render(<React.StrictMode> <MainPage userid={key} userEmail={email} userPassword={password} /> </React.StrictMode>)
				}
			}
		}, { onlyOnce: false })
	}

	return (
	<div className="container"> 
	<div>
		<img src= {logo} alt="" id="logoapp" />
		</div>
		<form>
			<div className="inputContainer">
				<label htmlFor="user"></label>
				<input type="text" name="" id="user" placeholder= "  › Usuário" onChange={text => setEmail(text.target.value)}/>
			</div>
			<div className="inputContainer">
				<label htmlFor="senha"></label> 
				<input type="text" name=" " id="password" placeholder= "  › Senha" onChange={text => handlePassword(email, text.target.value)}/>
			</div>
			<div id='noaccline'>
			------------- Não tem uma conta? -------------
			</div>
			<button className="signup" type="button" onClick={(e) => toRegisterPage(e)}> Cadastre-se! </button>
		</form>
		</div>
	)
}

export default loginPage
