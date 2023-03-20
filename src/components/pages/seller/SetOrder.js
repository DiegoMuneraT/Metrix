import { writeUserData, readUserData } from "services/database/firebaseCalls";

const SetOrder = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);  
  console.log('Orden creada', data)
};

export default SetOrder;


// id, idbuyer, idseller, start, end, state
// type, price, start, end, idbuyer <- Lo que entra el user