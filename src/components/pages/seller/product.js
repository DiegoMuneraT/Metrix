//react
import React, { useEffect, useState } from "react";
//@mui
import { Button, Grid, Box, Typography } from "@mui/material";
//components
import { getDatabase, ref, onValue } from "firebase/database";
import { ReactComponent as OptionsSvg } from "media/images/options.svg";
import { deleteDelivery } from "services/database/firebaseCalls";
import { UserAuth } from "context/authContext";
import NavBar from "components/userNav/NavBar";

const ButtonState = (id, state) => {
  if (state === "Libre") {
    return (
      <Button
        onClick={() => deleteDelivery(id)}
        variant="contained"
        sx={{ mt: 2, mb: 2, mr: 2 }}
      >
        Cancelar
      </Button>
    );
  } else if (state === "En Curso") {
    return (
      <Box
        sx={{
          display: "justify",
          justifyContent: "center",
          mt: 2,
          mb: 2,
          mr: 2,
        }}
      >
        <Box style={{ cursor: "pointer" }}>
          <OptionsSvg />
        </Box>
      </Box>
    );
  }
};

const Order = ({ id, start, end, state }) => {
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
          {id} {state}
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
        {ButtonState(id, state, start)}
      </Grid>
    </Grid>
  );
};

const Product = () => {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({});
  const { user } = UserAuth();

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

  useEffect(() => {
    const db = getDatabase();
    const getTokens = ref(db, "users/" + user.uid);
    onValue(getTokens, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        setUserData({});
      }
    });
  }, [user.uid]);

  const orderConstructor = () => {
    const keys = Object.keys(orders);
    if (keys.length === 0) {
      return <Typography align="center"> Cargando...</Typography>;
    }
    const orderElements = [];
    keys.forEach((key) => {
      if (orders[key].state === "Libre" || orders[key].state === "En Curso") {
        orderElements.push(
          <Order
            key={key}
            id={key}
            start={orders[key].start}
            end={orders[key].end}
            state={orders[key].state}
          />
        );
        return;
      }
    });

    if (orderElements.length === 0) {
      return <Typography align="center"> No hay pedidos activos </Typography>;
    }
    return orderElements;
  };

  const handleTokens = () => {
    window.location.href = "seller/tokens";
  };

  return (
    <>
      {userData !== null ? (
        <NavBar
          userType="vendedor"
          userName={userData.name}
          tokens={userData.tokens}
          handleTokens={handleTokens}
        />
      ) : (
        <NavBar userType="vendedor" />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 330,
          maxWidth: { xs: 400, md: 400 },
        }}
      >
        <Box
          sx={{
            mt: 4.2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 0.48,
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
              }}
              align="center"
            >
              TUS PEDIDOS
            </Typography>
          </Box>
          {orderConstructor()}

          <Grid item>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              href="seller/post"
            >
              Nuevo Pedido
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Product;
