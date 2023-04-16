import { writeUserData, readUserData } from "services/database/firebaseCalls";
import { createUserWithEmailAndPassword } from "firebase/auth";
//import { useNavigate } from "react-router-dom";
import { auth } from "services/database/firebaseConfig";


const auth_signin = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const user = {
    userId: data.get("userId"),
    name: `${data.get("firstName")} ${data.get("lastName")}`,
    email: data.get("email"),
    userType: data.get("userType"),
    password: data.get("password"),
  };

  createUserWithEmailAndPassword(auth, data.get("email"), data.get("password"))
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user,'Registrado');
      window.location.href = '/account'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Algo paso ${errorCode}`, errorMessage);
    })

  // llamado a la base de datos para ver si el user existe
  const userData = readUserData(user.userId);
  // console.log(userData);
  if (userData) {
    console.log("Usuario ya existe " + userData.email);
  } else {
    writeUserData(user);
    console.log("Te has registrado correctamente");
  }
};

export default auth_signin;



