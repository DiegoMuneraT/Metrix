

import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Typography } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";

//Componente que crea una orden con su respectivo id, start y end.
const State = ({ id, start, end, state }) => {
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
          {id}  {state} 
        
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
        >
        Calificar
        </Button>
      </Grid>
    </Grid>
  );
};


const States = () => {
  const [orders, setOrders] = useState([]);
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

  // Functión que llama al componente Order para crear todas las ordenes
  const orderConstructor = (orders) => {
    const keys = Object.keys(orders);
    const orderElements = keys.map((key) => {
        return (
          <State
            key={key}
            id={key}
            start={orders[key].start}
            end={orders[key].end}
            state={orders[key].state}
          />
        );
    });
    return orderElements;
  };


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
            sx={{ fontWeight: "600", color: "#8BC34A", mt: 3.4, mb: 0.6 }}
            align="center"
          >
          TUS PEDIDOS
          </Typography>
        </Box>
          <Typography align="center">No hay pedido activo</Typography>
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
            HISTORIAL PEDIDOS
          </Typography>
          {orders ? orderConstructor(orders) : "No hay pedidos disponibles."}
        </Box>
      </Box>
    </>
  );
};

export default States;

