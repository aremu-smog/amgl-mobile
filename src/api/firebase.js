import { initializeApp } from "firebase/app"
const firebaseConfig = {
	apiKey: "AIzaSyDzh1d05Gc0BCxJmNIrJrFtZcuCK4zKtwo",
	authDomain: "amgl-f0ab4.firebaseapp.com",
	projectId: "amgl-f0ab4",
	storageBucket: "amgl-f0ab4.appspot.com",
	messagingSenderId: "717805417038",
	appId: "1:717805417038:web:13a6bb1bec6633b73b491f",
}

// Initialize Firebase
export const firebaseInitialization = initializeApp(firebaseConfig)
