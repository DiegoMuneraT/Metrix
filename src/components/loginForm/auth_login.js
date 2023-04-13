import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Connector from "components/pages/connector/connectorView";
import { Link } from "react-router-dom";

const auth_login = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.get("email"), data.get("password"))
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Sesion iniciada', user);
            window.location.href = "/connector" 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Algo paso', errorMessage)
        })
};

export default auth_login;