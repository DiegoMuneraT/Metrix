import { getDatabase, ref, set } from "firebase/database";

const SetOrder = (event) => {
  event.preventDefault();
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

  const db = getDatabase();
  const randomId = Date.now();
  const deliveryId = randomId - 1679359889909;
  // console.log(deliveryId);

  const deliveriesInDB = ref(db, `deliveries/${deliveryId}`);
  set(deliveriesInDB, {
    id: deliveryId,
    ...delivery,
  });
};

export default SetOrder;

// id, idbuyer, idseller, start, end, state
// type, price, start, end, idbuyer <- Lo que entra el user
