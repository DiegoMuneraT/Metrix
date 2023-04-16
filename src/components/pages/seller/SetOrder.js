import { writeDeliveryData } from "services/database/firebaseCalls";

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

  writeDeliveryData(delivery);
};

export default SetOrder;

// id, idbuyer, idseller, start, end, state
// type, price, start, end, idbuyer <- Lo que entra el user
