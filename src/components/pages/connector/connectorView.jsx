// react
import React from "react";
// @mui/material
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
// media
import logo from "media/images/logopng.png";
// components
import theme from "components/theme/getTheme";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright @ "}
      <Link color="inherit" href="#">
        Metrix
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Connector() {
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
          <Box
            component="img"
            sx={{
              height: 110,
              width: 180,
              maxHeight: { xs: 110, md: 180 },
              maxWidth: { xs: 180, md: 180 },
            }}
            src={logo}
          />

          <Typography component="h1" variant="h5">
            Tomar Pedido
          </Typography>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              width: 400,
              maxWidth: { xs: 400, md: 400 },
            }}
          >
            <Grid
              container
              sx={{
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                paddingLeft: "20px",
                borderRadius: "5px",
                mt: 5,
              }}
            >
              <Grid xs={8} item={true}>
                <Typography component="h3" variant="p">
                  35467
                </Typography>
                <Typography component="h3" variant="body1">
                  Aguacatala-Sabaneta
                </Typography>
              </Grid>
              <Grid xs={4} item={true}>
                <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {" "}
                  Tomar{" "}
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                paddingLeft: "20px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            >
              <Grid xs={8} item={true}>
                <Typography component="h3" variant="p">
                  35467
                </Typography>
                <Typography component="h3" variant="body1">
                  Aguacatala-Sabaneta
                </Typography>
              </Grid>
              <Grid xs={4} item={true}>
                <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {" "}
                  Tomar{" "}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Connector;
