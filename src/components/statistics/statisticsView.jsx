// react
import React, { useEffect, useState } from "react";
// @mui
import {
  ThemeProvider,
  Container,
  CssBaseline,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
// components
import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import { UserAuth } from "context/authContext";
import { getDatabase, ref, onValue } from "firebase/database";
import { LineChart, PieGraph } from "./getStatistics";
import NavBar from "components/userNav/NavBar";
import { ReactComponent as ArrowSvg } from "media/images/arrow.svg";

function Statistics() {
  const [userData, setUserData] = useState(null);
  const { user } = UserAuth();

  useEffect(() => {
    const db = getDatabase();
    const getTokens = ref(db, "users/" + user.uid);
    onValue(getTokens, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        setUserData(null);
      }
    });
  }, [user.uid]);

  const handleTokens = () => {
    window.location.href = "#";
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 4,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userData != null ? (
            <>
              <NavBar
                userType={userData.userType}
                userName={userData.name}
                tokens={userData.tokens}
                handleTokens={handleTokens}
              />

              <Divider variant="middle" />

              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    mb: 0.48,
                    width: "100%",
                    maxWidth: "375px",
                    mt: 4.2,
                  }}
                  onClick={handleBack}
                >
                  <ArrowSvg />
                </Box>

                <Typography component="h3" variant="p" align="center">
                  Usuarios registrados
                  <PieGraph />
                </Typography>
              </Box>

              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h3" variant="p" align="center">
                  Envios en estaciones
                  <LineChart />
                </Typography>
              </Box>
            </>
          ) : (
            <Typography component="h3" variant="p" align="center">
              <CircularProgress />
            </Typography>
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}



export default Statistics