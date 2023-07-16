import {NavigationContainer} from '@react-navigation/native';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { getDatabase, set, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import styles from './styles';

const firebaseConfig = {
	apiKey: "AIzaSyDOKS_pQdfAWroLOXHrXu1oMabPUk63eXE",
	authDomain: "e-parking-2407.firebaseapp.com",
	databaseURL: "https://e-parking-2407-default-rtdb.firebaseio.com",
	projectId: "e-parking-2407",
	storageBucket: "e-parking-2407.appspot.com",
	messagingSenderId: "106872314175",
	appId: "1:106872314175:web:94adff4c9cbf852f141b8a"
};

const db = getDatabase(initializeApp(firebaseConfig));
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={"LoginScreen"}>
			<Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const loginUser = () => {
	onValue(ref(db, "users"), (snapshot) => {
		users = snapshot.val()
		for (const key in users) {
			if (users[key].email == email && users[key].password == password) {
				navigation.navigate("HomeScreen", {user: users[key]})
			}
		}
	}, { onlyOnce: true })
}

const RegistrationScreen = ({navigation}) => {
	let name = ""
	let email = ""
	let password = ""
	let lastUserId = 0

	onValue(ref(db, "users"), (snapshot) => {
		for (const key in snapshot.val()) {
			lastUserId = key
		}
	}, { onlyOnce: true }
	)

	const registerUser = () => {
		lastUserId++
		set(ref(db, 'users/' + lastUserId), {
			name: name,
			email: email,
			password: password
		})

		loginUser()
	}

	return (
		<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="name"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => name = text}
					value={name}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => email = text}
					value={email}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="password"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => password = text}
					value={password}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => registerUser()}>
					<Text style={styles.buttonTitle}>Register</Text>
				</TouchableOpacity>
		</View>
	)
}

const LoginScreen = ({navigation}) => {
	let name = ""
	let email = ""
	let password = ""

	const toRegister = () => {
		navigation.navigate("RegistrationScreen")
	}

	return (
		<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="name"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => name = text}
					value={name}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => email = text}
					value={email}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="password"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => password = text}
					value={password}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => loginUser()}>
					<Text style={styles.buttonTitle}>Login</Text>
				</TouchableOpacity>
				<Text>Doesn't have a account? <Text onPress={toRegister} style = {{ color: '#4863e8' }}>Click here</Text></Text>
		</View>
	)
}

const HomeScreen = ({navigation, route}) => {
	let vagas = 0
	const query = ref(db, "vagas");
	onValue(query, (snapshot) => {
		const data = snapshot.val();
		vagas = data
	}, { onlyOnce: false }
	);

	const bookSpace = () => {
		vagas--
		set(ref(db, 'vagas'), vagas)
		alert("sua vaga foi reservada")
	}

	return (
		<View>
			<Button title="Reservar Vaga" onPress={bookSpace} />
		</View>
	);
}
