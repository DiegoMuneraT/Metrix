// react
import React from "react";
// @mui
import {
  ThemeProvider,
  Container,
  CssBaseline,
  Typography,
  Box,
  Divider,
} from "@mui/material";
// components
import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import { LineChart, PieGraph, PolarGraph } from "./getStatistics";
function Statistics() {
  return (
    <div>
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
            <Typography component="h1" variant="p" align="center"> 
              Estadísticas 
            </Typography>

            <Divider variant="middle" />

            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h3" variant="p" align="center"> 
                Usuarios registrados
                <PieGraph/>
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
                <LineChart/>
              </Typography>
            </Box>

          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}



export default Statistics