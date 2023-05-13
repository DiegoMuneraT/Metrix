// react
import React from "react";
// @mui/material
import { CssBaseline, Box, Container, ThemeProvider } from "@mui/material";

import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import NavBar from "components/userNav/NavBar";

const ConnectorTokens = () => {
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
          <NavBar />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default ConnectorTokens;
