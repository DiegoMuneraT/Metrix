// react
import React from "react";
// @mui/material
import {
  CssBaseline,
  Box,
  Container,
  ThemeProvider,
} from "@mui/material";

// components
import theme from "components/theme/getTheme";
import State from "components/state/State";
import Copyright from "components/copyright/Copyright";
import BestTypeProduct from "components/typeProduct/BestTypeProduct";

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
          <State />
        </Box>
        <BestTypeProduct/>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default buyer;


