import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		overflow: 'hidden',
		width: '100%',
		height: '100%',
		backgroundColor: '#DBF6FF',
		backgroundSize: '100vh',
	},
	form: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		marginLeft: 20,
	},
	inputContainer: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
	},
	backgroundImage: {
		backgroundImage: 'url("./assets/downwaves1.svg"), url("./assets/upwaves1.svg")',
		backgroundRepeat: 'no-repeat, no-repeat',
		backgroundSize: '100vw, 100vw',
		backgroundPosition: 'bottom, top',
	},
	logo: {
		width: 120,
		height: 80,
		marginTop: 50,
		marginLeft: 142,
		marginBottom: 40,
	},
	readyButton: {
		appearance: 'none',
		padding: 10,
		borderWidth: 0,
		backgroundColor: '#5170FE',
		fontWeight: '700',
		fontSize: 'large',
		color: '#fff',
		borderRadius: 10,
		width: '50vw',
		fontFamily: 'Kanit',
		margin: 20,
	},
	input: {
		margin: 4,
		borderWidth: 0,
		boxShadow: '0 0 15px 4px rgba(0, 0, 0, 0.06)',
		borderRadius: 10,
		backgroundColor: '#E9FAFF',
		width: '70vw',
		marginBottom: 15,
	},
	star: {
		margin: 0,
		padding: 0,
		boxSizing: 'border-box',
		textDecoration: 'none',
	},
	htmlBody: {
		fontFamily: 'Kanit, sans-serif',
	},
});