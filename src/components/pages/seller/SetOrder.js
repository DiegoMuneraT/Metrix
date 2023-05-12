import {
  writeDeliveryData,
  reduceTokens,
} from "services/database/firebaseCalls";

const SetOrder = (event, lockers, user) => {
  event.preventDefault();
  if (user.tokens > 0) {
    console.log(user.tokens);
    const data = new FormData(event.currentTarget);
    const delivery = {
      idBuyer: data.get("idBuyer"),
      start: data.get("start"),
      end: data.get("end"),
      state: "Libre",
      idSeller: "0",
      productType: data.get("productType"),
      price: data.get("price"),
    };

    const stationLockers = lockers[delivery.start];
    let freeLocker = 0;
    for (let i = 1; i < 41; i++) {
      if (stationLockers[i].state === "Libre") {
        freeLocker = i;
        break;
      }
    }
    writeDeliveryData(delivery, freeLocker);
    reduceTokens(user.id, user.tokens);
  } else {
    console.log("No tienes suficientes tokens");
  }
};

export default SetOrder;

// id, idbuyer, idseller, start, end, state
// type, price, start, end, idbuyer <- Lo que entra el user
