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
      console.log(user, "Registrado");
      console.log(user.uid);
      formUser.uid = user.uid;
      // console.log(userData);
      if (formUser.uid) {
        writeUserData(formUser);
      } else {
        console.log("paso algo");
      }
      window.location.href = "/account";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Algo paso ${errorCode}`, errorMessage);
    });

  console.log(formUser);
};

export default auth_signin;
