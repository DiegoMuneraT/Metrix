import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Typography } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";

//Componente que crea una orden con su respectivo id, inicio y destino.
const Order = ({ id, inicio, destino, handleTake, taken }) => {
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
          {inicio} - {destino}
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

// componente que crea todas las ordenes
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [taken, setTaken] = useState(null);
  //leer todos los pedidos de la base de datos
  useEffect(() => {
    const db = getDatabase();
    const getInfo = ref(db, "pedidos/");
    onValue(getInfo, (snapshot) => {
      if (snapshot.exists()) {
        setOrders(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);
  //   console.log(orders);
  // función que cambia el valor de taken al id de la orden
  const handleTake = (id) => {
    if (!taken) {
      setTaken(id);
    } else if (taken === id) {
      setTaken(null);
      console.log("Pedido entregado");
    } else {
      console.log("Un pedido ya ha sido tomado.");
    }
  };

  // Functión que llama al componente Order para crear todas las ordenes
  const orderConstructor = (orders) => {
    const keys = Object.keys(orders);
    const orderElements = keys.map((key) => {
      if (key !== taken) {
        return (
          <Order
            key={key}
            id={key}
            inicio={orders[key].inicio}
            destino={orders[key].destino}
            handleTake={handleTake}
            taken={taken}
          />
        );
      }
    });
    return orderElements;
  };

  //función que itera sobre todos los pedidos para ver cual ha sido tomado.
  const takenOrder = (orders) => {
    const keys = Object.keys(orders);
    const orderElements = keys.map((key) => {
      if (key === taken) {
        return (
          <Order
            key={key}
            id={key}
            inicio={orders[key].inicio}
            destino={orders[key].destino}
            handleTake={handleTake}
            taken={taken}
          />
        );
      }
      return [];
    });
    return orderElements;
  };

  // console.log(taken);

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        width: 330,
        maxWidth: { xs: 400, md: 400 },
      }}
    >
      <Typography
        component="h6"
        variant="h6"
        sx={{ fontWeight: "600", color: "#8BC34A", mb: 0.6 }}
        align="center"
      >
        PEDIDO ACTIVO
      </Typography>
      {taken ? (
        takenOrder(orders)
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
  );
};

export default Orders;
