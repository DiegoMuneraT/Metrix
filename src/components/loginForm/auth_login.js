import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "services/database/firebaseConfig";

const auth_login = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(auth, data.get("email"), data.get("password"))
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Sesion iniciada', user);
            window.location.href = '/account'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Algo paso ${errorCode}`, errorMessage)
        })
};

export default auth_login;