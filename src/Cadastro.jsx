import React from 'react'
import "./Page2.css";
import logo from "./assets/logoapp.svg";
import db from "./firebase";
import { set, onValue, ref } from "firebase/database";
import MainPage from './MainPage.jsx'
import root from './root.jsx'

const loginUser = (email, password) => {
	onValue(ref(db, "users"), (snapshot) => {
		const users = snapshot.val()
		for (const key in users) {
			if (users[key].email == email && users[key].password == password) {
				root.render(<React.StrictMode> <MainPage/> </React.StrictMode>);
			}
		}
	}, { onlyOnce: false })
}

const registerUser = (lastuserid, name, email, password, confirmpassword) => {
	if (name == "" || email == "" || password == "" || confirmpassword == "") {
		alert("preencha todos os campos")
		return
	}

	if (password != confirmpassword) {
		alert("senhas não coincidem")
		return
	}

	lastuserid++
	set(ref(db, 'users/' + lastuserid), {
		name: name,
		email: email,
		password: password
	})
	loginUser()
}

function Cadastro() {
	let name = ""
	let email = ""
	let password = ""
	let confirmpassword = ""
	let lastuserid = 0

	onValue(ref(db, "users"), (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			lastuserid = key
		}
	}, { onlyOnce: false }
	);

	return (
	<div className="container">
		<div>
			<img src= {logo} alt="" id="logo" />
			</div>
			<form>
				<div className="inputContainer" >
					<label htmlFor="name"> Nome de Usuário </label>
					<input type="text" id="text" onChange={text => name = text.target.value} />
				</div>
				<div className="inputContainer">
					<label htmlFor="email"> Seu E-mail </label>
					<input type="text" id="text" onChange={text => email = text.target.value} />
				</div>
				<div className="inputContainer">
					<label htmlFor="password"> Sua Senha </label>
					<input type="text" id="text" onChange={text => password = text.target.value} />
				</div>
				<div className="inputContainer">
					<label htmlFor="confirmpassword"> Confirme sua Senha </label>
					<input type="text" id="text" onChange={text => confirmpassword = text.target.value} />
				</div>
				<button className="ready" type="button" onClick={() => registerUser(lastuserid, name, email, password, confirmpassword)}> Pronto! </button>
			</form>
		</div>
	)
}

export default Cadastro
