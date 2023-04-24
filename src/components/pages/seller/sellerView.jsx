// react
import React from "react";
// @mui/material
import {
  CssBaseline,
  Box,
  Container,
  ThemeProvider,
  Typography
} from "@mui/material";
// components
import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import Product from "./product";

function sellerView() {
  return (
    <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='md'>
            <CssBaseline/>
            <Box
                sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: 'center'
                }}
            >
                <Product/>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    </ThemeProvider>
  )
}

export default sellerView