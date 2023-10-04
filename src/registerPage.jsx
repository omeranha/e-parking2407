import React from 'react'
import "./registerPage.css"
import logo from "./assets/logoapp.svg"
import db from "./firebase"
import { set, onValue, ref } from "firebase/database"
import root from './root.jsx'
import { useState, useEffect } from 'react'
import MainPage from './MainPage.jsx'

function RegisterPage() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmpassword, setConfirmPassword] = useState("")
	const [lastuserid, setLastUserId] = useState(0)

	const loginUser = (email, password) => {
		onValue(ref(db, "users"), (snapshot) => {
			const users = snapshot.val()
			for (const key in users) {
				if (users[key].email == email && users[key].password == password) {
					root.render(<React.StrictMode> <MainPage userid={key} userEmail={email} userPassword={password} /> </React.StrictMode>)
				}
			}
		}, { onlyOnce: false })
	}
	
	const registerUser = (lastuserid, name, email, password, confirmpassword) => {
		if (name == "" || email == "" || password == "" || confirmpassword == "") {
			alert("Preencha todos os campos")
			return
		}
	
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			alert("Por favor use um email válido.")
			return
		}

		if (password != confirmpassword) {
			alert("As senhas digitadas não coincidem")
			return
		}

		if (password.length < 6) {
			alert("A senha deve ser de no mínimo 6 caracteres")
			return
		}

		setLastUserId(lastuserid++)
		set(ref(db, 'users/' + lastuserid), {
			name: name,
			email: email,
			password: password,
			hasBookedSpace: false,
			timeReserved: 0
		})
		loginUser(email, password)
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			onValue(ref(db, "users"), (snapshot) => {
				const data = snapshot.val()
				for (const key in data) {
					setLastUserId(key)
				}
			}, { onlyOnce: true }
			)
		}, 500)
		return () => clearInterval(intervalId)
	}, [])

	return (
	<div className="container">
		<div>
			<img src= {logo} alt="" id="logo" />
			</div>
			<form>
				<div className="inputContainer" >
					<label htmlFor="name"> Nome de Usuário </label>
					<input type="text" id="text" onChange={text => setName(text.target.value)} />
				</div>
				<div className="inputContainer">
					<label htmlFor="email"> Seu E-mail </label>
					<input type="text" id="text" onChange={text => setEmail(text.target.value)} />
				</div>
				<div className="inputContainer">
					<label htmlFor="password"> Sua Senha </label>
					<input type="text" id="text" onChange={text => setPassword(text.target.value)} />
				</div>
				<div className="inputContainer">
					<label htmlFor="confirmpassword"> Confirme sua Senha </label>
					<input type="text" id="text" onChange={text => setConfirmPassword(text.target.value)} />
				</div>
				<button className="ready" type="button" onClick={() => registerUser(lastuserid, name, email, password, confirmpassword)}> Pronto! </button>
			</form>
		</div>
	)
}

export default RegisterPage
