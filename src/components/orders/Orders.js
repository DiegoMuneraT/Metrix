import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Typography } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";

//Componente que crea una orden con su respectivo id, inicio y destino.
const Order = ({ id, inicio, destino }) => {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        paddingLeft: "20px",
        borderRadius: "5px",
      }}
    >
      <Grid xs={8} item={true}>
        <Typography component="h3" variant="p">
          {id}
        </Typography>
        <Typography component="h3" variant="body1">
          {inicio}-{destino}
        </Typography>
      </Grid>
      <Grid xs={4} item={true}>
        <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
          {" "}
          Tomar{" "}
        </Button>
      </Grid>
    </Grid>
  );
};

// componente que crea todas las ordenes
const Orders = () => {
  const [orders, setOrders] = useState([]);
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

  // Functión que llama al componente Order para crear todas las ordenes
  const orderConstructor = (orders) => {
    const keys = Object.keys(orders);
    const orderElements = keys.map((key) => (
      <Order
        key={key}
        id={key}
        inicio={orders[key].inicio}
        destino={orders[key].destino}
      />
    ));
    return orderElements;
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        width: 400,
        maxWidth: { xs: 400, md: 400 },
      }}
    >
      {orderConstructor(orders)}
    </Box>
  );
};

export default Orders;
