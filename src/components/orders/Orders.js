import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Typography } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";
import { changeDeliveryState } from "services/database/firebaseCalls";
import { ReactComponent as OptionsSvg } from "media/images/options.svg";

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
    if (keys.length === 0) {
      return <Typography align="center"> Cargando...</Typography>;
    }
    const orderElements = [];
    keys.forEach((key) => {
      if (key !== taken && orders[key].state === "Libre") {
        orderElements.push(
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
    });

    if (orderElements.length === 0) {
      return (
        <Typography align="center"> No hay pedidos disponibles.</Typography>
      );
    }
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

  // const handleCancel = () => {
  //   if (!taken) {
  //     console.log("No hay pedidos para cancelar");
  //     return;
  //   }
  //   changeDeliveryState(taken, "Libre");
  //   setTaken(null);
  //   console.log("Pedido cancelado");
  // };

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
          <Box style={{ cursor: "pointer" }}>
            <OptionsSvg />
          </Box>
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
          {orderConstructor(orders)}
        </Box>
      </Box>
    </>
  );
};

export default Orders;
