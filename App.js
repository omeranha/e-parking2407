import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterPage from './src/registerPage';
import LoginPage from './src/loginPage';
import MainPage from './src/mainPage';

const Stack = createNativeStackNavigator();
// options={{title: 'Register'}
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="loginPage" component={LoginPage} />
				<Stack.Screen name="registerPage" component={RegisterPage}/>
				<Stack.Screen name="mainPage" component={MainPage} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
