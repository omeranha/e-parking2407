import logo from "./assets/logoapp.svg"
import './Page3.css'
import { useState, useEffect } from 'react'
import { set, onValue, ref } from "firebase/database"
import db from "./firebase"

function MainPage(props) {
	const { userid, userEmail, userPassword } = props
	const [spaces, setSpaces] = useState(0)
	const [parkinglot, setParkingLot] = useState("e-store")
	const [userReserved, setUserReserved] = useState(false)

	useEffect(() => {
		const intervalId = setInterval(() => {
			onValue(ref(db, "vagas"), (snapshot) => {
				setSpaces(snapshot.val())
			}, { onlyOnce: true }
			)

			onValue(ref(db, "users"), (snapshot) => {
				const users = snapshot.val()
				for (const key in users) {
					if (users[key].email == userEmail && users[key].hasBookedSpace) {
						setUserReserved(true)
					}
				}
			})
		}, 500)
		return () => clearInterval(intervalId)
	}, [])

	const bookSpace = () => {
		if (spaces <= 0 || parkinglot != "e-store") {
			return
		}
	
		set(ref(db, "vagas"), spaces - 1)
		set(ref(db, "users/" + userid + "/hasBookedSpace"), true)
		setUserReserved(true)
	}

	const openBarrier = (email) => {
		onValue(ref(db, "users"), (snapshot) => {
			const users = snapshot.val()
			for (const key in users) {
				if (users[key].email == email && users[key].hasBookedSpace) {
					set(ref(db, "vagas"), spaces + 1)
					set(ref(db, "openBarrier"), true)
					set(ref(db, "users/" + userid + "/hasBookedSpace"), false)
					setUserReserved(false)
				}
			}
		}, { onlyOnce: false })
	}

	return (
	<div className="container">
		<div>
			<img src= {logo} alt="" id="logo" />
		</div>
		<form>
			<div className="options">
				<label htmlFor=" " id="text"/> Escolha um estabelecimento <div>
					<select name="Estabelecimentos" id="places" onChange={(e) => setParkingLot(e.target.value)}>
						<option value="selecione">Selecione uma Opção</option>
						<option selected value="e-store">e-store</option>
						<option value="mercadinho">Mercadinho</option>
						<option value="farmácia">Farmácia</option>
					</select>
				</div>
			</div>
			<div>
				<label htmlFor="spots"/> Número de Vagas Disponíveis <div>
					<output className="freespots"> {spaces} </output>
				</div>
			</div>
			<div>
				{spaces <= 0 ? (
				<div>
					{userReserved ? <button className="openbarrier" type="button" onClick={() => openBarrier(userEmail)}> Abrir cancela </button> : <p> </p>}
					<div id="nospots"> ---------- Nenhuma vaga disponível? ---------- </div>
					<label htmlFor="time" id="titletime"/> Tempo estimado para disponibilidade de vagas <div id="time"></div>
				</div>
				) : (
				<div>
					<button className="reserve" type="button" onClick={() => bookSpace()}> Reservar Vaga </button>
				</div>
				)}
			</div>
			</form>
		</div>
	)
}

export default MainPage
