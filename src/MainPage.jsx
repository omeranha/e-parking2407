import logo from "./assets/logoapp.svg";
import './Page3.css';
import { useState, useEffect } from 'react'
import { set, onValue, ref } from "firebase/database";
import db from "./firebase";

function Main() {
	const [vagas, setVagas] = useState(0);
	const [time, setTime] = useState(new Date());
	const [isReserved, setIsReserved] = useState(false);
	const [remainingTime, setRemainingTime] = useState(30 * 60 * 1000);

	useEffect(() => {
		const intervalId = setInterval(() => {
			onValue(ref(db, "vagas"), (snapshot) => {
				setVagas(snapshot.val())
			}, { onlyOnce: true }
			);
		}, 500)
		return () => clearInterval(intervalId)
	}, [])

	useEffect(() => {
		if (isReserved && remainingTime > 0) {
		const intervalId = setInterval(() => {
			setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000); // Decrease by 1 second
			set(ref(db, "remainingTime"), remainingTime - 1000); // Update remainingTime in database
		}, 1000);
		return () => clearInterval(intervalId);
		}
	}, [isReserved, remainingTime]);

	useEffect(() => {
		onValue(ref(db, "remainingTime"), (snapshot) => {
			const storedRemainingTime = snapshot.val();
			if (storedRemainingTime !== null) {
				setRemainingTime(storedRemainingTime);
				if (storedRemainingTime > 0) {
					setIsReserved(true);
				}
			}
		});
	}, []);

	const bookSpace = () => {
		set(ref(db, "vagas"), vagas - 1);
		setVagas(vagas - 1);
		const currentTime = new Date();
		setTime(currentTime);
		setIsReserved(true);
		set(ref(db, "lastBookTime"), currentTime.toLocaleTimeString());
		set(ref(db, "remainingTime"), remainingTime); // Store the initial remainingTime in database
	};

	return (
	<div className="container">
		<div>
			<img src= {logo} alt="" id="logo" />
		</div>
		<form>
			<div className="options">
				<label htmlFor=" " id="text"/> Escolha um estabelecimento <div>
					<select name="Estabelecimentos" id="places">
						<option selected value="selecione">Selecione uma Opção</option>
						<option value="e-store">e-store</option>
						<option value="mercadinho">Mercadinho</option>
						<option value="farmácia">Farmácia</option>
					</select>
				</div>
			</div>
			<div>
				<label htmlFor="spots"/> Número de Vagas Disponíveis <div>
					<output className="freespots"> {vagas} </output>
				</div>
			</div>
			<div>
				<button className="reserve" type="button" onClick={() => bookSpace()}> Reservar uma Vaga </button>
			</div>
			<div id="nospots"> ---------- Nenhuma vaga disponível? ---------- </div>
			<div>
				<label htmlFor="time" id="titletime"/> Tempo estimado para disponibilidade de vagas <div id="time">
					{isReserved && remainingTime > 0 ? (
					<output> {new Date(remainingTime).toISOString().substr(14, 5)} </output>
					) : ( 
					<output></output>
					)}
				</div>
			</div>
			</form>
		</div>
	)
}

export default Main
