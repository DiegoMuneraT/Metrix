import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Typography } from "@mui/material";

const TypeUser = () => {
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
    const currentStation = orders[key].start;
    if (currentStation in stationCounter) {
      stationCounter[currentStation] += 1;
    } else {
      stationCounter[currentStation] = 1;
    }
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
    <Typography align="center">
      Hay {typeUser()} usuarios registrados como Conector<br/>
      Hay {typeUser()} usuarios registrados como Vendedor<br/>
      Hay {typeUser()} usuarios registrados como Comprador
    </Typography>



  );
};

export default TypeUser;
