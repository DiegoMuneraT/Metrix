import { getDatabase, ref, set, onValue } from "firebase/database";

const db = getDatabase();

export function writeUserData({
  uid,
  dni,
  name,
  email,
  userType,
  password,
  tokens = 0,
}) {
  set(ref(db, "users/" + uid), {
    id: uid,
    dni,
    userType,
    name,
    email,
    password,
    tokens,
  });
}

export function readUserData(uid) {
  const getInfo = ref(db, "users/" + uid);
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

// Deliveries

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

export function takeDelivery(id, idConnector) {
  set(ref(db, "deliveries/" + id + "/idConnector"), idConnector);
}

// Lockers

export function readLockers(station) {
  const getInfo = ref(db, "stations/" + station);
  let lockerData = false;
  onValue(getInfo, (snapshot) => {
    if (snapshot.exists()) {
      lockerData = snapshot.val();
    } else {
      console.log("No data available");
    }
  });
  return lockerData;
}

export function changeLockerState(station, id, state, validation) {
  set(ref(db, "stations/" + station + "/" + id), {
    id,
    state,
    validation,
  });
}

// Function usada para crear todos los lockers.
// export function setStations(station, i) {
//   set(ref(db, "stations/" + station + "/" + i), {
//     id: i,
//     state: "Libre",
//     validation: 0,
//   });
// }
