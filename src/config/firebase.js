// Importa a função para inicializar o Firebase
import { initializeApp } from "firebase/app";
// Importa a função para inicilizar o Firestore
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase Web
const firebaseConfig = {
  apiKey: "AIzaSyCDy3aqWHpiVNHzV9qbNnR-bjlyXEUIpjY",
  authDomain: "phrases-61d06.firebaseapp.com",
  projectId: "phrases-61d06",
  storageBucket: "phrases-61d06.appspot.com",
  messagingSenderId: "786010728251",
  appId: "1:786010728251:web:6a35c2fca5316b1738391e"
};

// Inicia o Firebase
const app = initializeApp(firebaseConfig);
// Inicia o Firestore
export const db = getFirestore(app);