import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Typography } from "@mui/material";
import { getDatabase, ref, onValue, set } from "firebase/database";

//Componente que crea una orden con su respectivo id, start y end.
const Order = ({ id, start, end, handleTake, taken }) => {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        paddingLeft: "20px",
        borderRadius: "5px",
        border: "0.3px solid rgba(0, 0, 0, 0.5)",
        mt: 1.6,
      }}
    >
      <Grid xs={7} item={true}>
        <Typography component="h3" variant="p">
          {id}
        </Typography>
        <Typography component="h3" variant="body2">
          {start} - {end}
        </Typography>
      </Grid>
      <Grid
        xs={5}
        item={true}
        sx={{
          textAlign: "right",
        }}
      >
        <Button
          variant="contained"
          sx={{ mt: 2, mb: 2, mr: 2 }}
          onClick={() => handleTake(id)}
        >
          {" "}
          {taken === id ? "Entregar" : "Tomar"}{" "}
        </Button>
      </Grid>
    </Grid>
  );
};

// const Cancel = () => {
//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         background: "rgba(0, 0, 0, 0.5)",
//         zIndex: "1",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           borderTop: "0.6px solid #1F1F1F",
//         }}
//       >
//         <Typography
//           component="h6"
//           variant="h6"
//           sx={{ fontWeight: "600", color: "#8BC34A", mt: 3.4, mb: 0.6 }}
//           align="center"
//         >
//           PEDIDOS LIBRES
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// componente que crea todas las ordenes
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [taken, setTaken] = useState(null);
  // const [cancel, setCancel] = useState(false);

  //leer todos los pedidos de la base de datos
  useEffect(() => {
    const db = getDatabase();
    const getInfo = ref(db, "deliveries/");
    onValue(getInfo, (snapshot) => {
      if (snapshot.exists()) {
        setOrders(snapshot.val());
      } else {
        setOrders([]);
      }
    });
  }, []);
  //   console.log(orders);

  // función que cambia el estado de los pedidos
  const changeDeliveryState = (id, state) => {
    const db = getDatabase();
    set(ref(db, "deliveries/" + id), {
      ...orders[id],
      state,
    });
  };

  // función que cambia el valor de taken al id de la orden y actualiza el estado
  const handleTake = (id) => {
    if (!taken) {
      setTaken(id);
      changeDeliveryState(id, "En Curso");
    } else if (taken === id) {
      setTaken(null);
      changeDeliveryState(id, "Entregado");
      console.log("Pedido entregado");
    } else {
      console.log("Un pedido ya ha sido tomado.");
    }
  };

  // Functión que llama al componente Order para crear todas las ordenes
  const orderConstructor = (orders) => {
    const keys = Object.keys(orders);
    const orderElements = keys.map((key) => {
      if (key !== taken && orders[key].state === "Libre") {
        return (
          <Order
            key={key}
            id={key}
            start={orders[key].start}
            end={orders[key].end}
            handleTake={handleTake}
            taken={taken}
          />
        );
      }
      return null;
    });
    return orderElements;
  };

  // Función que crea el pedido ya tomado
  const takenOrder = (id) => {
    return (
      <Order
        id={id}
        start={orders[id].start}
        end={orders[id].end}
        handleTake={handleTake}
        taken={taken}
      />
    );
  };

  const handleCancel = () => {
    if (!taken) {
      console.log("No hay pedidos para cancelar");
      return;
    }
    changeDeliveryState(taken, "Libre");
    setTaken(null);
    console.log("Pedido cancelado");
  };

  // console.log(taken);

  return (
    <>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          width: 330,
          maxWidth: { xs: 400, md: 400 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2.3,
          }}
        >
          <Typography
            component="h6"
            variant="h6"
            sx={{
              fontWeight: "600",
              color: "#8BC34A",
              lineHeight: "1.25rem",
              margin: "auto",
              mt: 0.3,
              mr: 10,
            }}
            align="center"
          >
            PEDIDO ACTIVO
          </Typography>
          <svg
            width="6"
            height="20"
            viewBox="0 0 6 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleCancel}
            style={{ cursor: "pointer" }}
          >
            <path
              d="M0.666748 9.99996C0.666748 10.6188 0.912581 11.2123 1.35017 11.6499C1.78775 12.0875 2.38124 12.3333 3.00008 12.3333C3.61892 12.3333 4.21241 12.0875 4.65 11.6499C5.08758 11.2123 5.33341 10.6188 5.33341 9.99996C5.33341 9.38112 5.08758 8.78763 4.65 8.35004C4.21241 7.91246 3.61892 7.66663 3.00008 7.66663C2.38124 7.66663 1.78775 7.91246 1.35017 8.35004C0.912581 8.78763 0.666748 9.38112 0.666748 9.99996ZM0.666748 2.99996C0.666748 3.6188 0.912581 4.21229 1.35017 4.64987C1.78775 5.08746 2.38124 5.33329 3.00008 5.33329C3.61892 5.33329 4.21241 5.08746 4.65 4.64987C5.08758 4.21229 5.33341 3.6188 5.33341 2.99996C5.33341 2.38112 5.08758 1.78763 4.65 1.35004C4.21241 0.912458 3.61892 0.666626 3.00008 0.666626C2.38124 0.666626 1.78775 0.912458 1.35017 1.35004C0.912581 1.78763 0.666748 2.38112 0.666748 2.99996ZM0.666748 17C0.666748 17.6188 0.912581 18.2123 1.35017 18.6499C1.78775 19.0875 2.38124 19.3333 3.00008 19.3333C3.61892 19.3333 4.21241 19.0875 4.65 18.6499C5.08758 18.2123 5.33341 17.6188 5.33341 17C5.33341 16.3811 5.08758 15.7876 4.65 15.35C4.21241 14.9125 3.61892 14.6666 3.00008 14.6666C2.38124 14.6666 1.78775 14.9125 1.35017 15.35C0.912581 15.7876 0.666748 16.3811 0.666748 17Z"
              fill="#8BC34A"
            />
          </svg>
        </Box>
        {taken ? (
          takenOrder(taken)
        ) : (
          <Typography align="center">No hay pedido activo</Typography>
        )}
        <Box
          sx={{
            mt: 4.2,
            display: "flex",
            flexDirection: "column",
            borderTop: "0.6px solid #1F1F1F",
          }}
        >
          <Typography
            component="h6"
            variant="h6"
            sx={{ fontWeight: "600", color: "#8BC34A", mt: 3.4, mb: 0.6 }}
            align="center"
          >
            PEDIDOS LIBRES
          </Typography>
          {orders ? orderConstructor(orders) : "No hay pedidos disponibles."}
        </Box>
      </Box>
    </>
  );
};

export default Orders;
