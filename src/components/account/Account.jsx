// react
import React from "react";
// @mui
import {
  ThemeProvider,
  Container,
  CssBaseline,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
// componentes
import { UserAuth } from "context/authContext";
import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import { readUserData } from "services/database/firebaseCalls";

const manageUsers = (uid) => {
  const data = readUserData(uid);
  data.then((userData) => {
    console.log(userData);
    if (userData) {
      console.log("Entro");
      switch (userData.userType) {
        case "conector":
          console.log("Conector en linea");
          window.location = "/account/connector";
          break;
        case "vendedor":
          console.log("Vendedor en linea");
          window.location = "/account/seller";
          break;
        case "receptor":
          console.log("Comprador en linea");
          window.location = "/account/buyer";
          break;
        default:
          console.log("no funciona");
          break;
      }
    }
  });
  console.log("fin");
};

const Account = () => {
  const { user } = UserAuth();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {manageUsers(user && user.uid)}

          <Box
            sx={{
              marginTop: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography component="h3" variant="p" align="center">
              <CircularProgress />
            </Typography>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Account;
