// react
import React, { useState, useEffect } from "react";
// @mui/material
import {
  CssBaseline,
  Box,
  Container,
  ThemeProvider,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import NavBar from "components/userNav/NavBar";
import { ReactComponent as ArrowSvg } from "media/images/arrow.svg";
import { getDatabase, onValue, ref } from "firebase/database";
import { addTokens } from "services/database/firebaseCalls";
import { UserAuth } from "context/authContext";
import { Toaster, toast } from "sonner";

const SellerTokens = () => {
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
    return;
  };

  const buyTokens = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newTokens = parseInt(data.get("newTokens"));
    if (userData.tokens + newTokens > 999) {
      toast.error("Tienes demasiados tokens");
    } else {
      addTokens(userData.id, newTokens);
      toast.success("Compra exitosa!");
      event.currentTarget.reset();
    }
  };

  const handleBack = () => {
    window.location.href = "/account/seller";
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
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
          {userData !== null ? (
            <NavBar
              userType="vendedor"
              userName={userData.name}
              handleTokens={handleTokens}
              tokens={userData.tokens}
            />
          ) : (
            <NavBar handleTokens={handleTokens} />
          )}
          <Box
            sx={{
              display: "flex",
              mb: 0.48,
              width: "100%",
              maxWidth: "375px",
              mt: 4.2,
            }}
          >
            <Box sx={{ cursor: "pointer" }} onClick={handleBack}>
              <ArrowSvg />
            </Box>
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
              COMPRAR TOKENS
            </Typography>
          </Box>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={(event) => buyTokens(event)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Cantidad"
                  name="newTokens"
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  comprar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SellerTokens;
