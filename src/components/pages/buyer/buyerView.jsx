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
          
          <State />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default buyer;


