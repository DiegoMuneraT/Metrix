// react
import React, { useState, useEffect } from "react";
// import { getDatabase, ref, onValue } from "firebase/database";
// @mui/material
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  ThemeProvider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Modal,
} from "@mui/material";
// components
import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import SetOrder from "components/pages/seller/SetOrder";
import { Toaster, toast } from "sonner";
import Stations from "components/stations/stations";
import { UserAuth } from "context/authContext";
import { readLockers, readUserData } from "services/database/firebaseCalls";

function Seller() {
  const [productType, setProductType] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [lockers, setLockers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const { user } = UserAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.href = "/account/seller";
  };

  useEffect(() => {
    // const db = getDatabase();
    // const getLockers = ref(db, "stations/");
    // onValue(getLockers, (snapshot) => {
    //   if (snapshot.exists()) {
    //     setLockers(snapshot.val());
    //   } else {
    //     setLockers([]);
    //   }
    // });
    (async () => {
      setLockers(await readLockers());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setUserData(await readUserData(user.uid));
    })();
  }, [user.uid]);

  const handleChange = (event) => {
    if (event.target.name === "productType") {
      setProductType(event.target.value);
    } else if (event.target.name === "start") {
      setStart(event.target.value);
    } else {
      setEnd(event.target.value);
    }
  };

  const returnSeller = () => {
    console.log(userData);
    if (userData.tokens > 0) {
      toast.success("Pedido creado!");
      handleOpen();
    } else {
      toast.error("No tienes suficientes tokens");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toaster richColors position="bottom-center" />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Ingrese el Pedido
          </Typography>

          <Box
            component="form"
            autoComplete="off"
            onSubmit={(event) => SetOrder(event, lockers, userData)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={49}>
                <Box
                  sx={{
                    minWidth: 120,
                    background: "#282c34",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de producto
                    </InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productType}
                        label="productType"
                        onChange={handleChange}
                        name="productType"
                        required
                      >
                        <MenuItem value={"Electronica"}>Electronica</MenuItem>
                        <MenuItem value={"Textiles"}>Textiles</MenuItem>
                        <MenuItem value={"Belleza"}>Belleza</MenuItem>
                        <MenuItem value={"Juguetes"}>Juguetes</MenuItem>
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth label="Precio" name="price" />
              </Grid>

              <Grid item xs={49}>
                <Box
                  sx={{
                    minWidth: 120,
                    background: "#282c34",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Estación inicio
                    </InputLabel>
                    <ThemeProvider theme={theme}>
                      <Stations
                        value={start}
                        handleChange={handleChange}
                        popStation={end}
                        label={"start"}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={49}>
                <Box
                  sx={{
                    minWidth: 120,
                    background: "#282c34",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Estación destino
                    </InputLabel>
                    <ThemeProvider theme={theme}>
                      <Stations
                        value={end}
                        handleChange={handleChange}
                        popStation={start}
                        label={"end"}
                      />
                    </ThemeProvider>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ID Comprador"
                  name="idBuyer"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={returnSeller}
            >
              {" "}
              Subir pedido{" "}
            </Button>
          </Box>
        </Box>

        <ValidationModal
          open={open}
          handleClose={handleClose}
          locker={"2"}
          idValidation={"3423"}
          station={start}
          loaded={true}
        />
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

const ValidationModal = ({
  open,
  handleClose,
  locker,
  idValidation,
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
              {station ? "DEJAR EN EL LOCKER" : "DEJAR EN EL LOCKER"}
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Seller;
