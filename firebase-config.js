import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCYz0gHpdmetSS19VODkqNvcoEQLMmgHHs",
  authDomain: "studygrid-890b0.firebaseapp.com",
  projectId: "studygrid-890b0",
  storageBucket: "studygrid-890b0.firebasestorage.app",
  messagingSenderId: "772782674305",
  appId: "1:772782674305:web:8d34a1107b9ea51f759880",
  measurementId: "G-Q59EPPL6RF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();