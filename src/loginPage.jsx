import React from 'react'
import logo from "./assets/logoapp.svg"
import "./loginPage.css"
import db from "./firebase"
import { onValue, ref } from "firebase/database"
import root from './root.jsx'
import { useState, useEffect } from 'react'
import RegisterPage from './registerPage.jsx'
import MainPage from './MainPage.jsx'

function LoginPage() {
	const [name, setName] = useState("")

	const toRegisterPage = (e) => {
		e.preventDefault()
		root.render(<React.StrictMode> <RegisterPage/> </React.StrictMode>)
	}
	
	const handlePassword = (name, password) => {
		onValue(ref(db, "users"), (snapshot) => {
			const users = snapshot.val()
			for (const key in users) {
				if (users[key].name == name && users[key].password == password) {
					root.render(<React.StrictMode> <MainPage userid={key} name={name} userPassword={password} /> </React.StrictMode>)
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
				<input type="text" name="" id="user" placeholder= "  › Usuário" onChange={text => setName(text.target.value)}/>
			</div>
			<div className="inputContainer">
				<label htmlFor="senha"></label> 
				<input type="text" name=" " id="password" placeholder= "  › Senha" onChange={text => handlePassword(name, text.target.value)}/>
			</div>
			<div id='noaccline'>
			------------- Não tem uma conta? -------------
			</div>
			<button className="signup" type="button" onClick={(e) => toRegisterPage(e)}> Cadastre-se! </button>
		</form>
		</div>
	)
}

export default LoginPage
