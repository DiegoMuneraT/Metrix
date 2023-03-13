import { getDatabase, ref, set, onValue } from "firebase/database";
import { database } from "./firebaseConfig";

const db = getDatabase();

export function writeUserData({
  userId,
  name,
  email,
  userType,
  password,
  tokens = 0,
}) {
  set(ref(db, "usuarios/" + userId), {
    id: userId,
    tipo: userType,
    nombre: name,
    correo: email,
    clave: password,
    tokens: tokens,
  });
}

export function readUserData(userId) {
  const getInfo = ref(db, "usuarios/" + userId);
  let userData;
  onValue(getInfo, (snapshot) => {
    if (snapshot.exists()) {
      userData = snapshot.val();
    } else {
      console.log("No data available");
    }
  });
  return userData;
}
