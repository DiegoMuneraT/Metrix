// react
import React from "react";
// @mui/material
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  Avatar,
  Link,
} from "@mui/material";
// media
import logo from "media/images/logopng.png";
// components
import theme from "components/theme/getTheme";
import auth_login from "components/loginForm/auth_login";
import Copyright from "components/copyright/Copyright";

function Login() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt='Metrix'
            src={logo}
            sx={{ width: 150, height: 150 }}
          />

          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={auth_login}
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

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/register" variant="body2">
                      No te has registrado? Registrate!
                    </Link>
                  </Grid>
                </Grid>

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
