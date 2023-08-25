import React from 'react'
import logo from "./assets/logoapp.svg";
import "./Page1.css";
import line from "./assets/line1.svg";
import db from "./firebase";
import { set, onValue, ref } from "firebase/database";
import MainPage from './MainPage.jsx'
import root from './root.jsx'
import Cadastro from './Cadastro';

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

const toCadastro = (e) => {
	e.preventDefault()
	root.render(<React.StrictMode> <Cadastro/> </React.StrictMode>);
}

function App() {
	let email = ""
	let password = ""

	return (
	<div className="container"> 
	<div>
		<img src= {logo} alt="" id="logo" />
		</div>
		<form>
			<div className="inputContainer">
				<label htmlFor="user"></label>
				<input type="text" name="" id="user" placeholder= "  › Usuário" onChange={text => email = text.target.value}/>
			</div>
			<div className="inputContainer">
				<label htmlFor="senha"></label> 
				<input type="text" name=" " id="password" placeholder= "  › Senha" onChange={text => password = text.target.value}/>
			</div>
			<div>
				<a href=" "><img src= {line} alt="" id="line"/>
				<output type="button" onClick={(e) => toCadastro(e)}> Não tem uma conta? </output>
				<img src={line} alt="" id="line2"/></a>
			</div>
			<button className="signup" type="button" onClick={() => loginUser(email, password)}> Entrar </button>
		</form>
		</div>
	)
}

export default App
