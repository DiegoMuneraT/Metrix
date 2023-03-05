import { writeUserData, readUserData } from "services/database/firebaseCalls";

function validation(event) {
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

  // save user in the database
  writeUserData(user);
  //verify that user has been saved
  readUserData(user.userId);
}

export default validation;
