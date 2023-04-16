import { getDatabase, ref, set, onValue } from "firebase/database";

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

export function readDeliveryData(deliveryId) {
  const getInfo = ref(db, "deliveries/" + deliveryId);
  let deliveryData = false;
  onValue(getInfo, (snapshot) => {
    if (snapshot.exists()) {
      deliveryData = snapshot.val();
    } else {
      console.log("No data available");
    }
  });
  return deliveryData;
}

export function writeDeliveryData(delivery) {
  let deliveryId = Math.floor(Math.random() * 99999);
  //Verifies if there is a delivery with the given id
  //No funciona muy bien
  let deliveryExists = readDeliveryData(deliveryId);
  while (deliveryExists) {
    console.log("Loop");
    deliveryId = Math.floor(Math.random() * 99999);
    deliveryExists = readDeliveryData(deliveryId);
  }
  const deliveriesInDB = ref(db, `deliveries/${deliveryId}`);
  set(deliveriesInDB, {
    id: deliveryId,
    ...delivery,
  });
}

export function changeDeliveryState(id, state) {
  set(ref(db, "deliveries/" + id + "/state"), state);
}
