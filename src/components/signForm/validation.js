import { writeUserData, readUserData } from "services/database/firebaseCalls";

const validation = (event) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const user = {
    userId: data.get("userId"),
    name: `${data.get("firstName")} ${data.get("lastName")}`,
    email: data.get("email"),
    userType: data.get("userType"),
    password: data.get("password"),
    allowExtraEmails: data.get("allowExtraEmails"),
  };

  // llamado a la base de datos para ver si el user existe
  const userData = readUserData(user.userId);
  // console.log(userData);
  if (userData) {
    console.log("Usuario ya existe " + userData.correo);
  } else {
    writeUserData(user);
    console.log("Te has registrado correctamente");
  }
};

export default validation;
