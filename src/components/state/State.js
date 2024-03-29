// react
import React, { useEffect, useState } from "react";
// mui
import { Button, Grid, Box, Typography, Modal } from "@mui/material";
//components
import { getDatabase, ref, onValue } from "firebase/database";
import {
  changeDeliveryState,
  takeDelivery,
  changeLockerState,
  addTokens,
} from "services/database/firebaseCalls";
//import { ReactComponent as OptionsSvg } from "media/images/options.svg";
import { UserAuth } from "context/authContext";

const State = ({ id, start, end, handleTake, taken, state }) => {

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
        <Button
          variant="contained"
          sx={{ mt: 2, mb: 2, mr: 2 }}
          onClick={() => handleTake(id)}
        >
          {" "}
          {taken ? "Retirar" : "Calificar"}{" "}
        </Button>
      </Grid>
    </Grid>
  );
};

// componente que crea todas las ordenes
const States = () => {
  const [orders, setOrders] = useState([]);
  const [lockers, setLockers] = useState([]);
  const [locker, setLocker] = useState([]);
  // const [cancel, setCancel] = useState(false);
  const { user } = UserAuth();
  const idBuyer = user.uid;

  const [open, setOpen] = useState(false);
  const [takeOut, setTakeOut] = useState(false);

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

    const getLockers = ref(db, "stations/");
    onValue(getLockers, (snapshot) => {
      if (snapshot.exists()) {
        setLockers(snapshot.val());
      } else {
        setLockers([]);
      }
    });
  }, []);

  // Functión que llama al componente Order para crear todas las ordenes
  const orderConstructor = () => {
    const keys = Object.keys(orders);
    if (keys.length === 0) {
      return <Typography align="center"> Cargando...</Typography>;
    }
    const orderElements = [];
    keys.forEach((key) => {
      if (orders[key].state === "Entregado") {
        orderElements.push(
          <State
            key={key}
            id={key}
            start={orders[key].start}
            end={orders[key].end}
            state={orders[key].state}
            handleTake={handleTake}
            taken={false}
          />
        );
      }
    });

    if (orderElements.length === 0) {
      return (
        <Typography align="center"> No hay historial de pedidos.</Typography>
      );
    }
    return orderElements;
  };

  const takenOrder = () => {
    const keys = Object.keys(orders);
    if (keys.length === 0) {
      return <Typography align="center"> Cargando...</Typography>;
    }
    let takenOrder = [];
    keys.forEach((key) => {
      if (
        orders[key].state === "En Curso" ||
        orders[key].state === "En Locker"
      ) {
        takenOrder.push(
          <State
            key={key}
            id={key}
            start={orders[key].start}
            end={orders[key].end}
            state={orders[key].state}
            handleTake={handleTake}
            taken={true}
          />
        );
        return;
      }
    });

    if (takenOrder.length === 0) {
      return (
        <Typography align="center"> No hay ningun pedido activo </Typography>
      );
    }
    return takenOrder;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // cambia el valor de taken al id de la orden y actualiza el estado
  const handleTake = (id) => {
    const taken = existsTaken();
    if (!taken) {
      setTakeOut(true);
      findLocker(id);
      takeDelivery(id, idBuyer);
      changeDeliveryState(id, "En Curso");
      handleOpen();
    } else if (taken === id) {
      const idConnector = orders[id].idConnector;
      setTakeOut(false);
      chooseLocker(id);
      changeDeliveryState(id, "Entregado");
      handleOpen();
      addTokens(idConnector);
      console.log("Pedido entregado");
    } else {
      console.log("Un pedido ya ha sido tomado.");
    }
  };

  const existsTaken = () => {
    const keys = Object.keys(orders);
    let exists = false;
    keys.forEach((key) => {
      if (orders[key].state === "En Locker") {
        exists = key;
        return;
      }
    });
    return exists;
  };

  const findLocker = (id) => {
    const stationLockers = lockers[orders[id].start];
    let takenLocker = 0;
    for (let i = 1; i < stationLockers.length + 1; i++) {
      if (stationLockers[i].validation === id) {
        takenLocker = i;
        break;
      }
    }
    setLocker({ station: orders[id].start, id: takenLocker, validation: id });
    changeLockerState(orders[id].start, takenLocker, "Libre", 0);
  };

  const chooseLocker = (id) => {
    const stationLockers = lockers[orders[id].end];
    let freeLocker = 0;
    for (let i = 1; i < stationLockers.length + 1; i++) {
      if (stationLockers[i].validation === id) {
        freeLocker = i;
        break;
      }
    }
    setLocker({ station: orders[id].end, id: freeLocker, validation: id });
    changeLockerState(orders[id].end, freeLocker, "Libre", 0);
  };

  const ValidationModal = ({
    open,
    handleClose,
    locker,
    idValidation,
    takeOut,
    station,
    loaded,
  }) => {
    return (
      <>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "28%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 343,
              bgcolor: "background.paper",
              border: "0.3px solid rgba(0, 0, 0, 0.5)",
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h6"
              sx={{
                fontWeight: "600",
                color: "#8BC34A",
                mt: 1.3,
                mb: 1,
                textTransform: "uppercase",
              }}
              align="center"
            >
              {loaded ? station : "..."} LOCKER {loaded ? locker : "..."}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h6"
              sx={{ fontWeight: "600", mt: 0, mb: 0 }}
              align="center"
            >
              ID VALIDACIÓN
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h6"
              sx={{ fontWeight: "400", mt: 0, mb: 2.4 }}
              align="center"
            >
              {loaded ? idValidation : "..."}
            </Typography>
            {loaded ? (
              <Button
                variant="contained"
                sx={{ margin: "auto" }}
                onClick={handleClose}
              >
                {takeOut ? "RETIRAR DEL LOCKER" : "RETIRAR DE LOCKER"}
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Modal>
      </>
    );
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
            <Box style={{ cursor: "pointer" }}></Box>
          </Box>
          {takenOrder()}
        </Box>
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
            HISTORIAL DE PEDIDOS
          </Typography>
          {orderConstructor(orders)}
        </Box>
        <Box
          sx={{
            mt: 4.2,
            display: "flex",
            flexDirection: "column",
            borderTop: "0.6px solid #1F1F1F",
          }}
        >
        </Box>
      </Box>

      <ValidationModal
        open={open}
        handleClose={handleClose}
        locker={locker.id}
        idValidation={locker.validation}
        takeOut={takeOut}
        station={locker.station}
        loaded={locker}
      />
    </>
  );
};

export default States;
