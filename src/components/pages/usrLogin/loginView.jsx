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
import auth from "components/loginForm/logAuth";

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
function Login() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Iniciar Sesión
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={auth}
            sx={{
              mt: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 0,
                    mb: 2,
                  }}
                >
                  {" "}
                  Iniciar Sesión{" "}
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

export default Login;
