import { getDatabase, ref, set, onValue } from "firebase/database";
import { database } from "./firebaseConfig";

const db = getDatabase();

export function writeUserData(userId, name, email, userType, password) {
  set(ref(db, 'usuarios/' + userId), {
    id: userId,
    tipo: userType,
    nombre : name,
    correo: email,
    clave: password,
  });
}

export function readUserData(userId){
    const getInfo = ref(db, 'usuarios/' + userId);
    onValue(getInfo, (snapshot) => {
    const data = snapshot.val();
    console.log('El usuario se llama:', data.nombre)
});
}
