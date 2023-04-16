import { getAuth, signOut } from "firebase/auth";

const auth_sign_out = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    console.log('Sesion terminada');
    }).catch((error) => {
        console.log('Paso algo');
    });
}

export default auth_sign_out;
