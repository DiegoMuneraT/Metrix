// react
import React from "react";
// @mui/material
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  ThemeProvider,
} from "@mui/material";
// media
// components
import theme from "components/theme/getTheme";
import State from "components/state/State";
import Copyright from "components/copyright/Copyright";

function buyer() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "600", color: "#8BC34A", mt: 3.4, mb: 0.6 }}
            align="center"
          >
            PEDIDOS ACTIVOS 
          </Typography>
          <State />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default buyer;
