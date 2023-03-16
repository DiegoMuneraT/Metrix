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
  set(ref(db, "users/" + userId), {
    id: userId,
    userType,
    name,
    email,
    password,
    tokens,
  });
}

export function readUserData(userId) {
  const getInfo = ref(db, "users/" + userId);
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
