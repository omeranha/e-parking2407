import React from 'react'
import logo from "./assets/logoapp.svg";
import "./Page1.css";
import db from "./firebase";
import { set, onValue, ref } from "firebase/database";
import MainPage from './MainPage.jsx'
import root from './root.jsx'
import Cadastro from './Cadastro';

const toCadastro = (e) => {
	e.preventDefault()
	root.render(<React.StrictMode> <Cadastro/> </React.StrictMode>);
}

const handlePassword = (email, text) => {
	onValue(ref(db, "users"), (snapshot) => {
		const users = snapshot.val()
		for (const key in users) {
			if (users[key].email == email && users[key].password == text.target.value) {
				root.render(<React.StrictMode> <MainPage/> </React.StrictMode>);
			}
		}
	}, { onlyOnce: false })
}

function App() {
	let email = ""

	return (
	<div className="container"> 
	<div>
		<img src= {logo} alt="" id="logoapp" />
		</div>
		<form>
			<div className="inputContainer">
				<label htmlFor="user"></label>
				<input type="text" name="" id="user" placeholder= "  › Usuário" onChange={text => email = text.target.value}/>
			</div>
			<div className="inputContainer">
				<label htmlFor="senha"></label> 
				<input type="text" name=" " id="password" placeholder= "  › Senha" onChange={text => handlePassword(email, text)}/>
			</div>
			<div id='noaccline'>
			------------- Não tem uma conta? -------------
			</div>
			<button className="signup" type="button" onClick={(e) => toCadastro(e)}> Cadastre-se! </button>
		</form>
		</div>
	)
}

export default App
