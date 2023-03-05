import React from "react";
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
import logo from "media/images/logopng.png";
//import { writeUserData } from 'services/database/firebaseCalls';
//import { IdField } from 'services/hooks/useID';
import validation from "components/signForm/validation";

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

const theme = createTheme({
  palette: {
    background: {
      default: "#282c34",
      paper: "#282c34",
    },
    text: {
      primary: "#ffff",
      secondary: "#ffff",
    },
    primary: {
      main: "#8bc34a",
    },
    secondary: {
      main: "#8bc34a",
    },
  },
});

function Signup() {
  // these codes controls both the type and the id of the user
  const [userType, setUserType] = React.useState("");
  const [userId, setUserId] = React.useState("");

  const handleChange = (event) => {
    if (event.target.name === "userType") {
      setUserType(event.target.value);
    } else {
      // these code only allows users to type numerical values for id
      const regex = /^[0-9\b]+$/;
      if (event.target.value === "" || regex.test(event.target.value)) {
        setUserId(event.target.value);
      }
    }
  };

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
            Usuario, registrate
          </Typography>

          <Box
            component="form"
            autoComplete="off"
            onSubmit={validation}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label="Nombre"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="lastName"
                  label="Apellido"
                />
              </Grid>

              <Grid item xs={49}>
                <Box
                  sx={{
                    minWidth: 120,
                    background: "#282c34",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <ThemeProvider theme={theme}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userType}
                        label="userType"
                        onChange={handleChange}
                        name="userType"
                        required
                      >
                        <MenuItem value={"vendedor"}>Vendedor</MenuItem>
                        <MenuItem value={"conector"}>Conector</MenuItem>
                        <MenuItem value={"receptor"}>Receptor</MenuItem>
                      </Select>
                    </ThemeProvider>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Número de Identificacion"
                  name="userId"
                  value={userId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Correo Electronico"
                  name="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      name="allowExtraEmails"
                      color="primary"
                    />
                  }
                  label="Quiero recibir informacion, promociones y actualizaciones a mi correo."
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {" "}
              Registrarse{" "}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="" variant="body2">
                  Ya tienes una cuenta? Inicia Sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
