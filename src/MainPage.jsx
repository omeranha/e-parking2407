import logo from "./assets/logoapp.svg"
import './mainPage.css'
import { useState, useEffect } from 'react'
import { set, onValue, ref } from "firebase/database"
import db from "./firebase"

function MainPage(props) {
	const { userid, name, userPassword } = props
	const [spaces, setSpaces] = useState(0)
	const [parkinglot, setParkingLot] = useState("")
	const [userReserved, setUserReserved] = useState(false)
	const [bookingTime, setBookingTime] = useState(Date.now());

	useEffect(() => {
		const intervalId = setInterval(() => {
			onValue(ref(db, "vagas"), (snapshot) => {
				var spaces = snapshot.val()
				setSpaces(spaces)
				if (spaces <= 0) {
					set(ref(db, "openBarrier"), false)
				}
			}, { onlyOnce: true }
			)

			onValue(ref(db, "users"), (snapshot) => {
				const users = snapshot.val()
				for (const key in users) {
					if (users[key].name == name) {
						setUserReserved(users[key].hasBookedSpace)
					}
					if (users[key].hasBookedSpace) {
						const timeNow = Date.now()
						if (timeNow - bookingTime >= 120000) {
							set(ref(db, "users/" + userid + "/hasBookedSpace"), false)

						}
					}
				}
			})
		}, 500)
		return () => clearInterval(intervalId)
	}, [])

	const bookSpace = () => {
		if (spaces <= 0 || parkinglot != "eparking") {
			return
		}
	
		set(ref(db, "vagas"), spaces - 1)
		set(ref(db, "users/" + userid + "/hasBookedSpace"), true)
		setUserReserved(true)
		setBookingTime(Date.now());
		console.log("booking time " + bookingTime)
	}

	const openBarrier = (name) => {
		onValue(ref(db, "users"), (snapshot) => {
			const users = snapshot.val()
			for (const key in users) {
				if (users[key].name == name && users[key].hasBookedSpace) {
					//set(ref(db, "vagas"), spaces + 1)
					set(ref(db, "openBarrier"), true)
					set(ref(db, "users/" + userid + "/hasBookedSpace"), false)
					//setUserReserved(false)
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
					<select name="Estabelecimentos" defaultValue={"selecione"} id="places" onChange={(e) => setParkingLot(e.target.value)}>
						<option value="selecione" disabled>Selecione uma Opção</option>
						<option value="eparking">e-parking store</option>
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
					<button className="openbarrier" type="button" onClick={() => openBarrier(name)}> Abrir cancela </button>
					<div id="nospots"> ---------- Nenhuma vaga disponível? ---------- </div>
					<label htmlFor="time" id="titletime"/> Tempo estimado para disponibilidade de vagas <div id="time"></div>
					</div>
				) : (
					!userReserved ? (
					<div>
						<button className="reserve" type="button" onClick={() => bookSpace()}> Reservar Vaga </button>
						</div>
					) : (
					<div>
						<p>A vaga já foi reservada</p>
					</div>
					)
				)}
			</div>
			</form>
		</div>
	)
}

export default MainPage
