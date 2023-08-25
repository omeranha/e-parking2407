import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

export default db;
