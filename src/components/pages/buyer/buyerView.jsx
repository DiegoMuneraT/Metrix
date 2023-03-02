import React from 'react'
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material'
import logo from 'media/images/logopng.png'

function Copyright(props) {
  return(
      <Typography variant='body2' color='text.secondary' align='center' {...props}>
          {'Copyright @ '}
          <Link color="inherit" href='#'>
              Metrix
          </Link> {' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

const theme = createTheme({
    palette: {
        background: {
            default: '#282c34'
        },
        text: {
            primary: '#ffff',
            secondary: '#ffff'
        },
        primary:  {
            main: '#8bc34a'
        },
        secondary: {
            main: '#8bc34a'
        },
    },
});

function Login() {

return (
  <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
          <CssBaseline/>
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

              <img src={logo} className="App-logo" alt="logo" />

              <Typography component='h1' variant='h5'>
                  Estado Del Pedido
              </Typography>
          </Box>
          <Copyright sx={{ mt:5 }}/>
      </Container>

  </ThemeProvider>

);
}

export default Login