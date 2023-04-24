// Logo
import logo from 'media/images/logopng.png'

// Styled components
import 'media/styles/App.css';
import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";

//React
import React from 'react'

//@mui
import { Button, Grid, ThemeProvider, CssBaseline, Container } from '@mui/material';

function homePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenido a Metrix 🔥
        </p>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Grid item>
              <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} href="/login">Iniciar Sesion</Button>
            </Grid>

            <Grid item>
                <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} href="/register">Registrarse</Button>
            </Grid>

            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
        
      </header>
    </div>
  )
}

export default homePage


      