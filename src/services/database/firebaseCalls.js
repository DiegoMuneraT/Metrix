import { getDatabase, ref, set, onValue, remove, get } from "firebase/database";
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

export async function readUserData(uid) {
  const getInfo = ref(db, "users/" + uid);
  let user = {};
  const snapshot = await get(getInfo);
  user = snapshot.val();
  return user;
}

// Deliveries

export function deleteDelivery(deliveryId) {
  remove(ref(db, "deliveries/" + deliveryId));
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

export function writeDeliveryData(delivery, freeLocker) {
  let deliveryId = Math.floor(Math.random() * 99999);
  //Verifies if there is a delivery with the given id
  //No funciona muy bien
  let deliveryExists = readDeliveryData(deliveryId);

  while (deliveryExists) {
    console.log("Loop");
    deliveryId = Math.floor(Math.random() * 99999);
    deliveryExists = readDeliveryData(deliveryId);
  }

  changeLockerState(delivery.start, freeLocker, "Ocupado", `${deliveryId}`);
  const deliveriesInDB = ref(db, `deliveries/${deliveryId}`);
  set(deliveriesInDB, {
    id: `${deliveryId}`,
    ...delivery,
  });
}

export function changeDeliveryState(id, state) {
  set(ref(db, "deliveries/" + id + "/state"), state);
}

export function takeDelivery(id, idConnector) {
  set(ref(db, "deliveries/" + id + "/idConnector"), idConnector);
}

export async function readDeliveries() {
  const getInfo = ref(db, "deliveries/");
  const snapshot = await get(getInfo);
  return snapshot.val();
}

// Lockers

export async function readLockers() {
  const getInfo = ref(db, "stations/");
  const snapshot = await get(getInfo);
  return snapshot.val();
}

export function changeLockerState(station, id, state, validation) {
  set(ref(db, "stations/" + station + "/" + id), {
    id,
    state,
    validation,
  });
}

export function readUserDataAndDeliveries(uid) {
  let getInfo = ref(db, "users/" + uid);
  let userDataAndDeliveries = { userData: {}, deliveries: {} };

  onValue(getInfo, (snapshot) => {
    if (snapshot.exists()) {
      userDataAndDeliveries.userData = snapshot.val();
    } else {
      console.log("No data available");
    }
  });

  getInfo = ref(db, "deliveries/");

  onValue(getInfo, (snapshot) => {
    if (snapshot.exists()) {
      userDataAndDeliveries.deliveries = snapshot.val();
    } else {
      console.log("No data available");
    }
  });

  return userDataAndDeliveries;
}

export async function readTokens(uid) {
  const getInfo = ref(db, "users/" + uid + "/tokens");
  const snapshot = await get(getInfo);
  return snapshot.val();
}

export function reduceTokens(uid, tokens, newTokens = 1) {
  set(ref(db, "users/" + uid + "/tokens"), tokens - newTokens);
}

export function addTokens(uid, newTokens = 1) {
  let currentTokens;
  (async () => {
    currentTokens = await readTokens(uid);
    if (currentTokens !== undefined) {
      set(ref(db, "users/" + uid + "/tokens"), currentTokens + newTokens);
      return;
    }
  })();
}

// Function usada para crear todos los lockers.
// export function setStations(station, i) {
//   set(ref(db, "stations/" + station + "/" + i), {
//     id: i,
//     state: "Libre",
//     validation: 0,
//   });
// }
