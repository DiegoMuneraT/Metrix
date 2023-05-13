// react
import React from "react";
// @mui/material
import { CssBaseline, Box, Container, ThemeProvider } from "@mui/material";

// components
import theme from "components/theme/getTheme";
import Orders from "components/orders/Orders";
import Copyright from "components/copyright/Copyright";

function Connector() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* ordenes */}
          <Orders />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Connector;
