import { writeUserData } from "services/database/firebaseCalls";
import { createUserWithEmailAndPassword } from "firebase/auth";
//import { useNavigate } from "react-router-dom";
import { auth } from "services/database/firebaseConfig";

const auth_signin = (event) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const formUser = {
    uid: "",
    email: data.get("email"),
    dni: data.get("userId"),
    name: `${data.get("firstName")} ${data.get("lastName")}`,
    userType: data.get("userType"),
    password: data.get("password"),
  };

  createUserWithEmailAndPassword(auth, data.get("email"), data.get("password"))
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Registrado en Auth");
      formUser.uid = user.uid;
      if (formUser.uid) {
        writeUserData(formUser);
        console.log('Registrado en RealTime')
      } else {
        console.log("paso algo");
      }
      sleep(1000).then(() => {window.location.href = "/account";})
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Algo paso ${errorCode}`, errorMessage);
    });
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default auth_signin;
