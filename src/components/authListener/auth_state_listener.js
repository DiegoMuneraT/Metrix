import { getAuth, onAuthStateChanged } from "firebase/auth";


const auth_state_listener = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user){
            const uid = user.uid;
            console.log('El usuario esta en sesion', uid);
        } else {
            console.log('El usuario no esta en sesion');
        }
    });
}

export default auth_state_listener;