import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Typography } from "@mui/material";

const BestTypeProduct = () => {
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const getInfo = ref(db, "deliveries/");
    onValue(getInfo, (snapshot) => {
      if (snapshot.exists()) {
        setOrders(snapshot.val());
      } else {
        setOrders({});
      }
    });
  }, []);

  return <User orders={orders} />;
};

const User = ({ orders }) => {
  const keys = Object.keys(orders);
  let stationCounter = {};
  keys.forEach((key) => {
    const currentStation = orders[key].productType;
    if (currentStation in stationCounter) {
      stationCounter[currentStation] += 1;
    } else {
      stationCounter[currentStation] = 1;
    }
    return stationCounter;
  });

  
  const typeUser = () => {
    const sortedStations = Object.entries(stationCounter)
      .sort(([, a], [, b]) => a - b)
      .reverse();
    if (sortedStations.length > 0) {
      return sortedStations[0][0];
    } else {
      return "...";
    }
  };

  return (
    <Typography
    component="h6"
    variant="h6"
    sx={{ fontWeight: "600", color: "#8BC34A", mt: 3.4, mb: 0.6 }}
    align="center"
  >
    🔥 {typeUser()} producto mas enviado en METRIX 🔥
    
  </Typography>
  )
};

export default BestTypeProduct;
