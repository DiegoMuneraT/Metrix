// Logo
import logo from 'media/images/logopng.png'

// Styled components
import 'media/styles/App.css';
import theme from "components/theme/getTheme";
import Copyright from "components/copyright/Copyright";
import BestStation from "components/bestStation/BestStation";


//React
import React from 'react'


//@mui
import { Avatar,
  Button, 
  Grid, 
  ThemeProvider, 
  CssBaseline, 
  Container, 
  Box,
  Typography, 
} from '@mui/material';

function homePage() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: -2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt='Metrix'
            src={logo}
            sx={{ width: 350, height: 350}}
          />

          <Typography component="h1" variant="h5">
            Bienvenido a <strong>Metrix</strong>
          </Typography>
        </Box>

        <Grid item>
            <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} href="/login">Iniciar Sesion</Button>
          </Grid>

          <Grid item>
            <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} href="/register">Registrarse</Button>
          </Grid>

          <BestStation />

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

export default homePage


      